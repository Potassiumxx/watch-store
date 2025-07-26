import * as React from "react";

interface BackdropProps {
  /**
   * Handles when user clicks on backdrop - it should close the side panel.
   */
  handleOnClick: () => void;
  isVisible: boolean;
}

export default function Backdrop({ handleOnClick, isVisible }: BackdropProps) {
  React.useEffect(() => {
    if (isVisible) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);


  return (
    <div
      onClick={handleOnClick}
      className={`fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isVisible ? "bg-black/40 opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      data-testid="backdrop"
    />
  );
}
