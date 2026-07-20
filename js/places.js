async function searchNearbyCafes(location) {

    const radius = 5000;

    const query = `
[out:json][timeout:25];
(
  node["amenity"="cafe"](around:${radius},${location.lat},${location.lng});
  way["amenity"="cafe"](around:${radius},${location.lat},${location.lng});
  relation["amenity"="cafe"](around:${radius},${location.lat},${location.lng});
);
out center;
`;

    try {

        const response = await fetch(
            "https://overpass.kumi.systems/api/interpreter",
            {
                method: "POST",
                body: query
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        // Process cafes
        const cafes = data.elements.map(cafe => {

            const lat = cafe.lat ?? cafe.center.lat;
            const lon = cafe.lon ?? cafe.center.lon;

            return {
                ...cafe,
                lat,
                lon,
                distance: calculateDistance(
                    location.lat,
                    location.lng,
                    lat,
                    lon
                )
            };

        });

        // Sort by nearest
        cafes.sort((a, b) => a.distance - b.distance);

        console.log(cafes);

        displayCafeList(cafes);

        addCafeMarkers(cafes);

    }
    catch (error) {

        console.error(error);

        document.getElementById("cafeList").innerHTML = `
            <p>Unable to load nearby cafes.</p>
        `;

    }

}
