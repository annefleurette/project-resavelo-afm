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
    this.index = this.number - 1;
    this.i = 0;
    this.current = this.slide[this.i];
    }
    start() {
        // On désactive tous les slides
        for(let u = 0; u <= this.index; u++) {
        this.slide[u].style.display="none";
        }
        // On active seulement la slide en cours
        this.current.style.display = "block";
        // On automatise le diaporama
        let autoSlider = setInterval(() => {
            this.i++;
            if(this.i <= this.index) {
            return this.change();
            }else{
            this.i = 0;
            return this.change();
            }  
        }, this.interval);
        this.play.style.display = "none";
        // On se donne la possibilité de le gérer manuellement
        this.pause.addEventListener("click", () => {
            clearInterval(autoSlider);
            this.play.style.display = "block";
            this.pause.style.display = "none";
            // Clic souris
            this.prev.addEventListener("click", () => {
                this.i--;
                if(this.i >= 0) {
                    return this.change();
                }else{
                    this.i = this.index;
                    return this.change();
                }
            });
            this.next.addEventListener("click", () => {
                this.i++;
                if(this.i <= this.index) {
                    return this.change();
                }else{
                    this.i = 0;
                    return this.change();
                }
            });
            // Touches clavier
            window.addEventListener("keydown", (event) => {
                switch (event.key) {
                    case "ArrowLeft":
                        this.i--;
                        if(this.i >= 0) {
                            return this.change();
                        }else{
                            this.i = this.index;
                            return this.change();
                        }
                        break;
                    case "ArrowRight":
                        this.i++;
                        if(this.i <= this.index) {
                            return this.change();
                        }else{
                            this.i = 0;
                            return this.change();
                        }
                        break;
                }
            });
        });
        // On peut réactiver le play
        this.play.addEventListener("click", () => {
            let autoSlider = setInterval(() => {
                this.i++;
                if(this.i <= this.index) {
                    return this.change();
                }else{
                this.i = 0;
                    return this.change();
                }  
            }, this.interval);
            this.play.style.display = "none";
            this.pause.style.display = "block";
        });
    }
    change() {  
        for(let u = 0; u <= this.index; u++) {
            this.slide[u].style.display="none";
        }
        this.current = this.slide[this.i];
        this.current.style.display = "block";
    }
}