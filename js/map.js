let map;
let userMarker;

function createMap(location){

    map = new google.maps.Map(document.getElementById("map"),{

        center:location,

        zoom:15,

        mapTypeControl:false,

        streetViewControl:false,

        fullscreenControl:false

    });

    userMarker = new google.maps.Marker({

        position:location,

        map,

        title:"You are here"

    });

}
