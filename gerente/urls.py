from django.urls import path
from . import views

# app_name = 'gerente'

urlpatterns = [
    path('dashboard/', views.dashboard_gerencia, name='dashboard'),
    path('finanzas/', views.finanzas_gerencia, name='finanzas'),
    path('clientes/', views.clientes_gerencia, name='clientes'),
    path('clases/', views.clases_gerencia, name='clases'),
    path('personal/', views.personal_gerencia, name='personal'),
    path('planes/', views.planes_gerencia, name='planes'),
    path('reportes/', views.reportes_gerencia, name='reportes'),
    path('notificaciones/', views.notificaciones_gerencia, name='notificaciones'),
    path('configuracion/', views.configuracion_gerencia, name='configuracion'),
]