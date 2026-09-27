export class Render {
    constructor(canvas) {
        this.canvas = canvas;
        this.field = null;
    }

    init(field) {
        this.field = field;
        this.viewField();
    }

    view() {
        this.canvas.clear();
        this.viewField();
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
}