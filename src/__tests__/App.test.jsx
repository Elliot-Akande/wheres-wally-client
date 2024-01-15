import { render, screen } from "@testing-library/react";

import App from "../App";

describe("App", () => {
  it("renders headline", () => {
    const { container } = render(<App title="React" />);

    screen.debug();

    expect(container).toMatchSnapshot();
  });
});
