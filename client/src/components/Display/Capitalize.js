import React from "react";

export default function Capitalize(text) {
  const capitalizeThis = text;
  return capitalizeThis.charAt(0).toUpperCase() + capitalizeThis.slice(1);
}
