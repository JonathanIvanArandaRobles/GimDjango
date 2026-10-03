document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainSidebar = document.getElementById('main-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');

    let isSidebarOpen = false;

    function openSidebar() {
        if (!mainSidebar || !sidebarOverlay) return;
        isSidebarOpen = true;
        
        mainSidebar.classList.remove('-translate-x-full');
        mainSidebar.classList.add('translate-x-0');
        
        sidebarOverlay.classList.remove('hidden');
        // Pequeño delay para que la transición de opacidad funcione
        setTimeout(() => {
            sidebarOverlay.classList.remove('opacity-0');
            sidebarOverlay.classList.add('opacity-100');
        }, 10);
    }

    function closeSidebar() {
        if (!mainSidebar || !sidebarOverlay) return;
        isSidebarOpen = false;
        
        mainSidebar.classList.remove('translate-x-0');
        mainSidebar.classList.add('-translate-x-full');
        
        sidebarOverlay.classList.remove('opacity-100');
        sidebarOverlay.classList.add('opacity-0');
        
        // Espera a que termine la animación de opacidad para ocultarlo del DOM
        setTimeout(() => {
            sidebarOverlay.classList.add('hidden');
        }, 300);
    }

    function toggleSidebar() {
        if (isSidebarOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }

    // Event Listeners
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar();
        });
    }

    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeSidebar();
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            closeSidebar();
        });
    }

    // Cerrar al hacer clic fuera del sidebar
    document.addEventListener('click', (e) => {
        if (isSidebarOpen && mainSidebar && !mainSidebar.contains(e.target) && hamburgerBtn && !hamburgerBtn.contains(e.target)) {
            closeSidebar();
        }
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isSidebarOpen) {
            closeSidebar();
        }
    });
});