import { getRandomInt, isPositionInList } from "../utils/utils.js";

export class Food {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.coordinates = { x: 0, y: 0 };
    }

    init(field, snakeBody = []) {
        this.randomizePosition(field, snakeBody);
    }

    randomizePosition(field, snakeBody = []) {
        const { gridSize, cellSize, headerHeight = 0 } = field;
        let newPosition;

        do {
            newPosition = {
                x: getRandomInt(gridSize),
                y: getRandomInt(gridSize)
            };

        } while (isPositionInList(newPosition, snakeBody));

        this.position = newPosition;

        this.coordinates = {
            x: newPosition.x * cellSize,
            y: (newPosition.y * cellSize) + headerHeight
        };
    }
}
