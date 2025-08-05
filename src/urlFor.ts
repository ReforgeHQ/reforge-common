import type { Reforge } from "@reforge-com/node";
import { ConfigType, type Config } from "./types.js";

const CONFIG_TYPES = [ConfigType.CONFIG, "CONFIG"];
const FF_CONFIG_TYPES = [ConfigType.FEATURE_FLAG, "FEATURE_FLAG"];

export const urlForKey = (
  reforge: Reforge,
  apiUrl: string | undefined,
  key: string,
) => {
  const config = reforge.raw(key);

  if (!config) {
    return;
  }

  return urlFor(apiUrl, config);
};

export const urlFor = (apiUrl: string | undefined, config: Config) => {
  const key = config.key;
  const projectId = config.projectId;

  const urlBase = apiUrl
    ? apiUrl.replace(/api\./, "app.").replace(/\/$/, "")
    : "https://app.prefab.cloud";

  if (FF_CONFIG_TYPES.includes(config.configType)) {
    return `${urlBase}/account/projects/${projectId}/flags/${key}`;
  }

  if (CONFIG_TYPES.includes(config.configType)) {
    return `${urlBase}/account/projects/${projectId}/configs/${key}`;
  }

  return `${urlBase}/account/projects/${projectId}`;
};
