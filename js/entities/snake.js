export class Snake {
    constructor() {
        this.body = [
            { x: 0, y: 0 },
            { x: 0, y: 0 }
        ];
        this.coordinates = [];
    }

    init(field) {
        const centerX = Math.floor(field.gridSize / 2);
        const centerY = Math.floor(field.gridSize / 2);

        this.body = [
            { x: centerX, y: centerY },
            { x: centerX - 1, y: centerY }
        ];
        
        this.updateCoordinates(field.cellSize);
    }

    updateCoordinates(cellSize) {
        this.coordinates = this.body.map(segment => ({
            x: segment.x * cellSize,
            y: segment.y * cellSize
        }));
    }
}
