import { useState } from "react";

export default function App() {
  const [clickedRating, setClickedRating] = useState();

  const onClickHandler = (rating) => {
    setClickedRating(rating);
  };

  return (
    <div className="App" style={{ display: "flex" }}>
      {[1, 2, 3, 4, 5].map((rating, index) => (
        <div
          style={{ fontSize: "30px" }}
          key={index}
          onClick={() => onClickHandler(rating)}
        >
          <span style={{ color: rating <= clickedRating ? "red" : "" }}>
            &#9734;
          </span>
        </div>
      ))}
    </div>
  );
}
