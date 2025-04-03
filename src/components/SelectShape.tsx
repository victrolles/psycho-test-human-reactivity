import '../styles/components.css';
import RenderShape from './RenderShape';
import { selectShapeProps } from "../types/interfaces";
import { useState, useEffect } from "react";
import { Color, Shape } from "../types/types";
import { getRandomColor, getRandomShape } from '../commons/utils';

function SelectShape({ resetTest, shape, color, congruent, experience }: selectShapeProps) {
    
    const [startTime] = useState<number>(Date.now());
    const [targetColor] = useState<Color>(
        congruent ?
        color :
        (experience === 'shape' ? "black" : getRandomColor(color))
    );
    const [targetShape] = useState<Shape>(
        congruent ?
        shape :
        (experience === 'color' ? "circle" : getRandomShape(shape))
    );
    
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
    }, [startTime]); // Dépendances nécessaires


    return (

        <div className="select-shape">
            <RenderShape color={targetColor} shape={targetShape}/>
        </div>
    );
  }
  
  export default SelectShape;