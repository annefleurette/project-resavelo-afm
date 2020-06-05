/**
 * Represents a slider.
 * @constructor
 * @param {string} slide - the Class of the elements that are going to slide.
 * @param {string} prev - the Id of the left chevron.
 * @param {string} next - the Id of the right chevron.
 * @param {string} play - the Id of the play element.
 * @param {string} pause - the Id of the pause element.
 * @param {number} numberSlides - the number of elements to slide.
 * @param {number} interval - the timing between two slides.
 * @method [start] - manage working slider.
 * @method [showSlide] - displays the current slide.
 * @method [upSlide] - displays the next slide.
 * @method [downSlide] - displays the previous slide.
 * @method [addAuto] - manages automatic slider.
 * @method [addManualListener] - manages click ans keydown actions.
 * @method [removeManualListener] - remove click ans keydown actions.
 */

// Class Diaporama

class Slider {
    constructor(slide, prev, next, play, pause, numberSlides, interval) {
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