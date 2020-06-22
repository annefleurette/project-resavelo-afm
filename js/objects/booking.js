
/**
 * Represents a booking process.
 * @constructor
 * @param {string} startbooking - the  id of the button whichs triggers the signature display.
 * @param {string} booking - the id of the booking button.
 * @param {string} booking_confirmation - the id of the element where booking confirmation appears.
 * @param {string} signature - the id of the element whichs displays the signature.
 * @param {string} messagecountdown - the id of the element where booking confirmation message appears.
 * @param {string} countdown - the id of the element where countdown appears.
 * @param {string} namebooking - the id of name input.
 * @param {string} surnamebooking - the id of surname input.
 * @param {string} targetForm - the id of form element.
 * @param {string} cancel - the id of bokking cancelation element.
 * @method [lastStepBookingEvent] - manages booking consequences after signing.
 * @method [firstStepBookingEvent] - manages first booking consequences after filling the form.
 * @method [formFilled] - checks form completion.
 * @method [isValid] - builds checksing process.
 * @method [countdownAnimation] - manages consequences when countdown starts and ends.
 * @method [refreshBooking] - manages booking confirmation when page is refreshed.
 */

 // Class Réservation

class Booking {
    constructor(startbooking, booking, booking_confirmation, signature, messagecountdown, countdown, namebooking, surnamebooking, targetForm, cancel) {
        this.startbooking = document.getElementById(startbooking);
        this.booking = document.getElementById(booking);
        this.booking_confirmation = document.getElementById(booking_confirmation);
        this.signature = document.getElementById(signature);
        this.messagecountdown = document.getElementById(messagecountdown);
        this.countdown = document.getElementById(countdown);
        this.namebooking = document.getElementById(namebooking);
        this.surnamebooking = document.getElementById(surnamebooking);
        this.targetForm = document.getElementById(targetForm);
        this.cancel = document.getElementById(cancel);
        this.reservationDuration = 60;
        this.myCountdown = new Countdown(this.reservationDuration, "countdown", "submit", "cancel");
    }

    lastStepBookingEvent(){
        this.firstStepBookingEvent();
        this.booking.addEventListener('click', (event) => {
            // On empêche l'envoi du formulaire
            event.preventDefault();
            // On efface l'espace signature
            this.signature.style.display = "none";
            // On lance le décompte
            this.myCountdown.start();
            // On stocke l'avancée du décompte
            let now = Date.now();
            let endReservation = now + (this.reservationDuration*1000);
            sessionStorage.setItem("countdownTiming", endReservation);
            console.log(sessionStorage.getItem('countdownTiming'));
            // On stocke le nom et le prénom pour de futurs usages
            localStorage.setItem('name', this.namebooking.value);
            localStorage.setItem('surname', this.surnamebooking.value);
            //On récupère et on stocke les informations de la station où a eu lieu la réservation
            let bookingName = sessionStorage.getItem('name');
            sessionStorage.setItem('bookingName', bookingName);
            let bookingAvailableStandsStation = sessionStorage.getItem('availableStandsStation');
            console.log(bookingAvailableStandsStation);
            sessionStorage.setItem('bookingAvailableStandsStation', bookingAvailableStandsStation);
            let bookingAvailableBikesStation = sessionStorage.getItem('availableBikesStation');
            console.log(bookingAvailableBikesStation);
            sessionStorage.setItem('bookingAvailableBikesStation', bookingAvailableBikesStation);
            // On enlève sur la station le vélo emprunté
            let stationStands = parseInt(sessionStorage.getItem('bookingAvailableStandsStation'));
            let stationBikes = parseInt(sessionStorage.getItem('bookingAvailableBikesStation'));
            let newStationStands = stationStands+=1;
            let newStationBikes = stationBikes-=1;
            sessionStorage.setItem('newAvailableStandsStation', newStationStands);
            console.log(sessionStorage.getItem('newAvailableStandsStation'));
            sessionStorage.setItem('newAvailableBikesStation', newStationBikes);
            console.log(sessionStorage.getItem('newAvailableBikesStation'));
            // On libère les inputs
            this.namebooking.removeAttribute("disabled");
            this.surnamebooking.removeAttribute("disabled");
            // On affiche le bouton continuer et on enlève le bouton submit
            this.startbooking.style.display = "inline";
            this.booking.style.display = "none";
            // Décompte
            this.countdownAnimation();
        });
    }

