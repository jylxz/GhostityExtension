import React, { useEffect, useState } from "react";

export interface AzureCredentials {
  subscription_key: string;
  service_region: string;
}

export interface DeepLCredentials {
  authorization_key: string;
  plan: "Free" | "Pro";
}

type ChangeAzureCredentials = {
  [key in keyof AzureCredentials]?: AzureCredentials[key];
};

type ChangeDeepLCredentials = {
  [key in keyof DeepLCredentials]?: DeepLCredentials[key]
}

export default function useStoredKeys() {
  const [DeepLCredentials, setDeepLCredentials] = useState<DeepLCredentials>({
    authorization_key: "",
    plan: "Free",
  });
  const [AzureCredentials, setAzureCredentials] = useState<AzureCredentials>({
    subscription_key: "",
    service_region: "",
  });

  function changeAzureCreds(changes: ChangeAzureCredentials, storeAfterChanges = false) {
    setAzureCredentials({
      ...AzureCredentials,
      ...changes
    })

    if (storeAfterChanges) {
      storeKeys()
    }
  }

  function changeDeepLCreds(changes: ChangeDeepLCredentials, storeAfterChanges = false) {
    setDeepLCredentials({
      ...DeepLCredentials,
      ...changes
    })

    if (storeAfterChanges) {
      storeKeys();
    }
  }

  function storeKeys () {
    chrome.storage.sync.set({
      keys: {
        azure: {
          ...AzureCredentials,
        },
        deepl: {
          ...DeepLCredentials,
        },
      },
    });
  }

  useEffect(() => {
    chrome.storage.sync.get("keys", (results) => {
      setDeepLCredentials({ ...results.keys.deepl });
      setAzureCredentials({ ...results.keys.azure });
    });
  }, []);

  return { DeepLCredentials, AzureCredentials, changeAzureCreds, changeDeepLCreds, storeKeys };
}
