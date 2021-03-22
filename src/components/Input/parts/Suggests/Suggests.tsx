import React from "react";

import SuggestsProps from "./Suggests.types";
import cn from "./Suggests.module.pcss";

const Suggests = (props: SuggestsProps): React.ReactElement => {
  const { suggests, onSuggestClick, suggestShown } = props;

  return suggestShown ? (
    <div className={cn["suggests-container"]}>
      {suggests.map((suggest) => {
        return (
          <button
            className={cn["suggest"]}
            key={suggest}
            onMouseDown={(event) => onSuggestClick(event, suggest)}
          >
            {suggest}
          </button>
        );
      })}
    </div>
  ) : null;
};

export default Suggests;
