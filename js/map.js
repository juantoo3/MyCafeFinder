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

    // Remove existing markers
    cafeMarkers.forEach(marker => {
        map.removeLayer(marker);
    });

    cafeMarkers = [];

    // Coffee icon
    const coffeeIcon = L.icon({
        iconUrl: "assets/coffee.png",
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
    });

    cafes.forEach(cafe => {

        const lat = cafe.lat;
        const lon = cafe.lon;

        const marker = L.marker(
            [lat, lon],
            {
                icon: coffeeIcon
            }
        )
        .addTo(map)
        .bindPopup(`
            <strong>${cafe.tags?.name || "Unnamed Cafe"}</strong>
            <br>
            📍 ${formatDistance(cafe.distance)} away
        `);

        // Save cafe object for later use
        marker.cafe = cafe;

        // Clicking the marker opens details panel
        marker.on("click", () => {
            showDetails(cafe);
        });

        cafeMarkers.push(marker);

    });

}

function focusCafe(index) {

    const marker = cafeMarkers[index];

    if (!marker) return;

    map.flyTo(marker.getLatLng(), 17, {
        animate: true,
        duration: 1
    });

    marker.openPopup();

    showDetails(marker.cafe);

}
