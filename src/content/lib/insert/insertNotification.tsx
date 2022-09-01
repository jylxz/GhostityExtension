import PausedNotification from "../../components/PausedNotification";
import { SpeechClient } from "content/lib/speech-client";
import insertNewElement from "utils/insertNewElement";
import renderComponent from "utils/renderComponent";

interface NotificationProps {
  restartSpeechRecognition: SpeechClient["restartSpeechRecognition"];
  stopSpeechClient: SpeechClient["stopSpeechClient"];
}

export default function insertNotification(props: NotificationProps) {
  const notification = insertNewElement({
    parentElement: document.getElementById("movie_player") as Element,
    id: "ghostity-notification",
    class: "absolute top-0 right-0 z-20 ytp-popup",
    prepend: true,
    style: { display: "none" },
  });

  renderComponent(
    <PausedNotification
      restartSpeechRecognition={props.restartSpeechRecognition}
      stopSpeechClient={props.stopSpeechClient}
    />,
    notification
  );
}
