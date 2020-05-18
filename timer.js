
// Création d'une class chronomètre
class Timer {
    constructor(timing) {
        this.timing = timing;
        this.currentTiming = currentTiming;
        this.work = false;
    }

    workingTimer() {
        if(this.currentTiming === 0) {
            while(this.currentTiming === this.timing) {
                this.currentTiming = setInterval(timerEnd(), timing);
                this.work = true;
            }
        }else{
            clearInterval(this.currentTiming);
            this.currentTiming = 0;
            while(this.currentTiming === this.timing) {
                this.currentTiming = setInterval(timerEnd(), timing);
                this.work = true;
                }
        }
    }

    timerEnd() {
        alert('Le temps est écoulé. Votre réservation est terminée !');
    }
}

// Création d'un objet pour un timing de 20 minutes
const myTimer = new Timer(1200000);

// Simulation du comportement dans l'application de location de vélo
var resaValid = document.getElementById('btn-validation');
resaValid.addEventListener('click', function() {
    myTimer;
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var minutesAdd = minutes + 20;
    let endReservation = hours + "h" + minutesAdd + "min";
    console.log('Votre réservation est confirmée pour 20 minutes. Elle se terminera à' + endReservation);
});
