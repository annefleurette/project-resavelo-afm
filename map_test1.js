var markerInfos = [];
// On récupère les informations de l'API
async function infoStations(url) {
    await fetch(url)
    .then(response => {
        if(response.ok) {
            response.json()
            .then(result => {
                for(var station of result){
                    var point = {
                        name: station.name,
                        address: station.address,
                        position: {lat: station.position.lat, lng: station.position.lng},
                        status: station.status,
                        totalStands: station.bike_stands,
                        availableStands: station.available_bike_stands,
                        availableBikes: station.available_bikes
                    };
                    markerInfos.push(point);
                }
            });
        }else{
            console.log('Erreur URL');
        } 
    }); 
}
// On initalise la carte et on affiche les marqueurs
function initMap() {
    infoStations("https://api.jcdecaux.com/vls/v1/stations?contract=Brisbane&apiKey=e4e72c38a3d668f8fb765f8ccc3c4913bfce501f");
    var map = new google.maps.Map(document.getElementById('bike-booking__map'), {
        center: {lat: -27.469434, lng: 153.024689},
        zoom: 14
    });
    for(let markerInfo = 0 ; markerInfo < markerInfos.length ; markerInfo++) {
        var marker = new google.maps.Marker({
            position: {lat: markerInfo.position.lat, lng: markerInfo.position.lng},
            map: map,
            title: markerInfo.name
        });
        // On active les informations associées au clic sur chaque marqueur
        marker.addEventListener('click', () => {
            document.getElementById('bike-booking__data').style.display = "block"; 
            let myStation = new Station("bike-booking__data__info-station", marker.name, marker.address, marker.status, marker.totalStands, marker.availableStands, marker.availableBikes);
            myStation.showStation();
        });
    }
}