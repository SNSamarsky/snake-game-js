export class Loop {
    constructor(updateCallback) {
        this.updateCallback = updateCallback;
        this.rafId = null;
        this.isLooping = false;

        this.lastTime = 0;
        this.accumulator = 0;
    }

    start() {
        if (this.isLooping) return;
        this.isLooping = true;

        this.lastTime = performance.now();
        this.accumulator = 0;

        this.rafId = requestAnimationFrame((time) => this.tick(time));
    }

    tick(currentTime) {
        if (!this.isLooping) return;

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.updateCallback(deltaTime);

        this.rafId = requestAnimationFrame((time) => this.tick(time));
    }

    stop() {
        this.isLooping = false;

        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }
}