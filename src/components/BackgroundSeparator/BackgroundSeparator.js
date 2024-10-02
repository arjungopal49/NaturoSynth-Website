import React from "react";
import './styles.css'; // Add the CSS file for styling

const BackgroundSeparator = ({ imageUrl }) => {
  return (
    <div className="background-separator-container">
      {/* White bar above the background */}
      <div className="white-bar"></div>

      {/* Background image */}
      <div
        className="background-separator"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      ></div>

      {/* White bar below the background */}
      <div className="white-bar"></div>
    </div>
  );
};

export default BackgroundSeparator;
