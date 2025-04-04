import { RenderTextProps } from "../types/interfaces";
import '../styles/components.css';

function RenderText({ color, shape, experience }: RenderTextProps) {

    // traduction des mots en français
    const shapeTranslation: { [key: string]: string } = {
        circle: "cercle",
        square: "carré",
        triangle: "triangle",
    };
    const colorTranslation: { [key: string]: string } = {
        red: "rouge",
        green: "vert",
        blue: "bleu",
    };

    return (
      <div className="render-text">
        {experience === 'color' && <p>{colorTranslation[color]}</p>}
        {experience === 'shape' && <p>{shapeTranslation[shape]}</p>}
        {(experience === 'both' || experience === 'all') && <p>{`${shapeTranslation[shape]} ${colorTranslation[color]}`}</p>}
      </div>
    );
  }
  
  export default RenderText;