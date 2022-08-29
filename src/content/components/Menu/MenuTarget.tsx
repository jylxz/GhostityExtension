import { DeepLTargetLang } from "@DeepL/types";
import React from "react";

export default function MenuSource({
  setCurrentMenu,
  changeTargetLanguage,
}: {
  setCurrentMenu: React.Dispatch<React.SetStateAction<string>>;
  changeTargetLanguage: (language: string, code: DeepLTargetLang) => void;
}) {
  function handleTargetChange(language: string, code: DeepLTargetLang) {
    changeTargetLanguage(language, code);
    setCurrentMenu("initial");
  }

  return (
    <div className="ytp-panel w-full h-full">
      <div className="ytp-panel-header">
        <div className="ytp-panel-back-button-container">
          <button
            className="ytp-button ytp-panel-back-button"
            onClick={() => setCurrentMenu("initial")}
          ></button>
        </div>
        <span className="ytp-panel-title">Target Language</span>
      </div>
      <div className="ytp-panel-menu">
        <div
          className="ytp-menuitem"
          onClick={() => handleTargetChange("English", "EN")}
        >
          <div className="ytp-menuitem-label !pl-12">English</div>
        </div>
        <div
          className="ytp-menuitem"
          onClick={() => handleTargetChange("Japanese", "JA")}
        >
          <div className="ytp-menuitem-label !pl-12">Japanese</div>
        </div>
      </div>
    </div>
  );
}
