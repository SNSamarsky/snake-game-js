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
            'KeyD': 'right'
        };

        this.snake = null;
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    init(snake) {
        this.snake = snake;
        window.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
        const direction = this.keyMap[event.code];

        if (direction && this.snake) {
            event.preventDefault();
            this.snake.setDirection(direction);
        }
    }

    destroy() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }
}
