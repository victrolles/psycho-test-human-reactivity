import { useEffect, useState } from "react";
import { Color, Phase, Shape } from "../types/types";
import { Data } from "../types/interfaces";
import { saveToExcel } from "../commons/saveToExcel";
import { useNavigate } from "react-router-dom";
import { TestProps } from "../types/interfaces";

import RenderText from "../components/RenderText";
import ShowCross from "../components/ShowCross";
import SelectShape from "../components/SelectShape";
import { getRandomColor, getRandomShape, generateCongruentList } from "../commons/utils";

const Test = ({ experience }: TestProps) => {
  const [phase, SetPhase] = useState<Phase>('focus');
  const [color, setColor] = useState<Color>('red');
  const [shape, setShape] = useState<Shape>('circle');
  const [congruent, setCongruent] = useState<boolean>(false);
  const [congruentList, setCongruentList] = useState<boolean[]>([]);
  const [currentTrial, setCurrentTrial] = useState<number>(-1);
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState<Data[]>([]);
  const [maxCounter] = useState(54);
  const navigate = useNavigate();

  useEffect(() => {
    // Générer une liste équilibrée de tests congruents et non congruents
    const list = generateCongruentList(maxCounter);
    setCongruentList(list);
    console.log("Congruent list:", list);
  }, [maxCounter]);

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

    if (counter >= maxCounter) {
      console.log("===== Test finished =====");
      console.log("Data:", JSON.stringify(data, null, 2));
      saveToExcel({ data, fileName: `${experience}.xlsx` });
      console.log("Data saved to Excel file.");
      navigate('/'); // Rediriger vers la page d'accueil
    }
    setupTest();
  }

  const experience1 = () => {
    // Generate random color
    setColor(getRandomColor);

    // Generate circle
    setShape('circle');

    // Afficher la phase "cross" pendant 2 seconde
    const timer1 = setTimer(2000, 'cue');

    // Afficher pauser pendant 2 seconde
    const timer2 = setTimer(3500, 'pause');
  
    // Afficher la phase "circle" pendant 2 seconde
    const timer3 = setTimer(6500, 'test');
  
    // Nettoyer les deux timeouts lors du démontage du composant
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const experience2 = () => {
    // Generate random color
    setColor('black');

    // Generate circle
    setShape(getRandomShape);

    // Afficher la phase "cross" pendant 2 seconde
    const timer1 = setTimer(2000, 'cue');

    // Afficher pauser pendant 2 seconde
    const timer2 = setTimer(3500, 'pause');
  
    // Afficher la phase "circle" pendant 2 seconde
    const timer3 = setTimer(6500, 'test');
  
    // Nettoyer les deux timeouts lors du démontage du composant
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const experience3 = () => {
    // Generate random color
    setColor(getRandomColor);

    // Generate circle
    setShape(getRandomShape);

    // Afficher la phase "cross" pendant 2 seconde
    const timer1 = setTimer(2000, 'cue');

    // Afficher pauser pendant 2 seconde
    const timer2 = setTimer(3500, 'pause');
  
    // Afficher la phase "circle" pendant 2 seconde
    const timer3 = setTimer(6500, 'test');
  
    // Nettoyer les deux timeouts lors du démontage du composant
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const setupTest = () => {
    // Définir si congruent ou non à partir de la liste
    if (currentTrial < congruentList.length) {
      setCongruent(congruentList[currentTrial]);
    }

    SetPhase('focus');
    setCurrentTrial(currentTrial + 1); // Passer au prochain essai

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
  }, [congruentList]);

  return (
    <div className="Test">
        {phase === 'focus' && <ShowCross />}
        {phase === 'cue' && <RenderText color={color} shape={shape} experience={experience}/>}
        {phase === 'test' && <SelectShape resetTest={resetTest} shape={shape} color={color} congruent={congruent} experience={experience}/>}
    </div>
  );
};

export default Test;
