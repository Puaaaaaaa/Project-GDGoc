const navbarNav = document.querySelector('.navbar-nav');
document.querySelector('#menu').onclick = ( ) => {
    navbarNav.classList.toggle('active');
}; 

const menu = document.querySelector('#menu');

document.addEventListener('click', function(event) {
    if (!menu.contains(event.target) && !navbarNav.contains(event.target)) {
        navbarNav.classList.remove('active');
    }
});