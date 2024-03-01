import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import TaggableImage from "../TaggableImage/TaggableImage";

vi.mock("../Magnifier/Maginifier.jsx", () => ({
  default: ({ magnifierBehaviour }) => (
    <div data-testid="magnifier">{magnifierBehaviour}</div>
  ),
}));
vi.mock("../../../components/ImageLoader/ImageLoader.jsx", () => ({
  default: ({ src, alt }) => <img src={src} alt={alt} />,
}));
vi.mock("react", async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useRef: () => ({
      current: {
        width: 100,
        height: 100,
        naturalWidth: 500,
        naturalHeight: 500,
      },
    }),
  };
});

const mockProps = {
  imageUrl: "/test.jpg",
  characters: [
    { name: "John", imageUrl: "/john.jpg" },
    { name: "Kate", imageUrl: "/kate.jpg" },
  ],
  checkAnswer: vi.fn(),
  correctAnswers: [
    { character: "Kate", imageUrl: "/kate.jpg", xCoord: 10, yCoord: 10 },
  ],
  levelComplete: false,
};

describe("TaggableImage", () => {
  it("renders img, CorrectAnswers, and Magnifier", () => {
    const { container } = render(<TaggableImage {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it("sets magnifierBehaviour to 'hover' on mouseOver event", () => {
    render(<TaggableImage {...mockProps} />);

    const magnifier = screen.getByTestId("magnifier");
    expect(magnifier.textContent).toBe("hidden");

    const image = screen.getByRole("img", { name: "Where's Wally Game" });
    fireEvent.mouseOver(image);
    expect(magnifier.textContent).toBe("hover");
  });

  it("sets magnifierBehaviour to 'hidden' on mouseLeave event", () => {
    render(<TaggableImage {...mockProps} />);

    const magnifier = screen.getByTestId("magnifier");
    const image = screen.getByRole("img", { name: "Where's Wally Game" });
    fireEvent.mouseOver(image);
    expect(magnifier.textContent).toBe("hover");

    fireEvent.mouseLeave(image);
    expect(magnifier.textContent).toBe("hidden");
  });

  it("sets magnifierBehaviour to 'clicked' on click event", () => {
    render(<TaggableImage {...mockProps} />);

    const magnifier = screen.getByTestId("magnifier");
    expect(magnifier.textContent).toBe("hidden");

    const image = screen.getByRole("img", { name: "Where's Wally Game" });
    fireEvent.click(image);
    expect(magnifier.textContent).toBe("clicked");
  });

  it("sets magnifierBehaviour to 'hover' on click event when previously set to 'clicked'", () => {
    render(<TaggableImage {...mockProps} />);

    const magnifier = screen.getByTestId("magnifier");
    const image = screen.getByRole("img", { name: "Where's Wally Game" });
    fireEvent.click(image);
    expect(magnifier.textContent).toBe("clicked");

    fireEvent.click(image);
    expect(magnifier.textContent).toBe("hover");
  });

  it("does not handle click event when level is complete", () => {
    render(<TaggableImage {...mockProps} levelComplete={true} />);
    const image = screen.getByAltText("Where's Wally Game");
    fireEvent.click(image, { clientX: 10, clientY: 10 });
    expect(mockProps.checkAnswer).not.toHaveBeenCalled();
  });
});
