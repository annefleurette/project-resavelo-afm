    
// Class JcdecauxAPI

class JcdecauxAPI {

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
}  