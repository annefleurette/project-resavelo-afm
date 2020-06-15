class BikesMap {

    constructor(targetElt, triggerElt, targetInfos, targetReservation, link) {
        this.targetElt = document.getElementById(targetElt);
        this.triggerElt = document.getElementById(triggerElt);
        this.targetInfos = targetInfos;
        this.targetReservation = document.getElementById(targetReservation);
        this.link = link;
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
    initMap() {
        this.infoStations(this.link)
        .then(markerInfos => {
            let map = new google.maps.Map(this.targetElt, {
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
                    console.log(marker);
                    // On enregistre les données de la station dont on peut avoir à se resservir après
                    sessionStorage.setItem('name', markerInfos[markerInfo].name);
                    sessionStorage.setItem('status', markerInfos[markerInfo].status);
                    sessionStorage.setItem('availableStandsStation', markerInfos[markerInfo].availableStands);
                    sessionStorage.setItem('availableBikesStation', markerInfos[markerInfo].availableBikes);
                    console.log(sessionStorage.getItem('name'));
                    // On modifie le nombre d'emplacements et de vélos quand on finalise la réservation
                    this.triggerElt.addEventListener('click', () => {
                        let newDataStand = sessionStorage.getItem('newAvailableStandsStation');
                        let newDataBike = sessionStorage.getItem('newAvailableBikesStation');
                        let myNewStation = new Station(this.targetInfos, markerInfos[markerInfo].name, markerInfos[markerInfo].address, markerInfos[markerInfo].status, markerInfos[markerInfo].totalStands, newDataStand, newDataBike);
                        marker.station = myNewStation;
                        marker.station.showStation();
                    });
                    // On rétablit le nombre de vélos quand la réservation se termine
                    document.addEventListener('timerStop', () => {
                        marker.station = myStation;
                        marker.station.showStation();
                    });  
                });
            }
        }); 
    }
} 