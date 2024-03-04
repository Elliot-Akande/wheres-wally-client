import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import LevelDetails from "../index.jsx";

const mocks = vi.hoisted(() => {
  return {
    useParams: vi.fn(),
    useFetch: vi.fn(),
  };
});

vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    useParams: mocks.useParams,
  };
});
vi.mock("../../../hooks/useFetch.jsx", () => ({
  default: mocks.useFetch,
}));

vi.mock("/src/components/Leaderboard/Leaderboard.jsx", () => ({
  default: () => <div>Leaderboard Component</div>,
}));

const data = [
  {
    _id: "1",
    name: "John",
    score: 30,
  },
  {
    _id: "5",
    name: "Bob",
    score: 60,
  },
  {
    _id: "3",
    name: "Larry",
    score: 80,
  },
];

describe("LevelDetails", () => {
  it("renders title, start link, leaderboard, and home link.", () => {
    mocks.useParams.mockReturnValue({ levelNum: 3 });
    mocks.useFetch.mockReturnValue({
      data,
      loading: false,
      error: null,
    });

    const { container } = render(
      <MemoryRouter>
        <LevelDetails />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("displays error message on levelNum that doesn't exist.", () => {
    mocks.useParams.mockReturnValue({ levelNum: 3 });
    mocks.useFetch.mockReturnValue({
      data: {},
      loading: false,
      error: { status: 404 },
    });

    const { container } = render(
      <MemoryRouter>
        <LevelDetails />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
