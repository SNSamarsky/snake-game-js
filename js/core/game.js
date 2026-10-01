import { Loop } from "./loop.js";
import { isPositionInList } from "../utils/utils.js";

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

        this.inputQueue = [];

        this.score = 0;
        this.gameTime = 0;
        this.timeCounter = 0;
    }

    prepare() {
        this.field.init();
        this.canvas.init(this.field.canvasSize);
        this.food.init(this.field);
        this.snake.init(this.field);

        this.inputHandler.init((action) => this.handleAction(action));

        this.render.init(this.field, this.food, this.snake);

        this.render.viewStartScreen();
    }

    handleAction(action) {
        if (action === 'start') {
            this.handleEnterPress();
            return;
        }

        if (!this.isStarted || this.isPaused || this.isGameOver) return;

        if (this.inputQueue.length < 2) {
            this.inputQueue.push(action);
        }
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
        this.inputQueue = [];

        this.score = 0;
        this.gameTime = 0;
        this.timeCounter = 0;

        this.loop.start();
    }

    togglePause() {
        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            this.render.viewPauseScreen(this.score, this.gameTime);
        } else {
            this.render.view(this.score, this.gameTime);
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

        this.timeCounter += deltaTime;

        if (this.timeCounter >= 1000) {
            this.gameTime += 1;
            this.timeCounter -= 1000;
        }

        this.timeAccumulator += deltaTime;

        if (this.timeAccumulator >= this.speed) {
            this.timeAccumulator -= this.speed;

            if (this.inputQueue.length > 0) {
                const nextDirection = this.inputQueue.shift();
                this.snake.setDirection(nextDirection);
            }

            const isEating = this.snake.willEatFood(this.food);

            const canMove = this.snake.move(
                this.field,
                isEating,
                (nextHead, body) => this.checkCollision(nextHead, body)
            );

            if (!canMove) {
                this.stop();
                this.render.viewGameOverScreen(this.score, this.gameTime);
                return;
            }

            if (isEating) {
                this.score += 1;
                this.food.randomizePosition(this.field, this.snake.body);
            }
        }

        this.render.view(this.score, this.gameTime);
    }

    checkCollision(nextHead, body) {
        return this.field.isOutOfBounds(nextHead) || isPositionInList(nextHead, body);
    }
}
