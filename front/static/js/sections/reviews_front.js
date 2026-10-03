// static/js/sections/reviews.js

// Carrusel Infinito de Reviews

function initReviewsCarousel() {
    const track = document.getElementById('reviewsTrack');
    const btnPrev = document.getElementById('btnPrevReview');
    const btnNext = document.getElementById('btnNextReview');

    if (!track || !btnPrev || !btnNext) return;

    let isAnimating = false;
    function getReviewStep() {
        const firstCard = track.querySelector('.review-card');
        return firstCard ? firstCard.offsetWidth + 24 : 0; // 24 es el gap de CSS
    }

    btnNext.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        track.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        track.style.transform = `translateX(-${getReviewStep()}px)`;

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
        track.style.transform = `translateX(-${getReviewStep()}px)`;

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
    initReviewsCarousel();
});