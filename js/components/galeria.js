function cargarGaleria(proyectos){
    const galeriaContainer = document.querySelector('.galeria-container');
    let contenido = '';

    proyectos.forEach((elemento, index)=> {
        contenido += `
        <article class="card-galeria" style="animation-delay: ${index * 0.1}s">
            <img src="../${elemento.imagen}" alt="${elemento.titulo}">
            <h3>${elemento.titulo}</h3>
            <p>${elemento.descripcion}</p>
            <a class="enlace-galeria" href="#">
                Ver más
                <img src="../${elemento.icono}" alt="Ver más">
            </a>
        </article>
        `;
    });
    galeriaContainer.innerHTML = contenido;
}

//CARROUSEL
const carousel = document.getElementById('carousel');
const cajas = document.querySelectorAll('.caja');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const dotsContainer = document.getElementById('dots-container');

let proyectos = [];
let currentIndex = 0;
let startX = 0; //Posicion inicial del ratón
let isDragging = false; //Para detectar si el raton esta siendo arrastrado

//Preparamos la estructura de cada caja (imagen + contenido de texto)
cajas.forEach((caja) => {
    caja.innerHTML = `
        <img alt="" draggable="false">
        <div class="caja-contenido">
            <h3></h3>
            <p></p>
        </div>
    `;
});

function updateCarousel(){
    if(proyectos.length === 0) return;

    //Calcular los indices de las cajas
    const prevIndex = (currentIndex - 1 + proyectos.length) % proyectos.length;
    const nextIndex = (currentIndex + 1) % proyectos.length;

    cajas.forEach((caja, index) => {
        let proyecto;
        if(index === 0){
            proyecto = proyectos[prevIndex];
        }else if(index === 1){
            proyecto = proyectos[currentIndex];
        }else if(index === 2){
            proyecto = proyectos[nextIndex];
        }

        const img = caja.querySelector('img');
        const titulo = caja.querySelector('h3');
        const descripcion = caja.querySelector('p');

        img.src = `../${proyecto.imagen}`;
        img.alt = `${proyecto.titulo}`;
        titulo.textContent = `${proyecto.titulo}`;
        descripcion.textContent = `${proyecto.descripcion}`;
    });

    //Actualizar los puntos
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
        dot.classList.toggle('inactive', index !== currentIndex);
    });
}

//Eventos botones
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + proyectos.length) % proyectos.length;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % proyectos.length;
    updateCarousel();
});

//Funcionalidad para arrastrar
carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
});

carousel.addEventListener('mousemove', (e) => {
    if(!isDragging) return;

    const moveX = e.pageX - startX;
    if(Math.abs(moveX) > 100){
        if(moveX > 0){
            currentIndex = (currentIndex - 1 + proyectos.length) % proyectos.length;
        }else{
            currentIndex = (currentIndex + 1) % proyectos.length;
        }
        updateCarousel();
        isDragging = false;
    }
});

carousel.addEventListener('mouseup', () => {
    isDragging = false;
});

//FUNCIONALIDAD TÁCTIL PARA MÓVILES
carousel.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
});

carousel.addEventListener('touchmove', (e) => {
    if(!isDragging) return;

    const moveX = e.touches[0].pageX - startX;
    if(Math.abs(moveX) > 100){
        if(moveX > 0){
            currentIndex = (currentIndex - 1 + proyectos.length) % proyectos.length;
        }else{
            currentIndex = (currentIndex + 1) % proyectos.length;
        }
        updateCarousel();
        isDragging = false;
    }
});

carousel.addEventListener('touchend', () => {
    isDragging = false;
});

//fetch
fetch('../data/datos.json')
    .then(response => response.json())
    .then(data => {
        cargarGaleria(data.proyectos);
        proyectos = data.proyectos;
        //Crear un punto para cada proyecto
        proyectos.forEach(() => {
            const dot = document.createElement('div');
            dot.classList.add('dot', 'inactive');
            dotsContainer.appendChild(dot);
        });
        updateCarousel();
    })
    .catch(error => console.error(error))
