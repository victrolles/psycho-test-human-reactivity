import { ShowCircleProps } from "../types/interfaces";
import '../styles/components.css';

function ShowCircle({ color }: ShowCircleProps) {
    return (

      <div className="show-circle">
        <div className="circle" style={{ backgroundColor: color }}></div>
        </div>
    );
  }
  
  export default ShowCircle;