class stopwatchModel {
    constructor() {
        this.time = 0;
        this.stopwatch = null;
    }

    start() {
        if (!this.stopwatch) {
            this.stopwatch = setInterval(() => {
                this.time++;
                this.notifyObservers();
            }, 1000);
        }
    }

    stop() {
        if (this.stopwatch) {
            clearInterval(this.stopwatch);
            this.stopwatch = null;
            this.notifyObservers();
        }
    }

    reset() {
        this.stop();
        this.time = 0;
        this.notifyObservers();
    }

    getTime() {
        return this.time;
    }

    notifyObservers() {}

    isRunning() {
        return this.stopwatch !== null;
    }
}

class stopwatchView {
    constructor() {
        this.timeElement = document.querySelector('#stopwatch-time');
        this.startStopBtn = document.querySelector('#stopwatch-start-stop-btn');
        this.resetBtn = document.querySelector('#stopwatch-reset-btn');
        this.stopwatchArrow = document.querySelector('#stopwatch-arrow');
    }

    formatTime(time) {
        const hours = String(Math.floor(time / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
        const seconds = String(time % 60).padStart(2, '0');
        const degree = seconds * 6;
        this.stopwatchArrow.style.transform = `translateX(-50%) rotate(${degree}deg)`;
        return `${hours}:${minutes}:${seconds}`;
    }

    update (time, isRunning) {
        this.timeElement.textContent = this.formatTime(time);
        this.startStopBtn.textContent = isRunning ? 'Stop' : 'Start';
    }

    bindStartStop(handler) {
        this.startStopBtn.addEventListener('click', handler);
    }

    bindReset(handler) {
        this.resetBtn.addEventListener('click', handler);
    }
}

class stopwatchController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindStartStop(this.handleStartStop.bind(this));
        this.view.bindReset(this.handleReset.bind(this));
        this.model.notifyObservers = this.updateView.bind(this);
        this.updateView();
    }

    handleStartStop() {
        if (this.model.isRunning()) {
            this.model.stop();
        } else {
            this.model.start();
        }
    }

    handleReset() {
        this.model.reset();
    }

    updateView () {
        this.view.update(this.model.getTime(), this.model.isRunning());
    }
}

// document.addEventListener('DOMContentLoaded', () => {
//     const model = new stopwatchModel();
//     const view = new stopwatchView();
//     const controller = new stopwatchController(model, view);
// })
    const stopwatchModelApp = new stopwatchModel();
    const stopwatchViewApp = new stopwatchView();
    const stopwatchControllerApp = new stopwatchController(stopwatchModelApp, stopwatchViewApp);
//
//     export default controller;

