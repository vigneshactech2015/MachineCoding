import React, { useState } from "react";
import "./styles.css";

const App = () => {
  const [rating, setRating] = useState(0);

  function starhandler(value) {
    setRating(value);
  }

  return (
    <div className="star-container">
      {[...Array(5)].map((ar, index) => {
        const val = index + 1;
        return (
          <span
            className={val <= rating ? "unfill" : "fill"}
            onClick={() => starhandler(val)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default App;

//css

.star-container {
  display: flex;
}

.unfill {
  color: yellow;
}

.fill {
  color: grey;
}

