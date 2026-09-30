export class Field {
    constructor(gridSize = 10, initialCanvasSize = 500) {
        this.gridSize = gridSize;
        this.cellSize = initialCanvasSize / this.gridSize; 
        
        this.headerHeight = 40;
        
        this.canvasSize = {
            width: initialCanvasSize,
            height: initialCanvasSize + this.headerHeight
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
}
