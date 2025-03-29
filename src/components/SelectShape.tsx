import '../styles/components.css';
import Shape from './Shape';
import ShowCross from './ShowCross';
import { selectShapeProps } from "../types/interfaces";
import { useState, useEffect } from "react";
import { Color, HoleLocation } from "../types/types";

function SelectShape({ resetTest, color, congruent }: selectShapeProps) {
    
    const [startTime, setStartTime] = useState<number>(Date.now());
    const [leftColor, setLeftColor] = useState<Color>(Math.random() < 0.5 ? "red" : "blue");
    const [leftHoleLocation, setLeftHoleLocation] = useState<HoleLocation>(
        congruent ?
        (color === leftColor ? "horizontal" : "vertical") :
        (color === leftColor ? "vertical" : "horizontal")
    );
    
    const handleClick = (clickLeft: boolean) => {
        // Temps de réaction
        const endTime = Date.now(); // Enregistrer l'heure de fin
        const reactionTime = endTime - startTime; // Calculer le temps de réaction

        // Vérifier si la réponse est correcte
        let correct;
        if (clickLeft) {
            correct = leftHoleLocation === "horizontal";
        } else {
            correct = leftHoleLocation === "vertical";
        }

        resetTest(reactionTime, correct);
    }

    // Ajouter un écouteur pour les pressions de touches
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") {
                handleClick(true); // Flèche gauche
            } else if (event.key === "ArrowRight") {
                handleClick(false); // Flèche droite
            }
        };

        // Ajouter l'écouteur d'événement
        window.addEventListener("keydown", handleKeyDown);

        // Nettoyer l'écouteur d'événement lors du démontage du composant
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [startTime, leftHoleLocation, leftColor]); // Dépendances nécessaires


    return (

        <div className="select-shape">
            <div onClick={() => handleClick(true)}><Shape color={leftColor} holeLocation={leftHoleLocation}/></div>
            <ShowCross />
            <div onClick={() => handleClick(false)}><Shape color={leftColor === "red" ? "blue" : "red"} holeLocation={leftHoleLocation === "vertical" ? "horizontal" : "vertical"} /></div>
            
        </div>
    );
  }
  
  export default SelectShape;