import "./styles.css";
import { useState } from "react";

export default function App() {
  const [progVal, setProgVal] = useState(0);

  return (
    <div className="App">
      <span className="text">{progVal}% completed</span>
      <progress
        data-label="Loading..."
        className="progressstyle"
        max="100"
        value={progVal}
      ></progress>
      <br />
      <button onClick={() => setProgVal((prev) => prev + 10)}>+</button>
      <button onClick={() => setProgVal((prev) => prev - 10)}>-</button>
      <button onClick={() => setProgVal(0)}>Reset</button>
    </div>
  );
}


//CSS
.App {
  position: relative;
  display: block;
  width:100%;
}

.text {
  position: absolute;
  display: inline-block;
  color: red;
  text-align: right;
  width:60%;
}

.progressstyle {
  width: 100%;
  border-radius: 10px;
}

.progressstyle::-moz-progress-bar {
  background-color: black;
}

.progressstyle::-webkit-progress-bar {
  background-color: black;
}
