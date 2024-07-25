import React from "react";
import { Star, StarBorder, StarHalf } from "@mui/icons-material";

export default function StarRating({ rating }) {
  // Limit the rating to be between 0 and 5
  const limitedRating = Math.min(Math.max(rating, 0), 5);

  // Create a function to generate the star components
  const renderStars = () => {
    let stars = [];
    let integerPart = Math.floor(limitedRating); // Full stars
    let decimalPart = limitedRating - integerPart; // Remaining part

    // Add full stars
    for (let i = 0; i < integerPart; i++) {
      stars.push(<Star key={i} sx={{ color: "gold" }} />);
    }

    // Add half star if applicable
    if (decimalPart >= 0.5) {
      stars.push(<StarHalf key={integerPart} sx={{ color: "gold" }} />);
      integerPart++; // To correctly count the total stars added
    }

    // Add empty stars to complete to 5 stars
    while (integerPart < 5) {
      stars.push(<StarBorder key={integerPart} sx={{ color: "gold" }} />);
      integerPart++;
    }

    return stars;
  };

  return <div>{renderStars()}</div>;
}
