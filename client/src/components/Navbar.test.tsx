import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Navbar from "./Navbar";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";

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

  it("renders Navbar links", () => {
    expect(screen.getAllByRole("link")).toHaveLength(4);
  });

  it("does not shows search bar when the page is first loaded", () => {
    expect(screen.queryByPlaceholderText(/search/i)).not.toBeInTheDocument();
  });

  it("shows search bar when search button is clicked", async () => {
    const user = userEvent.setup();
    const searchButton = screen.getByRole("button", { name: /search/i });

    await user.click(searchButton);
    const searchBar = screen.getByPlaceholderText(/search/i);

    expect(searchBar).toBeVisible();
  });

  it("hides search bar when user clicks anywhere but search button", async () => {
    const user = userEvent.setup();
    const searchButton = screen.getByRole("button", { name: /search/i });

    // Show search bar when search button is clicked
    await user.click(searchButton);

    const searchBar = screen.getByPlaceholderText(/search/i);
    expect(searchBar).toBeVisible();

    // Simulate a click outside search button
    const outsideElement = document.createElement("div");
    outsideElement.textContent = "Click outside";
    document.body.appendChild(outsideElement);

    await user.click(outsideElement);

    // Wait for setTimeout
    await waitFor(() => {
      expect(searchBar).not.toBeInTheDocument();
    });

    // Clean up the mock element
    document.body.removeChild(outsideElement);
  });

  it("does not hide search bar if search bar has text and if search button is clicked", async () => {
    const user = userEvent.setup();
    const searchButton = screen.getByRole("button", { name: /search/i });

    await user.click(searchButton);

    const searchBar = screen.getByPlaceholderText(/search/i);
    expect(searchBar).toBeVisible();

    const outsideElement = document.createElement("div");
    outsideElement.textContent = "Click outside";
    document.body.appendChild(outsideElement);

    await user.type(searchBar, "anything");

    await user.click(outsideElement);

    await user.click(searchButton);

    expect(searchBar).toBeVisible();

    document.body.removeChild(outsideElement);
  });
});
