let map;
let userMarker;
let cafeMarkers = [];

function createMap(location) {

    map = L.map("map").setView(
        [location.lat, location.lng],
        16
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);

    userMarker = L.marker([
        location.lat,
        location.lng
    ])
    .addTo(map)
    .bindPopup("📍 You are here")
    .openPopup();
}

function addCafeMarkers(cafes) {

    cafeMarkers.forEach(marker => {

        map.removeLayer(marker);

    });

    cafeMarkers = [];

    cafes.forEach(cafe => {

        let lat;
        let lon;

        if (cafe.lat) {

            lat = cafe.lat;
            lon = cafe.lon;

        } else {

            lat = cafe.center.lat;
            lon = cafe.center.lon;

        }

        const marker = L.marker([lat, lon])
            .addTo(map)
            .bindPopup(
                cafe.tags?.name ||
                "Unnamed Cafe"
            );

        cafeMarkers.push(marker);

    });

}
