import React from "react";

interface ButtonProps {
  borderColor: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ borderColor, children, onClick }) => {
  return (
    <button className="" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
