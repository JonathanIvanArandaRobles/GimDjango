document.addEventListener('DOMContentLoaded', () => {

    // Inicialización del Swiper de descripción de clase
    const descSwiper = new Swiper('.descSwiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.descSwiper .swiper-pagination',
            clickable: true,
        },
    });

    // Reproducción de video in-situ
    const playBtn = document.getElementById('playBtn');
    const videoPoster = document.getElementById('videoPoster');
    const mainVideo = document.getElementById('mainVideo');

    if (playBtn && mainVideo) {
        playBtn.addEventListener('click', () => {
            videoPoster.classList.add('hidden'); // Oculta la portada
            mainVideo.play(); // Inicia el video automáticamente
        });
    }
});