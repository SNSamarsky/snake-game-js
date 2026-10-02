import { Loop } from "./loop.js";
import { isPositionInList } from "../utils/utils.js";
import { CONFIG } from "../config/config.js";

export class Game {
    constructor(field, canvas, render, food, snake, inputHandler, recordService) {
        this.field = field;
        this.canvas = canvas;
        this.render = render;
        this.food = food;
        this.snake = snake;
        this.inputHandler = inputHandler;
        this.recordService = recordService;

        this.loop = new Loop((deltaTime) => this.gameStep(deltaTime));
        this.speed = CONFIG.GAME.INITIAL_SPEED;
        this.timeAccumulator = 0;

        this.isStarted = false;
        this.isPaused = false;
        this.isGameOver = false;
        this.isWin = false;

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
        if (this.isWin && action === 'start') {
            this.restart();
            return;
        }

        if (action === 'start') {
            this.handleEnterPress();
            return;
        }

        if (this.isWin || !this.isStarted || this.isPaused || this.isGameOver) return;

        this.snake.enqueueAction(action);
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

    handleWin() {
        this.loop.stop();
        this.isStarted = false;
        this.isWin = true;
        const currentRecord = this.recordService.getRecord();
        this.render.viewWinScreen(this.score, this.gameTime, currentRecord);
    }

    start() {
        this.isStarted = true;
        this.isPaused = false;
        this.isGameOver = false;
        this.isWin = false;

        this.score = 0;
        this.gameTime = 0;
        this.timeCounter = 0;

        this.loop.start();
    }

    togglePause() {
        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            this.render.viewPauseScreen(this.score, this.gameTime, this.recordService.getRecord());
        } else {
            this.render.view(this.score, this.gameTime, this.recordService.getRecord());
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

            this.snake.updateDirectionFromQueue();

            const isEating = this.snake.willEatFood(this.food);

            const canMove = this.snake.move(
                this.field,
                isEating,
                (nextHead, body) => this.checkCollision(nextHead, body)
            );

            if (!canMove) {
                this.stop();
                const currentRecord = this.recordService.getRecord();
                this.render.viewGameOverScreen(this.score, this.gameTime, currentRecord);
                return;
            }

            if (isEating) {
                this.score += CONFIG.GAME.SCORE_PER_FOOD;

                this.recordService.checkAndUpdate(this.score, this.gameTime);

                if (this.snake.body.length === this.field.getMaxCellsCount()) {
                    this.handleWin();
                    return;
                }

                this.food.randomizePosition(this.field, this.snake.body);
            }
        }

        this.render.view(this.score, this.gameTime, this.recordService.getRecord());
    }

    checkCollision(nextHead, body) {
        return this.field.isOutOfBounds(nextHead) || isPositionInList(nextHead, body);
    }
}
