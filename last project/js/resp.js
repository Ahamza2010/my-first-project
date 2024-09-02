// Correcting variable declarations with 'const' or 'let'
const burger = document.querySelector('.burger');
const navbar = document.querySelector('.navbar');
const navList = document.querySelector('.nav-list'); // Corrected variable name
const rightnav = document.querySelector('.rightnav');

// Fixing the event listener and class names
burger.addEventListener('click', () => {
    rightnav.classList.toggle('v-class-resp');
    navList.classList.toggle('v-class-resp'); // Corrected class name
    navbar.classList.toggle('h-nav-resp');
});
