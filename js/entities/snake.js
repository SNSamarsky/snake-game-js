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

        this.inputQueue = [];
    }

    init(field) {
        const centerX = Math.floor(field.gridSize / 2);
        const centerY = Math.floor(field.gridSize / 2);

        this.body = [
            { x: centerX, y: centerY },
            { x: centerX - 1, y: centerY }
        ];

        this.inputQueue = [];

        this.currentDirection = this.directions.right;
        this.lastStepDirection = this.directions.right;

        this.updateCoordinates(field);
    }

    enqueueAction(action) {
        if (this.inputQueue.length < 2) {
            this.inputQueue.push(action);
        }
    }

    updateDirectionFromQueue() {
        if (this.inputQueue.length > 0) {
            const nextDirName = this.inputQueue.shift();
            this.setDirection(nextDirName);
        }
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

    move(field, isEatingFood = false, onCollision) {
        const head = this.body[0];

        this.lastStepDirection = this.currentDirection;

        const newHead = {
            x: head.x + this.currentDirection.x,
            y: head.y + this.currentDirection.y
        };

        if (onCollision(newHead, this.body)) {
            return false;
        }

        this.body.unshift(newHead);

        if (!isEatingFood) {
            this.body.pop();
        }

        // 👈 Передаем field целиком
        this.updateCoordinates(field);

        return true;
    }

    willEatFood(food) {
        const head = this.body[0];
        const nextHeadX = head.x + this.currentDirection.x;
        const nextHeadY = head.y + this.currentDirection.y;

        return nextHeadX === food.position.x && nextHeadY === food.position.y;
    }

    updateCoordinates(field) {
        const cellSize = field.cellSize;
        const headerHeight = field.headerHeight || 0;

        this.coordinates = this.body.map(segment => ({
            x: segment.x * cellSize,
            y: (segment.y * cellSize) + headerHeight
        }));
    }
}
