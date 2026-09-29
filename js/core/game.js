import { Loop } from "./loop.js";

export class Game {
    constructor(field, canvas, render, food, snake, inputHandler) {
        this.field = field;
        this.canvas = canvas;
        this.render = render;
        this.food = food;
        this.snake = snake;
        this.inputHandler = inputHandler;

        this.loop = new Loop((deltaTime) => this.gameStep(deltaTime));
        this.speed = 300;
        this.timeAccumulator = 0;

        this.isStarted = false;
        this.isPaused = false;
        this.isGameOver = false;
    }

    prepare() {
        this.field.init();
        this.canvas.init(this.field.canvasSize);
        this.food.init(this.field);
        this.snake.init(this.field);

        this.inputHandler.init(this.snake, () => this.handleEnterPress());

        this.render.init(this.field, this.food, this.snake);

        this.render.viewStartScreen();
    }

    handleEnterPress() {
        if (!this.isStarted && !this.isGameOver) {
            this.start();
            return;
        }

        if (this.isGameOver) {
            this.restart();
            return;
        }

        if (this.isStarted) {
            this.togglePause();
        }
    }

    start() {
        this.isStarted = true;
        this.isPaused = false;
        this.isGameOver = false;
        this.loop.start();
    }

    togglePause() {
        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            this.render.viewPauseScreen();
        } else {
            this.render.view();
        }
    }

    restart() {
        this.timeAccumulator = 0;

        this.field.init();
        this.food.init(this.field);
        this.snake.init(this.field);

        this.start();
    }

    stop() {
        this.loop.stop();
        this.isStarted = false;
        this.isGameOver = true;
    }

    gameStep(deltaTime) {
        if (this.isPaused) return;
        
        this.timeAccumulator += deltaTime;

        if (this.timeAccumulator >= this.speed) {
            this.timeAccumulator -= this.speed;

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
}
