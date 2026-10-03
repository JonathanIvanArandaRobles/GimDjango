document.addEventListener('DOMContentLoaded', () => {
  // 1. SELECTOR DE PERIODICIDAD
  const periodBtns = document.querySelectorAll('.period-btn');
  periodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      periodBtns.forEach(b => {
        b.className = 'period-btn px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-all';
      });
      btn.className = 'period-btn px-3 py-1.5 rounded-lg text-xs bg-white text-emerald-700 font-bold shadow-sm transition-all';
    });
  });

  // 2. DROPDOWN DE EXPORTAR
  const exportBtn = document.getElementById('exportBtn');
  const exportDropdown = document.getElementById('exportDropdown');
  if (exportBtn && exportDropdown) {
    exportBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      exportDropdown.classList.toggle('hidden');
    });
    document.addEventListener('click', () => {
      exportDropdown.classList.add('hidden');
    });
  }

  // 3. MODAL REGISTRAR GASTO
  const expenseModal = document.getElementById('expenseModal');
  const openExpenseBtn = document.getElementById('openExpenseModal');
  const openExpenseBtn2 = document.getElementById('openExpenseModal2');
  const closeExpenseBtn = document.getElementById('closeExpenseModal');
  const cancelExpenseBtn = document.getElementById('cancelExpenseModal');
  const expenseForm = document.getElementById('expenseForm');

  function openModal() {
    if (expenseModal) expenseModal.classList.remove('hidden');
  }

  function closeModal() {
    if (expenseModal) expenseModal.classList.add('hidden');
  }

  if (openExpenseBtn) openExpenseBtn.addEventListener('click', openModal);
  if (openExpenseBtn2) openExpenseBtn2.addEventListener('click', openModal);
  if (closeExpenseBtn) closeExpenseBtn.addEventListener('click', closeModal);
  if (cancelExpenseBtn) cancelExpenseBtn.addEventListener('click', closeModal);

  if (expenseForm) {
    expenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Gasto registrado con éxito en la base de datos contable!');
      closeModal();
    });
  }

  // 4. FILTROS DE TABLAS (INGRESOS Y EGRESOS)
  const expenseFilterBtns = document.querySelectorAll('.expense-filter-btn');
  const expenseRows = document.querySelectorAll('#table-expenses tbody tr');

  expenseFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      expenseFilterBtns.forEach(b => {
        b.className = 'expense-filter-btn px-3 py-1 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-medium border border-slate-200/70 transition-all shrink-0';
      });
      btn.className = 'expense-filter-btn px-3 py-1 rounded-lg bg-rose-50 text-rose-700 text-xs font-bold border border-rose-100 transition-all shrink-0';

      const catFilter = btn.getAttribute('data-cat');
      expenseRows.forEach(row => {
        const cat = row.getAttribute('data-cat-item');
        row.style.display = (catFilter === 'all' || cat === catFilter) ? '' : 'none';
      });
    });
  });

  const incomeFilterBtns = document.querySelectorAll('.income-filter-btn');
  const incomeRows = document.querySelectorAll('#table-incomes tbody tr');

  incomeFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      incomeFilterBtns.forEach(b => {
        b.className = 'income-filter-btn px-3 py-1 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-medium border border-slate-200/70 transition-all shrink-0';
      });
      btn.className = 'income-filter-btn px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 transition-all shrink-0';

      const methodFilter = btn.getAttribute('data-method');
      incomeRows.forEach(row => {
        const method = row.getAttribute('data-method-item');
        row.style.display = (methodFilter === 'all' || method === methodFilter) ? '' : 'none';
      });
    });
  });
});