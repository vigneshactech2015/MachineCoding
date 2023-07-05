//css
.star-rating {
  display: inline-block;
  font-size: 24px;
}

.star {
  cursor: pointer;
  color: #ccc;
}

.filled {
  color: #fdd835;
}

//react jsx

import React, { useState } from 'react';
import './styles.css';

const App = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className={starValue <= rating ? 'star filled' : 'star'}
            onClick={() => handleStarClick(starValue)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default App;
