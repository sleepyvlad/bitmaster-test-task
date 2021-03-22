import { HTMLAttributes } from "react";

export default interface InputProps {
  inputProps?: HTMLAttributes<HTMLInputElement>;
  label?: string;
  id: string;
  error?: string;
  setValue: (value: string) => void;
  value: string;
  className?: string;
  suggests?: string[];
}
