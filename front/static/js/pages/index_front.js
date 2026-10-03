// static/js/pages/index.js


// 4.1 Reproductor de Video (About)
function initAboutVideo() {
    const aboutVideo = document.getElementById('aboutVideo');
    const btnVideoPlay = document.getElementById('btnVideoPlay');
    const btnVideoMute = document.getElementById('btnVideoMute');

    if (btnVideoPlay && aboutVideo) {
        btnVideoPlay.addEventListener('click', () => {
            if (aboutVideo.paused) {
                aboutVideo.play();
                btnVideoPlay.classList.add('playing');
                btnVideoPlay.innerHTML = "<i class='bx bx-pause'></i>";
            } else {
                aboutVideo.pause();
                btnVideoPlay.classList.remove('playing');
                btnVideoPlay.innerHTML = "<i class='bx bx-play'></i>";
            }
        });

        aboutVideo.addEventListener('click', () => {
            btnVideoPlay.click();
        });
    }

    if (btnVideoMute && aboutVideo) {
        btnVideoMute.addEventListener('click', (e) => {
            e.stopPropagation();
            aboutVideo.muted = !aboutVideo.muted;
            btnVideoMute.innerHTML = aboutVideo.muted
                ? "<i class='bx bx-volume-mute'></i>"
                : "<i class='bx bx-volume-full'></i>";
        });
    }
}









// 4.1.2 Efecto Typed.js (About)
function initTypedClases() {
    const typedElement = document.querySelector('.typed-clases');
    
    if (typedElement && typeof Typed !== 'undefined') {
        // 1. Leer los nombres de las clases desde el atributo 'data-clases' del HTML
        const clasesData = typedElement.getAttribute('data-clases');
        
        // 2. Convertir el texto separado por comas en un Array. 
        // Si no hay datos, dejamos un texto de fallback.
        const clasesArray = clasesData 
            ? clasesData.split(',').map(clase => clase.trim()) 
            : ['Nuestras Clases']; 

        new Typed('.typed-clases', {
            strings: clasesArray, // Usamos el Array dinámico aquí
            typeSpeed: 60,
            backSpeed: 50,
            backDelay: 1000,
            loop: true
        });
    }
}













// 4.2 Sliders Genéricos (Clases y Servicios)

function initClassesSliders() {
    const sliderWrappers = document.querySelectorAll('.classes-slider-wrapper');
    sliderWrappers.forEach((wrapper) => {
        const slides = wrapper.querySelectorAll('.class-slide');
        const btnPrev = wrapper.querySelector('.btn-prev');
        const btnNext = wrapper.querySelector('.btn-next');
        let currentSlideIndex = 0;

        function updateSlide(newIndex) {
            if (newIndex >= slides.length) currentSlideIndex = 0;
            else if (newIndex < 0) currentSlideIndex = slides.length - 1;
            else currentSlideIndex = newIndex;

            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === currentSlideIndex);
            });
        }

        if (btnNext) btnNext.addEventListener('click', () => updateSlide(currentSlideIndex + 1));
        if (btnPrev) btnPrev.addEventListener('click', () => updateSlide(currentSlideIndex - 1));
    });
}










// 4.3 Clonación de Mini Carruseles Automáticos

function initMiniGalleries() {
    const miniTracks = document.querySelectorAll('.mini-gallery-track');
    miniTracks.forEach(track => {
        const cards = [...track.children];
        cards.forEach(card => track.appendChild(card.cloneNode(true)));
    });
}

















// SCRIPT DE NAVEGACIÓN MULTI-CARD 
// 4.4 Carrusel Infinito Clases Grupales Compacta
function initClasesMultiCarousel() {
    const track = document.getElementById('clasesMultiTrack');
    const prevBtn = document.getElementById('btnPrevClaseMulti');
    const nextBtn = document.getElementById('btnNextClaseMulti');

    if (!track || !prevBtn || !nextBtn) return;

    let isTransitioning = false;
    const originalCards = Array.from(track.querySelectorAll('.clase-card'));
    const totalOriginals = originalCards.length;

    const getVisibleCards = () => {
        const width = window.innerWidth;
        if (width <= 600) return 1;
        if (width <= 991) return 2;
        return 3;
    };

    let cloneCount = getVisibleCards();
    let currentIndex = cloneCount;

    const setupClones = () => {
        track.innerHTML = '';
        cloneCount = getVisibleCards();

        for (let i = totalOriginals - cloneCount; i < totalOriginals; i++) {
            const clone = originalCards[i].cloneNode(true);
            clone.classList.add('clone');
            track.appendChild(clone);
        }

        originalCards.forEach(card => track.appendChild(card));

        for (let i = 0; i < cloneCount; i++) {
            const clone = originalCards[i].cloneNode(true);
            clone.classList.add('clone');
            track.appendChild(clone);
        }

        currentIndex = cloneCount;
        setTrackPosition(false);
    };

    const setTrackPosition = (withAnimation = true) => {
        const firstCard = track.querySelector('.clase-card');
        if (!firstCard) return;

        const isMobile = window.innerWidth <= 599;

        let moveAmount;

        if (isMobile) {
            /*
             * En móvil:
             *
             * Card = 92%
             * Margen izquierdo = 4%
             * Margen derecho = 4%
             *
             * 92% + 4% + 4% = 100%
             *
             * Por lo tanto, cada slide se desplaza exactamente
             * el ancho del viewport.
             */
            const viewportWidth = track.parentElement.getBoundingClientRect().width;

            moveAmount = viewportWidth * currentIndex;
        } else {
            const cardWidth = firstCard.getBoundingClientRect().width;

            const gap =
                parseFloat(window.getComputedStyle(track).gap) || 28;

            moveAmount = (cardWidth + gap) * currentIndex;
        }

        track.style.transition = withAnimation
            ? 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'none';

        track.style.transform = `translateX(-${moveAmount}px)`;
    };

    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        setTrackPosition(true);
    });

    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        setTrackPosition(true);
    });

    track.addEventListener('transitionend', () => {
        isTransitioning = false;
        if (currentIndex >= totalOriginals + cloneCount) {
            currentIndex = cloneCount;
            setTrackPosition(false);
        }
        if (currentIndex < cloneCount) {
            currentIndex = totalOriginals + cloneCount - 1;
            setTrackPosition(false);
        }
    });

    window.addEventListener('resize', () => {
        const newVisible = getVisibleCards();
        if (newVisible !== cloneCount) {
            setupClones();
        } else {
            setTrackPosition(false);
        }
    });

    // 1) Cálculo inicial normal
    setupClones();

    // 2) NUEVO: doble requestAnimationFrame para esperar a que el
    //    navegador termine de pintar el layout antes de re-medir
    requestAnimationFrame(() => {
        requestAnimationFrame(() => setTrackPosition(false));
    });

    // 3) NUEVO: recalcular otra vez cuando TODO (imágenes, fuentes)
    //    haya terminado de cargar, que es el momento más confiable
    window.addEventListener('load', () => setTrackPosition(false));
}

document.addEventListener('DOMContentLoaded', () => {
    initAboutVideo();
    initTypedClases();
    initClassesSliders();
    initMiniGalleries();
    initClasesMultiCarousel();
});
