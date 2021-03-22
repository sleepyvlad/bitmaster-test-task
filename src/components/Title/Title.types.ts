import React from "react";

export default interface TitleProps {
  children: React.ReactChild;
  titleType?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}
