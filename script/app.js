class app {
    constructor() {
        this.stopwatchDiv = document.querySelector('#stopwatch-holder');
        this.timerDiv = document.querySelector('#timer-holder')
        this.timerBtn = document.querySelector('#timer');
        this.stopwatchBtn = document.querySelector('#stopwatch');

        this.timerBtn.addEventListener('click', () => {
            this.stopwatchDiv.classList.add('hidden');
            this.timerDiv.classList.remove('hidden');

        });

        this.stopwatchBtn.addEventListener('click', () => {
            this.timerDiv.classList.add('hidden');
            this.stopwatchDiv.classList.remove('hidden');
        })

        this.initStopwatch();
        this.initTimer();
    }

    initStopwatch() {
        const stopwatchModelApp = new stopwatchModel();
        const stopwatchViewApp = new stopwatchView();
        const stopwatchControllerApp = new stopwatchController(stopwatchModelApp, stopwatchViewApp);
    }

    initTimer() {
        const timerModelApp = new timerModel();
        const timerViewApp = new timerView();
        const timerControllerApp = new timerController(timerModelApp, timerViewApp);
    }
}

const application = new app();