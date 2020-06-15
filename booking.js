class Booking {
    constructor(startbooking, booking, booking_confirmation, signature, messagecountdown, countdown, namebooking, surnamebooking) {
        this.startbooking = document.getElementById(startbooking);
        this.booking = document.getElementById(booking);
        this.booking_confirmation = document.getElementById(booking_confirmation);
        this.signature = document.getElementById(signature);
        this.messagecountdown = document.getElementById(messagecountdown);
        this.countdown = document.getElementById(countdown);
        this.namebooking = document.getElementById(namebooking);
        this.surnamebooking = document.getElementById(surnamebooking);
    }

    endBookingEvent() {
        this.startBookingEvent();
        this.booking.addEventListener('click', (event) => {
            // On empêche l'envoi du formulaire
            event.preventDefault();
            // On efface l'espace signature
            this.signature.style.display = "none";
            // On lance le décompte
            let myCountdown = new Countdown(30, "countdown", "submit");
            myCountdown.start();
            // On stocke le nom et le prénom pour de futurs usages
            localStorage.setItem('name', this.namebooking.value);
            localStorage.setItem('surname', this.surnamebooking.value);
            // On enlève sur la station le vélo emprunté
            let stationStands = parseInt(sessionStorage.getItem('availableStandsStation'));
            let stationBikes = parseInt(sessionStorage.getItem('availableBikesStation'));
            let newStationStands = stationStands+=1;
            let newStationBikes = stationBikes-=1;
            sessionStorage.setItem('newAvailableStandsStation', newStationStands);
            sessionStorage.setItem('newAvailableBikesStation', newStationBikes);
            // On libère les inputs
            this.namebooking.removeAttribute("disabled");
            this.surnamebooking.removeAttribute("disabled");
            // On affiche le bouton continuer et on enlève le bouton submit
            this.startbooking.style.display = "inline";
            this.booking.style.display = "none";
        });
        this.countdownAnimation();
    }

    startBookingEvent() {
        // On vérifie que les stations sont ouvertes et ont bien des vélos
        let currentStatus = sessionStorage.getItem('status');
        let currentBikes = sessionStorage.getItem('availableBikesStation');
        console.log(sessionStorage.getItem('name'));
        if(currentStatus === "OPEN") {
            if(currentBikes > 0) {
                this.formFilled();
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
                });
            }else{
                alert("Il n'y a plus de vélo disponible à la réservation dans cette station !");
            }
        }else{
            alert("La station est fermée vous ne pouvez pas réserver de vélo !");
        }
    }

    formFilled() {
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

    isValid(value) {
        return /[a-zA-Z\-]{2,}/.test(value);
    }

    countdownAnimation() {
        let stationName = sessionStorage.getItem('name');
        document.addEventListener('timerStart', () => {
            this.booking_confirmation.style.display = "block";
            this.messagecountdown.innerHTML = "Vélo réservé à la station " + stationName + "</br>Temps restant : ";
        });
        document.addEventListener('timerStop', () => {
            this.messagecountdown.textContent = "Votre réservation est terminée !";
            this.countdown.style.display = "none";
            //newStationStands = this.stationStands+-1;
            //newStationBikes = this.stationBikes-=1;
            //sessionStorage.setItem('newAvailableStandsStation', newStationStands);
            //sessionStorage.setItem('newAvailableBikesStation', newStationBikes);
        });
    }

}

