import userEvent from "@testing-library/user-event";
import Backdrop from "./Backdrop";
import { render, screen } from "@testing-library/react";

describe("Backdrop Component", () => {
  it("renders when visible", () => {
    render(<Backdrop isVisible={true} handleOnClick={() => {}} />);
    const backdrop = screen.getByTestId("backdrop");
    expect(backdrop).toBeInTheDocument();
    expect(backdrop).toHaveClass("opacity-100");
  });

  it("calls onClose function when clicked", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(<Backdrop isVisible={true} handleOnClick={handleClose} />);
    const backdrop = screen.getByTestId("backdrop");

    await user.click(backdrop);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("hides when not visible without interepting clicks", () => {
    render(<Backdrop isVisible={false} handleOnClick={() => {}} />);
    expect(screen.getByTestId("backdrop")).toHaveClass("opacity-0");
  });
});
