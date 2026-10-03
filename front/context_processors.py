from .models import ConfiguracionContacto

def contacto_global(request):
    config = ConfiguracionContacto.objects.first()
    return {
        'info_contacto': config
    }