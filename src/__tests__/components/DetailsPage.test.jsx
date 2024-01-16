import { render, screen } from "@testing-library/react";
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
  useParams,
} from "react-router-dom";
import { vi } from "vitest";
import DetailsPage from "../../components/DetailsPage";
import Leaderboard from "../../components/Leaderboard";
import routesConfig from "../../routesConfig.jsx";

const mocks = vi.hoisted(() => {
  return {
    Leaderboard: vi.fn(),
    useParams: vi.fn(),
  };
});

vi.mock("/src/components/Leaderboard.jsx", () => ({
  default: mocks.Leaderboard,
}));

vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    useParams: mocks.useParams,
  };
});

describe("DetailsPage", () => {
  it("renders title, start link, leaderboard, and home link", () => {
    const levelNum = 3;
    mocks.useParams.mockReturnValue({ levelNum });
    mocks.Leaderboard.mockReturnValue(<div>Leaderboard Component</div>);

    const { container } = render(
      <MemoryRouter>
        <DetailsPage />
      </MemoryRouter>
    );

    expect(Leaderboard).toBe(mocks.Leaderboard);
    expect(Leaderboard).toHaveBeenCalled();

    expect(useParams).toBe(mocks.useParams);
    expect(useParams).toHaveBeenCalled();

    expect(container).toMatchSnapshot();
  });
});
