import * as fs from 'node:fs';
import * as path from 'node:path';
import openapiTS, { astToString } from 'openapi-typescript';

const SWAGGER_URL = 'https://safe-client.staging.5afe.dev/api';

const SDK_FOLDER = path.join(process.cwd(), 'sdk');
const SCHEMA_FILE = 'schema.d.ts';
const CLIENT_FILE = 'client.ts';

const WARNING = `/**
 * This file was auto-generated. Do not make direct changes.
 */`;

/**
 * Main function to generate TypeScript SDK for Safe Client Gateway.
 */
async function main() {
  try {
    fs.mkdirSync(SDK_FOLDER, { recursive: true });

    const definitions = await scrapeSwaggerDefinitions();
    await generateSchema(definitions);
    generateClient();

    process.exit();
  } catch (error) {
    fs.rmSync(SDK_FOLDER, { recursive: true });
    throw error;
  }
}
main();

/**
 * Scrapes Swagger definitions from the Swagger UI page.
 * @returns Swagger definitions object
 */
async function scrapeSwaggerDefinitions() {
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
  if (!optionsMatch || !optionsMatch[1]) {
    throw new Error('Failed to find options object');
  }

  const options = JSON.parse(optionsMatch[1]);
  return options.swaggerDoc;
}

/**
 * Generates/writes Swagger schema to a file.
 * @param definitions Swagger definitions object
 */
async function generateSchema(definitions: any) {
  const schema = await openapiTS(definitions).then(astToString);

  const components = Object.keys(definitions.components.schemas)
    .map((key) => {
      return `export type ${key} = components["schemas"]["${key}"];`;
    })
    .join('\n');

  const data = [
    WARNING,
    schema,
    `/**
 * Re-export components for import convenience.
 */`,
    components,
  ].join('\n');

  const file = path.join(SDK_FOLDER, SCHEMA_FILE);
  fs.writeFileSync(file, data);
}

/**
 * Generates/writes typed client factory to a file.
 */
function generateClient() {
  const imports = [
    "import _createClient from 'openapi-fetch';",
    `import type { paths } from './${SCHEMA_FILE}';`,
  ];
  const client = `export const createClient = _createClient<paths>`;

  const data = [WARNING, ...imports, client].join('\n\n');

  const file = path.join(SDK_FOLDER, CLIENT_FILE);
  fs.writeFileSync(file, data);
}
