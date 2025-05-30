import Button from "./Button";
import { render, screen } from "@testing-library/react";

describe("Button Component", () => {
  it("renders with default text if textValue prop is undefiend", () => {
    render(<Button textValue={undefined} className="defaultButtonStyle" />);
    expect(screen.getByRole("button", { name: /This is a button/i })).toBeInTheDocument();
  });

  it("renders with provided textValue", () => {
    render(<Button textValue="Submit" className="defaultButtonStyle" />);
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("accepts additional props", () => {
    render(<Button textValue="Button" className="defaultButtonStyle" disabled />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("merges default styles with provided className", () => {
    render(<Button textValue="" className="defaultButtonStyle bg-red-500" />);
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-red-500");
    expect(button.className).toContain("flex"); // from defaultButtonStyle
  });
});
