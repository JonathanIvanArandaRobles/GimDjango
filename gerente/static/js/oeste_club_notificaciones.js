// static/js/oeste_club_notificaciones.js

let estadoSeleccionado = 'todos';
let categoriaSeleccionada = 'todas';

document.addEventListener("DOMContentLoaded", function () {
    conectarCampanaShell();
    actualizarContadores();
});

function conectarCampanaShell() {
    // Buscar el botón de campana en el header superior
    const headerCampana = document.querySelector('header button span.material-symbols-outlined');
    if (headerCampana && headerCampana.innerText.trim() === 'notifications') {
        const btn = headerCampana.closest('button');
        if (btn) {
            btn.setAttribute('id', 'btn-campana-global');
            btn.onclick = function (e) {
                e.stopPropagation();
                togglePopoverCampana();
            };
        }
    }
}

function togglePopoverCampana() {
    const pop = document.getElementById('popover-campana');
    if (pop) {
        pop.classList.toggle('hidden');
    }
}

function cerrarPopover() {
    const pop = document.getElementById('popover-campana');
    if (pop) pop.classList.add('hidden');
}

// Cerrar popover al clickear fuera
document.addEventListener('click', function (e) {
    const pop = document.getElementById('popover-campana');
    const btn = document.getElementById('btn-campana-global');
    if (pop && !pop.classList.contains('hidden')) {
        if (!pop.contains(e.target) && (!btn || !btn.contains(e.target))) {
            pop.classList.add('hidden');
        }
    }
});

function toggleModalConfig() {
    const modal = document.getElementById('modal-config-alertas');
    if (modal) modal.classList.toggle('hidden');
}

function setEstadoFiltro(nuevoEstado) {
    estadoSeleccionado = nuevoEstado;
    document.querySelectorAll('.estado-tab').forEach(tab => {
        tab.classList.remove('bg-surface-container-lowest', 'text-primary', 'shadow-sm', 'font-bold');
        tab.classList.add('text-on-surface-variant');
    });

    const activeTab = document.getElementById('tab-estado-' + nuevoEstado);
    if (activeTab) {
        activeTab.classList.remove('text-on-surface-variant');
        activeTab.classList.add('bg-surface-container-lowest', 'text-primary', 'shadow-sm', 'font-bold');
    }
    aplicarFiltros();
}

function setCategoriaFiltro(cat) {
    categoriaSeleccionada = cat;
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('bg-primary', 'text-on-primary', 'font-bold', 'shadow-sm');
        btn.classList.add('bg-surface-container-low', 'text-on-surface');
    });

    const activeBtn = document.querySelector(`.cat-btn[data-cat="${cat}"]`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-surface-container-low', 'text-on-surface');
        activeBtn.classList.add('bg-primary', 'text-on-primary', 'font-bold', 'shadow-sm');
    }
    aplicarFiltros();
}

