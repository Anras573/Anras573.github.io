const themeToggler = document.querySelector('.theme-toggler input[type="checkbox"]');
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

themeToggler.addEventListener("click", function () {
    if (prefersDarkScheme.matches) {
        document.body.classList.toggle("light-theme");
    } else {
        document.body.classList.toggle("dark-theme");
    }
});