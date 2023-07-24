import { isTicking, onLose, selectTimer } from './main.js'

let idCounter: number = 0

export class Timer {
	static containerElement: HTMLDivElement = document.getElementById('timer-container') as HTMLDivElement
	public parentElement: HTMLDivElement
	private textElement: HTMLParagraphElement
	private timeLeftMs: number = 0
	public hasStarted: boolean = false
	private id: number = 0

	constructor() {
		this.id = idCounter++

		this.parentElement = document.createElement('div')
		this.parentElement.classList.add('timer')
		this.parentElement.addEventListener('click', () => {
			if (!isTicking)
				selectTimer(this.id);
		})

		this.textElement = document.createElement('p')
		this.textElement.classList.add('timer-value')
		this.parentElement.appendChild(this.textElement)

		Timer.containerElement.appendChild(this.parentElement)

		this.updateText()
	}

	private updateText(): void {
		const milliseconds = Math.floor((this.timeLeftMs % 1000) / 100)
		const seconds = Math.floor((this.timeLeftMs / 1000) % 60)
		const minutes = Math.floor((this.timeLeftMs / (1000 * 60)) % 60)

		const minutesStr = minutes < 10 ? '0' + minutes : minutes
		const secondsStr = seconds < 10 ? '0' + seconds : seconds

		this.textElement.textContent = `${minutesStr}:${secondsStr}.${milliseconds}`
	}

	public setTime(timeMs: number): void {
		this.timeLeftMs = timeMs
		this.updateText()
	}

	public tick(timeDeltaMs: number): void {
		this.timeLeftMs -= timeDeltaMs
		if (this.timeLeftMs < 0) this.timeLeftMs = 0
		if (this.timeLeftMs <= 0 && this.hasStarted) onLose(this.id)

		this.updateText()
	}
}
