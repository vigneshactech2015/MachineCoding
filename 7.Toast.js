//App.js
<Toast label="error" type="error" position="bottom-center"/>

import {useState,useEffect} from "react";

const Toast = ( {label,type,position}) =>{

    const[color,setColor] = useState("green")
    const[timeout,setTime] = useState(true)
    const[posi,setPosi] = useState(0)
    const[p1,setP1] = useState(0)

    useEffect(()=>{
        if(position === "top-left"){
            setPosi(0)
            setP1(0)
        }
        if(position === "top-center"){
            setPosi(40)
            setP1(0)
        }
        if(position === "top-right"){
            setPosi(70)
            setP1(0)
        }
        if(position === "bottom-left"){
            setP1(90)
            setPosi(0)
        }
        if(position === "bottom-center"){
            setP1(90)
            setPosi(40)
        }
        if(position === "bottom-right"){
            setP1(90)
            setPosi(70)
        }
    },[])

    useEffect(()=>{
        if(type === "success"){
            setColor("green")
        }if(type === "warning"){
            setColor("yellow")
        }if(type === "error"){
            setColor("red")
        }
    },[])

   useEffect(()=>{
        setTimeout(()=>{
            setTime(false)
        },3000)
    },[])

    function closeHandler(){
        setTime(false)
    }
  

return(
    <div>
    {console.log(`${posi}%`)}
    {timeout && <div className="toast_Container" style={{background:color,position:"absolute",left:`${posi}%`,top:`${p1}%`}}>
    {label} <span className="close" onClick={closeHandler}>X</span>
    </div>}
    </div>
)
}

//css

.toast_Container{
  width:20%;
  padding:1%;
  text-align: center;
  color:white;
  position: absolute;
}

.close{
  color:white;
  float: right;
}
