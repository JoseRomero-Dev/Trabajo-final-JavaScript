//MAPA -- PAGINA CONTACTO
//Pedir al navegador que nos localize
let options = {
    //Hacemos que calcule la posición mas exacta posible
    enableHighAccuracy : true,
    timeout: 20000,
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
        language: 'es',
        collapsed: true
    }).addTo(map);
}
function error(err){
    console.error(err);
    switch(err.code){
        case 1:
            alert('Permiso de ubicación denegado. Mostrando ubicación de la empresa.');
            break;
        case 2: 
            alert('Ubicación no disponible');
            break;
        case 3: 
            alert('Tiempo de espera agotado');
            break;
        default:
            alert('Error desconocido');
    }
    let map = L.map('map',{
        center:[37.392524, -6.002147],
        zoom:14
    });

    L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        { attribution:'DevSolutions' }
    ).addTo(map);

    L.marker([37.392524, -6.002147])
        .addTo(map)
        .bindPopup('DevSolutions');
}