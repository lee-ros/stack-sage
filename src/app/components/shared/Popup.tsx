interface PopupProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

export default function Popup({ children, isOpen, onClose }: PopupProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit bg-surface bg-opacity-50 flex rounded-2xl p-4">
        {children}
      </div>
    </>
  );
}
