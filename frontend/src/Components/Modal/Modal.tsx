import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?:string
}

export default function Modal({ isOpen, onClose, children,title }: ModalProps) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0  top-0 left-0 right-0 bottom-0 overflow-y-auto flex justify-center items-center z-40 bg-opacity-75 transition-opacity duration-300 bg-gray-900">
      <div className="relative container m-2 p-5 border border-gray-700 w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-gray-800 text-gray-200">

        <p className="flex justify-between">
          <span className="mx-2 text-gray-300 flex items-center">{title}</span>
          <button className="rounded hover:bg-gray-700 px-4 py-2 transition-all duration-300 hover:shadow-md " onClick={onClose}>
            ×
          </button>
        </p>

        <div className="mx-auto flex items-center justify-center">{children}</div>
      </div>
    </div>
  );
}
