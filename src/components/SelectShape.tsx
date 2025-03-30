import '../styles/components.css';
import Shape from './Shape';
import ShowCross from './ShowCross';
import { selectShapeProps } from "../types/interfaces";
import { useState, useEffect } from "react";
import { Color, HoleLocation } from "../types/types";

function SelectShape({ resetTest, color, congruent }: selectShapeProps) {
    
    const [startTime] = useState<number>(Date.now());
    const [leftColor] = useState<Color>(Math.random() < 0.5 ? "red" : "blue");
    const [leftHoleLocation] = useState<HoleLocation>(
        congruent ?
        (color === leftColor ? (Math.random() < 0.5 ? "left" : "right") : "vertical") :
        (color === leftColor ? "vertical" : (Math.random() < 0.5 ? "left" : "right"))
    );
    const [rightHoleLocation] = useState<HoleLocation>(
        leftHoleLocation === "vertical" ? (Math.random() < 0.5 ? "left" : "right") : "vertical"
    );
    
    const handleClick = (clickLeft: boolean) => {
        // Temps de réaction
        const endTime = Date.now(); // Enregistrer l'heure de fin
        const reactionTime = endTime - startTime; // Calculer le temps de réaction

        // Vérifier si la réponse est correcte
        let correct = false; // Default to false
        if (leftHoleLocation !== "vertical" ) {
            if (leftHoleLocation === "left" && clickLeft) {
                correct = true;
            } else if (leftHoleLocation === "right" && !clickLeft) {
                correct = true;
            }

        }
        if (rightHoleLocation !== "vertical" ) {
            if (rightHoleLocation === "left" && clickLeft) {
                correct = true;
            } else if (rightHoleLocation === "right" && !clickLeft) {
                correct = true;
            }
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
            <div onClick={() => handleClick(false)}><Shape color={leftColor === "red" ? "blue" : "red"} holeLocation={rightHoleLocation} /></div>
            
        </div>
    );
  }
  
  export default SelectShape;