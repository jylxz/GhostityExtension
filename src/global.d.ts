export {};

declare global {
  declare module "*.svg" {
    const content: any;
    export default content;
  }

  declare module "*.png" {
    export default "" as string;
  }
  interface CommandType {
    command: string;
  }

  interface ResponseType {
    type: string;
  }

  interface ResponseStatus {
    status: "success" | "failed";
  }

  interface SocketCaption {
    videoId: string;
    source: string;
    translated: string;
  }

  interface Caption {
    source?: string;
    translated?: string;
  }

  interface NewCaptionResponse extends ResponseType {
    tabId: number;
    videoId: string;
    caption: Caption;
  }

  interface NewVideoMessage extends ResponseType {
    tabId: number;
  }

  interface GetCaptionSettingsResponse extends ResponseType {
    settings: {
      enabled: boolean;
      showSource: boolean;
    };
  }

  interface CaptionSettingsMessage extends CommandType {
    tabId: number;
  }

  interface EnableCaptionsMessage extends CommandType, CaptionSettingsMessage {
    videoId: string;
  }

  interface DisableCaptionsMessage extends CommandType, CaptionSettingsMessage {
    videoId: string;
  }

  interface TabContext {
    tabId: number;
    settings: {
      enabled: boolean;
      sourceLang: string;
      showSource: boolean;
      captionLang: string
    };
    currentVideoId?: string;
    prevVideoId?: string;
  }
}

