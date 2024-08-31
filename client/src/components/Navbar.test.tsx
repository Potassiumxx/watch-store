import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const router = createMemoryRouter([
  {
    path: "*",
    element: <Navbar />,
  },
]);

describe("Navbar Component", () => {
  beforeEach(() => {
    render(<RouterProvider router={router} />);
  });

  it("renders logo", () => {
    expect(screen.getByAltText("logo")).toBeInTheDocument();
  });

  it("renders Navbar links", () => {
    expect(screen.getAllByRole("link")).toHaveLength(4);
  });
});
