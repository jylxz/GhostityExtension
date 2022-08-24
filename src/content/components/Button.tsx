import React, { useEffect, useState } from "react";

export default function Button() {
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
  }, []);

  return (
    <>
      <div className="flex items-center">
        <img
          className="h-9 w-9"
          src={chrome.runtime.getURL("assets/Ghostity-svg-white.svg")}
        />
      </div>
    </>
  );
}
