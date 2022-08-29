import axios from "axios";
import { DeepLUsage, DeepLUsageResponse } from "./types";

export default async function getUsage(
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
