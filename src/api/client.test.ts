import { describe, expect, it } from "bun:test";

import { Client } from "./client.js";

const clientIdentifier = "vscode-1.2.3";
const apiKey = "abcdefg";
const log = () => {};

describe("apiClient", () => {
  describe("uriAndHeaders", () => {
    it("generates headers based on the version and api key", () => {
      const client = new Client({
        log,
        apiKey,
        clientIdentifier,
      });

      const { headers } = client.uriAndHeaders("foo");

      expect(headers).toStrictEqual({
        Accept: "application/json",
        Authorization: "Basic YXV0aHVzZXI6YWJjZGVmZw==",
        "Content-Type": "application/json",
        "X-Reforge-Client-Version": `reforge-lsp-${clientIdentifier}`,
      });
    });

    it("can return a prod uri", () => {
      const client = new Client({
        log,
        apiKey,
        clientIdentifier,
      });

      const { uri } = client.uriAndHeaders("foo");

      expect(uri).toBe("https://api.prefab.cloud/foo");
    });

    it("doesn't duplicate slashes if the path starts with a slash", () => {
      const client = new Client({
        log,
        apiKey,
        clientIdentifier,
      });

      const { uri } = client.uriAndHeaders("/foo");

      expect(uri).toBe("https://api.prefab.cloud/foo");
    });

    it("can return a staging uri", () => {
      const client = new Client({
        log,
        apiKey,
        apiUrl: "https://api.staging-prefab.cloud",
        clientIdentifier,
      });

      const { uri } = client.uriAndHeaders("foo");

      expect(uri).toBe("https://api.staging-prefab.cloud/foo");
    });
  });
});
