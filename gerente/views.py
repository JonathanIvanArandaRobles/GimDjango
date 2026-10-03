from django.shortcuts import render

def dashboard_gerencia(request):
    return render(request, 'dashboard_estrat_gico_ejecutivo.html')

def finanzas_gerencia(request):
    return render(request, 'oeste_club_finanzas.html')

def clientes_gerencia(request):
    return render(request, 'oeste_club_clientes.html')

def clases_gerencia(request):
    return render(request, 'oeste_club_clases.html')

def personal_gerencia(request):
    return render(request, 'oeste_club_personal.html')

def planes_gerencia(request):
    return render(request, 'oeste_club_planes_y_precios.html')

def reportes_gerencia(request):
    return render(request, 'oeste_club_reportes.html')

def notificaciones_gerencia(request):
    return render(request, 'oeste_club_notificaciones.html')

def configuracion_gerencia(request):
    return render(request, 'oeste_club_configuraci_n.html')