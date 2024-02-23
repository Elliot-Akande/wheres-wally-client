import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SelectionMenu from "../SelectionMenu/SelectionMenu";
import { userEvent } from "@testing-library/user-event";

const characters = [
  { name: "Alice", imageUrl: "alice.jpg" },
  { name: "Bob", imageUrl: "bob.jpg" },
];

describe("SelectionMenu", () => {
  it("renders menu items correctly", () => {
    const { container } = render(
      <SelectionMenu
        characters={characters}
        checkAnswer={() => {}}
        menuDirection="left"
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("calls checkAnswer when menu item is clicked", async () => {
    const user = userEvent.setup();
    const mockCheckAnswer = vi.fn();

    render(
      <SelectionMenu
        characters={characters}
        checkAnswer={mockCheckAnswer}
        menuDirection="left"
      />
    );
    const menuItem = screen.getByRole("button", { name: characters[1].name });
    await user.click(menuItem);

    expect(mockCheckAnswer).toHaveBeenCalledWith(characters[1].name);
  });
});
