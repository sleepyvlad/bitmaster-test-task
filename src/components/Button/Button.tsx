import React from "react";

import ButtonProps from "./Button.types";
import cn from "./Button.module.pcss";
import clsx from "clsx";

const Button = (props: ButtonProps): React.ReactElement => {
  const { className, buttonAttributes, onClick, children } = props;
  return (
    <button
      {...buttonAttributes}
      className={clsx(cn["button"], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
