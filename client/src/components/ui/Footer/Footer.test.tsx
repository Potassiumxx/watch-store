import { beforeEach, describe } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Footer from "./Footer";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const router = createMemoryRouter([
  {
    path: "/",
    element: <Footer />,
  },
]);

describe("Footer Component", () => {
  let footer: ReturnType<typeof within>;
  beforeEach(() => {
    render(<RouterProvider router={router} />);
    footer = within(screen.getByTestId("footer"));
  });

  it("renders three links", () => {
    expect(footer.getAllByRole("link")).toHaveLength(3);
  });
});
