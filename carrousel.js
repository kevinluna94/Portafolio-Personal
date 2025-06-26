// carousel.js

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector('#carouselHero');
  const carouselInstance = bootstrap.Carousel.getOrCreateInstance(carousel);

  carousel.addEventListener("click", function () {
    carouselInstance.next(); // Avanza al siguiente slide con un clic en cualquier parte del carrusel
  });
});
