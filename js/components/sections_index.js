//PRESENTACIÓN
function cargarPresentacion(presentacion){
    const presentacionContainer = document.querySelector('.presentacion-container');
    let contenido = '';

    presentacion.forEach(elemento => {
        contenido += `
            <h2 class="titulo-hero">${elemento.titulo}</h2>
            <p>${elemento.descripcion}</p>
            <a href="./views/contacto.html" class="btn-presentacion">${elemento.boton}</a>
        `
    });
    presentacionContainer.innerHTML = contenido;
}

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
                <a class="enlace-proyecto" href="${elemento.enlace}">
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

//FOOTER
function cargarFooter(footer){
    const footerContainer = document.querySelector('.footer-container');
    let contenido = '';
    
    footer.forEach(elemento => {
        contenido += `
            <div class="footer-info">
                <h3>${elemento.titulo1}</h3>
                <p>${elemento.descripcion}</p>
            </div>
            
            <div class="footer-contacto">
                <h3>${elemento.titulo2}</h3>
                <address>${elemento.direccion}<br>${elemento.subdireccion}</address>
            </div>

            <div class="footer-redes">
                <h3>${elemento.titulo3}</h3>
                <div class="footer-redes-links">
                    <a href="${elemento.instagram}" target="_blank">
                        <img src="./${elemento.iconoInstagram}" alt="Enlace a instagram">
                    </a>
                    <a href="${elemento.github}" target="_blank">
                        <img src="./${elemento.iconoGithub}" alt="Enlace a github">
                    </a>
                    <a href="${elemento.linkedin}" target="_blank">
                        <img src="./${elemento.iconoLinkedin}" alt="Enlace a linkedin">
                    </a>
                </div>
            </div>
        `
    });
    footerContainer.innerHTML = contenido;
}

//Fetch de datos desde json
fetch(`data/datos.json`)
    .then(response => response.json())
    .then(data => {
        cargarPresentacion(data.presentacion);
        cargarServicios(data.servicios);
        cargarProyectos(data.proyectos)
        cargarNoticias(data.noticias);
        cargarFooter(data.footer);
        //Avisar al script que las noticias,servicios,proyectos estan en el DOM
        document.dispatchEvent(new Event('elementosCargados'));
    })
    .catch(error => console.error(error));