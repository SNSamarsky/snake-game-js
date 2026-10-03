import { CONFIG } from "../config/config.js";

export class Field {
    constructor() {
        this.gridSize = CONFIG.FIELD.GRID_SIZE;
        this.headerHeight = CONFIG.GAME.HEADER_HEIGHT;
        this.cellSize = 0;
        this.canvasSize = { width: 0, height: 0 };
        this.cells = [];
    }

    init() {
        this.resize();
    }

    resize() {
        const padding = 20;
        const maxWidth = window.innerWidth - padding;
        const maxHeight = window.innerHeight - padding - this.headerHeight;

        const baseSize = Math.min(maxWidth, maxHeight);

        const finalGameZoneSize = Math.min(baseSize, CONFIG.FIELD.INITIAL_CANVAS_SIZE);

        this.cellSize = finalGameZoneSize / this.gridSize;

        this.canvasSize = {
            width: finalGameZoneSize,
            height: finalGameZoneSize + this.headerHeight
        };

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

    getMaxCellsCount() {
        return this.gridSize * this.gridSize;
    }
}
