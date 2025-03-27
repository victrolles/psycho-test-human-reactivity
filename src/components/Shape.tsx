import React from "react";
import "../styles/components.css"; // Import your CSS file for styles

interface ShapeProps {
  shape: "rectangle" | "square" | "diamond" | "star" | "heart" | "triangle" | "circle";
  color?: string; // RGB color like "rgb(255,0,0)"
  texture?: string; // URL of the texture image
}

const Shape: React.FC<ShapeProps> = ({ shape, color, texture }) => {
  const getShapeStyle = (): React.CSSProperties => {
    let baseStyle: React.CSSProperties = {
      width: "100px",
      height: "100px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: texture ? `url(${texture})` : color,
      backgroundSize: "cover",
    };

    switch (shape) {
      case "rectangle":
        return { ...baseStyle, width: "150px", height: "100px" };
      case "square":
        return { ...baseStyle, width: "100px", height: "100px" };
      case "diamond":
        return {
          ...baseStyle,
          width: "100px",
          height: "100px",
          transform: "rotate(45deg)",
        };
      case "star":
        return {
          ...baseStyle,
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        };
      case "heart":
        return {
          ...baseStyle,
          width: "100px",
          height: "100px",
          clipPath: "path('M50 15C35 -10 0 10 0 40C0 80 50 100 50 100C50 100 100 80 100 40C100 10 65 -10 50 15Z')",
        };
      case "triangle":
        return {
          ...baseStyle,
          width: "0",
          height: "0",
          borderLeft: "50px solid transparent",
          borderRight: "50px solid transparent",
          borderBottom: "100px solid " + (color || "black"),
          background: "none",
        };
      case "circle":
        return {
          ...baseStyle,
          width: "100px",
          height: "100px",
          borderRadius: "50%",
        };
      default:
        return baseStyle;
    }
  };

  return <div className="test-item" style={getShapeStyle()} />;
};

export default Shape;
