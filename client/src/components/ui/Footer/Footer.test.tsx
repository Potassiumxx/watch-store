import { beforeEach, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const router = createMemoryRouter([
  {
    path: "/",
    element: <Footer />,
  },
]);

describe("Footer Component", () => {
  beforeEach(() => {
    render(<RouterProvider router={router} />);
  });
});
