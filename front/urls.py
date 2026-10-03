from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='index_front'),
    path('nosotros/', views.about, name='about_front'),
    path('contacto/', views.contacto, name='contacto_front'),
    
    # Esta es la que arma la página de cada clase de forma dinámica
    path('clases/<slug:slug>/', views.clase_detalle, name='clase_detalle'),
]