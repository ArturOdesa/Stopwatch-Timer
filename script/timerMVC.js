class timerModel {
    constructor() {
        this.initialTime = 0;
        this.time = 0;
        this.timer = null;
    }

    setInitialTime (minutes) {
        const seconds = minutes * 60;
        this.initialTime = seconds;
        this.time = seconds;
        this.updateTimer();

    }

    startTimer() {
        if (!this.timer && this.time > 0) {
            this.timer = setInterval(() => {
                if (this.time > 0) {
                    this.time--;
                    this.updateTimer();
                } else {
                    this.stopTimer();
                }
            }, 1000)
        }
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
            this.updateTimer();
        }
    }

    resetTimer() {
        this.stopTimer();
        this.time = 0;
        this.initialTime = 0;
        this.updateTimer();
    }

    getTimerTime() {
        return this.time;
    }

    isTimerRunning () {
        return this.timer !== null;
    }

    updateTimer() {}
}

class timerView {
    constructor() {
        this.timerTimeElement = document.querySelector('#timer-time');
        this.timerInput = document.querySelector('#timer-input');
        this.timerStartStopBtn = document.querySelector('#timer-start-stop-btn');
        this.timerResetBtn = document.querySelector('#timer-reset-btn');
        this.timerArrow = document.querySelector('#timer-arrow');
    }

    formatTimerTime(time) {
        const hours = String(Math.floor(time / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
        const seconds = String(time % 60).padStart(2, '0');
        const degree = minutes * 6;
        this.timerArrow.style.transform = `translateX(-50%) rotate(${degree}deg)`;

        return `${hours}:${minutes}:${seconds}`;
    }

    updateView(time, isRunning) {
        this.timerTimeElement.textContent = this.formatTimerTime(time);
        this.timerStartStopBtn.textContent = isRunning ? 'Stop' : 'Start';
    }

    bindStartStopTimer(handler) {
        this.timerStartStopBtn.addEventListener('click', handler);
    }

    bindResetTimer (handler) {
        this.timerResetBtn.addEventListener('click', handler);
    }

    setTimerInput() {
        this.timerInput.value = '';
    }

    getTimeInput() {
        return parseInt(this.timerInput.value, 10);
    }
}

class timerController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindStartStopTimer(this.handleStartStopTimer.bind(this));
        this.view.bindResetTimer(this.handleResetTimer.bind(this));
        this.model.updateTimer = this.updateViewTimer.bind(this);
        this.updateViewTimer();
    }

    handleStartStopTimer() {
        const time = this.view.getTimeInput();
        if (!isNaN(time) && time > 0 && !this.model.isTimerRunning()) {
            if (this.model.getTimerTime() === 0) {
                this.model.setInitialTime(time);
            }
            this.model.startTimer();
        } else if (this.model.isTimerRunning()) {
            this.model.stopTimer();
        }
    }

    handleResetTimer() {
        this.model.resetTimer();
        this.view.setTimerInput();
    }

    updateViewTimer() {
        this.view.updateView(this.model.getTimerTime(), this.model.isTimerRunning());
    }
}
