    async function infoStations(url) {
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
    function initMap() {
        infoStations("https://api.jcdecaux.com/vls/v1/stations?contract=Brisbane&apiKey=e4e72c38a3d668f8fb765f8ccc3c4913bfce501f")
        .then(markerInfos => {
            let map = new google.maps.Map(document.getElementById("bike-booking__map"), {
                center: {lat: -27.469434, lng: 153.024689},
                zoom: 16
            });
            for(let markerInfo = 0 ; markerInfo < markerInfos.length ; markerInfo++) {
                let myStation = new Station("bike-booking__data__info-station", markerInfos[markerInfo].name, markerInfos[markerInfo].address, markerInfos[markerInfo].status, markerInfos[markerInfo].totalStands, markerInfos[markerInfo].availableStands, markerInfos[markerInfo].availableBikes);
                let marker = new google.maps.Marker({
                    position: {lat: markerInfos[markerInfo].position.lat, lng: markerInfos[markerInfo].position.lng},
                    map: map,
                    title: markerInfos[markerInfo].name,
                    station: myStation
                });
                // On active les informations associées au clic sur chaque marqueur
                marker.addListener('click', () => {
                    document.getElementById("bike-booking__data").style.display = "block"; 
                    marker.station.showStation();
                    // On enregistre les données de la station dont on peut avoir à se resservir après
                    sessionStorage.setItem('name', markerInfos[markerInfo].name);
                    sessionStorage.setItem('availableStandsStation', markerInfos[markerInfo].availableStands);
                    sessionStorage.setItem('availableBikesStation', markerInfos[markerInfo].availableBikes);
                });
            }
        });
    }