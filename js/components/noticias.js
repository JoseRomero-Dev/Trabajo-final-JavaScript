fetch('./data/noticias.json')
    .then(response => response.json())
    .then(data =>{
        const noticiasContainer = document.querySelector('.noticias-container');
        let contenido = '';

        data.noticias.forEach(noticia => {
            contenido += `
                <article class="card-noticia">
                    <img src="${noticia.imagen}" alt="${noticia.titulo}">
                    <div class="contenido-noticia">
                        <span>${noticia.fecha}</span>
                        <h3>${noticia.titulo}</h3>
                        <p>${noticia.descripcion}</p>
                    </div>
                </article>
            `;
        });

        noticiasContainer.innerHTML = contenido;
    })
    .catch(error => console.error(error));