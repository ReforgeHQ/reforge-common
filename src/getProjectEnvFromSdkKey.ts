export type ProjectEnvId = {
  id: string;
  projectId: number;
};

export const getProjectEnvFromSdkKey = (
  sdkKey: string | undefined,
): ProjectEnvId => {
  if (!sdkKey) {
    throw new Error("No SDK key set. Please update your configuration.");
  }

  const parts = /-P(\d+)-E(\d+)-(SDK|BACKEND)-/.exec(sdkKey);

  if (!parts) {
    throw new Error("Invalid SDK key");
  }

  const projectId = Number.parseInt(parts[1], 10);
  const projectEnvId = parts[2];

  if (!projectEnvId || !projectId) {
    throw new Error("Invalid SDK key (missing project or environment ID)");
  }

  return {
    id: projectEnvId,
    projectId,
  };
};
