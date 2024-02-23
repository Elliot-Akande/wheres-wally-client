import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Magnifier from "../Magnifier/Maginifier";

vi.mock("../SelectionMenu/SelectionMenu.jsx", () => ({
  default: () => <div>Selection Menu</div>,
}));

const mockProps = {
  clickedCoords: { x: 50, y: 50 },
  hoverCoords: { x: 100, y: 100 },
  magnifierBehaviour: "hidden",
  characters: [{ name: "test", imageUrl: "test.jpg" }],
  checkAnswer: vi.fn(),
  imageUrl: "test.jpg",
  imageDimensions: { width: 200, height: 200 },
};

describe("Magnifier", () => {
  it("renders without crashing", () => {
    const { container } = render(<Magnifier {...mockProps} />);
  });

  it('displays the SelectionMenu when magnifierBehaviour is "clicked"', () => {
    const { container } = render(
      <Magnifier {...mockProps} magnifierBehaviour="clicked" />
    );
    expect(container).toMatchSnapshot();
  });

  it('does not display the SelectionMenu when magnifierBehaviour is not "clicked"', () => {
    const { container } = render(
      <Magnifier {...mockProps} magnifierBehaviour="hover" />
    );
    expect(container).toMatchSnapshot();
    screen.debug();
  });
});
