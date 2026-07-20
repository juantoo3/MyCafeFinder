function initializeApp(){

    if(!navigator.geolocation){

        alert("Geolocation not supported.");

        return;

    }

    navigator.geolocation.getCurrentPosition(

        position=>{

            const location={

                lat:position.coords.latitude,

                lng:position.coords.longitude

            };

            createMap(location);

            initializePlaces();

            searchNearbyCafes(location);

            setupMyLocationButton(location);

        },

        ()=>{

            alert("Unable to retrieve location.");

        }

    );

}

function setupMyLocationButton(location){

    document

        .getElementById("myLocationBtn")

        .addEventListener("click",()=>{

            map.panTo(location);

            map.setZoom(15);

        });

}
