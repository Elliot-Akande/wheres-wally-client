import { render } from "@testing-library/react";
import { vi } from "vitest";
import Leaderboard from "../Leaderboard/Leaderboard";
import useLeaderboardData from "../Leaderboard/useLeaderboardData";
import { describe, it, expect } from "vitest";

const mocks = vi.hoisted(() => {
  return { useLeaderboardData: vi.fn() };
});

vi.mock("/src/components/Leaderboard/useLeaderboardData.jsx", () => ({
  default: mocks.useLeaderboardData,
}));

const levelNum = 3;
const data = [
  {
    id: 3,
    name: "Anon",
    time: 32,
  },
  {
    id: 1,
    name: "Big Gary",
    time: 100,
  },
  {
    id: 2,
    name: "Gordon",
    time: 140,
  },
];
const loading = false;
const error = null;

describe("Leaderboard", () => {
  it("renders heading and list on valid leaderboard data", () => {
    mocks.useLeaderboardData.mockReturnValue({ data, loading, error });

    const { container } = render(<Leaderboard levelNum={levelNum} />);

    expect(useLeaderboardData).toBe(mocks.useLeaderboardData);
    expect(useLeaderboardData).toHaveBeenCalled();

    expect(container).toMatchSnapshot();
  });

  it("renders heading and loading message when loading data", () => {
    mocks.useLeaderboardData.mockReturnValue({ data, loading: true, error });

    const { container } = render(<Leaderboard levelNum={levelNum} />);

    expect(useLeaderboardData).toBe(mocks.useLeaderboardData);
    expect(useLeaderboardData).toHaveBeenCalled();

    expect(container).toMatchSnapshot();
  });

  it("renders heading and error message on data fetch error", () => {
    mocks.useLeaderboardData.mockReturnValue({
      data,
      loading,
      error: new Error(),
    });

    const { container } = render(<Leaderboard levelNum={levelNum} />);

    expect(useLeaderboardData).toBe(mocks.useLeaderboardData);
    expect(useLeaderboardData).toHaveBeenCalled();

    expect(container).toMatchSnapshot();
  });

  it("renders heading and empty scores message when no data after loading", () => {
    mocks.useLeaderboardData.mockReturnValue({
      data: null,
      loading,
      error,
    });

    const { container } = render(<Leaderboard levelNum={levelNum} />);

    expect(useLeaderboardData).toBe(mocks.useLeaderboardData);
    expect(useLeaderboardData).toHaveBeenCalled();

    expect(container).toMatchSnapshot();
  });
});
