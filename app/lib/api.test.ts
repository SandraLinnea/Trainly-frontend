import { afterEach, describe, expect, it, vi } from "vitest";

async function importApi() {
  vi.resetModules();
  return import("./api");
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("getApiUrl", () => {
  it("prefixes a configured API URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "http://api.example.test/");
    const { getApiUrl } = await importApi();

    expect(getApiUrl("/api/me")).toBe("http://api.example.test/api/me");
  });

  it("adds a leading slash to paths", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "http://api.example.test");
    const { getApiUrl } = await importApi();

    expect(getApiUrl("api/me")).toBe("http://api.example.test/api/me");
  });

  it("uses localhost backend fallback in the browser", async () => {
    vi.stubGlobal("window", {
      location: {
        hostname: "localhost",
      },
    });

    const { getApiUrl } = await importApi();

    expect(getApiUrl("/api/health")).toBe("http://localhost:3001/api/health");
  });
});

describe("readApiError", () => {
  it("reads a message string from a JSON response", async () => {
    const { readApiError } = await importApi();
    const response = Response.json({ message: "Något gick fel." }, { status: 400 });

    await expect(readApiError(response, "Fallback")).resolves.toBe("Något gick fel.");
  });

  it("falls back when the response is not valid JSON", async () => {
    const { readApiError } = await importApi();
    const response = new Response("Inte JSON", { status: 500 });

    await expect(readApiError(response, "Fallback")).resolves.toBe("Fallback");
  });
});
