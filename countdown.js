
// Class Décompte

class Countdown {
    constructor(timing, targetElt, rootElt) {
        this.timing = timing;
        this.targetElt = document.getElementById(targetElt);
        this.rootElt = document.getElementById(rootElt);
        this.current = null;
    }
    start() {
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
        // On coupe le décompte si on reclique sur le bouton déclencheur
         this.rootElt.addEventListener("click", () => {
           clearInterval(this.current);
         });
      }, 1000); 
   }
}