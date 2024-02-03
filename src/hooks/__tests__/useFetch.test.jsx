import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import useFetch from "../useFetch";

const fetch = createFetchMock(vi);
fetch.enableMocks();

const data = { test: 12345 };
const err = "An error occured when fetching data.";

describe("useFetch", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("returns data and no error on successful fetch", async () => {
    fetch.mockResponseOnce(JSON.stringify(data));

    const { result } = renderHook(() => useFetch("#", {}));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(data);
    expect(result.current.error).toBe(null);
  });

  it("returns error on failed fetch", async () => {
    fetch.mockRejectOnce(new Error());

    const { result } = renderHook(() => useFetch("#", {}));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toMatch(err);
  });

  it("returns error on fetch with status code >= 400", async () => {
    fetch.mockResponseOnce(JSON.stringify(data), { status: 400 });

    const { result } = renderHook(() => useFetch("#", {}));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toMatch(err);
  });
});
