import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useFetch from "../useFetch";

globalThis.fetch = vi.fn();

const data = { test: 12345 };
const errMsg = "An error occured when fetching data.";

describe("useFetch", () => {
  beforeEach(() => {
    globalThis.fetch.mockClear();
  });

  it("returns data and no error on successful fetch", async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(data),
    };
    globalThis.fetch.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useFetch("#", {}));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(data);
    expect(result.current.error).toBe(null);
  });

  it("should handle network errors", async () => {
    globalThis.fetch.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useFetch("#", {}));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error.message).toMatch(errMsg);
  });

  it("should handle non-OK response", async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      json: vi.fn().mockResolvedValue({ msg: "Data not found." }),
    };
    globalThis.fetch.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useFetch("#", {}));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error.message).toMatch(errMsg);
  });
});
