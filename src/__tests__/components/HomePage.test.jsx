import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import HomePage from "../../components/HomePage";
import useLevelData from "../../hooks/useLevelData";

const mocks = vi.hoisted(() => ({
  useLevelData: vi.fn(),
}));

vi.mock("/src/hooks/useLevelData", () => ({
  default: mocks.useLevelData,
}));

describe("HomePage", () => {
  it("renders Level links", () => {
    mocks.useLevelData.mockReturnValue({
      levelData: [
        {
          levelNum: 1,
        },
        {
          levelNum: 2,
        },
        {
          levelNum: 3,
        },
      ],
      error: null,
    });

    const { container } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(useLevelData).toBe(mocks.useLevelData);
    expect(useLevelData).toHaveBeenCalled();

    expect(container).toMatchSnapshot();
  });

  it("renders error message on useLevelData error", () => {
    mocks.useLevelData.mockReturnValue({
      levelData: [],
      error: new Error(),
    });

    const { container } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(useLevelData).toBe(mocks.useLevelData);
    expect(useLevelData).toHaveBeenCalled();

    expect(container).toMatchSnapshot();
  });
});
