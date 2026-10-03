document.addEventListener('DOMContentLoaded', () => {
  
  // 1. OBTENCIÓN AUTOMÁTICA DE FECHA REAL (Lógica específica de esta vista)
  const now = new Date();
  const currentRealYear = now.getFullYear();
  const currentRealMonth = now.getMonth();

  const nombresMeses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  let selectedYear = currentRealYear;
  let selectedType = 'mes';
  let selectedPeriodLabel = `Este Mes (${nombresMeses[currentRealMonth]} ${currentRealYear})`;

  const startYear = 2022;
  const availableYears = [];
  for (let y = currentRealYear; y >= startYear; y--) {
    availableYears.push(y);
  }

  const dateRangeBtn = document.getElementById('date-range-btn');
  const headerDateRange = document.getElementById('header-date-range');
  const periodPopover = document.getElementById('period-popover');
  const dateChevron = document.getElementById('date-chevron');
  const yearsSelectorContainer = document.getElementById('years-selector-container');
  const periodOptionsContainer = document.getElementById('period-options-container');
  const periodOptionsTitle = document.getElementById('period-options-title');
  const selectedYearTag = document.getElementById('selected-year-tag');
  const resetCurrentMonthBtn = document.getElementById('reset-current-month-btn');
  const closePopoverBtn = document.getElementById('close-popover-btn');
  const currentSelectionSummary = document.getElementById('current-selection-summary');
  const chartSubPeriodBadge = document.getElementById('chart-sub-period-badge');

  if (headerDateRange) headerDateRange.textContent = selectedPeriodLabel;
  if (currentSelectionSummary) currentSelectionSummary.textContent = selectedPeriodLabel;

  function renderYearsSelector() {
    if (!yearsSelectorContainer) return;
    yearsSelectorContainer.innerHTML = '';
    availableYears.forEach(year => {
      const btn = document.createElement('button');
      btn.type = 'button';
      const isSelected = year === selectedYear;
      const isCurrent = year === currentRealYear;
      btn.className = `px-3 py-1 rounded-lg text-xs font-bold transition shrink-0 ${isSelected
        ? 'bg-athletic-navy text-white shadow-sm'
        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
        }`;
      btn.textContent = isCurrent ? `${year} (Actual)` : `${year}`;
      btn.onclick = () => {
        selectedYear = year;
        if (selectedYearTag) selectedYearTag.textContent = year;
        renderYearsSelector();
        renderPeriodOptions();
      };
      yearsSelectorContainer.appendChild(btn);
    });
  }

  function renderPeriodOptions() {
    if (!periodOptionsContainer) return;
    periodOptionsContainer.innerHTML = '';
    if (selectedYearTag) selectedYearTag.textContent = selectedYear;

    if (selectedType === 'mes') {
      periodOptionsTitle.textContent = `Meses de ${selectedYear}`;
      nombresMeses.forEach((mes, idx) => {
        const isActual = (selectedYear === currentRealYear && idx === currentRealMonth);
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `p-2 rounded-xl text-left border transition text-xs flex flex-col justify-between ${isActual
          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
          }`;
        btn.innerHTML = `
          <span class="font-bold">${mes}</span>
          <span class="text-[10px] ${isActual ? 'text-emerald-600' : 'text-slate-400'}">${isActual ? 'Mes actual' : selectedYear}</span>
        `;
        btn.onclick = () => {
          applyPeriod(`${mes} ${selectedYear}`, isActual ? 'Mes actual' : `Mes cerrado (${mes})`);
        };
        periodOptionsContainer.appendChild(btn);
      });
    }
  }

  function applyPeriod(label, badgeText) {
    selectedPeriodLabel = label;
    if (headerDateRange) headerDateRange.textContent = label;
    if (currentSelectionSummary) currentSelectionSummary.textContent = label;
    if (chartSubPeriodBadge) chartSubPeriodBadge.textContent = badgeText || label;
    closePopover();
  }

  function openPopover() {
    if (!periodPopover) return;
    periodPopover.classList.remove('hidden');
    if (dateChevron) dateChevron.classList.add('rotate-180');
    renderYearsSelector();
    renderPeriodOptions();
  }

  function closePopover() {
    if (!periodPopover) return;
    periodPopover.classList.add('hidden');
    if (dateChevron) dateChevron.classList.remove('rotate-180');
  }

  if (dateRangeBtn) {
    dateRangeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (periodPopover.classList.contains('hidden')) {
        openPopover();
      } else {
        closePopover();
      }
    });
  }

  if (closePopoverBtn) {
    closePopoverBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closePopover();
    });
  }

  // 2. SELECTOR DE SEDES REACTIVO (Lógica específica de esta vista)
  const branchData = {
    'all': {revenue: '$ 18.45 M'},
    'san-justo': {revenue: '$ 9.80 M'}
  };

  const branchSelect = document.getElementById('branch-select');
  if (branchSelect) {
    branchSelect.addEventListener('change', (e) => {
      const selected = e.target.value;
      const data = branchData[selected] || branchData['all'];
      const revEl = document.getElementById('kpi-revenue');
      if(revEl) revEl.textContent = data.revenue;
    });
  }
});