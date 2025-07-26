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

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <Backdrop handleOnClick={onCancel} isVisible={isOpen} />
      <div className="flex items-center justify-center z-50">
        <div className="bg-[#1f1f1f] text-white p-6 rounded-lg w-[400px] z-100">
          <h2 className="text-xl font-bold mb-3">{title}</h2>
          <p className="mb-6">{message}</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={onCancel}
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
