import React from "react";

export function DisplayDate(theDate) {
  //Display format to date
  // months into words

  const date = new Date(theDate);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]; // Get the month and year from the date object
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Construct the formatted date string
  return `${month} ${date.getDate()}, ${year}`;
}
