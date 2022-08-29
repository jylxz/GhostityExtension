import React, { useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { TbLanguage, TbSettings } from "react-icons/tb";
import { BsTranslate } from "react-icons/bs";
import MenuSource from "./Menu/MenuSource";
import MenuTarget from "./Menu/MenuTarget";
import MenuCaption from "./Menu/MenuCaption";
import useStoredSettings from "../../content/hooks/useExtensionStorage";
import MenuCaptionSpeed from "./Menu/MenuCaptionSpeed";

export default function Menu({
  startSpeechClient,
  stopSpeechClient,
  status,
}: {
  startSpeechClient: (callback?: () => void) => void;
  stopSpeechClient: (callback?: () => void) => void;
  status: () => { SpeechRecognizerStatus: "active" | "inactive" };
}) {
  const [enabled, setEnabled] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("initial");
  const {
    sourceLanguage,
    targetLanguage,
    captionSettings,
    changeSourceLanguage,
    changeTargetLanguage,
    toggleShowTranscribed,
    toggleShowTranslated,
    changeCaptionSpeed,
  } = useStoredSettings();

  function handleMediaStream() {
    const { SpeechRecognizerStatus } = status();

    switch (SpeechRecognizerStatus) {
      case "inactive":
        startSpeechClient(() => {
          setEnabled(true);
        });
        break;
      case "active":
        stopSpeechClient(() => {
          setEnabled(false);
        });
    }
  }

  function changeMenuHeight(height: string) {
    const menu = document.getElementById("ghostity-menu");

    if (menu) {
      menu.style.height = height;
    }
  }

  useEffect(() => {
    if (currentMenu === "initial") {
      changeMenuHeight("17.5rem");
    }
  }, [currentMenu]);

  if (currentMenu === "source") {
    return (
      <MenuSource
        setCurrentMenu={setCurrentMenu}
        changeSourceLanguage={changeSourceLanguage}
      />
    );
  }

  if (currentMenu === "target") {
    return (
      <MenuTarget
        setCurrentMenu={setCurrentMenu}
        changeTargetLanguage={changeTargetLanguage}
      />
    );
  }

  if (currentMenu === "caption") {
    return (
      <MenuCaption
        setCurrentMenu={setCurrentMenu}
        changeMenuHeight={changeMenuHeight}
        captionSettings={captionSettings}
        toggleShowTranscribed={toggleShowTranscribed}
        toggleShowTranslated={toggleShowTranslated}
      />
    );
  }

  if (currentMenu === "caption-speed") {
    return (
      <MenuCaptionSpeed
        captionSpeed={captionSettings?.speed}
        changeCaptionSpeed={changeCaptionSpeed}
        setCurrentMenu={setCurrentMenu}
        changeMenuHeight={changeMenuHeight}
      />
    );
  }

  return (
    <div className="ytp-panel ">
      <div className="ytp-panel-menu">
        <div className="ytp-menuitem" onClick={() => handleMediaStream()}>
          <div className="ytp-menuitem-icon">
            <img
              className="h-8 w-8"
              src={chrome.runtime.getURL("./assets/Ghostity-svg-white.svg")}
            />
          </div>
          <div className="ytp-menuitem-label">Enable</div>
          <div className="ytp-menuitem-content">
            <div className="flex justify-end">
              <div className="relative w-14 h-6">
                <input
                  type="checkbox"
                  className="w-full h-full appearance-none"
                  checked={enabled}
                  readOnly
                />
                <div className="slider"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="ytp-menuitem" onClick={() => setCurrentMenu("source")}>
          <div className="ytp-menuitem-icon">
            <TbLanguage color="white" size={20} strokeWidth="1" />
          </div>
          <div className="ytp-menuitem-label">Source language</div>
          <div className="ytp-menuitem-content">
            <div className="flex items-center gap-1 justify-end">
              <span>{sourceLanguage?.language}</span>
              <BiChevronRight color="white" size={25} />
            </div>
          </div>
        </div>
        <div className="ytp-menuitem" onClick={() => setCurrentMenu("target")}>
          <div className="ytp-menuitem-icon">
            <BsTranslate color="white" size={20} />
          </div>
          <div className="ytp-menuitem-label">Target language</div>
          <div className="ytp-menuitem-content">
            <div className="flex items-center gap-1 justify-end">
              <span>{targetLanguage?.language}</span>
              <BiChevronRight color="white" size={25} />
            </div>
          </div>
        </div>
        <div className="ytp-menuitem" onClick={() => setCurrentMenu("caption")}>
          <div className="ytp-menuitem-icon">
            <TbSettings color="white" size={20} strokeWidth="1" />
          </div>
          <div className="ytp-menuitem-label">Caption settings</div>
          <div className="ytp-menuitem-content">
            <div className="flex items-center justify-end">
              <BiChevronRight color="white" size={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
