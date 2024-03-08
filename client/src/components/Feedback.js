//this is manual rating test backend if it works
//if cannot be implemented chat ash
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
};

const Feedback = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState("");

  const handleClick = (value) => {
    setCurrentValue(value);
    setShowForm(true); // Show the feedback form when a rating is clicked
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submitting feedback, you can send the feedback data to your backend here
    console.log("Rating:", currentValue);
    console.log("Comment:", comment);
    // Reset form state
    setCurrentValue(0);
    setHoverValue(undefined);
    setComment("");
    setShowForm(false); // Hide the feedback form after submission
  };

  return (
    <div style={styles.container}>
      <div style={styles.rateCatcherContainer}>
        <label style={styles.label}>Rate Catcher</label>
        <div style={styles.stars}>
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <FaStar
                key={index}
                size={24}
                onClick={() => handleClick(ratingValue)}
                onMouseOver={() => handleMouseOver(ratingValue)}
                onMouseLeave={handleMouseLeave}
                color={
                  (hoverValue || currentValue) > index
                    ? colors.orange
                    : colors.grey
                }
                style={{ marginRight: 10, cursor: "pointer" }}
              />
            );
          })}
        </div>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your comment here..."
            style={styles.textarea}
          />
          <button type="submit" style={styles.submitButton}>Submit</button>
        </form>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  rateCatcherContainer: {
    display: "flex",
    alignItems: "center"
  },
  label: {
    marginRight: 20,
    fontWeight: "bold",
    color: "black" // Set the color of the label to black
  },
  stars: {
    display: "flex",
    flexDirection: "row"
  },
  form: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300
  },
  submitButton: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
    cursor: "pointer"
  }
};


export default Feedback;
