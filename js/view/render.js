export class Render {
    constructor(canvas) {
        this.canvas = canvas;
        this.field = null;
        this.food = null
    }

    init(field, food) {
        this.field = field;
        this.food = food;
        this.viewField();
    }

    view() {
        this.canvas.clear();
        this.viewField();
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
        if (!this.food.coordinates || !this.field) return;

        const ctx = this.canvas.ctx;
        ctx.fillStyle = 'yellow';
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 1;

        const coord = this.food.coordinates;
        const size = this.field.cellSize;

        ctx.fillRect(coord.x, coord.y, size, size);

        ctx.strokeRect(coord.x, coord.y, size,size);
        console.log(this.food)
    }
}