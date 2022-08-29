export interface DeepLResponse {
  translations: [
    {
      detected_source_language: string;
      text: string;
    }
  ];
}

export interface DeepLUsageResponse {
  character_count: number;
  character_limit: number;
}

export interface DeepLUsage {
  count: number;
  limit: number;
  percentage: string;
}

export interface DeepLCredentials {
  authorization_key: string;
  plan: "Free" | "Pro";
}

export type DeepLTargetLang = "EN" | "JA";
