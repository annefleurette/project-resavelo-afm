/**
 * Represents a signature.
 * @constructor
 * @param {string} targetElt - the Id of the element which displays the signature.
 * @param {string} targetClear - the Id of the element which clears the signature.
 * @method [evenements] - manages clicks ans touchs actions.
 * @method [getMPosition] - displays mouse position information.
 * @method [getTPosition] - displays pad position information.
 * @method [canvasResult] - displays the signature drawing.
 * @method [clearCanvas] - erases the signature drawing.
 */

// Class Signature

class Signature {
    constructor(targetElt, targetClear) {
        this.canvas = document.getElementById(targetElt);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 1;
        this.draw = false;
        this.mousePosition = {
            x: 0,
            y: 0
        };
        this.lastPosition = this.mousePosition;
        this.clearButton = document.getElementById(targetClear);
        this.canvas.width = 200;
        this.canvas.height = 150;
        this.scaleX = this.canvas.clientWidth / this.canvas.width;
        this.scaleY = this.canvas.clientHeight / this.canvas.height;

    }
    // Gestion des événements 
    evenements = () => {
        // Souris
        this.canvas.addEventListener("mousedown", (e) => {
            this.draw = true;
            this.lastPosition = this.getMposition(e);
        });
        this.canvas.addEventListener("mousemove", (e) => {
            this.mousePosition = this.getMposition(e);
            this.canvasResult()
        });
       this.canvas.addEventListener("mouseup", (e) => {
            this.draw = false;
        });
        // Touchpad
        this.canvas.addEventListener("touchstart", (e) => {
           this.mousePosition = this.getTposition(e);
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        });
        this.canvas.addEventListener("touchmove", (e)=> {
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        });
        this.canvas.addEventListener("touchend", (e) => {
            var mouseEvent = new MouseEvent("mouseup", {});
            this.canvas.dispatchEvent(mouseEvent);
        });
        //Effacer
        this.clearButton.addEventListener("click", (e) => {
            this.clearCanvas()
        });
    }
    // Renvoie les coordonnées de la souris 
    getMposition = (mouseEvent) => {
        if (this.draw) {
            var oRect = this.canvas.getBoundingClientRect();
            return {
                x: (mouseEvent.clientX - oRect.left)/this.scaleX,
                y: (mouseEvent.clientY - oRect.top)/this.scaleY
            };
        }
    }
    // Renvoie les coordonnées du pad 
    getTposition = (touchEvent) => {
        var oRect = this.canvas.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - oRect.left,
            y: touchEvent.touches[0].clientY - oRect.top
        };
    }
    // Dessin du canvas
    canvasResult = () => {
        if (this.draw) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y);
            this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
            this.ctx.stroke();
            this.lastPosition = this.mousePosition;
        }
    };
    // Vide le dessin du canvas
    clearCanvas = () => {
        this.canvas.width = this.canvas.width;
    }
}