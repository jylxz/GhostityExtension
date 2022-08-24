import React from "react";

export default function Caption({
  captions,
  settings,
}: {
  captions: { transcribed: string; translated: string };
  settings: {
    showTranscribed: boolean;
    showTranslated: boolean;
    fontSize: number;
  };
}) {
  const { showTranscribed, showTranslated, fontSize } = settings;
  const { transcribed, translated } = captions;

  return (
    <div
      className={`text-[2rem] text-white bg-[#1b1b1be3] rounded p-2 mb-2`}
    >
      {showTranscribed && <div>{transcribed}</div>}
      {showTranslated && <div>{translated}</div>}
    </div>
  );
}
