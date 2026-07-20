function displayCafeList(cafes) {

    const list = document.getElementById("cafeList");

    list.innerHTML = "";

    if (cafes.length === 0) {

        list.innerHTML = `
            <p>No nearby cafes found.</p>
        `;

        return;
    }

    cafes.forEach((cafe, index) => {

        const card = document.createElement("div");

        card.className = "cafe-card";

        card.innerHTML = `
            <h3>${cafe.tags?.name || "Unnamed Cafe"}</h3>

            <div class="distance">
                ${formatDistance(cafe.distance)} away
            </div>

            <p>
                ${getAddress(cafe)}
            </p>
        `;

        card.addEventListener("click", () => {

            // Highlight selected card
            document.querySelectorAll(".cafe-card")
                .forEach(c => c.classList.remove("active"));

            card.classList.add("active");

            focusCafe(index);

        });

        list.appendChild(card);

    });

}

// ==========================================

function showDetails(cafe) {

    const panel = document.getElementById("detailsPanel");

    panel.classList.add("show");

    document.getElementById("detailName").textContent =
        cafe.tags?.name || "Unnamed Cafe";

    document.getElementById("detailDistance").textContent =
        formatDistance(cafe.distance) + " away";

    document.getElementById("detailAddress").textContent =
        getAddress(cafe);

    document.getElementById("navigateBtn").onclick = () => {

        window.open(
            `https://www.google.com/maps/dir/?api=1&destination=${cafe.lat},${cafe.lon}`,
            "_blank"
        );

    };

}

// ==========================================

function hideDetails() {

    document
        .getElementById("detailsPanel")
        .classList.remove("show");

}

// ==========================================

function formatDistance(distance) {

    if (distance < 1000) {

        return `${Math.round(distance)} m`;

    }

    return `${(distance / 1000).toFixed(1)} km`;

}

// ==========================================

function getAddress(cafe) {

    const parts = [

        cafe.tags?.["addr:housenumber"],

        cafe.tags?.["addr:street"],

        cafe.tags?.["addr:suburb"],

        cafe.tags?.["addr:city"],

        cafe.tags?.["addr:postcode"]

    ].filter(Boolean);

    if (parts.length > 0) {
        return parts.join(", ");
    }

    return "Address unavailable";

}

// INITIALIZE EVENTS

document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("closePanel")
        .addEventListener("click", hideDetails);

});
