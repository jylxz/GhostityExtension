import Menu from "../../components/Menu";
import { SpeechClient } from "content/lib/speech-client";
import insertNewElement from "utils/insertNewElement";
import renderComponent from "utils/renderComponent";

interface MenuProps {
  status: SpeechClient["status"];
  startSpeechClient: SpeechClient["startSpeechClient"]
  stopSpeechClient: SpeechClient["stopSpeechClient"]
}

export default function insertMenu(props: MenuProps) {
  const ghostityButton = document.getElementById("ghostity");

  const menuRoot = insertNewElement({
    parentElement: document.getElementById("movie_player") as Element,
    id: "ghostity-menu",
    class: "relative z-10 w-[26.5rem]  ytp-popup ytp-settings-menu",
  });

  menuRoot.style.display = "none";
  menuRoot.style.left = ghostityButton
    ? `${ghostityButton.offsetLeft - 12}px`
    : "initial";

  renderComponent(
    <Menu
      status={props.status}
      startSpeechClient={props.startSpeechClient}
      stopSpeechClient={props.stopSpeechClient}
    />,
    menuRoot
  );

  ghostityButton?.addEventListener("click", () => {
    const captionsMenu = document.getElementById("ghostity-menu");
    const ghostityButton = document.getElementById("ghostity");

    if (captionsMenu) {
      if (captionsMenu.style.display === "none") {
        captionsMenu.style.left = ghostityButton
          ? `${ghostityButton.offsetLeft - 12}px`
          : "";
        captionsMenu.style.display = "unset";
      } else {
        captionsMenu.style.display = "none";
      }
    }
  });

  // Autohide Settings Menu with Youtube player
  const targetNode = document.getElementById("movie_player");

  const callback = function (
    mutationList: MutationRecord[],
    observer: MutationObserver
  ) {
    for (const mutation of mutationList) {
      const captionMenu = document.getElementById("ghostity-menu");

      if (mutation.type === "attributes" && captionMenu) {
        if (targetNode && targetNode.classList.contains("ytp-autohide")) {
          captionMenu.style.display = "none";
        }
      }
    }
  };

  const observer = new MutationObserver(callback);

  targetNode && observer.observe(targetNode, { attributes: true });
}