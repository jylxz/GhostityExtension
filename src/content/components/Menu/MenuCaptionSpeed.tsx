import React from "react";
import { useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";

export default function MenuCaptionSpeed({
  setCurrentMenu,
  captionSpeed,
  changeCaptionSpeed,
  changeMenuHeight,
}: {
  setCurrentMenu: React.Dispatch<React.SetStateAction<string>>;
  captionSpeed: number | undefined;
  changeCaptionSpeed: (speed: number) => void;
  changeMenuHeight: (height: string) => void;
}) {
  function handleChangeSpeed(speed: number) {
    changeCaptionSpeed(speed);
    setCurrentMenu("caption");
  }

  useEffect(() => {
    changeMenuHeight("27.5rem");
  }, []);

  return (
    <div className="ytp-panel w-full h-full">
      <div className="ytp-panel-header">
        <div className="ytp-panel-back-button-container">
          <button
            className="ytp-button ytp-panel-back-button"
            onClick={() => setCurrentMenu("caption")}
          ></button>
        </div>
        <span className="ytp-panel-title">Caption speed</span>
      </div>
      <div className="ytp-panel-menu">
        <div className="ytp-menuitem" onClick={() => handleChangeSpeed(0.5)}>
          <div className="ytp-menuitem-label !pl-14">
            {captionSpeed === 0.5 && (
              <AiOutlineCheck
                color="white"
                size={14}
                className="absolute left-4"
              />
            )}
            0.5
          </div>
        </div>
        <div className="ytp-menuitem" onClick={() => handleChangeSpeed(0.75)}>
          <div className="ytp-menuitem-label !pl-14">
            {captionSpeed === 0.75 && (
              <AiOutlineCheck
                color="white"
                size={14}
                className="absolute left-4"
              />
            )}
            0.75
          </div>
        </div>
        <div className="ytp-menuitem" onClick={() => handleChangeSpeed(1)}>
          <div className="ytp-menuitem-label !pl-14">
            {captionSpeed === 1 && (
              <AiOutlineCheck
                color="white"
                size={14}
                className="absolute left-4"
              />
            )}
            Normal
          </div>
        </div>
        <div className="ytp-menuitem" onClick={() => handleChangeSpeed(1.5)}>
          <div className="ytp-menuitem-label !pl-14">
            {captionSpeed === 1.5 && (
              <AiOutlineCheck
                color="white"
                size={14}
                className="absolute left-4"
              />
            )}
            1.5
          </div>
        </div>
        <div className="ytp-menuitem" onClick={() => handleChangeSpeed(2)}>
          <div className="ytp-menuitem-label !pl-14">
            {captionSpeed === 2 && (
              <AiOutlineCheck
                color="white"
                size={14}
                className="absolute left-4"
              />
            )}
            2
          </div>
        </div>
      </div>
    </div>
  );
}
