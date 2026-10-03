// static/js/oeste_club_personal.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Marcar visualmente el item 'Personal' en el menú lateral 
    // (Opcional: En Django esto lo harás directamente con {% if request.path ... %})
    const links = document.querySelectorAll('aside nav a');
    links.forEach(link => {
        if (link.getAttribute('data-path') === 'personal') {
            link.className = "flex items-center justify-between px-3.5 py-2.5 rounded-lg font-headline-sm text-label-lg bg-surface-container text-primary font-bold shadow-sm transition-all";
            // Validamos si ya tiene el badge para no duplicarlo
            if (!link.querySelector('.bg-primary')) {
                const badge = document.createElement('span');
                badge.className = 'px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold tracking-tight';
                badge.textContent = '24';
                link.appendChild(badge);
            }
        }
    });
});

// 2. Función para seleccionar un empleado de la tabla
// Al clickear una fila, se resalta visualmente
function selectStaff(id) {
    console.log("Colaborador seleccionado:", id);
    
    // Feedback visual para selección activa de filas en la tabla
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(r => r.classList.remove('bg-surface-container/50'));
    
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('bg-surface-container/50');
    }

    // Aquí a futuro harás una petición Fetch a Django para obtener 
    // los datos del empleado 'id' y poblar el panel lateral derecho.
}