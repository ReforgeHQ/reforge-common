import type { Reforge } from "@reforge-com/node";

import { type Config, ConfigType } from "./types.js";

const CONFIG_TYPES = new Set([ConfigType.Config, "CONFIG"]);
const FF_CONFIG_TYPES = new Set([ConfigType.FeatureFlag, "FEATURE_FLAG"]);

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

  if (FF_CONFIG_TYPES.has(config.configType)) {
    return `${urlBase}/account/projects/${projectId}/flags/${key}`;
  }

  if (CONFIG_TYPES.has(config.configType)) {
    return `${urlBase}/account/projects/${projectId}/configs/${key}`;
  }

  return `${urlBase}/account/projects/${projectId}`;
};
