/**
 * Represents a booking process.
 * @constructor
 * @param {string} targetElt - the id of the elements which diplays the map.
 * @param {string} triggerElt - the id of the trigger element.
 * @param {string} targetInfos - the information of the stations.
 * @param {string} targetReservation - the id of the element which displays stations information.
 * @param {string} link - the link of jcdecaux api.
 * @method [infoStations] - manage collecting api information.
 * @method [initMap] - manage map and markers display and behaviours.
 */

// Class carte de réservation de vélos

class BikesMap {

    constructor(targetElt, triggerElt, targetInfos, targetReservation, link) {
        this.targetElt = document.getElementById(targetElt);
        this.triggerElt = document.getElementById(triggerElt);
        this.targetInfos = targetInfos;
        this.targetReservation = document.getElementById(targetReservation);
        this.link = link;
        this.selectedStation = null;
    }

    async infoStations(url) {
        let apiInfos = await fetch(url)
            .then(response => {
                if(response.ok) {
                    return response.json()
                }else{
                    console.log('Erreur URL');
                }
            })
            .then(result => {
                let stationInfos = [];
                for(let station of result) {
                    let point = {
                        name: station.name,
                        address: station.address,
                        position: {lat: station.position.lat, lng: station.position.lng},
                        status: station.status,
                        totalStands: station.bike_stands,
                        availableStands: station.available_bike_stands,
                        availableBikes: station.available_bikes
                    };
                    stationInfos.push(point);
                }
                return stationInfos;
            });
            return apiInfos;
    }
    initMap(){
        this.infoStations(this.link)
        .then(markerInfos => {
            let map = new google.maps.Map(this.targetElt, {
                center: {lat: -27.469434, lng: 153.024689},
                zoom: 16
            });
            for(let markerInfo = 0 ; markerInfo < markerInfos.length ; markerInfo++) {
                let myStation = new Station(this.targetInfos, markerInfos[markerInfo].name, markerInfos[markerInfo].address, markerInfos[markerInfo].status, markerInfos[markerInfo].totalStands, markerInfos[markerInfo].availableStands, markerInfos[markerInfo].availableBikes);
                let marker = new google.maps.Marker({
                    position: {lat: markerInfos[markerInfo].position.lat, lng: markerInfos[markerInfo].position.lng},
                    map: map,
                    title: markerInfos[markerInfo].name,
                    station: myStation
                });
                // On active les informations associées au clic sur chaque marqueur
                marker.addListener('click', () => {
                    this.targetReservation.style.display = "block"; 
                    marker.station.showStation();
                    //this.selectedStation = markerInfos[markerInfo];
                    //sessionStorage.setItem("reservedStation", this.selectedStation);
                    // On enregistre les données de la station dont on peut avoir à se resservir après
                    //console.log(sessionStorage.getItem("reservedStation"));
                    sessionStorage.setItem('name', markerInfos[markerInfo].name);
                    sessionStorage.setItem('status', markerInfos[markerInfo].status);
                    sessionStorage.setItem('availableStandsStation', markerInfos[markerInfo].availableStands);
                    sessionStorage.setItem('availableBikesStation', markerInfos[markerInfo].availableBikes);
                    // On lance la réservation
                    let myBooking = new Booking("continue", "submit", "bike-booking__data__confirmation", "signature", "message-countdown", "countdown", "name", "surname", "form__data", "cancel");
                    myBooking.endBookingEvent();
                    this.triggerElt.addEventListener('click', () => {
                        // On modifie le nombre d'emplacements et de vélos quand on finalise la réservation
                        let newDataStand = sessionStorage.getItem('newAvailableStandsStation');
                        let newDataBike = sessionStorage.getItem('newAvailableBikesStation');
                        let myNewStation = new Station(this.targetInfos, markerInfos[markerInfo].name, markerInfos[markerInfo].address, markerInfos[markerInfo].status, markerInfos[markerInfo].totalStands, newDataStand, newDataBike);
                        marker.station = myNewStation;
                        marker.station.showStation();
                    });
                    // On rétablit le nombre de vélos quand la réservation se termine ou quand on annule la réservation
                    document.addEventListener('timerStop', () => {
                        marker.station = myStation;
                        marker.station.showStation();
                    });  
                    document.addEventListener('timerCancel', () => {
                        marker.station = myStation;
                        marker.station.showStation();
                    });  
                });
            }
        }); 
    }

} 