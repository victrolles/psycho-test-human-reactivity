import { Color, HoleLocation } from "./types"

export interface ShowCircleProps {
    color: Color;
};

export interface ShapeProps {
    color: Color;
    holeLocation: HoleLocation;
};

export interface selectShapeProps {
  resetTest: (reactionTime: number, correct: boolean) => void;
  color: Color;
  congruent: boolean;
}

export interface Data {
    color: Color;
    congruent: boolean;
    correct: boolean;
    reactionTime: number;
}
