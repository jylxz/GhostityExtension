import axios from "axios";

interface DeepLResponse {
  translations: [
    {
      detected_source_language: string;
      text: string;
    }
  ];
}

interface DeepLUsageResponse {
  character_count: number;
  character_limit: number;
}

export interface DeepLUsage {
  count: number;
  limit: number;
  percentage: string;
}

export interface DeepLCredentials {
  authorizationKey: string;
  plan: "Free" | "Pro";
}

export async function translate(
  credentials: DeepLCredentials,
  text: string,
  targetLang: string
) {
  if (credentials.plan === "Free") {
    return axios
      .get<DeepLResponse>(
        `https://api-free.deepl.com/v2/translate?auth_key=${credentials.authorizationKey}&text=${text}&target_lang=${targetLang}`
      )
      .then((res) => res.data.translations[0].text);
  }

  return axios
    .get<DeepLResponse>(
      `https://api.deepl.com/v2/translate?auth_key=${credentials.authorizationKey}&text=${text}&target_lang=${targetLang}`
    )
    .then((res) => res.data.translations[0].text);
}

export async function getUsage(
  authKey: string,
  plan: "Free" | "Pro"
): Promise<DeepLUsage> {
  if (plan === "Free") {
    return axios
      .get<DeepLUsageResponse>(
        `https:///api-free.deepl.com/v2/usage?auth_key=${authKey}`
      )
      .then((res) => {
        return {
          count: res.data.character_count,
          limit: res.data.character_limit,
          percentage: (
            (res.data.character_count / res.data.character_limit) *
            100
          ).toPrecision(2),
        };
      });
  }

  return axios
    .get<DeepLUsageResponse>(
      `https:///api.deepl.com/v2/usage?auth_key=${authKey}`
    )
    .then((res) => {
      return {
        count: res.data.character_count,
        limit: res.data.character_limit,
        percentage: (
          (res.data.character_count / res.data.character_limit) *
          100
        ).toPrecision(2),
      };
    });
}
