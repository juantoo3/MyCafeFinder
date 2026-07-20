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