function aplicarFiltros() {
    const searchVal = (document.getElementById('filtro-busqueda').value || '').toLowerCase().trim();
    const periodoVal = document.getElementById('filtro-periodo').value;
    const severidadVal = document.getElementById('filtro-severidad').value;

    const cards = document.querySelectorAll('.noti-card');
    let visiblesCount = 0;

    cards.forEach(card => {
        const isUnread = card.getAttribute('data-unread') === 'true';
        const cat = card.getAttribute('data-cat');
        const periodo = card.getAttribute('data-periodo');
        const severidad = card.getAttribute('data-severidad');
        const textContent = card.innerText.toLowerCase();

        let matchEstado = true;
        if (estadoSeleccionado === 'unread') matchEstado = isUnread;
        if (estadoSeleccionado === 'read') matchEstado = !isUnread;

        let matchCat = (categoriaSeleccionada === 'todas') || (cat === categoriaSeleccionada);
        let matchPeriodo = (periodoVal === 'todos') || (periodo === periodoVal);
        let matchSeveridad = (severidadVal === 'todas') || (severidad === severidadVal);
        let matchSearch = (searchVal === '') || textContent.includes(searchVal);

        if (matchEstado && matchCat && matchPeriodo && matchSeveridad && matchSearch) {
            card.style.display = 'flex';
            visiblesCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Actualizar visibilidad de encabezados cronológicos
    document.querySelectorAll('.seccion-cronologica').forEach(sec => {
        const visiblesEnSec = sec.querySelectorAll('.noti-card[style="display: flex;"]');
        const countBadge = sec.querySelector('.count-seccion');
        if (countBadge) countBadge.innerText = visiblesEnSec.length;
        if (visiblesEnSec.length === 0) {
            sec.style.display = 'none';
        } else {
            sec.style.display = 'flex';
        }
    });

    // Empty state handling
    const emptyState = document.getElementById('empty-state-alertas');
    if (visiblesCount === 0) {
        emptyState.classList.remove('hidden');
        emptyState.classList.add('flex');
    } else {
        emptyState.classList.add('hidden');
        emptyState.classList.remove('flex');
    }
}

function toggleLeido(cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;
    const isUnread = card.getAttribute('data-unread') === 'true';

    if (isUnread) {
        card.setAttribute('data-unread', 'false');
        card.classList.add('opacity-90', 'bg-surface-container-lowest/80');
        const dot = card.querySelector('.unread-dot');
        if (dot) dot.remove();
        const leftBar = card.querySelector('.absolute.left-0');
        if (leftBar) leftBar.remove();
        mostrarToast('Notificación marcada como leída');
    } else {
        card.setAttribute('data-unread', 'true');
        card.classList.remove('opacity-90', 'bg-surface-container-lowest/80');
        mostrarToast('Notificación marcada como pendiente');
    }

    actualizarContadores();
    aplicarFiltros();
}

function eliminarNoti(cardId) {
    const card = document.getElementById(cardId);
    if (card) {
        card.remove();
        mostrarToast('Notificación descartada del centro de alertas');
        actualizarContadores();
        aplicarFiltros();
    }
}

function marcarTodasLeidas() {
    document.querySelectorAll('.noti-card[data-unread="true"]').forEach(card => {
        card.setAttribute('data-unread', 'false');
        card.classList.add('opacity-90', 'bg-surface-container-lowest/80');
        const dot = card.querySelector('.unread-dot');
        if (dot) dot.remove();
        const leftBar = card.querySelector('.absolute.left-0');
        if (leftBar) leftBar.remove();
    });
    actualizarContadores();
    aplicarFiltros();
    mostrarToast('Todas las alertas marcadas como leídas');
    cerrarPopover();
}

function actualizarContadores() {
    const unreadCards = document.querySelectorAll('.noti-card[data-unread="true"]');
    const totalCards = document.querySelectorAll('.noti-card');
    const count = unreadCards.length;

    // Actualizar KPIs
    const kpiNoLeidas = document.getElementById('kpi-no-leidas');
    if (kpiNoLeidas) kpiNoLeidas.innerText = count;

    const kpiTotal = document.getElementById('kpi-total-alertas');
    if (kpiTotal) kpiTotal.innerText = totalCards.length;

    const badgeTab = document.getElementById('badge-tab-unread');
    if (badgeTab) badgeTab.innerText = count;

    const popBadge = document.getElementById('popover-badge-count');
    if (popBadge) {
        popBadge.innerText = count;
        if (count === 0) {
            popBadge.classList.remove('bg-error');
            popBadge.classList.add('bg-surface-container-high', 'text-on-surface-variant');
        }
    }

    // Actualizar badge del header shell si está presente
    const shellBadge = document.querySelector('header span.bg-error');
    if (shellBadge) {
        if (count === 0) {
            shellBadge.style.display = 'none';
        } else {
            shellBadge.style.display = 'block';
        }
    }
}

function resetearFiltros() {
    document.getElementById('filtro-busqueda').value = '';
    document.getElementById('filtro-periodo').value = 'todos';
    document.getElementById('filtro-severidad').value = 'todas';
    setEstadoFiltro('todos');
    setCategoriaFiltro('todas');
}

function filtrarPopover(tipo) {
    document.querySelectorAll('.pop-tab').forEach(b => {
        b.classList.remove('bg-surface-container', 'text-primary');
        b.classList.add('text-on-surface-variant');
    });
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('bg-surface-container', 'text-primary');
    }
    // Sincronizar con la lista principal
    if (tipo === 'todas') setEstadoFiltro('todos');
    if (tipo === 'unread') setEstadoFiltro('unread');
    if (tipo === 'finanzas') setCategoriaFiltro('finanzas');
    if (tipo === 'socios') setCategoriaFiltro('socios');
}

function seleccionarNotificacion(targetId) {
    cerrarPopover();
    const el = document.getElementById(targetId);
    if (el) {
        el.scrollIntoView({behavior: 'smooth', block: 'center'});
        el.classList.add('ring-2', 'ring-primary');
        setTimeout(() => el.classList.remove('ring-2', 'ring-primary'), 2000);
    }
}

function limpiarHistorial() {
    if (confirm("¿Desea archivar las notificaciones leídas de este período?")) {
        document.querySelectorAll('.noti-card[data-unread="false"]').forEach(c => c.remove());
        actualizarContadores();
        aplicarFiltros();
        mostrarToast('Historial de alertas leídas archivado');
    }
}

function mostrarToast(mensaje) {
    const toast = document.getElementById('toast-feedback');
    const msg = document.getElementById('toast-msg');
    if (toast && msg) {
        msg.innerText = mensaje;
        toast.classList.remove('translate-y-20', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
        setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0');
            toast.classList.remove('translate-y-0', 'opacity-100');
        }, 2600);
    }
}