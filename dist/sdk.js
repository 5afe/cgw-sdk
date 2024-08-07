/**
 * This file was auto-generated. Do not make direct changes.
 */
import _createClient from "openapi-fetch";
const createClient = _createClient;
let _client = createClient({
  baseUrl: "https://safe-client.safe.global/api",
});
export function getClient() {
  return _client;
}
export function setBaseUrl(baseUrl) {
  _client = createClient({ baseUrl });
}
export async function getAbout(params) {
  return _client.GET("/about", { params });
}
export async function createAccount(params, body) {
  return _client.POST("/v1/accounts", { params, body });
}
export async function getDataTypes(params) {
  return _client.GET("/v1/accounts/data-types", { params });
}
export async function getAccountDataSettings(params) {
  return _client.GET("/v1/accounts/{address}/data-settings", { params });
}
export async function getAccount(params) {
  return _client.GET("/v1/accounts/{address}", { params });
}
export async function getCounterfactualSafe(params) {
  return _client.GET(
    "/v1/accounts/{address}/counterfactual-safes/{chainId}/{predictedAddress}",
    { params },
  );
}
export async function getCounterfactualSafes(params) {
  return _client.GET("/v1/accounts/{address}/counterfactual-safes", { params });
}
export async function getBalances(params) {
  return _client.GET(
    "/v1/chains/{chainId}/safes/{safeAddress}/balances/{fiatCode}",
    { params },
  );
}
export async function getSupportedFiatCodes(params) {
  return _client.GET("/v1/balances/supported-fiat-codes", { params });
}
export async function getChains(params) {
  return _client.GET("/v1/chains", { params });
}
export async function getChain(params) {
  return _client.GET("/v1/chains/{chainId}", { params });
}
export async function getAboutChain(params) {
  return _client.GET("/v1/chains/{chainId}/about", { params });
}
export async function getBackbone(params) {
  return _client.GET("/v1/chains/{chainId}/about/backbone", { params });
}
export async function getMasterCopies(params) {
  return _client.GET("/v1/chains/{chainId}/about/master-copies", { params });
}
export async function getCollectibles(params) {
  return _client.GET("/v2/chains/{chainId}/safes/{safeAddress}/collectibles", {
    params,
  });
}
export async function getCampaigns(params) {
  return _client.GET("/v1/community/campaigns", { params });
}
export async function getCampaignById(params) {
  return _client.GET("/v1/community/campaigns/{resourceId}", { params });
}
export async function getCampaignActivities(params) {
  return _client.GET("/v1/community/campaigns/{resourceId}/activities", {
    params,
  });
}
export async function getCampaignLeaderboard(params) {
  return _client.GET("/v1/community/campaigns/{resourceId}/leaderboard", {
    params,
  });
}
export async function getCampaignRank(params) {
  return _client.GET(
    "/v1/community/campaigns/{resourceId}/leaderboard/{safeAddress}",
    { params },
  );
}
export async function getLeaderboard(params) {
  return _client.GET("/v1/community/locking/leaderboard", { params });
}
export async function getLockingRank(params) {
  return _client.GET("/v1/community/locking/{safeAddress}/rank", { params });
}
export async function getLockingHistory(params) {
  return _client.GET("/v1/community/locking/{safeAddress}/history", { params });
}
export async function getContract(params) {
  return _client.GET("/v1/chains/{chainId}/contracts/{contractAddress}", {
    params,
  });
}
export async function getDataDecoded(params, body) {
  return _client.POST("/v1/chains/{chainId}/data-decoder", { params, body });
}
export async function getDelegates(params) {
  return _client.GET("/v1/chains/{chainId}/delegates", { params });
}
export async function deleteDelegate(params, body) {
  return _client.DELETE("/v1/chains/{chainId}/delegates/{delegateAddress}", {
    params,
    body,
  });
}
export async function deleteSafeDelegate(params, body) {
  return _client.DELETE(
    "/v1/chains/{chainId}/safes/{safeAddress}/delegates/{delegateAddress}",
    { params, body },
  );
}
export async function getDelegatesV2(params) {
  return _client.GET("/v2/chains/{chainId}/delegates", { params });
}
export async function deleteDelegateV2(params, body) {
  return _client.DELETE("/v2/chains/{chainId}/delegates/{delegateAddress}", {
    params,
    body,
  });
}
export async function addRecoveryModule(params, body) {
  return _client.POST("/v1/chains/{chainId}/safes/{safeAddress}/recovery", {
    params,
    body,
  });
}
export async function deleteRecoveryModule(params) {
  return _client.DELETE(
    "/v1/chains/{chainId}/safes/{safeAddress}/recovery/{moduleAddress}",
    { params },
  );
}
export async function getEstimation(params, body) {
  return _client.POST(
    "/v2/chains/{chainId}/safes/{address}/multisig-transactions/estimations",
    { params, body },
  );
}
export async function getMessageByHash(params) {
  return _client.GET("/v1/chains/{chainId}/messages/{messageHash}", { params });
}
export async function getMessagesBySafe(params) {
  return _client.GET("/v1/chains/{chainId}/safes/{safeAddress}/messages", {
    params,
  });
}
export async function updateMessageSignature(params, body) {
  return _client.POST(
    "/v1/chains/{chainId}/messages/{messageHash}/signatures",
    { params, body },
  );
}
export async function registerDevice(params, body) {
  return _client.POST("/v1/register/notifications", { params, body });
}
export async function unregisterDevice(params) {
  return _client.DELETE("/v1/chains/{chainId}/notifications/devices/{uuid}", {
    params,
  });
}
export async function unregisterSafe(params) {
  return _client.DELETE(
    "/v1/chains/{chainId}/notifications/devices/{uuid}/safes/{safeAddress}",
    { params },
  );
}
export async function getSafesByOwner(params) {
  return _client.GET("/v1/chains/{chainId}/owners/{ownerAddress}/safes", {
    params,
  });
}
export async function getAllSafesByOwner(params) {
  return _client.GET("/v1/owners/{ownerAddress}/safes", { params });
}
export async function relay(params, body) {
  return _client.POST("/v1/chains/{chainId}/relay", { params, body });
}
export async function getRelaysRemaining(params) {
  return _client.GET("/v1/chains/{chainId}/relay/{safeAddress}", { params });
}
export async function getSafeApps(params) {
  return _client.GET("/v1/chains/{chainId}/safe-apps", { params });
}
export async function getSafe(params) {
  return _client.GET("/v1/chains/{chainId}/safes/{safeAddress}", { params });
}
export async function getNonces(params) {
  return _client.GET("/v1/chains/{chainId}/safes/{safeAddress}/nonces", {
    params,
  });
}
export async function getSafeOverview(params) {
  return _client.GET("/v1/safes", { params });
}
export async function getTransactionById(params) {
  return _client.GET("/v1/chains/{chainId}/transactions/{id}", { params });
}
export async function getMultisigTransactions(params) {
  return _client.GET(
    "/v1/chains/{chainId}/safes/{safeAddress}/multisig-transactions",
    { params },
  );
}
export async function deleteTransaction(params, body) {
  return _client.DELETE("/v1/chains/{chainId}/transactions/{safeTxHash}", {
    params,
    body,
  });
}
export async function getModuleTransactions(params) {
  return _client.GET(
    "/v1/chains/{chainId}/safes/{safeAddress}/module-transactions",
    { params },
  );
}
export async function addConfirmation(params, body) {
  return _client.POST(
    "/v1/chains/{chainId}/transactions/{safeTxHash}/confirmations",
    { params, body },
  );
}
export async function getIncomingTransfers(params) {
  return _client.GET(
    "/v1/chains/{chainId}/safes/{safeAddress}/incoming-transfers",
    { params },
  );
}
export async function previewTransaction(params, body) {
  return _client.POST(
    "/v1/chains/{chainId}/transactions/{safeAddress}/preview",
    { params, body },
  );
}
export async function getTransactionQueue(params) {
  return _client.GET(
    "/v1/chains/{chainId}/safes/{safeAddress}/transactions/queued",
    { params },
  );
}
export async function getTransactionsHistory(params) {
  return _client.GET(
    "/v1/chains/{chainId}/safes/{safeAddress}/transactions/history",
    { params },
  );
}
export async function proposeTransaction(params, body) {
  return _client.POST(
    "/v1/chains/{chainId}/transactions/{safeAddress}/propose",
    { params, body },
  );
}
export async function getTransactionConfirmationView(params, body) {
  return _client.POST(
    "/v1/chains/{chainId}/safes/{safeAddress}/views/transaction-confirmation",
    { params, body },
  );
}
//# sourceMappingURL=sdk.js.map
