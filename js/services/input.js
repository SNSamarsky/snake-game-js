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

        this.snake = null;
        this.onStartCallback = null;
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    init(snake, onStartCallback) {
        this.snake = snake;
        this.onStartCallback = onStartCallback;
        window.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
        const action = this.keyMap[event.code];
        if (!action) return;

        event.preventDefault();

        if (action === 'start') {
            if (this.onStartCallback) this.onStartCallback();
        } else if (this.snake) {
            this.snake.setDirection(action);
        }
    }

    destroy() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }
}
