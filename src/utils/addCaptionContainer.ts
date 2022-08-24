import insertNewElement from "./insertNewElement";

export default function addCaptionContainer() {
  const youtubePlayer =
    document.getElementsByClassName("html5-video-player")[0];

  const captionContainer = insertNewElement<"div">({
    parentElement: youtubePlayer,
    id: "ghostity-caption",
    class: "ghostity-caption-unshift",
    prepend: true
  })

  // This is for responsive positioning of captions when the mouse hovers over
  // the YouTube control bar
  const targetNode = document.getElementById("movie_player");

  const callback = function (
    mutationList: MutationRecord[],
    observer: MutationObserver
  ) {
    for (const mutation of mutationList) {
      if (mutation.type === "attributes") {
        if (targetNode && targetNode.classList.contains("ytp-autohide")) {
          captionContainer.className = "ghostity-caption-unshift";
        } else {
          captionContainer.className = "ghostity-caption-shift";
        }
      }
    }
  };

  const observer = new MutationObserver(callback);

  targetNode && observer.observe(targetNode, { attributes: true });

  return captionContainer
}
