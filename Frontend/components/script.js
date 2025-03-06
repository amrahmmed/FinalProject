const heroSec = document.querySelector(".main-section");
const mainHeader = document.querySelector(".header");

let options = {
  rootMargin: "-100px",
};

addEventListener;
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      heroSec.style.paddingTop = "9.6rem";
      mainHeader.classList.add("sticky");
    } else if (entry.isIntersecting) {
      heroSec.style.paddingTop = "4.8rem";
      mainHeader.classList.remove("sticky");
    }
  });
}, options);

observer.observe(heroSec);

const allinks = document.querySelectorAll("a:link");

allinks.forEach(function (link) {
  link.addEventListener("click", (e) => {
    header.classList.toggle("nav-open");
  });
});

// MOBILE NAV WORK

const header = document.querySelector(".header");
const headerBtn = document.querySelector(".btn-mobile-nav");

headerBtn.addEventListener("click", () => {
  header.classList.toggle("nav-open");
});
