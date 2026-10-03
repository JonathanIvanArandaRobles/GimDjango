// static/js/pages/about.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. Inicialización de Swiper (Sección Historia)
    // 1. Inicialización de Swiper (Sección Historia)
    const swiperContainer = document.querySelector('.historySwiper');
    if (swiperContainer) {
        const historySwiper = new Swiper('.historySwiper', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 0,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: false // Evita que el cursor táctil emulado congele la reproducción
            },
            pagination: {
                el: '.historySwiper .swiper-pagination',
                clickable: true,
            },
            // Observadores de mutación indispensables para emuladores y redimensionado
            observer: true,
            observeParents: true,
            resizeObserver: true
        });
    }

    // 2. Clonación de cards para el carrusel continuo (Sección Comunidad)
    const vlexoraTrack = document.querySelector('.vlexora-carousel-track');
    if (vlexoraTrack) {
        const vlexoraCards = [...vlexoraTrack.children];
        for (const card of vlexoraCards) {
            vlexoraTrack.appendChild(card.cloneNode(true));
        }
    }
});

// Refresco de AOS una vez que cargan las imágenes del slider
window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});