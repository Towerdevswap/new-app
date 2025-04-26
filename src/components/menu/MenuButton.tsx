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
      className={`flex flex-col items-center justify-center p-1 rounded-lg ${
        active ? "text-black bg-transparent border-none" : "text-gray-500 bg-transparent"
      } ${className}`} // ✅ tambahkan ini agar styling dari luar bisa masuk
    >
      <div className={`text-2xl bg-transparent border-none ${active ? "text-black" : "text-gray-500"}`}>
        {icon}
      </div>
      <div className="text-xs">{label}</div>
    </button>
  );
};

export default MenuButton;
