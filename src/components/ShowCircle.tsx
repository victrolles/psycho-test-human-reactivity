import { ShowCircleProps } from "../types/interfaces";
import '../styles/components.css';
import { useState } from "react";

function ShowCircle({ color, istext }: ShowCircleProps) {
    const [text] = useState<String>(color === "blue" ?"Bleu" :"Rouge");

    return (

      <div className="show-circle">
        {istext ? (
          <div className="circle-text">{text}</div>
        ) : (
          <div className="circle" style={{ backgroundColor: color }}></div>
        )}
        </div>
    );
  }
  
  export default ShowCircle;