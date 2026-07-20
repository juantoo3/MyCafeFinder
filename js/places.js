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

        console.log(data);

        displayCafeList(data.elements);

        addCafeMarkers(data.elements);

    }
    catch(error){

        console.error(error);

        document.getElementById("cafeList").innerHTML =
            `<p>Unable to load nearby cafes.</p>`;

    }

}
