import { jsonStringifyWithBigInt } from "@reforge-com/node";

import { type Logger } from "../types.js";

const DEFAULT_API_URL = "https://api.prefab.cloud";

export class Client {
  private sdkKey?: string;
  private jwt?: string;
  private apiUrl: string;
  private clientIdentifier: string;
  private log: (args: any) => void;

  constructor({
    sdkKey,
    jwt,
    clientIdentifier,
    apiUrl,
    log,
  }: {
    sdkKey?: string;
    jwt?: string;
    clientIdentifier: string;
    apiUrl?: string;
    log: Logger;
  }) {
    this.apiUrl = (apiUrl || DEFAULT_API_URL).replace(/\/$/, "");
    this.clientIdentifier = clientIdentifier;

    if (!sdkKey && !jwt) {
      throw new Error("Either SDK key or JWT must be provided");
    }

    this.sdkKey = sdkKey;
    this.jwt = jwt;
    this.log = (args: any) => log("ApiClient", args);
  }

  uriAndHeaders(requestPath: string) {
    let authorization: string;

    if (this.jwt) {
      authorization = `Bearer ${this.jwt}`;
    } else {
      const token = Buffer.from(`authuser:${this.sdkKey}`).toString("base64");
      authorization = `Basic ${token}`;
    }

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: authorization,
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

  async put(requestPath: string, payload: unknown) {
    const { uri, headers } = this.uriAndHeaders(requestPath);

    this.log({ PUT: { uri, payload } });

    return fetch(uri, {
      method: "PUT",
      headers,
      body: jsonStringifyWithBigInt(payload),
    });
  }
}
