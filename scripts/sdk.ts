import * as fs from 'node:fs';
import * as path from 'node:path';
import openapiTS, { astToString } from 'openapi-typescript';

import type { OpenAPI3 } from 'openapi-typescript';

const SWAGGER_URL = 'https://safe-client.staging.5afe.dev/api';

const SDK_FOLDER = path.join(process.cwd(), 'sdk');
const SCHEMA_FILE = 'schema.d.ts';
const SDK_FILE = 'sdk.ts';

const WARNING = `/**
 * This file was auto-generated. Do not make direct changes.
 */`;

/**
 * Main function to generate SDK for Safe Client Gateway
 */
async function main() {
  try {
    fs.mkdirSync(SDK_FOLDER, { recursive: true });

    const definitions = await scrapeSwaggerDefinitions();

    const schema = await getSchema(definitions);
    const client = getClient();
    // Re-export components for import convenience
    const components = getComponents(definitions);
    const wrappers = getWrappers(definitions);

    fs.writeFileSync(
      path.join(SDK_FOLDER, SCHEMA_FILE),
      [WARNING, schema, components].join('\n\n')
    );
    fs.writeFileSync(
      path.join(SDK_FOLDER, SDK_FILE),
      [WARNING, client, wrappers].join('\n\n')
    );

    process.exit();
  } catch (error) {
    fs.rmSync(SDK_FOLDER, { recursive: true });

    throw error;
  }
}
main();

/**
 * Scrapes Swagger definitions from Safe Client Gateway deployment
 * @returns Swagger definitions object
 */
async function scrapeSwaggerDefinitions(): Promise<OpenAPI3> {
  const url = `${SWAGGER_URL}/swagger-ui-init.js`;
  const swaggerUiInit = await fetch(url).then((res) => {
    if (res.ok) {
      return res.text();
    } else {
      throw new Error(`Failed to fetch ${url}`);
    }
  });

  // Extract options object from swagger-ui-init.js file
  const optionsMatch = swaggerUiInit.match(/let options = (\{[\s\S]*?\});/);
  if (!optionsMatch?.[1]) {
    throw new Error('No options object');
  }

  const options = JSON.parse(optionsMatch[1]);
  return options.swaggerDoc;
}

/**
 * Converts Swagger definitions to TypeScript schema
 * @param definitions - Swagger definitions object
 * @returns TypeScript schema
 */
async function getSchema(definitions: OpenAPI3): Promise<string> {
  return openapiTS(definitions).then(astToString);
}

/**
 * Directly exports components of Swagger definitions
 * @param definitions - Swagger definitions object
 * @returns Components of TypeScript schema
 */
function getComponents(definitions: OpenAPI3): string {
  if (!definitions.components || !definitions.components.schemas) {
    throw new Error('Failed to find components.schemas object');
  }

  return Object.keys(definitions.components.schemas)
    .map((key) => {
      return `export type ${key} = components["schemas"]["${key}"];`;
    })
    .join('\n');
}

/**
 * Factory for Safe Client Gateway-typed client and singleton
 * @returns - Typed factory and singleton
 */
function getClient(): string {
  const imports = [
    "import _createClient from 'openapi-fetch';",
    `import type { paths, operations } from './${SCHEMA_FILE}';`,
  ];

  // Typed factory, singleton, singleton getter, singleton URL updater
  const client = [
    'const createClient = _createClient<paths>;',
    `let _client = createClient({
  baseUrl: '${SWAGGER_URL}',
})`,
    `export function getClient() {
  return _client
}`,
    `export function setBaseUrl(baseUrl: string) {
  _client = createClient({ baseUrl });
}`,
  ];

  return [...imports, ...client].join('\n\n');
}

/**
 * Path-specific wrappers for fetching from the Safe Client Gateway
 * @param definitions - Swagger definitions object
 * @returns - Wrapper functions for each path
 */
function getWrappers(definitions: OpenAPI3): string {
  return Object.keys(definitions.paths ?? {})
    .map((path) => {
      const pathItemObject = definitions.paths?.[path];
      if (!pathItemObject) {
        throw new Error('No path(s) in definitions');
      }

      // get, post, put, etc.
      const [fetchMethod] = Object.keys(pathItemObject);
      if (!fetchMethod || !hasKey(pathItemObject, fetchMethod)) {
        throw new Error(`No fetch method for ${path}`);
      }

      const operationObject = pathItemObject[fetchMethod];

      // AboutController_getAbout
      const operationId = operationObject.operationId;
      // ['AboutController, 'getAbout']
      const [controller, _method] = operationId.split('_');

      // Prevent duplicated by appending controller version to method
      const method = (() => {
        const versionMatch = controller.match(/v\d+/i);
        return versionMatch?.[0] ? _method + versionMatch[0] : _method;
      })();

      // Wrapper types
      const parameterTypes = `operations["${operationId}"]["parameters"]`;
      // requestBody only present if sending body is possible
      const bodyTypes = operationObject?.requestBody
        ? `operations["${operationId}"]["requestBody"]['content']['application/json']`
        : undefined;

      // Wrapper args and corresponding for client
      const wrapperArgs = bodyTypes
        ? `params: ${parameterTypes}, body: ${bodyTypes}`
        : `params: ${parameterTypes}`;
      const clientArgs = bodyTypes ? `params, body` : `params`;

      // Wrapper function
      return `export async function ${method}(${wrapperArgs}) {
  return _client.${fetchMethod.toUpperCase()}('${path}', { ${clientArgs} });
}`;
    })
    .filter(Boolean)
    .join('\n\n');
}

/**
 * Type-safe helper to ensure key is present in object
 * @param obj - Object to check keyof
 * @param key - Key to check presence of
 * @returns - True if {@link key} is in {@link obj}
 */
function hasKey<T extends object, K extends PropertyKey>(
  obj: T,
  key: K
): key is K & keyof T {
  return key in obj;
}
