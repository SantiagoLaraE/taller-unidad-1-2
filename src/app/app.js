//Funcionamiento Menu Mobile

const btnsMenuToggle = document.querySelectorAll(".header__menu-toggle");
const menu = document.querySelector(".header__menu");
const menuLinks = document.querySelectorAll(".header__menu ul li a");
const closeMenu = () => {
  menu.classList.remove("opened");
};
const openMenu = () => {
  menu.classList.add("opened");
};

const toggleMenu = () => {
  if (menu.classList.contains("opened")) {
    closeMenu();
  } else {
    openMenu();
  }
};

menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

btnsMenuToggle.forEach((btn) => btn.addEventListener("click", toggleMenu));
