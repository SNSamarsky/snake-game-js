import { formatTime } from "../utils/utils.js";
import { CONFIG } from "../config/config.js";

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

    view(score = 0, gameTime = 0, highScoreRecord = { score: 0, time: 0 }, hideFood = false) {
        this.canvas.clear();
        this.viewField();
        this.viewSnake();
        if (!hideFood) {
            this.viewFood();
        }

        this.viewHUD(score, gameTime, highScoreRecord);
    }

    viewField() {
        if (!this.field || !this.field.cells || !this.field.cells.length) return;

        const ctx = this.canvas.ctx;
        const size = this.field.cellSize;

        ctx.strokeStyle = CONFIG.THEME.LINE_COLOR;
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
        ctx.fillStyle = CONFIG.THEME.FOOD;
        ctx.strokeStyle = CONFIG.THEME.LINE_COLOR;
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

        ctx.strokeStyle = CONFIG.THEME.LINE_COLOR;
        ctx.lineWidth = 1;

        this.snake.coordinates.forEach((coord, index) => {
            ctx.fillStyle = index === 0 ? CONFIG.THEME.SNAKE_HEAD : CONFIG.THEME.SNAKE_BODY;

            ctx.fillRect(coord.x, coord.y, cellSize, cellSize);
            ctx.strokeRect(coord.x, coord.y, cellSize, cellSize);
        });
    }

    viewHUD(score, gameTime, highScoreRecord = { score: 0, time: 0 }) {
        const ctx = this.canvas.ctx;
        const headerHeight = this.field.headerHeight;

        ctx.fillStyle = CONFIG.THEME.HUD_BG;
        ctx.fillRect(0, 0, this.canvas.width, headerHeight);

        ctx.strokeStyle = CONFIG.THEME.LINE_COLOR;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, headerHeight);
        ctx.lineTo(this.canvas.width, headerHeight);
        ctx.stroke();

        this.drawText(`SCORE: ${score}`, 15, headerHeight / 2, {
            font: '16px monospace',
            align: 'left'
        });

        const bestTimeStr = highScoreRecord.time === Infinity ? '00:00' : formatTime(highScoreRecord.time);
        this.drawText(`BEST: ${highScoreRecord.score} (${bestTimeStr})`, this.canvas.width / 2, headerHeight / 2, {
            font: '16px monospace',
            align: 'center'
        });

        this.drawText(`TIME: ${formatTime(gameTime)}`, this.canvas.width - 15, headerHeight / 2, {
            font: '16px monospace',
            align: 'right'
        });
    }


    viewStartScreen() {
        this.viewField();

        const ctx = this.canvas.ctx;

        ctx.fillStyle = CONFIG.THEME.OVERLAY_START;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawText('PRESS ENTER TO START', this.canvas.width / 2, this.canvas.height / 2, {
            font: '24px sans-serif'
        });
    }

    viewGameOverScreen(score = 0, gameTime = 0, highScoreRecord = { score: 0, time: 0 }) {
        this.view(score, gameTime, highScoreRecord);

        const ctx = this.canvas.ctx;
        const headerHeight = this.field.headerHeight;
        const gameZoneHeight = this.canvas.height - headerHeight;

        ctx.fillStyle = CONFIG.THEME.OVERLAY_GAME_OVER;
        ctx.fillRect(0, headerHeight, this.canvas.width, gameZoneHeight);

        const centerY = headerHeight + gameZoneHeight / 2;

        this.drawText('GAME OVER', this.canvas.width / 2, centerY - 40, {
            font: 'bold 32px sans-serif'
        });

        const bestTimeStr = highScoreRecord.time === Infinity ? '00:00' : formatTime(highScoreRecord.time);
        this.drawText(`SCORE: ${score} | BEST: ${highScoreRecord.score} (${bestTimeStr}) | TIME: ${formatTime(gameTime)}`, this.canvas.width / 2, centerY, {
            font: '14px monospace'
        });

        this.drawText('PRESS ENTER TO RESTART', this.canvas.width / 2, centerY + 45, {
            font: '16px sans-serif',
            color: 'rgba(255, 255, 255, 0.8)'
        });
    }

    viewWinScreen(score = 0, gameTime = 0, highScoreRecord = { score: 0, time: 0 }) {
        this.view(score, gameTime, highScoreRecord, true);

        const ctx = this.canvas.ctx;
        const headerHeight = this.field.headerHeight;
        const gameZoneHeight = this.canvas.height - headerHeight;

        ctx.fillStyle = CONFIG.THEME.OVERLAY_WIN;
        ctx.fillRect(0, headerHeight, this.canvas.width, gameZoneHeight);

        const centerY = headerHeight + gameZoneHeight / 2;

        this.drawText('VICTORY!', this.canvas.width / 2, centerY - 45, {
            font: 'bold 36px sans-serif',
            color: '#ffd700'
        });

        const bestTimeStr = highScoreRecord.time === Infinity ? '00:00' : formatTime(highScoreRecord.time);
        this.drawText(
            `YOU FILLED THE FIELD! | BEST: ${highScoreRecord.score} (${bestTimeStr})`,
            this.canvas.width / 2,
            centerY,
            { font: '14px monospace' }
        );

        this.drawText('PRESS ENTER TO PLAY AGAIN', this.canvas.width / 2, centerY + 45, {
            font: '16px sans-serif',
            color: 'white'
        });
    }

    viewPauseScreen(score = 0, gameTime = 0, highScoreRecord = { score: 0, time: 0 }) {
        this.view(score, gameTime, highScoreRecord);

        const ctx = this.canvas.ctx;
        const headerHeight = this.field.headerHeight;
        const gameZoneHeight = this.canvas.height - headerHeight;

        ctx.fillStyle = CONFIG.THEME.OVERLAY_PAUSE;
        ctx.fillRect(0, headerHeight, this.canvas.width, gameZoneHeight);

        const centerY = headerHeight + (gameZoneHeight / 2);

        this.drawText('PAUSE', this.canvas.width / 2, centerY, {
            font: 'bold 30px sans-serif'
        });
    }

    drawText(text, x, y, options = {}) {
        const ctx = this.canvas.ctx;

        const {
            font = '16px sans-serif',
            color = CONFIG.THEME.TEXT_MAIN,
            align = 'center',
            baseline = 'middle'
        } = options;

        ctx.fillStyle = color;
        ctx.font = font;
        ctx.textAlign = align;
        ctx.textBaseline = baseline;

        ctx.fillText(text, x, y);
    }
}