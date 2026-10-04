import { CONFIG } from "../config/config.js";

export class InputHandler {
    constructor(rootSelector) {
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

        this.rootEl = document.querySelector(rootSelector);
    }

    init(onActionCallback) {
        this.onActionCallback = onActionCallback;
        window.addEventListener('keydown', this.handleKeyDown);

        this.initMobileControls();
    }

    handleKeyDown(event) {
        const action = this.keyMap[event.code];
        if (!action) return;

        event.preventDefault();

        if (this.onActionCallback) {
            this.onActionCallback(action);
        }
    }

    initMobileControls() {
        this.controlsContainer = document.createElement('div');
        this.controlsContainer.id = 'mobile-controls';
        this.controlsContainer.className = 'mobile-controls';

        const layout = [
            [{ id: 'btn-up', label: '▲', action: 'up' }],
            [
                { id: 'btn-left', label: '◀', action: 'left' },
                { id: 'btn-enter', label: 'ENTER', action: 'start', isEnter: true },
                { id: 'btn-right', label: '▶', action: 'right' }
            ],
            [{ id: 'btn-down', label: '▼', action: 'down' }]
        ];

        layout.forEach(rowButtons => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'ctrl-row';

            rowButtons.forEach(btnData => {
                const button = document.createElement('button');
                button.id = btnData.id;
                button.className = 'ctrl-btn';
                if (btnData.isEnter) button.classList.add('enter-btn');
                button.textContent = btnData.label;

                button.addEventListener('pointerdown', (event) => {
                    event.preventDefault();
                    if (this.onActionCallback) {
                        this.onActionCallback(btnData.action);
                    }
                });

                rowDiv.appendChild(button);
            });

            this.controlsContainer.appendChild(rowDiv);
        });

        this.rootEl.appendChild(this.controlsContainer);
    }

    destroy() {
        window.removeEventListener('keydown', this.handleKeyDown);

        if (this.controlsContainer && this.controlsContainer.parentNode) {
            this.controlsContainer.parentNode.removeChild(this.controlsContainer);
        }
    }
}
