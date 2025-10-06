import { type Logger } from "../types.js";
import { Client } from "../api/client.js";

const LOG_CATEGORY = "EvaluationStats";

type RawEvaluationStats = {
  key: string;
  start: number;
  end: number;
  total: number;
  environments: {
    [envId: string]: {
      name: string;
      total: number;
      counts: Array<{
        configValue: {
          string: string;
        };
        count: number;
      }>;
    };
  };
};

export type EvaluationStats = {
  key: string;
  start: number;
  end: number;
  total: number;
  environments: {
    envId: string;
    name: string;
    total: number;
    counts: Array<{
      configValue: {
        string: string;
      };
      count: number;
    }>;
  }[];
};

export const getEvaluationStats = async ({
  client,
  key,
  log,
}: {
  client: Client;
  key: string;
  log: Logger;
}): Promise<EvaluationStats | null> => {
  const request = await client.get(
    `/api/v1/evaluation-stats/${encodeURIComponent(key)}`
  );

  if (request.status !== 200) {
    log(LOG_CATEGORY, `Error: ${request.status} ${request.statusText}`);

    return null;
  }

  const json = (await request.json()) as RawEvaluationStats;

  log(LOG_CATEGORY, { json });

  if (!json.environments) {
    log(LOG_CATEGORY, `No environment evaluations found for ${key}`);
    return null;
  }

  // Sort environments by most to least number of evaluations
  const sortedEnvironments = Object.keys(json.environments)
    .sort((a, b) => json.environments[a].total - json.environments[b].total)
    .reverse();

  return {
    ...json,
    environments: sortedEnvironments.map((envId) => {
      return { ...json.environments[envId], envId };
    }),
  };
};
