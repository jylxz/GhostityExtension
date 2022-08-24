import useStoredKeys from "../../popup/hooks/useStoredKeys";
import React, { useState } from "react";
import { BsChevronDown, BsChevronUp, BsFillKeyFill } from "react-icons/bs";
import { RiKeyFill } from "react-icons/ri";

export default function AzureChangeKey() {
  const [showChangeInputs, setShowChangeInputs] = useState(false);
  const { AzureCredentials, changeAzureCreds, storeKeys } = useStoredKeys();

  function saveKeys() {
    storeKeys();
    setShowChangeInputs(false);
  }

  return (
    <div className="border-t p-2">
      <button
        onClick={() => setShowChangeInputs(!showChangeInputs)}
        className="flex items-center justify-between w-full"
      >
        <div className="flex items-center gap-1">
          <RiKeyFill />
          Change Keys
        </div>
        <div>{showChangeInputs ? <BsChevronUp /> : <BsChevronDown />}</div>
      </button>
      {showChangeInputs && (
        <div className="mt-2 flex flex-col gap-3">
          <div>
            <h3 className="text-center">Subscription Key</h3>
            <input
              type="text"
              className="w-full text-black px-2 py-0.5 rounded"
              value={AzureCredentials.subscription_key}
              onChange={(e) =>
                changeAzureCreds({ subscription_key: e.target.value })
              }
            />
          </div>
          <div>
            <h3 className="text-center">Service Region</h3>
            <input
              type="text"
              className="w-full text-black px-2 py-0.5 rounded"
              value={AzureCredentials.service_region}
              onChange={(e) =>
                changeAzureCreds({ service_region: e.target.value })
              }
            />
          </div>
          <button
            onClick={() => saveKeys()}
            className="bg-white px-4 py-0.5 rounded mt-1.5 hover:bg-gray-200"
          >
            Change
          </button>
        </div>
      )}
    </div>
  );
}
