function cargarGaleria(proyectos, prefijo){
    const galeriaContainer = document.querySelector('.galeria-container');
    let contenido = '';

    proyectos.forEach((elemento, index)=> {
        contenido += `
        <article class="card-galeria" style="animation-delay: ${index * 0.1}s">
            <img src="${prefijo}${elemento.imagen}" alt="${elemento.titulo}">
            <h3>${elemento.titulo}</h3>
            <p>${elemento.descripcion}</p>
            <a class="enlace-galeria" href="#">
                Ver más
                <img src="${prefijo}${elemento.icono}" alt="Ver más">
            </a>
        </article>
        `;
    });
    galeriaContainer.innerHTML = contenido;
}

//Le decimos la ruta del json cuando esta en GitHub Pages o lo cargamos desde servidor local para el desarrollo
const BASE = window.location.pathname.includes('/Trabajo-final-JavaScript/')
    ? '/Trabajo-final-JavaScript/'
    : '/';

//fetch
fetch(`${BASE}data/datos.json`)
    .then(response => response.json())
    .then(data => {
        cargarGaleria(data.proyectos, BASE);
    })
    .catch(error => console.error(error))

