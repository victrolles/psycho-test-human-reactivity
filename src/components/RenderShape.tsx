import '../styles/components.css';
import { ShapeProps } from "../types/interfaces";

function RenderShape({ color, shape }: ShapeProps) {
    // Définir le style en fonction de la forme
    const shapeStyle = shape === "triangle"
        ? { borderBottom: `300px solid ${color}` }
        : { backgroundColor: color };

    return (
        <div className="shape">
            <div className={`${shape}`} style={shapeStyle}>
                {/* Contenu supplémentaire si nécessaire */}
            </div>
        </div>
    );
}

export default RenderShape;