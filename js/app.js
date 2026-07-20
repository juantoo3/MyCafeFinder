function initializeApp() {

    navigator.geolocation.getCurrentPosition(

        position => {

            const location = {

                lat: position.coords.latitude,
                lng: position.coords.longitude

            };

            createMap(location);

            searchNearbyCafes(location);

            setupLocationButton(location);

        },

        () => {

            alert("Unable to retrieve location.");

        }

    );

}

function setupLocationButton(location) {

    document
        .getElementById("myLocationBtn")
        .onclick = () => {

            map.setView(
                [location.lat, location.lng],
                16
            );

        };

}

window.onload = initializeApp;
