import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Checklist from "../Checklist/Checklist.jsx";

vi.mock("../ChecklistItem/ChecklistItem.jsx", () => ({
  default: ({ character, found }) => (
    <li>
      {character.name} is {found ? "Found" : "Not Found"}
    </li>
  ),
}));

const characters = [
  { name: "Harry", id: 1, imageUrl: "harry.jpg" },
  { name: "Hermione", id: 2, imageUrl: "hermione.jpg" },
];
const correctAnswers = [{ character: "Hermione" }];

describe("Checklist", () => {
  it("renders a list of characters with correct found status", () => {
    const { container } = render(
      <Checklist characters={characters} correctAnswers={correctAnswers} />
    );

    expect(container).toMatchSnapshot();
  });
});
