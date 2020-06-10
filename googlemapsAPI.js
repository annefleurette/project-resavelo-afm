    
// Class Map

class Map {
    constructor(targetElt, targetInfos, targetReservation, link) {
        this.targetElt = document.getElementById(targetElt);
        this.targetInfos = targetInfos;
        this.targetReservation = document.getElementById(targetReservation);
        this.link = link;
    }

    initMap() {
        let myJcdecauxAPI = new JcdecauxAPI;
        myJcdecauxAPI.infoStations(this.link)
        .then(markerInfos => {
            let map = new google.maps.Map((this.targetElt), {
                center: {lat: -27.469434, lng: 153.024689},
                zoom: 14
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
                });
            }
        }); 
    }
}