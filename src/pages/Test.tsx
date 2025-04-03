import { useEffect, useState } from "react";
import { Color, Phase, Shape } from "../types/types";
import { Data } from "../types/interfaces";
import { saveToExcel } from "../commons/saveToExcel";
import { useNavigate } from "react-router-dom";
import { TestProps } from "../types/interfaces";

import RenderText from "../components/RenderText";
import ShowCross from "../components/ShowCross";
import SelectShape from "../components/SelectShape";
import { getRandomColor, getRandomShape } from "../commons/utils";

const Test = ({ experience }: TestProps) => {
  const [phase, SetPhase] = useState<Phase>('focus');
  const [color, setColor] = useState<Color>('red');
  const [shape, setShape] = useState<Shape>('circle');
  const [congruent, setCongruent] = useState<boolean>(false);
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState<Data[]>([]);
  const navigate = useNavigate();

  // Fonction pour set un timer
  const setTimer = (duration: number, newPhase: Phase) => {
    const timer = setTimeout(() => {
      SetPhase(newPhase);
    }, duration);
    return timer;
  }

  // Reset test
  const resetTest = (reactionTime: number, correct: boolean) => {
    setCounter(counter + 1);
    const shapeColor = `${shape} ${color}`;
    console.log("===== Test reseted =====", counter);
    console.log(`Shape + Color: ${shapeColor}`);
    console.log(`Congruent: ${congruent}`);
    console.log(`Correct: ${correct}`);
    console.log(`Reaction time: ${reactionTime} ms`);
    setData((prevData) => [
      ...prevData,
      { shapeColor, congruent, correct, reactionTime },
    ]);

    if (counter >= 72) {
      console.log("===== Test finished =====");
      console.log("Data:", JSON.stringify(data, null, 2));
      saveToExcel({ data, fileName: `${experience}.xlsx` });
      console.log("Data saved to Excel file.");
      navigate('/'); // Rediriger vers la page d'accueil
    }

    SetPhase('focus');
    setupTest();
  }

  const experience1 = () => {
    // Generate random color
    setColor(getRandomColor);

    // Generate circle
    setShape('circle');

    // Afficher la phase "cross" pendant 0.5 seconde
    const timer1 = setTimer(500, 'cue');
  
    // Afficher la phase "circle" pendant 1.5 seconde
    const timer2 = setTimer(2000, 'test');
  
    // Nettoyer les deux timeouts lors du démontage du composant
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  };

  const experience2 = () => {
    // Generate random color
    setColor('black');

    // Generate circle
    setShape(getRandomShape);

    // Afficher la phase "cross" pendant 0.5 seconde
    const timer1 = setTimer(500, 'cue');
  
    // Afficher la phase "circle" pendant 1.5 seconde
    const timer2 = setTimer(2000, 'test');
  
    // Nettoyer les deux timeouts lors du démontage du composant
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  };

  const experience3 = () => {
    // Generate random color
    setColor(getRandomColor);

    // Generate circle
    setShape(getRandomShape);

    // Afficher la phase "cross" pendant 0.5 seconde
    const timer1 = setTimer(500, 'cue');
  
    // Afficher la phase "circle" pendant 1.5 seconde
    const timer2 = setTimer(2000, 'test');
  
    // Nettoyer les deux timeouts lors du démontage du composant
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  };

  const setupTest = () => {
    // Définir si congruent ou non
    setCongruent(Math.random() < 0.5 ? true : false);

    if (experience === 'color') {
      return experience1();
    }
    if (experience === 'shape') {
      return experience2();
    }
    if (experience === 'both') {
      return experience3();
    }
    return () => {
      // Cleanup function if needed
    }

  }

  useEffect(() => {
    const cleanup = setupTest();
    return () => {
      cleanup();
    };
  }, []);

  return (
    <div className="Test">
        {phase === 'focus' && <ShowCross />}
        {phase === 'cue' && <RenderText color={color} shape={shape} experience={experience}/>}
        {phase === 'test' && <SelectShape resetTest={resetTest} shape={shape} color={color} congruent={congruent} experience={experience}/>}
    </div>
  );
};

export default Test;
