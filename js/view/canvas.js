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

    init(widthOrObject, height) {
        if (typeof widthOrObject === 'object' && widthOrObject !== null) {
            const { width, height: objHeight } = widthOrObject;
            this.resize(width, objHeight);
        } else {
            this.resize(widthOrObject, height ?? widthOrObject);
        }
    }

    resize(width, height) {
        this.el.width = width;
        this.el.height = height;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}
