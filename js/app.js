function initializeApp() {

    navigator.geolocation.getCurrentPosition(

        position => {

            const location = {

                lat: position.coords.latitude,
                lng: position.coords.longitude

            };

            createMap(location);

            setupLocationButton(location);

            // Show loading while fetching cafes
            document.getElementById("cafeList").innerHTML = `
                <div class="loading">
                    Finding nearby cafes...
                </div>
            `;

            searchNearbyCafes(location);

        },

        error => {

            console.error(error);

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

            userMarker.openPopup();

        };

}

window.onload = initializeApp;
