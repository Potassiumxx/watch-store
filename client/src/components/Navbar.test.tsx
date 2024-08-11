import React from "react";
import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import Navbar from "./Navbar";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const router = createMemoryRouter([
  {
    path: "*",
    element: <Navbar />,
  },
]);

describe("Navbar Component", () => {
  it("renders Navbar component", () => {
    render(<RouterProvider router={router} />);
  });
});
