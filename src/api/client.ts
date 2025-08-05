import { type Logger } from "../types.js";

const DEFAULT_API_URL = "https://api.prefab.cloud";

export class Client {
  private apiKey: string;
  private apiUrl: string;
  private clientIdentifier: string;
  private log: (args: any) => void;

  constructor({
    apiKey,
    clientIdentifier,
    apiUrl,
    log,
  }: {
    apiKey: string | undefined;
    clientIdentifier: string;
    apiUrl?: string;
    log: Logger;
  }) {
    this.apiUrl = (apiUrl || DEFAULT_API_URL).replace(/\/$/, "");
    this.clientIdentifier = clientIdentifier;

    if (!apiKey) {
      throw new Error("No API key set. Please update your configuration.");
    }

    this.apiKey = apiKey;
    this.log = (args: any) => log("ApiClient", args);
  }

  uriAndHeaders(requestPath: string) {
    const token = Buffer.from(`authuser:${this.apiKey}`).toString("base64");

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Basic ${token}`,
      "X-Reforge-Client-Version": `reforge-lsp-${this.clientIdentifier}`,
    };

    const uri = new URL(this.apiUrl + "/" + requestPath.replace(/^\//, ""));

    return { uri: uri.toString(), headers };
  }

  async get(requestPath: string) {
    const { uri, headers } = this.uriAndHeaders(requestPath);

    this.log({ GET: { uri } });

    return fetch(uri, {
      method: "GET",
      headers,
    });
  }

  async post(requestPath: string, payload: unknown) {
    const { uri, headers } = this.uriAndHeaders(requestPath);

    this.log({ POST: { uri, payload } });

    return fetch(uri, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
  }
}
