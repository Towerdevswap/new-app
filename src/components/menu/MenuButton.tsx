import React from "react";

interface MenuButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  className?: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({ icon, label, active, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 transition-all duration-300 ${
        active ? "text-black" : "text-gray-500"
      } ${className}`}
    >
      <div className={`text-2xl ${active ? "text-black" : "text-gray-500"}`}>
        {icon}
      </div>
      <div className="text-xs mt-1">{label}</div>
    </button>
  );
};

export default MenuButton;
