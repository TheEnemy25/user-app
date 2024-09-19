import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 border transition-all duration-300  hover:bg-gray-300 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
