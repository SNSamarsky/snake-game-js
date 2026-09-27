export class Canvas {
    constructor(rootSelector) {
        const rootEl = document.querySelector(rootSelector);
        if (!rootEl) {
            throw new Error(`Root element not found: ${rootSelector}`);
        }

        this.el = document.createElement("canvas");
        rootEl.append(this.el);
        this.ctx = this.el.getContext("2d");
    }

    get width() { return this.el.width; }
    get height() { return this.el.height; }


    init(width, height = width) {
        this.resize(width, height);
    }

    resize(width, height) {
        this.el.width = width;
        this.el.height = height;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}
