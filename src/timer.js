import { onLose } from './main.js';
let idCounter = 0;
export class Timer {
    constructor() {
        this.timeLeftMs = 0;
        this.hasStarted = false;
        this.id = 0;
        this.id = idCounter++;
        this.parentElement = document.createElement('div');
        this.parentElement.classList.add('timer');
        this.textElement = document.createElement('p');
        this.textElement.classList.add('timer-value');
        this.parentElement.appendChild(this.textElement);
        Timer.containerElement.appendChild(this.parentElement);
        this.updateText();
    }
    updateText() {
        const milliseconds = Math.floor((this.timeLeftMs % 1000) / 100);
        const seconds = Math.floor((this.timeLeftMs / 1000) % 60);
        const minutes = Math.floor((this.timeLeftMs / (1000 * 60)) % 60);
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        const secondsStr = seconds < 10 ? '0' + seconds : seconds;
        this.textElement.textContent = `${minutesStr}:${secondsStr}.${milliseconds}`;
    }
    setTime(timeMs) {
        this.timeLeftMs = timeMs;
        this.updateText();
    }
    tick(timeDeltaMs) {
        this.timeLeftMs -= timeDeltaMs;
        if (this.timeLeftMs < 0)
            this.timeLeftMs = 0;
        if (this.timeLeftMs <= 0 && this.hasStarted)
            onLose(this.id);
        this.updateText();
    }
}
Timer.containerElement = document.getElementById('timer-container');
