import useStoredKeys, {
  DeepLCredentials,
} from "../../popup/hooks/useStoredKeys";
import React, { useState } from "react";
import { BsChevronDown, BsChevronUp, BsFillKeyFill } from "react-icons/bs";
import { RiKeyFill } from "react-icons/ri";

export default function DeepLChangeKey() {
  const [showChangeInputs, setShowChangeInputs] = useState(false);
  const { DeepLCredentials, changeDeepLCreds, storeKeys } = useStoredKeys();

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
            <h3 className="text-center">Authorization Key</h3>
            <input
              type="text"
              className="w-full text-black px-2 py-0.5 rounded"
              value={DeepLCredentials.authorization_key}
              onChange={(e) =>
                changeDeepLCreds({ authorization_key: e.target.value })
              }
            />
          </div>
          <div>
            <h3 className="text-center">Plan</h3>
            <select
              className="w-full text-black px-2 py-0.5 rounded"
              value={DeepLCredentials.plan}
              onChange={(e) =>
                changeDeepLCreds({
                  plan: e.target.value as DeepLCredentials["plan"],
                })
              }
            >
              <option value="Free">Free</option>
              <option value="Pro">Pro</option>
            </select>
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
