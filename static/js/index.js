let menuIcon = document.querySelector("#menu-icon");
let menuOpen = false;

menuIcon.addEventListener('click', () => {
    let navLinks = document.querySelector(".nav-links");

    menuOpen = !menuOpen;

    menuIcon.innerHTML = menuOpen ? 'close' : 'menu';

    if(menuOpen) {
        navLinks.classList.remove("menuClosed");
        navLinks.classList.add("menuOpen");
    } else {
        navLinks.classList.remove("menuOpen");
        navLinks.classList.add("menuClosed");
    }
});