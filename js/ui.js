function displayCafeList(cafes){

    const list=document.getElementById("cafeList");

    list.innerHTML="";

    cafes.forEach((cafe,index)=>{

        const div=document.createElement("div");

        div.className="cafe-card";

        div.innerHTML=`

        <h3>${cafe.tags?.name || "Unnamed Cafe"}</h3>

        <div class="distance">

        ${(cafe.distance/1000<1)?

            Math.round(cafe.distance)+" m"

            :

            (cafe.distance/1000).toFixed(1)+" km"

        }

        away

        </div>

        <p>

        ${cafe.tags?.["addr:street"] || ""}

        </p>

        `;

        div.onclick=()=>{

            focusCafe(index);

        };

        list.appendChild(div);

    });

}


function showDetails(cafe){

    document.getElementById("detailsPanel")
        .classList.add("show");

    document.getElementById("detailName")
        .innerText=
            cafe.tags?.name ||
            "Unnamed Cafe";

    document.getElementById("detailDistance")
        .innerText=
            Math.round(cafe.distance)+" meters away";

    document.getElementById("detailAddress")
        .innerText=
            cafe.tags?.["addr:full"] ||

            cafe.tags?.["addr:street"] ||

            "No address";
    document
        .getElementById("closePanel")
        .onclick=()=>{
        
        document
        .getElementById("detailsPanel")
        .classList.remove("show");
        };

}
