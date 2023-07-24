import { AudioHelper } from './audioHelper.js'
import { Timer } from './timer.js'

enum TimeLimit {
	BULLET,
	BLITZ,
	RAPID,
}

const timeLimitValues: Map<TimeLimit, number> = new Map<TimeLimit, number>([
	[TimeLimit.RAPID, 600 * 1000],
	[TimeLimit.BLITZ, 300 * 1000],
	[TimeLimit.BULLET, 60 * 1000],
])

const timers: Timer[] = [new Timer(), new Timer()]
let currentTimerIdx: number = 0
const currentTimer = (): Timer => timers[currentTimerIdx]
let previousFrameTime: number = 0
export let isTicking: boolean = false

export function selectTimer(id: number): void {
	setCurrentTimer(id)
	AudioHelper.playSwitchSound()
}

export function switchTimer() {
	selectTimer(+!currentTimerIdx);
}

function setCurrentTimer(id: number): void {
	currentTimer().parentElement.classList.remove('current-timer')
	currentTimerIdx = id
	currentTimer().parentElement.classList.add('current-timer')
}

function tick(timeNowMs: DOMHighResTimeStamp) {
	const deltaTime: number = timeNowMs - previousFrameTime

	if (isTicking) currentTimer()?.tick(deltaTime)

	requestAnimationFrame(tick)
	previousFrameTime = timeNowMs
}

function start(timeLimit: TimeLimit) {
	(document.activeElement as HTMLElement)?.blur()

	setCurrentTimer(0)
	isTicking = false

	timers.forEach(timer => {
		timer.setTime(timeLimitValues.get(timeLimit) as number)
	})
}

export function onLose(timerIdx: number) {
	isTicking = false
	AudioHelper.playLoseSound()
	alert(`Timer ${timerIdx} has ran out of time`)

	timers.forEach(timer => {
		timer.hasStarted = false
	})
}

document.getElementById('start-rapid')?.addEventListener('click', () => start(TimeLimit.RAPID))
document.getElementById('start-blitz')?.addEventListener('click', () => start(TimeLimit.BLITZ))
document.getElementById('start-bullet')?.addEventListener('click', () => start(TimeLimit.BULLET))

window.addEventListener('keyup', (e: KeyboardEvent) => {
	switch (e.key) {
		case ' ':
			if (!isTicking) {
				AudioHelper.playSwitchSound()
				isTicking = true
				timers.forEach(timer => {
					timer.hasStarted = true
				})
			} else {
				switchTimer()
			}
			break
	}
})

requestAnimationFrame(tick)
