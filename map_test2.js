class googleMap {

    constructor(targetElt) {
        this.targetElt = targetElt;
        this.map = null;
        this.marker = null;
    }

    // On affiche la carte
    initMap() {
        this.map = new google.maps.Map(document.getElementById(targetElt), {
            center: {lat: -27.469434, lng: 153.024689},
            zoom: 14
        });
    }
    // On affiche les marqueurs
    markerMap(markerInfo) {
        this.marker = new google.maps.Marker({
            position: {lat: markerInfo.position.lat, lng: markerInfo.position.lng},
            map: this.map,
            title: markerInfo.name
        });
    }
}

let myGoogleMap = new googleMap("bike-booking__map");

async function jcdecauxMap(url) {
    await fetch(url)
    .then(response => {
        if(response.ok) {
            response.json()
            .then(result => {
                for(var station of result){
                    myGoogleMap.markerMap(station);
                   
                }
            });            
        }else{
            console.log('Erreur URL');
        } 
    }); 
}

jcdecauxMap("https://api.jcdecaux.com/vls/v1/stations?contract=Brisbane&apiKey=e4e72c38a3d668f8fb765f8ccc3c4913bfce501f");