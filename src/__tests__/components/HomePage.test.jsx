import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import HomePage from "../../components/HomePage";

const mocks = vi.hoisted(() => {
  return {
    useLevelData: vi.fn(),
  };
});

vi.mock("../../hooks/useLevelData", () => {
  return {
    default: mocks.useLevelData,
  };
});

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

    expect(container).toMatchSnapshot();
  });
});
