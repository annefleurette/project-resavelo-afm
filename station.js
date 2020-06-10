/**
 * Represents information about a bike station
 * @constructor
 * @param {string} targetElt - the Id of the element which displays the block information.
 * @param {string} name - the name of the station.
 * @param {string} address - the address of the station.
 * @param {string} status - the status of the station.
 * @param {string} totalStands - the total number of stands of the station.
 * @param {string} availableStands - the number of available stands in the station.
 * @param {string} availableBikes - the number of available bikes in the station.
 * @method [showStation] - displays station information in a block.
 */

// Création d'une class Station

class Station {
    constructor(targetElt, name, address, status, totalStands, availableStands, availableBikes) {
        this.targetElt = document.getElementById(targetElt);
        this.name = name;
        this.address = address;
        this.status = status;
        this.totalStands = totalStands;
        this.availableStands = availableStands;
        this.availableBikes = availableBikes;
    }

    showStation = () => {
        this.targetElt.innerHTML = "<p>Nom de la station : " + this.name + "</p><p>Adresse : " + this.address + "</p><p>Statut : " + this.status + "</p><p>Nombre d'emplacements : " + this.totalStands + "</p><p>Emplacements disponibles : " + this.availableStands + "</p><p>Vélos disponibles : " + this.availableBikes + "</p>";
    }
}