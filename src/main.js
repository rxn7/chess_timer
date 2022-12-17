import { AudioHelper } from './audioHelper.js';
import { Timer } from './timer.js';
var TimeLimit;
(function (TimeLimit) {
    TimeLimit[TimeLimit["BULLET"] = 0] = "BULLET";
    TimeLimit[TimeLimit["BLITZ"] = 1] = "BLITZ";
    TimeLimit[TimeLimit["RAPID"] = 2] = "RAPID";
})(TimeLimit || (TimeLimit = {}));
const timeLimitValues = new Map([
    [TimeLimit.RAPID, 600 * 1000],
    [TimeLimit.BLITZ, 300 * 1000],
    [TimeLimit.BULLET, 60 * 1000],
]);
const timers = [new Timer(), new Timer()];
let currentTimerIdx = 0;
const currentTimer = () => timers[currentTimerIdx];
let previousFrameTime = 0;
let isTicking = false;
function switchTimer() {
    setCurrentTimer(+!currentTimerIdx);
    AudioHelper.playSwitchSound();
}
function setCurrentTimer(id) {
    currentTimer().parentElement.classList.remove('current-timer');
    currentTimerIdx = id;
    currentTimer().parentElement.classList.add('current-timer');
}
function tick(timeNowMs) {
    const deltaTime = timeNowMs - previousFrameTime;
    if (isTicking)
        currentTimer()?.tick(deltaTime);
    requestAnimationFrame(tick);
    previousFrameTime = timeNowMs;
}
function start(timeLimit) {
    ;
    document.activeElement?.blur();
    setCurrentTimer(0);
    isTicking = false;
    timers.forEach(timer => {
        timer.setTime(timeLimitValues.get(timeLimit));
    });
}
export function onLose(timerIdx) {
    isTicking = false;
    AudioHelper.playLoseSound();
    alert(`Timer ${timerIdx} has ran out of time`);
    timers.forEach(timer => {
        timer.hasStarted = false;
    });
}
document.getElementById('start-rapid')?.addEventListener('click', () => start(TimeLimit.RAPID));
document.getElementById('start-blitz')?.addEventListener('click', () => start(TimeLimit.BLITZ));
document.getElementById('start-bullet')?.addEventListener('click', () => start(TimeLimit.BULLET));
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case ' ':
            if (!isTicking) {
                AudioHelper.playSwitchSound();
                isTicking = true;
                timers.forEach(timer => {
                    timer.hasStarted = true;
                });
            }
            else {
                switchTimer();
            }
            break;
    }
});
requestAnimationFrame(tick);
