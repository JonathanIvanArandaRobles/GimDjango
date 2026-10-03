// static/js/oeste_club_reportes.js

document.addEventListener('DOMContentLoaded', () => {
    // Activar visualmente la navegación del sidebar para 'reportes'
    const navLinks = document.querySelectorAll('aside nav a[data-path="reportes"]');
    if (navLinks.length > 0) {
        navLinks[0].classList.add('bg-surface-container', 'text-primary', 'font-bold');
    }

    // Lógica para las Pestañas (Tabs) de Categorías
    const tabs = document.querySelectorAll('.report-tab-btn');
    const sections = {
        'tab-socios': document.getElementById('seccion-socios'),
        'tab-asistencia': document.getElementById('seccion-asistencia'),
        'tab-finanzas': document.getElementById('seccion-finanzas'),
        'tab-personal': document.getElementById('seccion-personal')
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const target = tab.getAttribute('data-tab');

            // Resetear todos los tabs
            tabs.forEach(t => {
                t.classList.remove('bg-surface-container-lowest', 'shadow-sm', 'text-primary', 'font-bold');
                t.classList.add('text-on-surface-variant');
                const indicator = t.querySelector('.tab-indicator');
                if (indicator) indicator.classList.add('hidden');
            });

            // Activar tab clickeado
            tab.classList.add('bg-surface-container-lowest', 'shadow-sm', 'text-primary', 'font-bold');
            tab.classList.remove('text-on-surface-variant');
            const activeIndicator = tab.querySelector('.tab-indicator');
            if (activeIndicator) activeIndicator.classList.remove('hidden');

            // Scroll suave hacia la sección correspondiente
            Object.values(sections).forEach(sec => {
                if (sec && sec.id === target) {
                    sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    });
});

function toggleDropdown(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden');
}