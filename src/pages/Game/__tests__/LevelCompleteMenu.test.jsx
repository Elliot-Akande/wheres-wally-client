import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LevelCompleteMenu from "../LevelCompleteMenu/LevelCompleteMenu";
import { MemoryRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";
import fetchAsync from "../../../utils/fetchAsync";

const mocks = vi.hoisted(() => ({
  useFetch: vi.fn(),
  fetchAsync: vi.fn(),
}));

vi.mock("../../../hooks/useFetch.jsx", () => ({
  default: mocks.useFetch,
}));
vi.mock("../../../utils/fetchAsync.js", () => ({
  default: mocks.fetchAsync,
}));

vi.mock("../../../components/Leaderboard/Leaderboard.jsx", () => ({
  default: () => <div>Leaderboard</div>,
}));

const levelNum = 1;
const score = 100;
const token = "token";
const data = [
  {
    _id: "123",
    name: "john",
    score: 30,
  },
  {
    _id: "178",
    name: "bob",
    score: 120,
  },
];

describe("LevelCompleteMenu", () => {
  it("renders title, score, leaderboard, name form, and submit button", () => {
    mocks.useFetch.mockReturnValue({ data, loading: false, error: null });

    const { container } = render(
      <MemoryRouter>
        <LevelCompleteMenu levelNum={levelNum} score={score} token={token} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("renders message on initial data fetching error", () => {
    mocks.useFetch.mockReturnValue({
      data: null,
      loading: false,
      error: new Error(),
    });

    const { container } = render(
      <MemoryRouter>
        <LevelCompleteMenu levelNum={levelNum} score={score} token={token} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("renders title, leaderboard, and finish button on score submission", async () => {
    const user = userEvent.setup();
    const updatedData = [
      {
        _id: "123",
        name: "john",
        score: 30,
      },
      {
        _id: "369",
        name: "tim",
        score: 100,
      },
      {
        _id: "178",
        name: "bob",
        score: 120,
      },
    ];
    mocks.useFetch.mockReturnValue({
      data,
      loading: false,
      error: null,
    });
    mocks.fetchAsync.mockResolvedValue(updatedData);

    const { container } = render(
      <MemoryRouter>
        <LevelCompleteMenu levelNum={levelNum} score={score} token={token} />
      </MemoryRouter>
    );
    await user.clear(screen.getByRole("textbox", { name: "Name" }));
    await user.type(screen.getByRole("textbox", { name: "Name" }), "tim");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    const body = JSON.parse(fetchAsync.mock.lastCall[1].body);
    expect(body.name).toBe("tim");
    expect(container).toMatchSnapshot();
  });

  it("renders message on updated data fetching error", async () => {
    const user = userEvent.setup();
    mocks.useFetch.mockReturnValue({
      data,
      loading: false,
      error: null,
    });
    mocks.fetchAsync.mockResolvedValue(new Error());

    const { container } = render(
      <MemoryRouter>
        <LevelCompleteMenu levelNum={levelNum} score={score} token={token} />
      </MemoryRouter>
    );
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(container).toMatchSnapshot();
  });
});
