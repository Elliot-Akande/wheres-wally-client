import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Game from "../index";

const mocks = vi.hoisted(() => ({
  useParams: vi.fn(),
  fetchAsync: vi.fn(),
  useFetch: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    useParams: mocks.useParams,
  };
});
vi.mock("../../../utils/fetchAsync.js", () => ({
  default: mocks.fetchAsync,
}));
vi.mock("../../../hooks/useFetch.jsx", () => ({
  default: mocks.useFetch,
}));

vi.mock("../Checklist/Checklist.jsx", () => ({
  default: () => <div>Checklist Component</div>,
}));
vi.mock("../LevelCompleteMenu/LevelCompleteMenu.jsx", () => ({
  default: () => <div>LevelCompleteMenu Component</div>,
}));
vi.mock("../TaggableImage/TaggableImage.jsx", () => ({
  default: ({ checkAnswer }) => {
    return (
      <div>
        TaggableImage Component
        <button
          onClick={() =>
            checkAnswer({ xCoord: 10, yCoord: 10, character: "Wally" })
          }
        >
          Wally
        </button>
        <button
          onClick={() =>
            checkAnswer({ xCoord: 20, yCoord: 20, character: "Odlaw" })
          }
        >
          Odlaw
        </button>
      </div>
    );
  },
}));

describe("Game", () => {
  const levelNum = 3;
  const data = {
    token: "token",
    imageUrl: "/game.png",
    characters: [
      {
        name: "Wally",
        imageUrl: "/wally.png",
      },
      {
        name: "Odlaw",
        imageUrl: "/odlaw.png",
      },
    ],
  };

  it("renders heading, Checklist, and TaggableImage", () => {
    mocks.useParams.mockReturnValue({ levelNum });
    mocks.useFetch.mockReturnValue({ data, loading: false, error: null });

    const { container } = render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("renders loading message when loading level data", () => {
    mocks.useParams.mockReturnValue({ levelNum });
    mocks.useFetch.mockReturnValue({ data: null, loading: true, error: null });

    const { container } = render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("renders error message level data error", () => {
    mocks.useParams.mockReturnValue({ levelNum });
    mocks.useFetch.mockReturnValue({
      data,
      loading: false,
      error: new Error(),
    });

    const { container } = render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("renders LevelCompleteMenu when all characters are found", async () => {
    const user = userEvent.setup();
    mocks.useParams.mockReturnValue({ levelNum });
    mocks.useFetch.mockReturnValue({ data, loading: false, error: null });
    mocks.fetchAsync
      .mockResolvedValueOnce({ isCorrect: true })
      .mockResolvedValueOnce({ isCorrect: true })
      .mockResolvedValueOnce({ isComplete: true });

    render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );

    const buttons = data.characters.map(({ name }) =>
      screen.getByRole("button", { name })
    );

    expect(screen.queryByText("LevelCompleteMenu Component")).toBeNull();

    await user.click(buttons[0]);
    await user.click(buttons[1]);
    expect(screen.getByText("LevelCompleteMenu Component")).toBeInTheDocument();
  });

  it("doesn't render levelCompleteMenu when some but not all characters are found", async () => {
    const user = userEvent.setup();
    mocks.useParams.mockReturnValue({ levelNum });
    mocks.useFetch.mockReturnValue({ data, loading: false, error: null });
    mocks.fetchAsync
      .mockResolvedValueOnce({ isCorrect: true })
      .mockResolvedValueOnce({ isComplete: false });

    render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );

    const buttons = data.characters.map(({ name }) =>
      screen.getByRole("button", { name })
    );

    await user.click(buttons[0]);

    expect(screen.queryByText("LevelCompleteMenu Component")).toBeNull();
  });
});
