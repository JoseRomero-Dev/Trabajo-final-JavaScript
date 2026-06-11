//Para controlar el efecto del navbar
const header = document.querySelector('header');
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

//Animación cards de las secciones del index
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

//Llamadas a las funciones al hacer scroll
window.addEventListener('scroll', () => {
    scrollNavBar();
    mostrarElements();
});
//Avisamos de que las noticias estan cargadas
document.addEventListener('elementosCargados', () => {
    elements = document.querySelectorAll('.titulo, .card-servicio, .card-proyecto, .card-noticia');
    mostrarElements();
});
