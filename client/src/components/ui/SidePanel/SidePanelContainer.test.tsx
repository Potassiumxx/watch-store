import userEvent from "@testing-library/user-event";
import SidePanelContainer from "./SidePanelContainer";
import { render, screen, within } from "@testing-library/react";

describe("Side panel container component", () => {
  beforeEach(() => {
    render(
      <SidePanelContainer panelTitle="Title">
        <div>Children Element</div>
      </SidePanelContainer>
    );
  });

  it("renders the title of panel properly", () => {
    const sidePanelContainer = within(screen.getByTestId("side-panel-container"));
    expect(sidePanelContainer.getByRole("heading")).toHaveTextContent("Title");
  });

  it("renders the backdrop with it", () => {
    const backdrop = screen.getByTestId("backdrop");
    expect(backdrop).toBeInTheDocument();
  });

  it("hides the sidepanel and backdrop after clicking on close button", async () => {
    const closeBtn = screen.getByTestId("close-sidepanel-btn");
    const sidePanelContainer = screen.getByTestId("side-panel-container");
    const backdrop = screen.getByTestId("backdrop");

    const user = userEvent.setup();

    await user.click(closeBtn);

    expect(sidePanelContainer).toHaveClass("translate-x-full"); // hide sidepanel
    expect(backdrop).toHaveClass("opacity-0");
  });

  it("hides the sidepanel and backdrop after clicking on backdrop", async () => {
    const sidePanelContainer = screen.getByTestId("side-panel-container");
    const backdrop = screen.getByTestId("backdrop");

    const user = userEvent.setup();

    await user.click(backdrop);

    expect(sidePanelContainer).toHaveClass("translate-x-full"); // hide sidepanel
    expect(backdrop).toHaveClass("opacity-0");
  });
});
