//Array de imagenes
const imagenes = [
    '../assets/images/galeria/Proyecto_1.png',
    '../assets/images/galeria/Proyecto_2.png',
    '../assets/images/galeria/Proyecto_3.png',
    '../assets/images/galeria/Proyecto_4.png',
    '../assets/images/galeria/Proyecto_5.png',
    '../assets/images/galeria/Proyecto_6.png'
];
//Generar la galeria dinámicamente
const galeriaContainer = document.querySelector('.galeria-container');

imagenes.forEach(imagen => {
    const img = document.createElement('img');

    img.src = imagen;
    img.alt = 'Proyecto';
    galeriaContainer.appendChild(img);
});

//Abrir y cerrar imagen
const modal = document.getElementById('modal-galeria');
const imagenModal = document.getElementById('imagen-modal');
const cerrar = document.querySelector('.cerrar');

document.querySelectorAll('.galeria-container img').forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'flex';
        imagenModal.src = img.src;
    });
});

cerrar.addEventListener('click', () => {
    modal.style.display = 'none';
});