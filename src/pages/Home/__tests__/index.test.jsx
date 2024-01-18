import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Home from "../index.jsx";
import useLevelList from "../useLevelList";

const mocks = vi.hoisted(() => ({
  useLevelList: vi.fn(),
}));

vi.mock("../useLevelList.jsx", () => ({
  default: mocks.useLevelList,
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
    mocks.useLevelList.mockReturnValue({
      data,
      loading,
      error,
    });

    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(useLevelList).toBe(mocks.useLevelList);
    expect(useLevelList).toHaveBeenCalled();

    expect(container).toMatchSnapshot();
  });

  it("renders loading message on useLevelList loading", () => {
    mocks.useLevelList.mockReturnValue({
      data,
      loading: true,
      error,
    });

    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(useLevelList).toBe(mocks.useLevelList);
    expect(useLevelList).toHaveBeenCalled();

    expect(container).toMatchSnapshot();
  });

  it("renders error message on useLevelList error", () => {
    mocks.useLevelList.mockReturnValue({
      data,
      loading,
      error: new Error(),
    });

    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(useLevelList).toBe(mocks.useLevelList);
    expect(useLevelList).toHaveBeenCalled();

    expect(container).toMatchSnapshot();
  });
});
