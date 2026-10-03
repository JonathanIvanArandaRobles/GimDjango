// static/js/pages/contacto.js

/* ==========================================
       4. COMPONENTES DE SECCIONES (SLIDERS)
   ========================================== */
// 4.1 Slider de Misión con Fade Suave (About)


function initAboutSlider() {
    const dynamicImg = document.getElementById('aboutDynamicImg');
    const dots = document.querySelectorAll('.about-dot');
    const galleryWrapper = document.querySelector('.about-gallery-wrapper');

    if (!dynamicImg || dots.length === 0) return;

    const images = [
        '/static/img/contacto/mision/1.png',
        '/static/img/contacto/mision/2.png',
        '/static/img/contacto/mision/3.png',
        '/static/img/contacto/mision/4.png'
    ];
    let currentIndex = 0;
    let slideInterval = null;

    function changeImage(newIndex) {
        currentIndex = (newIndex + images.length) % images.length;
        galleryWrapper.style.backgroundImage = `url(${dynamicImg.src})`;
        galleryWrapper.style.backgroundSize = '100% 100%';
        galleryWrapper.style.backgroundPosition = 'center';
        dynamicImg.style.transition = 'none';
        dynamicImg.style.opacity = '0';

        setTimeout(() => {
            dynamicImg.src = images[currentIndex];
            dynamicImg.onload = () => {
                dynamicImg.style.transition = 'opacity 0.8s ease-in-out';
                dynamicImg.style.opacity = '1';
            };
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }, 50);
    }

    function startAutoSlide() {
        slideInterval = setInterval(() => { changeImage(currentIndex + 1); }, 3000);
    }
    function stopAutoSlide() { clearInterval(slideInterval); }

    startAutoSlide();
    if (galleryWrapper) {
        galleryWrapper.addEventListener('mouseenter', stopAutoSlide);
        galleryWrapper.addEventListener('mouseleave', startAutoSlide);
    }
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => changeImage(idx));
    });
}















document.addEventListener('DOMContentLoaded', () => {

    // Inicializa el slider de Nuestra Misión
    initAboutSlider();

    // ─── LÓGICA DE FORMSPREE FETCH + MODAL GLASS ───
    const form = document.getElementById("formspreeForm");
    const button = document.getElementById("btnSubmitFS");
    const modal = document.getElementById("successModal");
    const closeModalBtn = document.getElementById("modalCloseBtn");

    function openModal() {
        if (modal) {
            modal.classList.add("active");
            modal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        }
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove("active");
            modal.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
        }
    }

    if (form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            if (button) {
                button.disabled = true;
                button.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> ENVIANDO...";
            }

            const data = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    form.reset();
                    if (window.turnstile) turnstile.reset();
                    openModal();
                } else {
                    alert("❌ No pudimos procesar tu consulta. Por favor verificá los datos ingresados.");
                }
            } catch (error) {
                alert("❌ Error de conexión. Revisá tu conexión a Internet e intentá nuevamente.");
                console.error("Formspree Error:", error);
            } finally {
                if (button) {
                    button.disabled = false;
                    button.innerHTML = "<i class='bx bx-envelope'></i> ENVIAR CONSULTA";
                }
            }
        });
    }

    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);

    if (modal) {
        modal.addEventListener("click", function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal && modal.classList.contains("active")) {
            closeModal();
        }
    });


    // ─── LÓGICA DEL ACORDEÓN FAQ ───
    const faqTriggers = document.querySelectorAll('.faq-trigger');

    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            // Selecciona el contenedor principal de la pregunta
            const item = trigger.parentElement;
            const isActive = item.classList.contains('active');

            // 1. Cierra todos los demás acordeones abiertos (opcional, para mantener orden)
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // 2. Si el que tocaste estaba cerrado, ábrelo agregando la clase 'active'
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

});