import { useEffect, useState } from "react";
import { Color, Phase } from "../types/types";
import { Data } from "../types/interfaces";
import { saveToExcel } from "../commons/saveToExcel";
import { useNavigate } from "react-router-dom";

import ShowCircle from "../components/ShowCircle";
import ShowCross from "../components/ShowCross";
import SelectShape from "../components/SelectShape";

const Test1 = () => {
  const [phase, SetPhase] = useState<Phase>('cross');
  const [color, setColor] = useState<Color>('red');
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
    console.log("===== Test reseted =====", counter);
    console.log(`Reaction time: ${reactionTime} ms`);
    console.log(`Correct: ${correct}`);
    console.log(`Congruent: ${congruent}`);
    console.log(`Color: ${color}`);
    setData((prevData) => [
      ...prevData,
      { color, congruent, correct, reactionTime },
    ]);

    if (counter >= 5) {
      console.log("===== Test finished =====");
      console.log("Data:", JSON.stringify(data, null, 2));
      saveToExcel({ data, fileName: "Data Experience 1" });
      console.log("Data saved to Excel file.");
      navigate('/'); // Rediriger vers la page Test2
    }

    SetPhase('cross');
    setupTest();
  }

  const setupTest = () => {
    //Définir une couleur aléatoire
    setColor(Math.random() < 0.5 ? "red" : "blue")

    // Définir si congruent ou non
    setCongruent(Math.random() < 0.5 ? true : false);

    // Afficher la phase "cross" pendant 0.5 seconde
    const timer1 = setTimer(500, 'circle');

    // Afficher la phase "circle" pendant 1.5 seconde
    const timer2 = setTimer(2000, 'selectShape');

    // // Nettoyer les deux timeouts lors du démontage du composant
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    }
  }

  useEffect(() => {
    const cleanup = setupTest();
    return () => {
      cleanup();
    };
  }, []);

  return (
    <div className="test1">
        {phase === 'cross' && <ShowCross />}
        {phase === 'circle' && <ShowCircle color={color} />}
        {phase === 'selectShape' && <SelectShape resetTest={resetTest} color={color} congruent={congruent}/>}
    </div>
  );
};

export default Test1;
