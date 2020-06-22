
/**
 * Represents a countdown.
 * @constructor
 * @param {number} timing - The timing for the countdown.
 * @param {string} targetElt - the Id of the element which displays the countdown.
 * @param {string} rootElt - the Id of the element which triggers the countdown.
 * @method [start] - manage working countdown.
 */

// Class Décompte

class Countdown {
    constructor(timing, targetElt, cancelElt) {
        this.timing = timing;
        this.targetElt = document.getElementById(targetElt);
        this.cancelElt = document.getElementById(cancelElt);
        this.current = null;
    }
    start = () => {
      // On vérifie que le décompte n'est pas déjà en cours
      clearInterval(this.current);
      // On lance le décompte
      this.current = setInterval(() => {
         let minutes = parseInt(this.timing/60);
         let seconds = parseInt(this.timing%60);
         let displayMinutes = minutes >= 10 ? minutes: `0${minutes}`;
         let displaySeconds = seconds >= 10 ? seconds: `0${seconds}`;
         this.targetElt.textContent = `${displayMinutes}:${displaySeconds}`;
         this.timing--;
         let event = new Event("timerStart", {bubble: true});
         document.dispatchEvent(event);
        // On coupe le décompte s'il arrive à zéro
         if(this.timing < 0) {
           clearInterval(this.current);
           let event = new Event("timerStop", {bubble: true});
           document.dispatchEvent(event);
         }
        // On coupe le décompte si on clique sur le bouton annuler
         this.cancelElt.addEventListener("click", () => {
           clearInterval(this.current);
           let event = new Event("timerCancel", {bubble: true});
           document.dispatchEvent(event);
         });
      }, 1000); 
   }

}