import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Game from "../index";

const mocks = vi.hoisted(() => ({
  checkAnswerCorrect: vi.fn(),
  useLevelData: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock("../useLevelData.jsx", () => ({
  default: mocks.useLevelData,
}));
vi.mock("../checkAnswerCorrect.jsx", () => ({
  default: mocks.checkAnswerCorrect,
}));
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    useParams: mocks.useParams,
  };
});

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
        <button onClick={() => checkAnswer({ x: 0, y: 0 }, "Wally")}>
          Wally
        </button>
        <button onClick={() => checkAnswer({ x: 0, y: 0 }, "Odlaw")}>
          Odlaw
        </button>
      </div>
    );
  },
}));

const levelNum = 3;
const data = {
  token: "token",
  img: "#",
  characters: ["Wally", "Odlaw"],
};
const loading = false;
const error = null;

describe("Game", () => {
  it("renders heading, TaggableImage, Checklist, and quit Link", () => {
    mocks.useParams.mockReturnValue({ levelNum });
    mocks.useLevelData.mockReturnValue({ data, loading, error });

    const { container } = render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("renders loading message when loading level data", () => {
    mocks.useParams.mockReturnValue({ levelNum });
    mocks.useLevelData.mockReturnValue({ data, loading: true, error });

    const { container } = render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("renders error message level data error", () => {
    mocks.useParams.mockReturnValue({ levelNum });
    mocks.useLevelData.mockReturnValue({ data, loading, error: new Error() });

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
    mocks.useLevelData.mockReturnValue({ data, loading, error });
    mocks.checkAnswerCorrect.mockReturnValue(true);

    render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );

    const buttons = data.characters.map((character) =>
      screen.getByRole("button", { name: character })
    );

    await user.click(buttons[0]);
    await user.click(buttons[1]);

    expect(screen.getByText("LevelCompleteMenu Component")).toBeInTheDocument();
  });

  it("doesn't render levelCompleteMenu when some but not all characters are found", async () => {
    const user = userEvent.setup();
    mocks.useParams.mockReturnValue({ levelNum });
    mocks.useLevelData.mockReturnValue({ data, loading, error });
    mocks.checkAnswerCorrect.mockReturnValue(true);

    render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );

    const buttons = data.characters.map((character) =>
      screen.getByRole("button", { name: character })
    );

    await user.click(buttons[0]);

    expect(
      screen.queryByText("LevelCompleteMenu Component")
    ).not.toBeInTheDocument();
  });

  it("doesn't render levelCompleteMenu when wrong answers are submitted", async () => {
    const user = userEvent.setup();
    mocks.useParams.mockReturnValue({ levelNum });
    mocks.useLevelData.mockReturnValue({ data, loading, error });
    mocks.checkAnswerCorrect.mockReturnValue(false);

    render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );

    const buttons = data.characters.map((character) =>
      screen.getByRole("button", { name: character })
    );

    await user.click(buttons[0]);
    await user.click(buttons[1]);

    expect(
      screen.queryByText("LevelCompleteMenu Component")
    ).not.toBeInTheDocument();
  });
});
