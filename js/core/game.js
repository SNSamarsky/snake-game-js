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
    }

    start() {
        this.field.init();
        this.canvas.init(this.field.canvasSize);
        this.food.init(this.field);
        this.snake.init(this.field);
        this.inputHandler.init(this.snake);

        this.render.init(this.field, this.food, this.snake);

        this.gameInterval = setInterval(() => this.gameStep(), this.speed);
    }

    gameStep() {
        const isEating = this.snake.willEatFood(this.food);

        this.snake.move(this.field, isEating);

        if (isEating) {
            this.food.randomizePosition(this.field, this.snake.body);
        }

        this.render.view();
    }

    stop() {
        clearInterval(this.gameInterval);
        this.inputHandler.destroy();
    }
}
