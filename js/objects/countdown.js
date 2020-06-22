
/**
 * Represents a countdown.
 * @constructor
 * @param {number} timing - The timing for the countdown.
 * @param {string} targetElt - the id of the element which displays the countdown.
 * @param {string} triggerElt - the id of the element which triggers the countdown.
 * @param {string} cancelElt - the id of the element which cancels countdown working.
 * @method [start] - manages working countdown.
 */

// Class Décompte

class Countdown {
    constructor(timing, targetElt, triggerElt, cancelElt) {
        this.timing = timing;
        this.targetElt = document.getElementById(targetElt);
        this.triggerElt = document.getElementById(triggerElt);
        this.cancelElt = document.getElementById(cancelElt);
        this.current = null;
    }
    start(){
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
           sessionStorage.setItem("countdownTiming", null);
           let event = new Event("timerStop", {bubble: true});
           document.dispatchEvent(event);
         }
        // On coupe le décompte si on clique sur le bouton annuler
        this.cancelElt.addEventListener("click", () => {
          clearInterval(this.current);
          minutes = 0;
          seconds = 0;
          displayMinutes = minutes >= 10 ? minutes: `0${minutes}`;
          displaySeconds = seconds >= 10 ? seconds: `0${seconds}`;
          this.targetElt.textContent = `${displayMinutes}:${displaySeconds}`;
          sessionStorage.setItem("countdownTiming", null);
          let event = new Event("timerCancel", {bubble: true});
          document.dispatchEvent(event);
        });
      }, 1000); 
   }

}