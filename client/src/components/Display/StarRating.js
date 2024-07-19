import React from "react";
import { Star, StarBorder, StarHalf } from "@mui/icons-material";

export default function StarRating({ rating }) {
  // Create a function to generate the star components
  const renderStars = () => {
    let stars = [];
    let integerPart = Math.floor(rating); // Full stars
    let decimalPart = rating - integerPart; // Remaining part

    // Add full stars
    for (let i = 0; i < integerPart; i++) {
      stars.push(<Star key={i} />);
    }

    // Add half star if applicable
    if (decimalPart >= 0.5) {
      stars.push(<StarHalf key={integerPart} />);
      integerPart++; // To correctly count the total stars added
    }

    // Add empty stars to complete to 5 stars
    while (integerPart < 5) {
      stars.push(<StarBorder key={integerPart} />);
      integerPart++;
    }

    return stars;
  };

  return <div>{renderStars()}</div>;
}
