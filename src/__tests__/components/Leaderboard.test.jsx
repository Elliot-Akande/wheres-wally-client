import { vi } from "vitest";
import useLeaderboardData from "../../hooks/useLeaderboardData";
import { render, screen } from "@testing-library/react";
import Leaderboard from "../../components/Leaderboard";

const mocks = vi.hoisted(() => {
  return { useLeaderboardData: vi.fn() };
});

vi.mock("/src/hooks/useLeaderboardData.jsx", () => ({
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
});
