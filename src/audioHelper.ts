export namespace AudioHelper {
	export function playLoseSound() {
		const loseSound: HTMLAudioElement = new Audio('audio/lose.ogg')
		loseSound.play()
	}

	export function playSwitchSound() {
		const switchSound: HTMLAudioElement = new Audio('audio/switch.wav')
		switchSound.play()
	}
}
