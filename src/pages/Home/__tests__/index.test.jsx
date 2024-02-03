import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Home from "../index.jsx";
import useFetch from "../../../hooks/useFetch.jsx";

const mocks = vi.hoisted(() => ({
  useFetch: vi.fn(),
}));

vi.mock("../../../hooks/useFetch.jsx", () => ({
  default: mocks.useFetch,
}));

const data = [
  {
    levelNum: 1,
  },
  {
    levelNum: 2,
  },
  {
    levelNum: 3,
  },
];
const loading = false;
const error = null;

describe("Home", () => {
  it("renders Level links", () => {
    mocks.useFetch.mockReturnValue({
      data,
      loading,
      error,
    });

    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(useFetch).toBe(mocks.useFetch);
    expect(useFetch).toHaveBeenCalled();

    expect(container).toMatchSnapshot();
  });

  it("renders loading message on useFetch loading", () => {
    mocks.useFetch.mockReturnValue({
      data,
      loading: true,
      error,
    });

    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(useFetch).toBe(mocks.useFetch);
    expect(useFetch).toHaveBeenCalled();

    expect(container).toMatchSnapshot();
  });

  it("renders error message on useFetch error", () => {
    mocks.useFetch.mockReturnValue({
      data,
      loading,
      error: new Error(),
    });

    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(useFetch).toBe(mocks.useFetch);
    expect(useFetch).toHaveBeenCalled();

    expect(container).toMatchSnapshot();
  });
});
