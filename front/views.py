from django.shortcuts import render, get_object_or_404
from .models import Clase, Plan, Profesor, Resena, FotoInstalacion, FotoComunidad, PreguntaFrecuente, ConfiguracionContacto

def inicio(request):
    # 1. Traemos todos los datos de la base de datos
    # Trae todas las clases de la base de datos
    clases = Clase.objects.all()
    # Trae todos los planes de la base de datos 
    planes = Plan.objects.all()  
    # Obtenemos los profesores
    profesores = Profesor.objects.all()  
    # Obtenemos las reseñas cargadas
    resenas = Resena.objects.all()  
    # Traemos las fotos de cada galería
    fotos_musculacion = FotoInstalacion.objects.filter(seccion='musculacion')
    fotos_cardio = FotoInstalacion.objects.filter(seccion='cardio')
    

    # 2. Los empaquetamos en un diccionario (el nombre 'profesores' debe coincidir con el de tu for en HTML)
    contexto = {
        'clases': clases, 
        'planes': planes, # Enviamos la variable al HTML
        'profesores': profesores,  # Lo pasamos al template
        'resenas': resenas,  # Pasamos las reseñas al template
        'fotos_musculacion': fotos_musculacion,
        'fotos_cardio': fotos_cardio
    }

    # Las envía a tu archivo HTML principal
    return render(request, 'index_front.html', contexto)

def clase_detalle(request, slug):
    # Busca la clase por su slug en MySQL. Si no existe, devuelve 404.
    clase = get_object_or_404(Clase, slug=slug)

    # Trae TODAS las clases para rellenar el menú del Header
    todas_las_clases = Clase.objects.all()
    
    # IMPORTANTE: Asegurate de que clase_detalle.html esté junto a index_front.html
    return render(request, 'clase_detalle.html', {
        'clase': clase,
        'clases': todas_las_clases  # Esto hace que funcione el dropdown
    })

def about(request):
    clases = Clase.objects.all()
    # Traemos las fotos de la comunidad
    fotos_comunidad = FotoComunidad.objects.all()

    # 2. Los empaquetamos en un diccionario (debe coincidir con el de tu for en HTML)
    contexto = {
        'clases': clases,
        'fotos_comunidad': fotos_comunidad
    }
    return render(request, 'about_front.html', contexto)

def contacto(request):
    clases = Clase.objects.all()
    faqs_col1 = PreguntaFrecuente.objects.filter(columna=1)
    faqs_col2 = PreguntaFrecuente.objects.filter(columna=2)
    config = ConfiguracionContacto.objects.first()

    # 2. Los empaquetamos en un diccionario (debe coincidir con el de tu for en HTML)
    contexto = {
        'clases': clases,
        'faqs_col1': faqs_col1,
        'faqs_col2': faqs_col2,
        'info_contacto': config
    }

    return render(request, 'contacto_front.html', contexto)