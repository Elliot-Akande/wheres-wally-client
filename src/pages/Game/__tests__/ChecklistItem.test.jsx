import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ChecklistItem from "../ChecklistItem/ChecklistItem.jsx";

vi.mock("../../../components/ImageLoader/ImageLoader.jsx", () => ({
  default: ({ src }) => <img src={src}></img>,
}));

const character = {
  imageUrl: "#",
  name: "Aang",
};

describe("ChecklistItem", () => {
  it("renders correctly when found", () => {
    const { container } = render(
      <ChecklistItem character={character} found={true} />
    );

    expect(container).toMatchSnapshot();
  });

  it("renders correctly when not found", () => {
    const { container } = render(
      <ChecklistItem character={character} found={false} />
    );

    expect(container).toMatchSnapshot();
  });
});
