import React, { useEffect, useState } from "react";
import "./LoadingMap.css";
import axios from "axios";
import { Badge } from "@mui/joy";

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
export function AmountDecimal(amount) {
  // Check if the amount is valid
  if (!amount || isNaN(amount)) return "0.00"; // Default to 0.00 if the input is invalid or empty

  const num = parseFloat(amount); // Convert the input to a float
  return num.toFixed(2); // Format it to 2 decimal places
}

export function ApplicantsCount(id) {
  const [num, setNum] = useState();
  useEffect(() => {
    // Simulate fetching counts from backend API, be removed

    const fetchCount = async () => {
      try {
        const res2 = await axios.get(
          `http://localhost:8800/post-and-applicant-count/${id}`
        );
        setNum(res2.data[0].applicantCount);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCount();
    const interval = setInterval(fetchCount, 10000); // 10 seconds refresh
    return () => clearInterval(interval);
  }, [id, num]);
  return num;
}
