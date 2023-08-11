import React, { useRef, useState } from "react";

const App = () => {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [otpValues, setOTPValues] = useState(["", "", "", ""]);

  const handleInputChange = (index, e) => {
    const value = e.target.value;
    const newOTPValues = [...otpValues];
    newOTPValues[index] = value;
    setOTPValues(newOTPValues);

    if (value.length > 0 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  return (
    <div>
    <div style={{ display: "flex" }}>
      {inputRefs.map((ref, index) => (
        <input
          key={index}
          style={{ width: "40px", height: "60px" }}
          ref={ref}
          className="otp-input"
          type="number"
          maxLength={1}
          value={otpValues[index]}
          onChange={(e) => handleInputChange(index, e)}
        />
      ))}
      </div>
      <button onClick={() => console.log(otpValues)}>Submit</button>
    </div>
  );
};

export default App;
