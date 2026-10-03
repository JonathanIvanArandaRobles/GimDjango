// static/js/oeste_club_planes_y_precios.js

document.addEventListener('DOMContentLoaded', () => {
    // Micro-interacción sencilla de búsqueda y toggles
    const searchInput = document.getElementById('search-plans');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        // Seleccionamos las tarjetas de planes (dentro de la columna de 8)
        const planCards = document.querySelectorAll('.lg\\:col-span-8 > div');
        planCards.forEach(card => {
          const text = card.innerText.toLowerCase();
          if (text.includes(query)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    }
});

// Abrir y cerrar el modal de Nueva Promoción
function toggleModalPromo() {
    const modal = document.getElementById('modal-nueva-promo');
    if (modal) modal.classList.toggle('hidden');
}

// Desplegar selector de correo según checkbox
function toggleEmailOptions() {
    const check = document.getElementById('check-difundir-email');
    const opciones = document.getElementById('bloque-email-options');
    if (check && opciones) {
        if (check.checked) {
            opciones.classList.remove('hidden');
        } else {
            opciones.classList.add('hidden');
        }
    }
}

// Envío simulado y feedback
function guardarYLanzarPromo(e) {
    e.preventDefault();
    const btn = document.getElementById('btn-guardar-promo');
    const difundir = document.getElementById('check-difundir-email').checked;

    btn.disabled = true;
    btn.innerHTML = '<span class="material-symbols-outlined text-[18px] animate-spin">progress_activity</span> Procesando...';

    setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">check_circle</span><span>Guardar Promoción</span>';
        toggleModalPromo();

        if (difundir) {
            alert('¡Promoción guardada y campaña de email despachada exitosamente!');
        } else {
            alert('¡Promoción guardada en el catálogo arancelario!');
        }
    }, 1000);
}