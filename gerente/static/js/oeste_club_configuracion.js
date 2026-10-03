// static/js/oeste_club_configuracion.js

// Lógica de Pestañas (Tabs) de Configuración
function switchTab(tabId, buttonElement) {
    // Ocultar todas las pestañas
    document.querySelectorAll('.tab-content').forEach(function (el) {
        el.classList.add('hidden');
    });

    // Mostrar pestaña seleccionada
    var activeTab = document.getElementById(tabId);
    if (activeTab) {
        activeTab.classList.remove('hidden');
    }

    // Resetear estilos de todos los botones
    document.querySelectorAll('.tab-btn').forEach(function (btn) {
        btn.classList.remove('bg-surface-container-lowest', 'text-primary', 'shadow-sm', 'font-semibold');
        btn.classList.add('text-on-surface-variant', 'font-medium');
    });

    // Activar estilo del botón clickeado
    buttonElement.classList.remove('text-on-surface-variant', 'font-medium');
    buttonElement.classList.add('bg-surface-container-lowest', 'text-primary', 'shadow-sm', 'font-semibold');
}

// Mostrar alerta (Toast) de guardado exitoso
function handleSave() {
    var toast = document.getElementById('saveToast');
    if (toast) {
        toast.classList.remove('translate-y-[-100%]', 'opacity-0', 'pointer-events-none');
        toast.classList.add('translate-y-0', 'opacity-100');
        setTimeout(function () {
            toast.classList.add('translate-y-[-100%]', 'opacity-0', 'pointer-events-none');
            toast.classList.remove('translate-y-0', 'opacity-100');
        }, 3500);
    }
}

// Resetear página si descartan cambios
function handleDiscard() {
    if (confirm("¿Estás seguro de que deseas descartar las modificaciones sin guardar de la sede?")) {
        window.location.reload();
    }
}

// Marcar pestaña del menú lateral al cargar
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('aside nav a');
    navLinks.forEach(function (link) {
        if (link.getAttribute('data-path') === 'configuracion') {
            link.classList.add('bg-surface-container', 'text-primary', 'font-bold', 'rounded-lg', 'shadow-sm');
            link.classList.remove('text-on-surface-variant');
        }
    });
});