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
        let isInsideSnake;

        do {
            newPosition = {
                x: Math.floor(Math.random() * gridSize),
                y: Math.floor(Math.random() * gridSize)
            };

            isInsideSnake = snakeBody.some(
                segment => segment.x === newPosition.x && segment.y === newPosition.y
            );

        } while (isInsideSnake);

        this.position = newPosition;

        this.coordinates = {
            x: newPosition.x * cellSize,
            y: (newPosition.y * cellSize) + headerHeight
        };
    }
}