    firstStepBookingEvent(){
        // On vérifie que les stations sont ouvertes et ont bien des vélos
        let currentStatus = sessionStorage.getItem('status');
        let currentBikes = parseInt(sessionStorage.getItem('availableBikesStation'));
        console.log(sessionStorage.getItem('name'));
        if(currentStatus === "OPEN") {
            if(currentBikes > 0) {
                // On pré-remplit le formulaire
                this.namebooking.value = localStorage.getItem('name');
                this.surnamebooking.value = localStorage.getItem('surname');
                this.formFilled();
                this.targetForm.style.display = "block";
                this.startbooking.addEventListener('click', (event) => {
                    // On empêche l'envoi du formulaire
                    event.preventDefault();
                    // On fige les inputs pour qu'il n'y ait plus de modification du nom et du prénom
                    this.namebooking.setAttribute("disabled", "true");
                    this.surnamebooking.setAttribute("disabled", "true");
                    // On affiche la signature
                    this.signature.innerHTML = '<h3>Signature</h3><canvas id="canvas"></canvas><p><span id="clear">Recommencer</span></p>';
                    this.signature.style.display = "block";
                    let mySignature = new Signature("canvas", "clear");
                    mySignature.evenements();
                    // On affiche le bouton submit et on enlève le bouton continuer
                    this.booking.style.display = "inline";
                    this.startbooking.style.display = "none";
                    // On vérifie que la personne a bien signé avant d'envoyer le formulaire
                    var canvas = document.getElementById("canvas");
                    canvas.addEventListener('click', () => {
                        this.booking.removeAttribute("disabled"); 
                    });
                    canvas.addEventListener('touchstart', () => {
                        this.booking.removeAttribute("disabled"); 
                    });
                });
            }else{
                alert("Il n'y a plus de vélo disponible à la réservation dans cette station !");
                this.targetForm.style.display = "none";
            }
        }else{
            alert("La station est fermée vous ne pouvez pas réserver de vélo !");
            this.targetForm.style.display = "none";
        }
    }

    formFilled(){
        // On vérifie que les données saisies correspondent à ce que l'on souhaite pour réactiver le bouton Submit
        this.namebooking.addEventListener('input', () => {
            let valuesurname = this.surnamebooking.value;
            let valuename = this.namebooking.nodeValue;
            if(this.isValid(valuename) && this.isValid(valuesurname)){
                this.startbooking.removeAttribute("disabled");
            }
        });
        this.surnamebooking.addEventListener('input', () => {
            let valuename = this.namebooking.value;
            let valuesurname = this.surnamebooking.nodeValue;
            if(this.isValid(valuename) && this.isValid(valuesurname)){
                this.startbooking.removeAttribute("disabled");
            }
        });
    }

    isValid(value){
        return /[a-zA-Z\-]{2,}/.test(value);
    }

    countdownAnimation(){
        let stationName = sessionStorage.getItem('bookingName');
        console.log(stationName);
        document.addEventListener('timerStart', () => {
            this.booking_confirmation.style.display = "block";
            this.countdown.style.display = "inline";
            this.messagecountdown.innerHTML = "Vélo réservé à la station " + stationName + "</br>Temps restant : ";
            this.cancel.style.display = "block";
        });
        document.addEventListener('timerStop', () => {
            this.messagecountdown.textContent = "Votre réservation est terminée !";
            this.countdown.style.display = "none";
            this.cancel.style.display = "none";
        });
        document.addEventListener('timerCancel', () => {
            this.messagecountdown.textContent = "Votre réservation est terminée !";
            this.countdown.style.display = "none";
            this.cancel.style.display = "none";
        });
    }
    refreshBooking(){
        let end = sessionStorage.getItem("countdownTiming");
        console.log(end);
        if(Date.now() < end) {
            let newTime = end - Date.now()/1000;
            let myNewCountdown = new Countdown(newTime, "countdown", "submit", "cancel");
            myNewCountdown.start();
            this.countdownAnimation();
        }
    }

}

