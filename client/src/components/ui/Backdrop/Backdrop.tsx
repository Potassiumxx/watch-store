type BackdropProps = {
  onClose: () => void;
  isVisible: boolean;
};

export default function Backdrop({ onClose, isVisible }: BackdropProps) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? "bg-black/40 opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    />
  );
}
