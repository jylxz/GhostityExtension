import "@fontsource/quicksand/300.css";
import "@fontsource/quicksand/400.css";
import "@fontsource/quicksand/500.css";
import "@fontsource/quicksand/600.css";
import "@fontsource/quicksand/700.css";

import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import PopupInitialSetup from "./components/PopupInitialSetup";
import PopupUsage from "./components/PopupUsage";
import PopupBar from "./components/PopupBar";

function Popup() {
  const [showInitialSetup, setShowInitialSetup] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get("keys", (results) => {
      if (!results.keys) {
        setShowInitialSetup(true);
      }
    });
  }, []);

  return (
    <>
      <PopupBar />
      <div className="w-full px-3 py-2">
        {showInitialSetup ? (
          <PopupInitialSetup setShowInitialSetup={setShowInitialSetup} />
        ) : (
          <PopupUsage />
        )}
      </div>
    </>
  );
}

const root = createRoot(document.getElementById("react-root") as HTMLElement);

root.render(<Popup />);
