function displayCafeList(cafes) {

    const list =
        document.getElementById("cafeList");

    list.innerHTML = "";

    cafes.forEach(cafe => {

        const name =
            cafe.tags?.name || "Unnamed Cafe";

        const address =
            cafe.tags?.addr_street || "";

        list.innerHTML += `
            <div class="cafe-card">

                <h4>${name}</h4>

                <p>${address}</p>

            </div>
        `;

    });

}
