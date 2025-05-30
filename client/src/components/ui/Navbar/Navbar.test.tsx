import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import Navbar from "./Navbar";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { setupUserDataTest } from "../../../utils/test/setupTestStore";
import { act } from "react";

const router = createMemoryRouter([
  {
    path: "*",
    element: <Navbar />,
  },
]);

describe("Navbar Component", () => {
  let navbar: ReturnType<typeof within>;
  beforeEach(() => {
    render(<RouterProvider router={router} />);
    navbar = within(screen.getByTestId("navbar"));
  });

  afterEach(() => {
    act(() => {
      setupUserDataTest({ isUserSignedIn: false, globalUsername: "" });
    });
  });

  it("does not shows search bar when the page is first loaded", () => {
    expect(navbar.queryByPlaceholderText(/search/i)).not.toBeInTheDocument();
  });

  it("shows search bar when search button is clicked", async () => {
    const user = userEvent.setup();
    const searchButton = navbar.getByRole("button", { name: /search/i });

    await user.click(searchButton);
    const searchBar = navbar.getByPlaceholderText(/search/i);

    expect(searchBar).toBeVisible();
  });

  it("hides search bar when user clicks anywhere but search button", async () => {
    const user = userEvent.setup();
    const searchButton = navbar.getByRole("button", { name: /search/i });

    // Show search bar when search button is clicked
    await user.click(searchButton);

    const searchBar = navbar.getByPlaceholderText(/search/i);
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
    const searchButton = navbar.getByRole("button", { name: /search/i });

    await user.click(searchButton);

    const searchBar = navbar.getByPlaceholderText(/search/i);
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

  it("opens user menu with side panel container and backdrop when user icon is clicked", async () => {
    const user = userEvent.setup();

    setupUserDataTest({ isUserSignedIn: false, globalUsername: "" });

    const userIconButton = screen.getByLabelText("User");
    await user.click(userIconButton);

    // backdrop and sidepanel container must open
    expect(screen.getByTestId("backdrop")).toBeInTheDocument();
    expect(screen.getByTestId("side-panel-container")).toBeInTheDocument();

    // user menu (login and registration)
    expect(screen.getByTestId("user-menu")).toBeInTheDocument();
  });

  it("shows username's first alphabetical character if user is signed in", () => {
    act(() => {
      setupUserDataTest({ isUserSignedIn: true, globalUsername: "_Cool-User" });
    });
    render(<RouterProvider router={router} />);

    expect(navbar.getByText("C")).toBeInTheDocument();
  });
});
