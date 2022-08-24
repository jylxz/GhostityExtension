import useStoredKeys, {
  DeepLCredentials,
} from "../../popup/hooks/useStoredKeys";
import React, { useState } from "react";

export default function PopupInitialSetup({
  setShowInitialSetup,
}: {
  setShowInitialSetup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    AzureCredentials,
    DeepLCredentials,
    changeAzureCreds,
    changeDeepLCreds,
    storeKeys,
  } = useStoredKeys();

  function saveKeys() {
    storeKeys();
    setShowInitialSetup(true);
  }

  return (
    <div className="text-center flex flex-col gap-2">
      <h1 className="text-xl">Initial Setup</h1>
      <div>
        <div className="flex items-center">
          <div className="mx-0.5">
            <span className="bg-[#deecfc] px-2 py-1 rounded-full">1</span>
          </div>
          <p>
            Read and follow the setup instructions{" "}
            <a
              href="https://www.github.com"
              target="_blank"
              className="underline font-semibold"
            >
              here
            </a>
            !
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center">
          <div className="mx-0.5">
            <span className="bg-[#deecfc] px-2 py-1 rounded-full">2</span>
          </div>
          <p className="text-center flex-1">Enter API Keys and press "Save"</p>
        </div>
        <div className="bg-gray-100 rounded pb-2">
          <div className="bg-white rounded-t border border-gray-100">
            <img
              src={chrome.runtime.getURL("./assets/microsoft-azure.png")}
              className="h-12 mx-auto"
            />
          </div>
          <div className="my-2 px-2">
            <h3>Subscription Key</h3>
            <input
              type="text"
              className="w-full text-black px-2 py-0.5 rounded"
              value={AzureCredentials.subscription_key}
              onChange={(e) =>
                changeAzureCreds({ subscription_key: e.target.value })
              }
            />
          </div>
          <div className="my-2 px-2">
            <h3>Service Region</h3>
            <input
              type="text"
              className="w-full text-black px-2 py-0.5 rounded"
              value={AzureCredentials.service_region}
              onChange={(e) =>
                changeAzureCreds({ service_region: e.target.value })
              }
            />
          </div>
        </div>
        <div className="bg-gray-100 rounded pb-2">
          <div className="bg-[#0f2b46] rounded-t">
            <img
              src={chrome.runtime.getURL("./assets/DeepL_Logo.png")}
              className="h-12 mx-auto"
            />
          </div>
          <div className="my-2 px-2">
            <h3>Plan</h3>
            <select
              value={DeepLCredentials.plan}
              onChange={(e) =>
                changeDeepLCreds({
                  plan: e.target.value as DeepLCredentials["plan"],
                })
              }
              className="w-full text-black px-2 py-0.5 rounded"
            >
              <option value="Free">Free</option>
              <option value="Pro">Pro</option>
            </select>
          </div>
          <div className="my-2 px-2">
            <h3>Authorization Key</h3>
            <input
              type="text"
              className="w-full text-black px-2 py-0.5 rounded"
              value={DeepLCredentials.authorization_key}
              onChange={(e) =>
                changeDeepLCreds({ authorization_key: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={() => saveKeys()}
          className="bg-[#deecfc] px-4 py-1 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
