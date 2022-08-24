import axios from "axios";
import React, { useEffect, useState } from "react";
import { getMetricForData } from "../../services/Azure/Monitor";
import { getUsage, DeepLUsage } from "../../services/DeepL";
import AzureChangeKey from "./AzureChangeKey";
import DeepLChangeKey from "./DeepLChangeKey";

export default function PopupUsage() {
  const [deepUsage, setDeepUsage] = useState<DeepLUsage>();

  useEffect(() => {
    chrome.storage.sync.get("keys", (results) => {
      const deepLPlan = results.keys.deepl.plan;
      const deepLKey = results.keys.deepl.authorization_key;

      getUsage(deepLKey, deepLPlan).then((usage) => setDeepUsage(usage));
    });
  }, []);

  return (
    <div className="flex flex-col gap-3 my-1">
      <h1 className="text-lg text-center">Current Month Usage</h1>
      <div className="bg-gray-100 rounded">
        <div className="bg-white rounded-t border border-gray-100">
          <img
            src={chrome.runtime.getURL("./assets/microsoft-azure.png")}
            className="h-12 mx-auto"
          />
        </div>
        <div className="p-2">
          <a href="https://www.portal.azure.com" target="_blank">
            <button>Click Here</button>
          </a>
        </div>
        <AzureChangeKey />
      </div>
      <div className="bg-gray-100 rounded">
        <div className="bg-[#0f2b46] rounded-t">
          <img
            src={chrome.runtime.getURL("./assets/DeepL_Logo.png")}
            className="h-12 mx-auto"
          />
        </div>
        <div className="p-2 flex flex-col gap-2">
          <div>
            <h2>Total</h2>
            {deepUsage?.count} / {deepUsage?.limit} Characters
          </div>
          <div>
            <h2>Percentage</h2>
            <div className="flex justify-between items-center gap-2">
              <progress
                value={deepUsage?.count}
                max={deepUsage?.limit}
                className=" flex-1 accent-white"
              ></progress>
              {deepUsage?.percentage} %
            </div>
          </div>
        </div>
        <DeepLChangeKey />
      </div>
    </div>
  );
}
