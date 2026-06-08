const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if(window.scrollY > 100){
        header.classList.add('scrolled');
    }else{
        header.classList.remove('scrolled');
    }
});

//Menú toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});