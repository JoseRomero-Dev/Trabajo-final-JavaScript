function cargarContacto(infoContacto){
    const containerInfo = document.querySelector('.info-contacto');
    let contenido = '';

    infoContacto.forEach(elemento => {
        contenido += `
            <h3>${elemento.titulo}</h3>
            <div class="dato-contacto">
                <div class="dato-icon">
                    <i class="ti ti-map-pin"></i>
                </div>
                <div class="dato-texto">
                    <h4>${elemento.tituloDireccion}</h4>
                    <p>${elemento.direccion}</p>
                </div>
            </div>
            <div class="dato-contacto">
                <div class="dato-icon">
                    <i class="ti ti-phone"></i>
                </div>
                <div class="dato-texto">
                    <h4>${elemento.tituloTelefono}</h4>
                    <p>${elemento.telefono}</p>
                </div>
            </div>
            <div class="dato-contacto">
                <div class="dato-icon">
                    <i class="ti ti-mail"></i>
                </div>
                <div class="dato-texto">
                    <h4>${elemento.tituloEmail}</h4>
                    <p>${elemento.email}</p>
                </div>
            </div>
            <div class="dato-contacto">
                <div class="dato-icon">
                    <i class="ti ti-clock"></i>
                </div>
                <div class="dato-texto">
                    <h4>${elemento.tituloHorario}</h4>
                    <p>${elemento.horario}</p>
                </div>
            </div>
        `
    });
    containerInfo.innerHTML = contenido;
}

fetch('../data/datos.json')
    .then(response => response.json())
    .then(data => {
        cargarContacto(data.contacto);
    })
    .catch(error => console.error(error));