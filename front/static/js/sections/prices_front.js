// static/js/sections/prices.js

// Modal Selección de Plan (Precios)

function initPricesModal() {
    const planModal = document.getElementById('planModal');
    const closePlanModalBtn = document.getElementById('planModalCloseBtn');
    const btnsSelectPlan = document.querySelectorAll('.btn-plan-select');
    const labelPlanNombre = document.getElementById('labelPlanNombre');
    const modalityContainer = document.getElementById('modalitySelectorContainer');
    const formPlanWa = document.getElementById('formPlanWa');

    if(!planModal) return;

    const planData = {
        'musculacion': {
            title: 'MUSCULACIÓN + CLASES',
            options: [
                { label: 'Pase Libre', price: '$50.000 /mes' },
                { label: '3 x semana', price: '$44.000 /mes' }
            ]
        },
        'combo': {
            title: 'COMBO PILATES + GYM (PASE LIBRE)',
            options: [
                { label: '2 x sem + Gym Libre', price: '$65.000 /mes' },
                { label: '3 x sem + Gym Libre', price: '$75.000 /mes' }
            ]
        },
        'pilates': {
            title: 'PILATES',
            options: [
                { label: '2 x semana', price: '$45.000 /mes' },
                { label: '3 x semana', price: '$55.000 /mes' }
            ]
        }
    };

    let selectedPlanTitle = '';
    let selectedModality = '';

    function openPlanModal(planKey) {
        const planInfo = planData[planKey] || planData['musculacion'];
        selectedPlanTitle = planInfo.title;
        labelPlanNombre.textContent = `PLAN: ${selectedPlanTitle}`;
        selectedModality = ''; 

        modalityContainer.innerHTML = '';
        planInfo.options.forEach((opt) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'modality-btn-option';
            btn.innerHTML = `<span>${opt.label}</span><strong>${opt.price}</strong>`;

            btn.addEventListener('click', () => {
                document.querySelectorAll('.modality-btn-option').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedModality = `${opt.label} (${opt.price})`;
            });
            modalityContainer.appendChild(btn);
        });

        planModal.classList.add('active');
        planModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closePlanModal() {
        planModal.classList.remove('active');
        planModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    btnsSelectPlan.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            if (index === 0) openPlanModal('musculacion');
            else if (index === 1) openPlanModal('combo');
            else if (index === 2) openPlanModal('pilates');
        });
    });

    if (closePlanModalBtn) closePlanModalBtn.addEventListener('click', closePlanModal);
    planModal.addEventListener('click', (e) => {
        if (e.target === planModal) closePlanModal();
    });

    if (formPlanWa) {
        formPlanWa.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!selectedModality) {
                alert('Por favor seleccioná una de las modalidades del plan antes de continuar.');
                return;
            }

            const nombre = document.getElementById('reg_nombre').value.trim();
            const apellido = document.getElementById('reg_apellido').value.trim();
            const dni = document.getElementById('reg_dni').value.trim();
            const nacimiento = document.getElementById('reg_nacimiento').value;
            const domicilio = document.getElementById('reg_domicilio').value.trim();
            const localidad = document.getElementById('reg_localidad').value;
            const celular = document.getElementById('reg_celular').value.trim();
            const mail = document.getElementById('reg_mail').value.trim();

            const textoWhatsApp = `Hola *Oeste Fitness Club*, quiero darme de alta en un plan:\n\n📋 *Plan:* ${selectedPlanTitle}\n⚡ *Modalidad:* ${selectedModality}\n👤 *Nombre y Apellido:* ${nombre} ${apellido}\n🆔 *DNI:* ${dni}\n🎂 *Fecha de Nacimiento:* ${nacimiento}\n🏠 *Domicilio:* ${domicilio} (${localidad})\n📱 *Celular:* ${celular}\n📧 *Email:* ${mail}`;
            const numeroTelefono = "1539396546";
            const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(textoWhatsApp)}`;

            window.open(urlWhatsApp, '_blank');
            formPlanWa.reset();
            closePlanModal();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initPricesModal();
});