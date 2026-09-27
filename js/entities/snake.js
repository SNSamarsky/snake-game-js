export class Snake {
    constructor() {
        this.body = [
            { x: 0, y: 0 },
            { x: 0, y: 0 }
        ];

        this.coordinates = [];

        this.directions = {
            up: { x: 0, y: -1 },
            down: { x: 0, y: 1 },
            left: { x: -1, y: 0 },
            right: { x: 1, y: 0 }
        };

        this.currentDirection = this.directions.right;
        this.lastStepDirection = this.directions.right;
    }

    init(field) {
        const centerX = Math.floor(field.gridSize / 2);
        const centerY = Math.floor(field.gridSize / 2);

        this.body = [
            { x: centerX, y: centerY },
            { x: centerX - 1, y: centerY }
        ];

        this.currentDirection = this.directions.right;
        this.lastStepDirection = this.directions.right;

        this.updateCoordinates(field.cellSize);
    }

    setDirection(newDirName) {
        const nextDir = this.directions[newDirName];
        if (!nextDir) return;

        const isOpposite = (nextDir.x + this.lastStepDirection.x === 0) &&
            (nextDir.y + this.lastStepDirection.y === 0);

        if (!isOpposite) {
            this.currentDirection = nextDir;
        }
    }

    move(field, isEatingFood = false) {
        const head = this.body[0];

        this.lastStepDirection = this.currentDirection;

        const newHead = {
            x: head.x + this.currentDirection.x,
            y: head.y + this.currentDirection.y
        };

        this.body.unshift(newHead);

        if (!isEatingFood) {
            this.body.pop();
        }

        this.updateCoordinates(field.cellSize);
    }

    willEatFood(food) {
        const head = this.body[0];
        const nextHeadX = head.x + this.currentDirection.x;
        const nextHeadY = head.y + this.currentDirection.y;

        return nextHeadX === food.position.x && nextHeadY === food.position.y;
    }

    updateCoordinates(cellSize) {
        this.coordinates = this.body.map(segment => ({
            x: segment.x * cellSize,
            y: segment.y * cellSize
        }));
    }
}
