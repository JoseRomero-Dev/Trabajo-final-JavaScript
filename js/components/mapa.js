//MAPA -- PAGINA CONTACTO
//Pedir al navegador que nos localize
let options = {
    //Hacemos que calcule la posición mas exacta posible
    enableHighAccuracy : true,
    timeout: 5000,
    maximumAge: 0
}
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
        success,
        error,
        options
    );
}else{
    alert('Los servicios de geolocalización no estan disponibles');
}

function success(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let map = L.map('map',{
        center: [latitude, longitude],
        zoom: 14
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution:'DevSolutions'}).addTo(map);

    let control = L.Routing.control({
        waypoints:[
            L.latLng(latitude, longitude),
            L.latLng(37.392524, -6.002147)
        ],
        language: 'es'
    }).addTo(map);
}
function error(err){
    console.error(err);
    alert('No se pudo obtener tu ubicación.');
}