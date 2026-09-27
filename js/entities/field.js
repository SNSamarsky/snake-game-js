export class Field {
    constructor(gridSize = 10, canvasSize = 500) {
        this.gridSize = gridSize;
        this.canvasSize = canvasSize;
        this.cellSize = this.canvasSize / this.gridSize;
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
                    y: row * this.cellSize,
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
}
