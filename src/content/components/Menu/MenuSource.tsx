import { SpeechRecognitionLanguages } from "@Azure/types";
import React from "react";

export default function MenuSource({
  setCurrentMenu,
  changeSourceLanguage,
}: {
  setCurrentMenu: React.Dispatch<React.SetStateAction<string>>;
  changeSourceLanguage: (
    language: string,
    code: SpeechRecognitionLanguages
  ) => void;
  
}) {
  function handleSourceChange(
    language: string,
    code: SpeechRecognitionLanguages
  ) {
    changeSourceLanguage(language, code);
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
        <span className="ytp-panel-title">Source Language</span>
      </div>
      <div className="ytp-panel-menu">
        <div
          className="ytp-menuitem"
          onClick={() => handleSourceChange("Japanese", "ja-JP")}
        >
          <div className="ytp-menuitem-label !pl-12">Japanese</div>
        </div>
        <div
          className="ytp-menuitem"
          onClick={() => handleSourceChange("English", "en-US")}
        >
          <div className="ytp-menuitem-label !pl-12">English</div>
        </div>
      </div>
    </div>
  );
}
