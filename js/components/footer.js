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
                        <img src="../${elemento.iconoInstagram}" alt="Enlace a instagram">
                    </a>
                    <a href="${elemento.github}" target="_blank">
                        <img src="../${elemento.iconoGithub}" alt="Enlace a github">
                    </a>
                    <a href="${elemento.linkedin}" target="_blank">
                        <img src="../${elemento.iconoLinkedin}" alt="Enlace a linkedin">
                    </a>
                </div>
            </div>
        `
    });

    footerContainer.innerHTML = contenido;
}
fetch('../data/datos.json')
    .then(response => response.json())
    .then(data => {
        cargarFooter(data.footer);
    })
    .catch(error => console.error(error));