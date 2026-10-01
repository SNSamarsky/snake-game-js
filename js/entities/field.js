import { CONFIG } from "../config/config.js";

export class Field {
    constructor() {
        this.gridSize = CONFIG.FIELD.GRID_SIZE;
        this.cellSize = CONFIG.FIELD.INITIAL_CANVAS_SIZE / this.gridSize;

        this.headerHeight = CONFIG.GAME.HEADER_HEIGHT;

        this.canvasSize = {
            width: CONFIG.FIELD.INITIAL_CANVAS_SIZE,
            height: CONFIG.FIELD.INITIAL_CANVAS_SIZE + this.headerHeight
        };

        this.cells = [];
    }

    init() {
        this.cells = [];
        this.createCells();
    }

    createCells() {
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {

                const coordinates = {
                    x: col * this.cellSize,
                    y: (row * this.cellSize) + this.headerHeight,
                };

                const gridPosition = { x: col, y: row };

                const id = `cell-${row + 1}-${col + 1}`;

                this.cells.push({
                    id,
                    coordinates,
                    gridPosition,
                });
            }
        }
    }

    isOutOfBounds(position) {
        return position.x < 0 ||
            position.x >= this.gridSize ||
            position.y < 0 ||
            position.y >= this.gridSize;
    }
}
