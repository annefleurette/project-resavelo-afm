// Création d'une class stations
class Station {
    constructor(location, status, places, availability) {
        this.location = location;
        this.status = status;
        this.places = places;
        this.availability = availability;
    }

    showStation() {
        console.log("<p>Adresse : " + this.location + "</p><p>Statut : " + this.status + "</p><p>Nombre de places : " + this.places + "</p><p>Disponibilité : " + this.availability + "</p>");
    }
}

// Création d'un objet stations
const myStation = new Station();
// J'imagine qu'il faut que je crée un lien avec les données de JCDecaux pour passer des paramètres...

// Simulation du comportement dans l'application de location de vélo
var stationPoint = document.getElementById('stationPoint');
stationPoint.addEventListener('click', function() {
    myStation;
});