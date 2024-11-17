import React from "react";
import "./LoadingMap.css";

export function Capitalize(text) {
  const capitalizeThis = text;
  if (!capitalizeThis) return null;
  return capitalizeThis.charAt(0).toUpperCase() + capitalizeThis.slice(1);
}

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

/**
 * Return the age of user based on the Birthdate value
 * --Adrean 10/30/2024
 */

export function GetUserAge(bday) {
  const date = new Date(bday);
  const today = new Date();

  let age = today.getFullYear() - date.getFullYear();
  const monthDifference = today.getMonth() - date.getMonth();

  // If the birth date hasn't occurred yet this year, subtract 1 from the age
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < date.getDate())
  ) {
    age--;
  }

  return age;
}

//Loading Map

export function LoadingMap() {
  return (
    <div className="loading-map-container">
      <div className="spinner"></div>
      <p>Loading map...</p>
    </div>
  );
}
