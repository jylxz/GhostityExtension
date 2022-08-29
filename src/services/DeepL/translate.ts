import axios from "axios";
import { DeepLCredentials, DeepLResponse, DeepLTargetLang } from "./types";

export default async function translate(
  credentials: DeepLCredentials,
  text: string,
  targetLang: DeepLTargetLang
) {
  if (credentials.plan === "Free") {
    return axios
      .get<DeepLResponse>(
        `https://api-free.deepl.com/v2/translate?auth_key=${credentials.authorization_key}&text=${text}&target_lang=${targetLang}`
      )
      .then((res) => res.data.translations[0].text);
  }

  return axios
    .get<DeepLResponse>(
      `https://api.deepl.com/v2/translate?auth_key=${credentials.authorization_key}&text=${text}&target_lang=${targetLang}`
    )
    .then((res) => res.data.translations[0].text);
}
