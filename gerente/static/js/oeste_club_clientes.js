// static/js/oeste_club_clientes.js

// Abrir el panel lateral (Drawer) al seleccionar una fila de la tabla
function selectClient(id) {
  const drawer = document.getElementById('clientDrawer');
  if (drawer) drawer.classList.remove('hidden');
}

// También lo mapeamos para el botón de "Ver Perfil Completo" (el ícono del ojito)
function openClientDrawer(id) {
  selectClient(id);
}

// Cerrar el panel lateral del cliente
function closeClientDrawer() {
  const drawer = document.getElementById('clientDrawer');
  if (drawer) drawer.classList.add('hidden');
}

// Acción del botón superior "+ Nuevo Cliente"
function openNewClientModal() {
  alert("Abrir formulario de alta de nuevo socio");
}

// Acción del botón de edición en la tabla
function editClient(id) {
  alert("Abrir formulario de edición para el cliente ID: " + id);
}

// Limpiar los filtros de búsqueda y selects
function resetFilters() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';

  const filterStatus = document.getElementById('filterStatus');
  if (filterStatus) filterStatus.value = 'todos';

  const filterPlan = document.getElementById('filterPlan');
  if (filterPlan) filterPlan.value = 'todos';

  const filterTurno = document.getElementById('filterTurno');
  if (filterTurno) filterTurno.value = 'todos';

  // Mostrar todas las filas de la tabla nuevamente
  const rows = document.querySelectorAll('tbody tr');
  rows.forEach(r => r.style.display = '');
}