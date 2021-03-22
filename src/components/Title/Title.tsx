import React from "react";

import TitleProps from "./Title.types";

const Title = (props: TitleProps): React.ReactElement => {
  const { children, titleType, className } = props;
  switch (titleType) {
    case "h1":
      return <h1 className={className}>{children}</h1>;
    case "h2":
      return <h2 className={className}>{children}</h2>;
    case "h3":
      return <h3 className={className}>{children}</h3>;
    case "h4":
      return <h4 className={className}>{children}</h4>;
    case "h5":
      return <h5 className={className}>{children}</h5>;
    case "h6":
      return <h6 className={className}>{children}</h6>;
    default:
      return <h2 className={className}>{children}</h2>;
  }
};

export default Title;
