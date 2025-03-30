import '../styles/components.css';
import { ShapeProps } from "../types/interfaces";

function Shape({ color, holeLocation }: ShapeProps) {

    // Définir les 4 styles possibles pour le trou
    const holeStyles = {
        bottom: { left : 'calc(50% - 50px)' },
        top: { bottom: 'calc(100% - 50px)', left: 'calc(50% - 50px)' },
        left: { bottom: 'calc(50%)' },
        right: { bottom: 'calc(50%)', left: 'calc(100% - 50px)' },
    };

    let holeStyle;

    if (holeLocation === "vertical") {
        if (Math.random() < 0.5) {
            holeStyle = holeStyles.top;
        }
        else {
            holeStyle = holeStyles.bottom;
        }
    } else if (holeLocation === "left") {
        holeStyle = holeStyles.left;
    } else if (holeLocation === "right") {
            holeStyle = holeStyles.right;
    } else {
        console.error(`Invalid hole location: ${holeLocation}`);
    }
        
    return (

        <div className="shape">
            <div className="square-outside" style={{ backgroundColor: color }}>
                <div className="square-inside"></div>
                <div className="square" style={holeStyle}></div>
            </div>
        </div>
    );
  }
  
  export default Shape;