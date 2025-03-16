import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/70 p-2">
      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-lg border-4 border-black relative">
        <X
          className="absolute top-1 right-1 w-8 h-8 cursor-pointer"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
}
