import * as React from "react";
import Backdrop from "../Backdrop/Backdrop";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title = "Confirm",
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  function handleClose() {
    setIsVisible(false);
    setTimeout(() => {
      if (isOpen) onCancel();
    }, 300)
  }

  React.useEffect(() => {
    setTimeout(() => setIsVisible(true), 0);
  }, [])

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <Backdrop handleOnClick={handleClose} isVisible={isVisible} />
      <div className={`flex items-center justify-center z-50 duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="bg-[#1f1f1f] text-white p-6 rounded-lg w-[300px] md:w-[400px] z-100">
          <h2 className="text-xl font-bold mb-3">{title}</h2>
          <p className="mb-6">{message}</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
