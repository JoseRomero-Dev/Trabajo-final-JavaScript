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

const PREFIJO = '../';
//fetch
fetch('../data/datos.json')
    .then(response => response.json())
    .then(data => {
        cargarGaleria(data.proyectos, PREFIJO);
    })
    .catch(error => console.error(error))

