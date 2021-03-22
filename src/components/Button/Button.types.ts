import React, { HTMLAttributes } from "react";

export default interface ButtonProps {
  className?: string;
  buttonAttributes?: HTMLAttributes<HTMLButtonElement>;
  children: React.ReactNode;
  onClick: () => void;
}
