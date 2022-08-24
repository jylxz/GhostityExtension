import useMediaStream from "../../content/hook/useMediaStream";
import React, { useEffect, useState } from "react";
import useSpeechClient from "../../content/hook/useSpeechClient";
import { BiChevronRight } from "react-icons/bi";
import { TbLanguage, TbSettings } from "react-icons/tb";
import { MdOutlineSubtitles } from "react-icons/md";
import { BsTranslate } from "react-icons/bs";

export default function Menu() {
  const { MediaStream, SpeechRecognizer, startSpeechClient, stopSpeechClient } =
    useSpeechClient();

  function handleMediaStream() {
    if (!MediaStream) {
      startSpeechClient();
    } else {
      stopSpeechClient();
    }
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
                  checked={!!MediaStream}
                />
                <div className="slider"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="ytp-menuitem">
          <div className="ytp-menuitem-icon">
            <TbLanguage color="white" size={20} strokeWidth="1" />
          </div>
          <div className="ytp-menuitem-label">Source language</div>
          <div className="ytp-menuitem-content">
            <div className="flex items-center gap-1 justify-end">
              <span>Japanese</span>
              <BiChevronRight color="white" size={25} />
            </div>
          </div>
        </div>
        <div className="ytp-menuitem">
          <div className="ytp-menuitem-icon">
            <BsTranslate color="white" size={20} />
          </div>
          <div className="ytp-menuitem-label">Target language</div>
          <div className="ytp-menuitem-content">
            <div className="flex items-center gap-1 justify-end">
              <span>English</span>
              <BiChevronRight color="white" size={25} />
            </div>
          </div>
        </div>
        <div className="ytp-menuitem">
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
