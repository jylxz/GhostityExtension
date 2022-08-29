import React, { useEffect } from "react";
import { BiChevronRight } from "react-icons/bi";

export default function MenuCaption({
  setCurrentMenu,
  captionSettings,
  toggleShowTranscribed,
  toggleShowTranslated,
  changeMenuHeight
}: {
  setCurrentMenu: React.Dispatch<React.SetStateAction<string>>;
  captionSettings:
    | {
        showTranscribed: boolean;
        showTranslated: boolean;
        speed: number;
      }
    | undefined;
  toggleShowTranscribed: () => void;
  toggleShowTranslated: () => void;
  changeMenuHeight: (height: string) => void;
}) {

  useEffect(() => {
    changeMenuHeight("19.5rem");
  }, []);

  return (
    <div className="ytp-panel w-full h-full">
      <div className="ytp-panel-header">
        <div className="ytp-panel-back-button-container">
          <button
            className="ytp-button ytp-panel-back-button"
            onClick={() => setCurrentMenu("initial")}
          ></button>
        </div>
        <span className="ytp-panel-title">Caption settings</span>
      </div>
      <div className="ytp-panel-menu">
        <div className="ytp-menuitem" onClick={() => toggleShowTranscribed()}>
          <div className="ytp-menuitem-label !pl-[15px]">Show transcribed</div>
          <div className="ytp-menuitem-content">
            <div className="flex justify-end">
              <div className="relative w-14 h-6">
                <input
                  type="checkbox"
                  className="w-full h-full appearance-none"
                  checked={captionSettings?.showTranscribed}
                />
                <div className="slider"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="ytp-menuitem" onClick={() => toggleShowTranslated()}>
          <div className="ytp-menuitem-label !pl-[15px]">Show translated</div>
          <div className="ytp-menuitem-content">
            <div className="flex justify-end">
              <div className="relative w-14 h-6">
                <input
                  type="checkbox"
                  className="w-full h-full appearance-none"
                  checked={captionSettings?.showTranslated}
                />
                <div className="slider"></div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="ytp-menuitem"
          onClick={() => setCurrentMenu("caption-speed")}
        >
          <div className="ytp-menuitem-label !pl-[15px]">Caption speed</div>
          <div className="ytp-menuitem-content">
            <div className="flex items-center gap-1 justify-end">
              <span>{captionSettings?.speed === 1 ? "Normal" : captionSettings?.speed}</span>
              <BiChevronRight color="white" size={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
