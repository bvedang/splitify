import React from "react";

interface ChipProps {
  label: string;
  onDelete: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, onDelete }) => {
  return (
    <div className="flex items-center justify-center bg-blue-600 grow-0 text-gray-200 text-sm font-semibold mr-2 px-2 py-0.5 rounded-3xl">
      <span className="mr-1">{label}</span>
      <button onClick={onDelete} className="border-none bg-transparent text-xl px-1 py-0.5">
        &times;
      </button>
    </div>
  );
};

export default Chip;
