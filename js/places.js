let placesService;

function initializePlaces(){

    placesService = new google.maps.places.PlacesService(map);

}

function searchNearbyCafes(location){

    const request ={

        location,

        radius:3000,

        type:"cafe"

    };

    placesService.nearbySearch(request,(results,status)=>{

        if(status===google.maps.places.PlacesServiceStatus.OK){

            displayCafeList(results);

        }

    });

}
