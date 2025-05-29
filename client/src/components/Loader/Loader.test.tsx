import Loader from "./Loader";
import { render, screen } from "@testing-library/react";

test("Loader renders without crashing", () => {
  render(<Loader />);
  expect(screen.getByTestId("loader")).toBeInTheDocument();
});
