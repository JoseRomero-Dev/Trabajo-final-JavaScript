const header = document.querySelector('header');

//Para controlar el efecto del navbar
function scrollNavBar() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

//Menú toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

//Animación cards de las secciones
let elements = document.querySelectorAll('.titulo, .card-servicio, .card-proyecto, .card-noticia');

function mostrarElements() {
    const altura = window.innerHeight * 0.85;
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < altura) {
            element.classList.add('show');
        } else {
            element.classList.remove('show');
        }
    });
}

window.addEventListener('scroll', () => {
    scrollNavBar();
    mostrarElements();
});
document.addEventListener('noticiasListas', () => {
    elements = document.querySelectorAll('.titulo, .card-servicio, .card-proyecto, .card-noticia');
    mostrarElements();
})
//MAPA -- PAGINA CONTACTO
//Pedir al navegador que nos localize
let options = {
    //Hacemos que calcule la posición mas exacta posible
    enableHighAccuracy : true,
    timeout: 5000,
    maximunAge: 0
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
function error(){}