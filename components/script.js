// MOBILE NAV WORK

const header = document.querySelector(".header");
const headerBtn = document.querySelector(".btn-mobile-nav");

headerBtn.addEventListener("click", () => {
  header.classList.toggle("nav-open");
});
