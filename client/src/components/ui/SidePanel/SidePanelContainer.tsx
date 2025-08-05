import { ReactNode } from "react";
import { RxCross1 } from "react-icons/rx";
import Backdrop from "../Backdrop/Backdrop";
import * as React from "react";
import { useUIStore } from "../../../store/uiStore";

interface SidePanelProps {
  children: ReactNode;
  panelTitle: string;
  className?: string;
  closeSidePanel?: boolean;
}

export default function SidePanelContainer({ children, panelTitle = "Title", className, closeSidePanel }: SidePanelProps) {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const setShowUserMenu = useUIStore((state) => state.setShowUserMenu);
  const setShowCart = useUIStore((state) => state.setShowCart);
  const showUserMenu = useUIStore((state) => state.showUserMenu);
  const showCart = useUIStore((state) => state.showCart);

  /**
   * Makes sure the smooth animation gets applied everytime the side panel is closed.
   */
  function hideSidePanelClosing(): void {
    setIsVisible(false);
    setTimeout(() => {
      if (showUserMenu) setShowUserMenu(false);
      if (showCart) setShowCart(false);
    }, 300);
  }

  /**
   * Makes sure the smooth animation gets applied everytime the side panel is rendered.
   */
  React.useEffect(() => {
    setTimeout(() => setIsVisible(true), 0);
  }, []);

  React.useEffect(() => {
    if (isVisible && closeSidePanel) hideSidePanelClosing();
  }, [closeSidePanel])

  return (
    <>
      <Backdrop handleOnClick={hideSidePanelClosing} isVisible={isVisible} />

      <div
        className={`fixed top-0 right-0 h-full w-[420px] bg-[#1a1a1a] text-white z-50 shadow-lg transform transition-transform duration-300 ease-in ${className} ${isVisible ? "translate-x-0" : "translate-x-full"
          }`}
        data-testid="side-panel-container">
        <div className="flex w-full border-b-white border-b-2">
          <h1 className="text-2xl my-2 mx-6">{panelTitle}</h1>
          <button
            className="right-0 absolute mx-6 my-2 hover:text-red-500 duration-150"
            onClick={hideSidePanelClosing}
            data-testid="close-sidepanel-btn">
            <RxCross1 size={25} />
          </button>
        </div>
        {children}
      </div>
    </>
  );
}
