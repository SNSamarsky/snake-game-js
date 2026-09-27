export class Render {
    constructor(canvas) {
        this.canvas = canvas;
        this.field = null;
        this.food = null;
        this.snake = null;
    }

    init(field, food, snake) {
        this.field = field;
        this.food = food;
        this.snake = snake;
        this.viewField();
        this.viewSnake();
    }

    view() {
        this.canvas.clear();
        this.viewField();
        this.viewSnake();
        this.viewFood();
    }

    viewField() {
        if (!this.field || !this.field.cells || !this.field.cells.length) return;

        const ctx = this.canvas.ctx;
        const size = this.field.cellSize;

        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 1;

        for (const cell of this.field.cells) {
            ctx.strokeRect(
                cell.coordinates.x,
                cell.coordinates.y,
                size,
                size
            );
        }
    }

    viewFood() {
        if (!this.food || !this.field) return;

        const ctx = this.canvas.ctx;
        ctx.fillStyle = 'yellow';
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 1;

        const coord = this.food.coordinates;
        const cellSize = this.field.cellSize;

        ctx.fillRect(coord.x, coord.y, cellSize, cellSize);

        ctx.strokeRect(coord.x, coord.y, cellSize, cellSize);
    }

    viewSnake() {
        if (!this.snake || !this.field) return;

        const ctx = this.canvas.ctx;
        const cellSize = this.field.cellSize;

        ctx.fillStyle = 'green';
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 1;

        this.snake.coordinates.forEach((coord, index) => {
            ctx.fillStyle = index === 0 ? 'darkgreen' : 'green';

            ctx.fillRect(coord.x, coord.y, cellSize, cellSize);
            ctx.strokeRect(coord.x, coord.y, cellSize, cellSize);
        });
    }
}