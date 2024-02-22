import { beforeEach, describe, expect, it, vi } from "vitest";
import fetchAsync from "../fetchAsync";

globalThis.fetch = vi.fn();

const data = { test: 12345 };
const errMsg = "An error occured when fetching data.";

describe("fetchAsync", () => {
  beforeEach(() => {
    globalThis.fetch.mockClear();
  });

  it("should fetch data successfully", async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(data),
    };
    globalThis.fetch.mockResolvedValue(mockResponse);

    const result = await fetchAsync("/some-endpoint");

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/some-endpoint"),
      expect.any(Object)
    );
    expect(result).toEqual(data);
  });

  it("should handle non-OK response", async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      json: vi.fn().mockResolvedValue({ msg: "Data not found." }),
    };
    globalThis.fetch.mockResolvedValue(mockResponse);

    const response = await fetchAsync("/non-existent-endpoint");

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/non-existent-endpoint"),
      expect.any(Object)
    );
    expect(response instanceof Error).toBe(true);
    expect(response.message).toBe(errMsg);
    expect(response.status).toBe(404);
  });

  it("should handle network errors", async () => {
    globalThis.fetch.mockRejectedValue(new Error("Network error"));

    const response = await fetchAsync("/some-endpoint");

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/some-endpoint"),
      expect.any(Object)
    );
    expect(response.message).toBe(errMsg);
  });
});
