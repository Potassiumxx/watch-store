import Collection from "./Collection";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { screen, render, within } from "@testing-library/react";

const router = createMemoryRouter([
  {
    path: "*",
    element: <Collection />,
  },
]);

describe("Collection component", () => {
  let collection: ReturnType<typeof within>;
  beforeEach(() => {
    render(<RouterProvider router={router} />);
    collection = within(screen.getByTestId("collection"));
  });

  it("render the section heading", () => {
    expect(collection.getByText("Our Collections")).toBeInTheDocument();
  });

  it("renders links for all collection items i.e. digital, analog and smartwatch", () => {
    expect(collection.getAllByRole("link")).toHaveLength(3);
  });

  it("renders correct watch titles", () => {
    expect(collection.getByText("Analog Watches")).toBeInTheDocument();
    expect(collection.getByText("Digital Watches")).toBeInTheDocument();
    expect(collection.getByText("Smartwatches")).toBeInTheDocument();
  });

  it("renders links with correct hrefs", () => {
    expect(collection.getByText("Analog Watches").closest("a")).toHaveAttribute("href", "/analog");
    expect(collection.getByText("Digital Watches").closest("a")).toHaveAttribute("href", "/digital");
    expect(collection.getByText("Smartwatches").closest("a")).toHaveAttribute("href", "/smart");
  });
});
