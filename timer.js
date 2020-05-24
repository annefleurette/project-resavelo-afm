
// Class Chronomètre

class Timer {
    constructor(timing, currentTiming) {
        this.timing = timing;
        this.currentTiming = currentTiming;
    }

    workingTimer() {
        if(this.currentTiming === 0) {
            while(this.currentTiming === this.timing) {
                this.currentTiming = setInterval(timerEnd(), timing);
            }
        }else{
            clearInterval(this.currentTiming);
            this.currentTiming = 0;
            while(this.currentTiming === this.timing) {
                this.currentTiming = setInterval(timerEnd(), timing);
                }
        }
    }

    timerEnd() {
        alert('Le temps est écoulé. Votre réservation est terminée !');
    }
}