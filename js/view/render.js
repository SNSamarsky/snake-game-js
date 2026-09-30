import { formatTime } from "../utils/utils.js";

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

    view(score = 0, gameTime = 0) {
        this.canvas.clear();
        this.viewField();
        this.viewSnake();
        this.viewFood();

        this.viewHUD(score, gameTime);
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

    viewHUD(score, gameTime) {
        const ctx = this.canvas.ctx;
        const headerHeight = this.field.headerHeight || 40;

        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, this.canvas.width, headerHeight);

        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, headerHeight);
        ctx.lineTo(this.canvas.width, headerHeight);
        ctx.stroke();

        ctx.fillStyle = 'white';
        ctx.font = '16px monospace';
        ctx.textBaseline = 'middle';

        ctx.textAlign = 'left';
        ctx.fillText(`SCORE: ${score}`, 15, headerHeight / 2);

        ctx.textAlign = 'right';
        ctx.fillText(`TIME: ${formatTime(gameTime)}`, this.canvas.width - 15, headerHeight / 2);
    }

    viewStartScreen() {
        const ctx = this.canvas.ctx;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.fillStyle = 'white';
        ctx.font = '24px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('PRESS ENTER TO START', this.canvas.width / 2, this.canvas.height / 2);
    }

    viewGameOverScreen(score = 0, gameTime = 0) {
        this.view(score, gameTime);

        const ctx = this.canvas.ctx;
        const headerHeight = this.field.headerHeight || 40;
        const gameZoneHeight = this.canvas.height - headerHeight;

        ctx.fillStyle = 'rgba(255, 0, 0, 0.35)';
        ctx.fillRect(0, headerHeight, this.canvas.width, gameZoneHeight);

        const centerY = headerHeight + gameZoneHeight / 2;

        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.font = 'bold 32px sans-serif';
        ctx.fillText('GAME OVER', this.canvas.width / 2, centerY - 40);

        ctx.font = '16px monospace';

        ctx.fillText(`FINAL SCORE: ${score} | TIME: ${formatTime(gameTime)}`, this.canvas.width / 2, centerY + 5);

        ctx.font = '16px sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillText('PRESS ENTER TO RESTART', this.canvas.width / 2, centerY + 45);
    }

    viewPauseScreen(score = 0, gameTime = 0) {
        this.view(score, gameTime);

        const ctx = this.canvas.ctx;
        const headerHeight = this.field.headerHeight || 40;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(0, headerHeight, this.canvas.width, this.canvas.height - headerHeight);

        ctx.fillStyle = 'white';
        ctx.font = '30px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('PAUSE', this.canvas.width / 2, headerHeight + (this.canvas.height - headerHeight) / 2);
    }
}