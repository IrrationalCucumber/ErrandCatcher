import React from "react";

export function Capitalize(text) {
  const capitalizeThis = text;
  return capitalizeThis.charAt(0).toUpperCase() + capitalizeThis.slice(1);
}
