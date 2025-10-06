import { Client } from "./client.js";
import { type Logger } from "../types.js";

export type Environment = {
  id: string;
  name: string;
};

export const getEnvironmentsFromApi = async ({
  client,
  log,
}: {
  client: Client;
  log: Logger;
}): Promise<Environment[]> => {
  const requestPath = "/api/v1/project-environments";

  const response = await client.get(requestPath);

  if (response.status !== 200) {
    log("ReforgeClient", {
      message: "Error fetching environments",
      response,
    });

    return [];
  }

  return (await response.json()).envs
    .sort((a: Environment, b: Environment) => {
      a.name < b.name ? -1 : 1;
    })
    .map((env: Environment) => {
      return {
        id: env.id.toString(),
        name: env.name,
      };
    });
};
