function displayCafeList(cafes){

    const container=document.getElementById("cafeList");

    container.innerHTML="";

    cafes.forEach(cafe=>{

        container.innerHTML+=`

        <div class="cafe-card">

            <h4>${cafe.name}</h4>

            <p>⭐ ${cafe.rating || "No Rating"}</p>

            <p>${cafe.vicinity}</p>

        </div>

        `;

    });

}
