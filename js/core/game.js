export class Game {
    constructor(field, canvas, render, food, snake, inputHandler) {
        this.field = field;
        this.canvas = canvas;
        this.render = render;
        this.food = food;
        this.snake = snake;
        this.inputHandler = inputHandler;

        this.gameInterval = null;
        this.speed = 300;
        this.isStarted = false;
    }

    prepare() {
        this.field.init();
        this.canvas.init(this.field.canvasSize);
        this.food.init(this.field);
        this.snake.init(this.field);

        this.inputHandler.init(this.snake, () => this.start());

        this.render.init(this.field, this.food, this.snake);

        this.render.viewStartScreen();
    }

    start() {
        if (this.isStarted) return;
        this.isStarted = true;

        this.gameInterval = setInterval(() => this.gameStep(), this.speed);
    }

    gameStep() {
        const isEating = this.snake.willEatFood(this.food);

        const canMove = this.snake.move(
            this.field,
            isEating,
            (nextHead, body) => this.checkCollision(nextHead, body)
        );

        if (!canMove) {
            this.stop();
            this.render.viewGameOverScreen();
            return;
        }

        if (isEating) {
            this.food.randomizePosition(this.field, this.snake.body);
        }

        this.render.view();
    }

    checkCollision(nextHead, body) {
        const hitWall = nextHead.x < 0 ||
            nextHead.x >= this.field.gridSize ||
            nextHead.y < 0 ||
            nextHead.y >= this.field.gridSize;

        if (hitWall) return true;

        const hitSelf = body.some(segment => segment.x === nextHead.x && segment.y === nextHead.y);

        return hitSelf;
    }

    drawStartScreen() {
        const ctx = this.canvas.ctx;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.fillStyle = 'white';
        ctx.font = '24px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('PRESS ENTER TO START', this.canvas.width / 2, this.canvas.height / 2);
    }

    stop() {
        clearInterval(this.gameInterval);
        this.isStarted = false;
        this.inputHandler.destroy();
    }
}
