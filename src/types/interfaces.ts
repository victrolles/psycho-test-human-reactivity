import { Color, Shape, Experience } from "./types"

export interface RenderTextProps {
    color: Color;
    shape: Shape;
    experience: Experience;
};

export interface ShapeProps {
    color: Color;
    shape: Shape;
};

export interface selectShapeProps {
  resetTest: (reactionTime: number, correct: boolean) => void;
  shape: Shape;
  color: Color;
  congruent: boolean;
  experience: Experience;
}

export interface Data {
    color: Color;
    shape: Shape;
    congruent: boolean;
    correct: boolean;
    reactionTime: number;
}

export interface TestProps {
    experience: Experience;
}
