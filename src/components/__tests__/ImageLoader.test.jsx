import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ImageLoader from "../ImageLoader/ImageLoader";

vi.mock("react-spinners", () => ({
  ScaleLoader: () => <div data-testid="spinner">Spinner</div>,
}));

describe("ImageLoader", () => {
  it("renders the spinner when loading", () => {
    const { container } = render(<ImageLoader src="#" alt="test" />);
    const img = screen.getByRole("img", { name: "test" });

    expect(img.complete).toBe(false);
    expect(container).toMatchSnapshot();
  });

  it("renders image and removes spinner after image loads", async () => {
    const { container } = render(<ImageLoader src="#" alt="test" />);

    const img = screen.getByRole("img", { name: "test" });
    fireEvent.load(img);

    const spinner = screen.queryByTestId("spinner");
    expect(spinner).toBeNull();
    expect(container).toMatchSnapshot();
  });
});
