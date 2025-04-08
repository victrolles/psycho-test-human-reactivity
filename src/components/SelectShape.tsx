import '../styles/components.css';
import RenderShape from './RenderShape';
import { selectShapeProps } from "../types/interfaces";
import { useState, useEffect } from "react";
import { Color, Shape } from "../types/types";
import { getRandomColor, getRandomShape, getRandomShapeColor } from '../commons/utils';

function SelectShape({ resetTest, shape, color, congruent, experience }: selectShapeProps) {
    
    const [startTime] = useState<number>(Date.now());
    const [targetColor, setTargetColor] = useState<Color>();
    const [targetShape, setTargetShape] = useState<Shape>();
    const [done, setDone] = useState<boolean>(false);
    
    const handleClick = (similaire: boolean) => {

        // Temps de réaction
        const endTime = Date.now(); // Enregistrer l'heure de fin
        const reactionTime = endTime - startTime; // Calculer le temps de réaction

        // Vérifier si la réponse est correcte
        let correct; // Default to false
        if (similaire) {
            correct = targetColor === color && targetShape === shape;
        } else {
            correct = targetColor !== color || targetShape !== shape;
        }
        

        resetTest(reactionTime, correct);
    }

    // Ajouter un écouteur pour les pressions de touches
    useEffect(() => {
        if (!done) {
            setDone(true);

            if (congruent) {
                setTargetColor(color);
                setTargetShape(shape);
            } else {
                if (experience === 'both') {
                    const {color: newColor, shape: newShape } = getRandomShapeColor({ color, shape });
                    setTargetColor(newColor);
                    setTargetShape(newShape);
                } else if (experience === 'color') {
                    setTargetColor(getRandomColor(color));
                    setTargetShape("circle");
                } else if (experience === 'shape') {
                    setTargetColor("black");
                    setTargetShape(getRandomShape(shape));
                }
            }
            
        }


        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowRight") {
                handleClick(true); // Flèche gauche
            } else if (event.key === "ArrowLeft") {
                handleClick(false); // Flèche droite
            }
        };

        // Ajouter l'écouteur d'événement
        window.addEventListener("keydown", handleKeyDown);

        // Nettoyer l'écouteur d'événement lors du démontage du composant
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [startTime, targetColor, targetShape]); // Dépendances nécessaires


    return (

        <div className="select-shape">
            {targetColor && targetShape && <RenderShape color={targetColor} shape={targetShape} /> }
        </div>
    );
  }
  
  export default SelectShape;