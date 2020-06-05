// Class Diaporama

class Slider {
    constructor(targetElt, slide, prev, next, play, pause, numberSlides, interval) {
        this.targetElt = document.getElementById(targetElt);
        this.slide = document.getElementsByClassName(slide);
        this.prev = document.getElementById(prev);
        this.next = document.getElementById(next);
        this.play = document.getElementById(play);
        this.pause = document.getElementById(pause);
        this.number = numberSlides;
        this.interval = interval;
        this.totalIndex = this.number - 1;
        this.currentIndex = 0;
        this.currentSlide = this.slide[this.currentIndex];
        this.autoSlider = null;
        this.clickHandlerDown = () => this.downSlide();
        this.clickHandlerUp = () => this.upSlide();
        this.keydownHandler = (event) => {
            switch(event.key) {
                case "ArrowLeft":
                    this.downSlide();
                    break;
                case "ArrowRight":
                    this.upSlide();
                    break;
            }
        };
    }
    start() {
        // On affiche le slide
        this.showSlide();
        // On automatise le diaporama
        this.addAuto();
        // On se donne la possibilité de le gérer manuellement
        this.pause.addEventListener("click", () => {
            clearInterval(this.autoSlider);
            this.play.style.display = "block";
            this.pause.style.display = "none";
            this.addManualListener();
        });
        // On peut réactiver le play et le slider automatique
        this.play.addEventListener("click", () => {
            this.addAuto();
            this.removeManualListener();
        });
    }
    showSlide() {  
        // On désactive tous les slides
        for(let u = 0; u <= this.totalIndex; u++) {
            this.slide[u].style.display="none";
        }
        // On active seulement la slide en cours
        this.currentSlide = this.slide[this.currentIndex];
        this.currentSlide.style.display = "block";
    }
    upSlide() {
        this.currentIndex++;
        if(this.currentIndex <= this.totalIndex) {
            this.showSlide();
        }else{
            this.currentIndex = 0;
            this.showSlide();
        } 
    }
    downSlide() {
        this.currentIndex--;
        if(this.currentIndex >= 0) {
          this.showSlide();
        }else{
          this.currentIndex = this.totalIndex;
          this.showSlide();
        }
    }
    addAuto() {
        this.autoSlider = setInterval(() => {
        this.upSlide();  
        }, this.interval);
        this.play.style.display = "none";
        this.pause.style.display = "block";
    }
    addManualListener() {
        // Clic souris
        this.prev.addEventListener("click", this.clickHandlerDown);
        this.next.addEventListener("click", this.clickHandlerUp);
        // Touches clavier
        window.addEventListener("keydown", this.keydownHandler);
    }
    removeManualListener() {
        // Clic souris
        this.prev.removeEventListener("click", this.clickHandlerDown);
        this.next.removeEventListener("click", this.clickHandlerUp);
        // Touches clavier
        window.removeEventListener("keydown", this.keydownHandler);
    }
}