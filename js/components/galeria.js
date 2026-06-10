function cargarGaleria(proyectos){
    const galeriaContainer = document.querySelector('.galeria-container');
    let contenido = '';

    proyectos.forEach(elemento => {
        contenido += `
        <article class="card-galeria">
            <img src="${elemento.imagen}" alt="${elemento.titulo}">
            <h3>${elemento.titulo}</h3>
            <p>${elemento.descripcion}</p>
            <a class="enlace-galeria" href="#">
                Ver más
                <img src="../assets/iconos/arrow.svg" alt="Ver más">
            </a>
        </article>
        `;
    });
    galeriaContainer.innerHTML = contenido;
}

//fetch
fetch('../data/datos.json')
    .then(response => response.json())
    .then(data => {
        cargarGaleria(data.proyectos)
    })
    .catch(error => console.error(error))

