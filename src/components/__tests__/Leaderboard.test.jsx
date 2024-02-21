import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Leaderboard from "../Leaderboard/Leaderboard";

vi.mock("../../utils/formatTime.js", () => ({
  default: (time) => time,
}));

const data = {
  scores: [
    {
      _id: "3",
      name: "Anon",
      score: 32,
    },
    {
      _id: "1",
      name: "Big Gary",
      score: 100,
    },
  ],
};

describe("Leaderboard", () => {
  it("renders heading and list on valid leaderboard data", () => {
    const { container } = render(<Leaderboard data={data} loading={false} />);
    expect(container).toMatchSnapshot();
  });

  it("renders heading and loading message when loading data", () => {
    const { container } = render(<Leaderboard data={{}} loading={true} />);
    expect(container).toMatchSnapshot();
  });

  it("renders heading and empty scores message when no data after loading", () => {
    const { container } = render(
      <Leaderboard data={{ scores: [] }} loading={false} />
    );
    expect(container).toMatchSnapshot();
  });
});
