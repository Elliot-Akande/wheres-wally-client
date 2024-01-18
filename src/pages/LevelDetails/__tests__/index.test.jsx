import { render } from "@testing-library/react";
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
  useParams,
} from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import LevelDetails from "../index.jsx";
import routesConfig from "/src/routesConfig.jsx";

const mocks = vi.hoisted(() => {
  return {
    useParams: vi.fn(),
    checkLevelExists: vi.fn(),
  };
});

vi.mock("../checkLevelExists.js", () => ({
  default: mocks.checkLevelExists,
}));

vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    useParams: mocks.useParams,
  };
});

vi.mock("/src/components/Leaderboard/Leaderboard.jsx", () => ({
  default: () => <div>Leaderboard Component</div>,
}));

describe("LevelDetails", () => {
  it("renders title, start link, leaderboard, and home link.", () => {
    const levelNum = 3;
    mocks.useParams.mockReturnValue({ levelNum });

    const { container } = render(
      <MemoryRouter>
        <LevelDetails />
      </MemoryRouter>
    );

    expect(useParams).toBe(mocks.useParams);
    expect(useParams).toHaveBeenCalled();

    expect(container).toMatchSnapshot();
  });

  it("redirects to home page on levelNum that doesn't exist.", () => {
    const levelNum = 1;
    mocks.useParams.mockReturnValue({ levelNum });
    mocks.checkLevelExists.mockReturnValue(false);

    const router = createMemoryRouter(routesConfig, {
      initialEntries: [`/level/${levelNum}/details`],
    });

    render(<RouterProvider router={router} />);

    expect(router.state.location.pathname).toBe("/");
  });

  it("doesn't redirect on levelNum that exists.", () => {
    const levelNum = 1;
    mocks.useParams.mockReturnValue({ levelNum });
    mocks.checkLevelExists.mockReturnValue(true);

    const router = createMemoryRouter(routesConfig, {
      initialEntries: [`/level/${levelNum}/details`],
    });

    render(<RouterProvider router={router} />);

    expect(router.state.location.pathname).toBe(`/level/${levelNum}/details`);
  });
});
