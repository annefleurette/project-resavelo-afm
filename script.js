const booking = document.getElementById("submit");
const booking_confirmation = document.getElementById("bike-booking__data__confirmation");
let namebooking = document.getElementById("name");
let surnamebooking = document.getElementById("surname");

// FORMULAIRE DE RESERVATION
    // On vérifie que les données saisies correspondent à ce que l'on souhaite pour réactiver le bouton Submit
    namebooking.addEventListener('input', function(e){
        var valuename = e.target.value;
        if(isValid(valuename)){
            surnamebooking.addEventListener('input', function(e){
                var valuesurname = e.target.value;
                if(isValid(valuesurname)){
                    booking.removeAttribute("disabled"); 
                }
            });
        }
    });
    function isValid(value) {
        return /[a-zA-Z\-]{2,}/.test(value);
    }
    // Au clic sur le bouton Submit
    booking.addEventListener('click', function (event){
        // On empêche l'envoi du formulaire
        event.preventDefault();
        // On fige les inputs pour qu'il n'y ait plus de modification du nom et du prénom
        const name = document.getElementById("name");
        name.setAttribute("disabled", "true");
        const surname = document.getElementById("surname");
        surname.setAttribute("disabled", "true");
        // On affiche la signature
        const signature = document.getElementById("signature");
        signature.innerHTML = '<h2>Signature</h2><canvas id="canvas"></canvas><p><span id="bt-clear">Recommencer</span></p>';
        var mySignature = new Signature();
        mySignature.evenements();
        booking.setAttribute("disabled", "true");
        // On vérifie que la personne a bien signé avant d'envoyer le formulaire
        const signaturebooking = document.getElementById("canvas");
        signaturebooking.addEventListener('click', function() {
            booking.removeAttribute("disabled"); 
        });
        // On rétablit l'envoi du formulaire
        event.cancelable();
        // On lance le timer pour 20 minutes
        booking.addEventListener('click', function() {
            let currentTiming = parseInt(booking_confirmation.textContent);
            const myTimer = new Timer(1200000, currentTiming);
            myTimer;
            // Calcul du temps restant
            currentTiming = parseInt(booking_confirmation.textContent);
            let remainingTime = 1200000 - currentTiming;
            if (remainingTime > 0) {
                remainingTime / (60*1000);
            } else {
                remainingTime = 0;
            }
            booking_confirmation.innerHTML = '<p>Votre réservation est confirmée pour 20 minutes. Temps restant :  ' + remainingTime + '</p>';
        });
    });