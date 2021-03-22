import React from "react";

export default interface SuggestsProps {
  suggests: string[];
  onSuggestClick: (
    event: React.SyntheticEvent<HTMLButtonElement>,
    suggest: string
  ) => void;
  suggestShown: boolean;
}
