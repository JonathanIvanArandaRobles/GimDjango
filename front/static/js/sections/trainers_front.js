// static/js/sections/trainers.js

// Carrusel Infinito de Trainers

function initTrainersCarousel() {
    const track = document.getElementById('trainersTrack');
    const btnPrev = document.getElementById('btnPrevTrainer');
    const btnNext = document.getElementById('btnNextTrainer');

    if (!track || !btnPrev || !btnNext) return;

    let isAnimating = false;
    function getTrainerStep() {
        const firstCard = track.querySelector('.trainer-card');
        return firstCard ? firstCard.offsetWidth + 20 : 0;
    }

    btnNext.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        track.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        track.style.transform = `translateX(-${getTrainerStep()}px)`;

        track.addEventListener('transitionend', function handler() {
            track.removeEventListener('transitionend', handler);
            track.style.transition = 'none';
            track.appendChild(track.firstElementChild);
            track.style.transform = 'translateX(0)';
            setTimeout(() => { isAnimating = false; }, 20);
        });
    });

    btnPrev.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        track.style.transition = 'none';
        track.insertBefore(track.lastElementChild, track.firstElementChild);
        track.style.transform = `translateX(-${getTrainerStep()}px)`;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                track.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
                track.style.transform = 'translateX(0)';
            });
        });

        track.addEventListener('transitionend', function handler() {
            track.removeEventListener('transitionend', handler);
            isAnimating = false;
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initTrainersCarousel();
});