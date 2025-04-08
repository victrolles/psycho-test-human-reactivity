import { Color, Shape } from '../types/types';
import { ShapeProps } from '../types/interfaces';

export const getRandomColor = (currentColor: Color | null): Color => {
    // Define all possible colors
    const colors: Color[] = ['red', 'blue', 'green'];

    // Si currentColor est null, retourner une couleur aléatoire
    if (currentColor === null) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    // Filter out the current color
    const availableColors = colors.filter(color => color !== currentColor);

    // Pick a random color from the remaining options
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    return availableColors[randomIndex];
};

export const getRandomShape = (currentShape: Shape | null): Shape => {
    // Define all possible shapes
    const shapes: Shape[] = ['circle', 'square', 'triangle'];

    // Si currentShape est null, retourner une forme aléatoire
    if (currentShape === null) {
        const randomIndex = Math.floor(Math.random() * shapes.length);
        return shapes[randomIndex];
    }

    // Filter out the current shape
    const availableShapes = shapes.filter(shape => shape !== currentShape);

    // Pick a random shape from the remaining options
    const randomIndex = Math.floor(Math.random() * availableShapes.length);
    return availableShapes[randomIndex];
};

export const getRandomShapeColor = (ShapeProps: ShapeProps): ShapeProps => {
    const { color, shape } = ShapeProps;
    let newColor: Color = getRandomColor(null);
    let newShape: Shape = getRandomShape(null);

    while (newColor === color && newShape === shape) {
        newColor = getRandomColor(null);
        newShape = getRandomShape(null);
    }

    return {
        color: newColor,
        shape: newShape,
    };
}

// Fonction pour mélanger un tableau
const shuffleArray = (array: boolean[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const countTrues = (array: boolean[]) => {
    return array.reduce((count, value) => count + (value ? 1 : 0), 0);
}

const countFalses = (array: boolean[]) => {
    return array.reduce((count, value) => count + (value ? 0 : 1), 0);
}

// Générer une liste équilibrée de tests congruents et non congruents
export const generateCongruentList = (totalTrials: number): boolean[] => {
    const half = Math.floor(totalTrials / 2);
    const congruentList = Array(half).fill(true).concat(Array(totalTrials - half).fill(false));
    const shuffledArray = shuffleArray(congruentList);
    console.log("Shuffled array True :", countTrues(shuffledArray));
    console.log("Shuffled array False :", countFalses(shuffledArray));
    return shuffledArray;
};