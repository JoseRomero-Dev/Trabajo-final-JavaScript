//SERVICIOS
function cargarServicios(servicios){
    const serviciosContainer = document.querySelector('.servicios-container');
    let contenido = '';

    servicios.forEach(elemento => {
        contenido += `
            <article class="card-servicio">
                <img src="${elemento.imagen}" alt="${elemento.titulo}">
                <h3>${elemento.titulo}</h3>
                <p>${elemento.descripcion}</p>
            </article>
        `;
    });
    serviciosContainer.innerHTML = contenido;
}
//PROYECTOS
function cargarProyectos(proyectos){
    const proyectosContainer = document.querySelector('.proyectos-container');
    let contenido = '';
    //Para que solo recorra los tres primeros elementos
    proyectos.slice(0, 3).forEach(elemento => {
        contenido += `
            <article class="card-proyecto">
                <img src="${elemento.imagen}" alt="${elemento.titulo}">
                <h3>${elemento.titulo}</h3>
                <p>${elemento.descripcion}</p>
                <a class="enlace-proyecto" href="../views/galeria.html">
                    Ver proyecto
                    <img src="${elemento.icono}" alt="Ver proyectos">
                </a>
            </article>
        `
    });
    proyectosContainer.innerHTML = contenido;
}

//NOTICIAS
function cargarNoticias(noticias) {
    const noticiasContainer = document.querySelector('.noticias-container');
    let contenido = '';

    noticias.forEach(elemento => {
        contenido += `
        <article class="card-noticia">
            <img src="${elemento.imagen}" alt="${elemento.titulo}">
            <div class="contenido-noticia">
                <span>${elemento.fecha}</span>
                <h3>${elemento.titulo}</h3>
                <p>${elemento.descripcion}</p>
            </div>
        </article>
        `;
    });
    noticiasContainer.innerHTML = contenido;
}

//Fetch de datos desde json
fetch('../data/datos.json')
    .then(response => response.json())
    .then(data => {
        cargarServicios(data.servicios);
        cargarProyectos(data.proyectos)
        cargarNoticias(data.noticias);
        //Avisar al script que las noticias,servicios estan en el DOM
        document.dispatchEvent(new Event('elementosCargados'));
    })
    .catch(error => console.error(error));