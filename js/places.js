async function searchNearbyCafes(location) {

    const radius = 3000;

    const query = `
    [out:json];
    (
      node["amenity"="cafe"](around:${radius},${location.lat},${location.lng});
      way["amenity"="cafe"](around:${radius},${location.lat},${location.lng});
      relation["amenity"="cafe"](around:${radius},${location.lat},${location.lng});
    );
    out center;
    `;

    const url =
        "https://overpass-api.de/api/interpreter";

    const response = await fetch(url, {
        method: "POST",
        body: query
    });

    const data = await response.json();

    displayCafeList(data.elements);

    addCafeMarkers(data.elements);

}
