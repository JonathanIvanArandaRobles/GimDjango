// static/js/main.js



/* ==========================================
   1. INICIALIZACIÓN GLOBAL (AOS)
   ========================================== */

function initAOS() {
    // 1. Inicializa AOS en cuanto el DOM está listo (ejecutado en DOMContentLoaded)
    AOS.init({ duration: 700, once: true, offset: 80 });

    // 2. Refresca las posiciones una vez que TODAS las imágenes, videos y sliders terminaron de cargar
    window.addEventListener('load', () => {
        AOS.refresh();
    });
}









/* ==========================================
       2. NAVEGACIÓN Y HEADER GLOBAL
   ========================================== */

// 2.1 Navbar Scroll

function initScrollHeader() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    });
}








// 2.2 Menú Móvil

function initMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const overlay = document.getElementById('overlay');
    const mobileClose = document.getElementById('mobileClose');

    // Abre o cierra el menú según su estado actual
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        overlay.classList.toggle('active');
    });

    // Cerrar desde la cruz interna
    if (mobileClose) {
        mobileClose.addEventListener('click', () => {
            navMenu.classList.remove('open');
            overlay.classList.remove('active');
        });
    }

    // Cerrar al cliquear en el fondo oscuro
    if (overlay) {
        overlay.addEventListener('click', () => {
            navMenu.classList.remove('open');
            overlay.classList.remove('active');
        });
    }

    // Cerrar automáticamente al tocar cualquier enlace del menú
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            overlay.classList.remove('active');
        });
    });
}











// 2.3 Smooth Scroll

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = 60;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });
}











// 2.4 ScrollSpy (Resaltar menú activo)
// 2.4 ScrollSpy (Resaltar menú activo)
function initScrollSpy() {
    // 1. CONDICIÓN CLAVE: Solo ejecutamos esto si estamos en la página de inicio ("/")
    // Si estamos en /nosotros/, /contacto/ o /clases/yoga/, cancelamos y dejamos que Django controle el menú.
    if (window.location.pathname !== '/' && window.location.pathname !== '/index_front.html') {
        return;
    }

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                // Removemos la clase activa de todos los enlaces
                navLinks.forEach(link => {
                    link.classList.remove('nav-active');

                    // 2. Usamos .includes() porque en Django los enlaces ahora son "/#seccion" en vez de "#seccion"
                    if (link.getAttribute('href') && link.getAttribute('href').includes('#' + id)) {
                        link.classList.add('nav-active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}



















/* ==========================================
       3. MODALES (VENTANAS EMERGENTES)
   ========================================== */
// 3.1 Modal Consulta Directa (WhatsApp)
function initModalConsulta() {
    const consultaModal = document.getElementById("consultaModal");
    const closeConsultaModalBtn = document.getElementById("consultaModalCloseBtn");
    const btnsAbrirConsulta = document.querySelectorAll(".btn-abrir-consulta");
    const consultaWaForm = document.getElementById("consultaWaForm");

    if (!consultaModal) return;

    function openConsultaModal() {
        consultaModal.classList.add("active");
        consultaModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }
    function closeConsultaModal() {
        consultaModal.classList.remove("active");
        consultaModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }
    btnsAbrirConsulta.forEach(btn => btn.addEventListener("click", openConsultaModal));
    closeConsultaModalBtn.addEventListener("click", closeConsultaModal);
    consultaModal.addEventListener("click", (e) => {
        if (e.target === consultaModal) closeConsultaModal();
    });

    if (consultaWaForm) {
        consultaWaForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const nombre = document.getElementById("ws_nombre_c").value.trim();
            const interes = document.getElementById("ws_interes").value;
            const mensajeOpcional = document.getElementById("ws_mensaje_c").value.trim();
            let textoWhatsApp = `Hola *Oeste Fitness Club*.\nQuiero recibir información.\n\n*Nombre:* ${nombre}\n*Me interesa:* ${interes}\n`;
            if (mensajeOpcional) textoWhatsApp += `*Mensaje:* ${mensajeOpcional}`;
            const numeroTelefono = "1539396546";
            const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(textoWhatsApp)}`;
            window.open(urlWhatsApp, "_blank");
            consultaWaForm.reset();
            closeConsultaModal();
        });
    }
}














// 2.5 Dropdowns Móviles (Header)
function initDropdowns() {
    const dropdownCarets = document.querySelectorAll('.dropdown-caret-btn');
    dropdownCarets.forEach((caretBtn) => {
        caretBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const parentItem = caretBtn.closest('.nav-item-dropdown');
            if (!parentItem) return;

            // Cierra otros dropdowns abiertos
            document.querySelectorAll('.nav-item-dropdown').forEach((item) => {
                if (item !== parentItem) {
                    item.classList.remove('open');
                }
            });

            parentItem.classList.toggle('open');
        });
    });
}









document.addEventListener('DOMContentLoaded', () => {
    initAOS();
    initScrollHeader();
    initMenu();
    initDropdowns();
    initSmoothScroll();
    initScrollSpy();
    initModalConsulta();
});