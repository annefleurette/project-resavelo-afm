// DECLARATION DES VARIABLES
let booking = document.getElementById("submit");
let booking_confirmation = document.getElementById("bike-booking__data__confirmation");
let signature = document.getElementById("signature");
let messagecountdown = document.getElementById("message-countdown");
let countdown = document.getElementById("countdown");
let namebooking = document.getElementById("name");
let surnamebooking = document.getElementById("surname");

// FORMULAIRE DE RESERVATION
    // On vérifie que les données saisies correspondent à ce que l'on souhaite pour réactiver le bouton Submit
    namebooking.addEventListener('input', (e) => {
        let valuesurname = surnamebooking.value;
        let valuename = namebooking.nodeValue;
        if(isValid(valuename) && isValid(valuesurname)){
            booking.removeAttribute("disabled");
        }
    });
    surnamebooking.addEventListener('input', (e) => {
        let valuename = namebooking.value;
        let valuesurname = surnamebooking.nodeValue;
        if(isValid(valuename) && isValid(valuesurname)){
            booking.removeAttribute("disabled");
        }
    });
    function isValid(value) {
        return /[a-zA-Z\-]{2,}/.test(value);
    }
    // Au clic sur le bouton Submit
    booking.addEventListener('click', (event) => {
        // On empêche l'envoi du formulaire
        event.preventDefault();
        // On fige les inputs pour qu'il n'y ait plus de modification du nom et du prénom
        namebooking.setAttribute("disabled", "true");
        surnamebooking.setAttribute("disabled", "true");
        // On affiche la signature
        signature.innerHTML = '<h2>Signature</h2><canvas id="canvas"></canvas><p><span id="clear">Recommencer</span></p>';
        let mySignature = new Signature("canvas", "clear");
        mySignature.evenements();
        booking.setAttribute("disabled", "true");
        // On vérifie que la personne a bien signé avant d'envoyer le formulaire
        var canvas = document.getElementById("canvas");
        canvas.addEventListener('click', () => {
            booking.removeAttribute("disabled"); 
        });
        // On lance le décompte pour 20 minutes et on paramètre les messages adaptés
        booking.addEventListener('click', () => {
            // On efface l'espace signature
            signature.style.display = "none";
            // On libère les inputs
            namebooking.removeAttribute("disabled");
            surnamebooking.removeAttribute("disabled");
            // On libère le bouton réserver
            //booking.removeAttribute("disabled"); 
            // On lance le décompte
            let countdown = new Countdown(1200, "countdown", "submit");
            countdown.start();
        });
        document.addEventListener('timerStart', () => {
            messagecountdown.style.display = "block";
            messagecountdown.textContent = "Temps restant";
        });
        document.addEventListener('timerStop', () => {
            messagecountdown.textContent = "La réservation est terminée";
        });
    });