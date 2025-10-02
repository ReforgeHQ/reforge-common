import { jsonStringifyWithBigInt } from "@reforge-com/node";

import { type Logger } from "../types.js";

const DEFAULT_API_URL = "https://api.prefab.cloud";

export class Client {
  private sdkKey: string;
  private apiUrl: string;
  private clientIdentifier: string;
  private log: (args: any) => void;

  constructor({
    sdkKey,
    clientIdentifier,
    apiUrl,
    log,
  }: {
    sdkKey: string | undefined;
    clientIdentifier: string;
    apiUrl?: string;
    log: Logger;
  }) {
    this.apiUrl = (apiUrl || DEFAULT_API_URL).replace(/\/$/, "");
    this.clientIdentifier = clientIdentifier;

    if (!sdkKey) {
      throw new Error("No SDK key set. Please update your configuration.");
    }

    this.sdkKey = sdkKey;
    this.log = (args: any) => log("ApiClient", args);
  }

  uriAndHeaders(requestPath: string) {
    const token = Buffer.from(`authuser:${this.sdkKey}`).toString("base64");

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
      body: jsonStringifyWithBigInt(payload),
    });
  }
}
