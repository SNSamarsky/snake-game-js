export class InputHandler {
    constructor() {
        this.keyMap = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right',

            'KeyW': 'up',
            'KeyS': 'down',
            'KeyA': 'left',
            'KeyD': 'right',

            'Enter': 'start'
        };

        this.onActionCallback = null;
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    init(onActionCallback) {
        this.onActionCallback = onActionCallback;
        window.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
        const action = this.keyMap[event.code];
        if (!action) return;

        event.preventDefault();

        if (this.onActionCallback) {
            this.onActionCallback(action);
        }
    }

    destroy() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }
}
