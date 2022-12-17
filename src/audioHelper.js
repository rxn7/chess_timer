export var AudioHelper;
(function (AudioHelper) {
    function playLoseSound() {
        const loseSound = new Audio('audio/lose.ogg');
        loseSound.play();
    }
    AudioHelper.playLoseSound = playLoseSound;
    function playSwitchSound() {
        const switchSound = new Audio('audio/switch.wav');
        switchSound.play();
    }
    AudioHelper.playSwitchSound = playSwitchSound;
})(AudioHelper || (AudioHelper = {}));
