import React, { ChangeEvent, useState } from "react";

import InputProps from "./Input.types";
import clsx from "clsx";

import cn from "./Input.module.pcss";
import Suggests from "./parts/Suggests";

const Input = (props: InputProps): React.ReactElement => {
  const {
    inputProps,
    error,
    label,
    setValue,
    value,
    className,
    id,
    suggests,
  } = props;

  const onChange = (ev: ChangeEvent<HTMLInputElement>): void => {
    setValue(ev.target.value);
  };

  const [showSuggest, setShowSuggest] = useState(false);

  const suggestOnClick = (
    event: React.SyntheticEvent<HTMLInputElement>,
    suggest: string
  ) => {
    setValue(suggest);
    setShowSuggest(false);
    event.preventDefault();
  };

  const openSuggests = () => {
    setShowSuggest(true);
  };

  const closeSuggests = () => {
    setShowSuggest(false);
  };

  return (
    <div className={cn["input-container"]}>
      {label && (
        <label className={cn["label"]} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={cn["input-wrapper"]}>
        <input
          onFocus={openSuggests}
          onBlur={closeSuggests}
          {...inputProps}
          onChange={onChange}
          value={value}
          id={id}
          className={clsx(cn["input"], className)}
        />
        {error && (
          <span className={clsx("red-text", cn["error"])}>{error}</span>
        )}
        {suggests.length ? (
          <Suggests
            suggestShown={showSuggest}
            suggests={suggests}
            onSuggestClick={suggestOnClick}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Input;
