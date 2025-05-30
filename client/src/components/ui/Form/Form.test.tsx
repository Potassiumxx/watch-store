import { screen, render } from "@testing-library/react";
import Form from "./Form";
import userEvent from "@testing-library/user-event";

describe("Form component", () => {
  it("calls handleFormSubmit by clicking the submit button", async () => {
    const handleFormSubmit = vi.fn((e) => {
      e.preventDefault();
      return Promise.resolve();
    });

    render(
      <Form handleFormSubmit={handleFormSubmit}>
        <button type="submit">Submit</button>
      </Form>
    );

    const user = userEvent.setup();
    const buttons = screen.getAllByRole("button");
    const submitBtn = buttons.find((btn) => btn.getAttribute("type") === "submit");

    await user.click(submitBtn!);

    expect(handleFormSubmit).toHaveBeenCalledTimes(1);
  });

  it("calls handleFormSumbit by pressing the Enter key", async () => {
    const handleFormSubmit = vi.fn((e) => {
      e.preventDefault();
      return Promise.resolve();
    });

    render(
      <Form handleFormSubmit={handleFormSubmit}>
        <input type="text" placeholder="Enter text" />
        <button type="submit">Submit</button>
      </Form>
    );

    const user = userEvent.setup();
    /**
     * In HTML forms, hitting Enter in an input triggers the form's submit action if there's a submit button.
     * Without an input, Enter on its own doesn’t trigger anything.
     */
    await user.click(screen.getByPlaceholderText("Enter text"));
    await user.keyboard("{Enter}");

    expect(handleFormSubmit).toHaveBeenCalledTimes(1);
  });

  it("does not call other buttons like show/hide password button after pressing Enter key", async () => {
    const handleFormSubmit = vi.fn((e) => {
      e.preventDefault();
      return Promise.resolve();
    });

    const showPassword = vi.fn(() => {});

    render(
      <Form handleFormSubmit={handleFormSubmit}>
        <input type="text" placeholder="Enter text" />
        <button type="button" onClick={showPassword}>
          Show password
        </button>
        <button type="submit">Submit</button>
      </Form>
    );

    const user = userEvent.setup();
    /**
     * In HTML forms, hitting Enter in an input triggers the form's submit action if there's a submit button.
     * Without an input, Enter on its own doesn’t trigger anything.
     */
    await user.click(screen.getByPlaceholderText("Enter text"));
    await user.keyboard("{Enter}");

    expect(showPassword).not.toHaveBeenCalled();
    expect(handleFormSubmit).toHaveBeenCalled();
  });
});
