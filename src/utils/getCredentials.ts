import { DeepLCredentials } from "@DeepL/types";
import { AzureCredentials } from "@Azure/types";

export default async function getCredentials() {
  const DeepLCredentials = await chrome.storage.sync
    .get("keys")
    .then((results) => results.keys.deepl as DeepLCredentials);

  const AzureCredentials = await chrome.storage.sync
    .get("keys")
    .then((results) => results.keys.azure as AzureCredentials);

  return { DeepLCredentials, AzureCredentials };
}
