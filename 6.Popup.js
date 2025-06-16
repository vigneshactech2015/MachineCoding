import React,{useState} from 'react'

function Popup() {
    const[show,setShow] = useState(false)
  return (
    <div >
    <button onClick={()=>setShow(true)}>Show Popup</button>

    {show && 
<div style={{width:"100vw",height:"100vh",backgroundColor:"rgba(49,49,49,0.8)",
      position:"fixed",top:"0",left:"0",right:"0",bottom:"0"}} 
           onClick={()=>setShow(false)}> 
<div onClick={(e)=>e.stopPropagation()} 
style={{position:"absolute",top:"40%",left:"50%",transform:"translate(-50%,-50%)",lineHeight:"1.4",
background:"white",padding:"14px 28px",borderRadius:"3px",maxWidth:"600px",minWidth:"300px"}}>
        </div>
        </div>}
    </div>
  )
}

export default Popup


//Popup on hover

import React, { useState } from "react";

const Popup = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleMouseEnter = () => {
    setPopupVisible(true);
  };

  const handleMouseLeave = () => {
    setPopupVisible(false);
  };

  return (
    <div className="container">
      <button
        className="show-button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Show Popup
      </button>
      {isPopupVisible && (
        <div
          style={{ border: "2px solid red" }}
          className="popup-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="popup">This is the popup content.</div>
        </div>
      )}
    </div>
  );
};

export default Popup;
