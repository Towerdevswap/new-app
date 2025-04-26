import { ReactNode } from "react";

type MenuButtonProps = {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
};

const MenuButton = ({ icon, label, active, onClick }: MenuButtonProps) => (
  <button
    className={`flex flex-col items-center text-sm ${
      active ? "text-blue-500" : "text-gray-600"
    }`}
    onClick={onClick}
  >
    <div className="text-2xl">{icon}</div>
    {label}
  </button>
);

export default MenuButton;
