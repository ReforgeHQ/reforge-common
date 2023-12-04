import { Client } from "./client.js";
import type { Logger, Config } from "../types.js";

export const getConfigFromApi = async ({
  client,
  errorLog,
  key,
}: {
  client: Client;
  errorLog: Logger;
  key: string;
}): Promise<Config | undefined> => {
  const requestPath = `/api/v1/config/key/${encodeURIComponent(key)}`;

  const response = await client.get(requestPath);

  if (response.status !== 200) {
    const text = response.text();
    const statusText = response.statusText;

    errorLog("PrefabClient", {
      message: "Error fetching config",
      response,
      text,
      statusText,
    });

    return;
  }

  return await response.json();
};
