from django.contrib import admin
from .models import (
    ConfiguracionContacto,
    Plan,
    BeneficioPlan,
    Profesor,
    Clase,
    HorarioClase,
    ImagenCarruselClase,
    Resena,
    PreguntaFrecuente,
    FotoInstalacion,
    FotoComunidad
)

# 1. Beneficios anidados dentro de cada Plan
class BeneficioPlanInline(admin.TabularInline):
    model = BeneficioPlan
    extra = 1

@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'destacado', 'modalidad_1_precio')
    inlines = [BeneficioPlanInline]


# 2. Tablas hijas que van al pie de la Clase (Horarios e Imágenes del Carrusel)
class HorarioClaseInline(admin.TabularInline):
    model = HorarioClase
    extra = 1

class ImagenCarruselClaseInline(admin.TabularInline):
    model = ImagenCarruselClase
    extra = 1


# 3. Panel de la Clase ordenado sección por sección
@admin.register(Clase)
class ClaseAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'slug')
    prepopulated_fields = {'slug': ('nombre',)}
    inlines = [HorarioClaseInline, ImagenCarruselClaseInline]

    fieldsets = (
        ("1. HERO (ENCABEZADO PRINCIPAL)", {
            'fields': (
                'nombre', 'slug', 'descripcion_hero', 'imagen_hero',
                ('stat_1_titulo', 'stat_1_sub'),
                ('stat_2_titulo', 'stat_2_sub'),
                ('stat_3_titulo', 'stat_3_sub'),
            )
        }),
        ("2. SECCIÓN: ¿DE QUÉ SE TRATA?", {
            'description': "Textos explicativos y los checks con tilde verde. Las fotos del carrusel se cargan en la tabla al pie.",
            'fields': (
                'sec2_tag', 'sec2_titulo',
                'sec2_parrafo_1', 'sec2_parrafo_2',
                'sec2_check_1', 'sec2_check_2', 'sec2_check_3', 'sec2_check_4', 'sec2_check_5'
            )
        }),
        ("3. SECCIÓN: VIDEO Y DETALLES COMERCIALES", {
            'description': "Video y los 3 puntos de valor comercial al lado del reproductor. Los horarios se cargan en la tabla al pie.",
            'fields': (
                'sec3_tag', 'sec3_titulo', 'sec3_bajada',
                'video_archivo', 'video_poster',
                'sec3_check_1', 'sec3_check_2', 'sec3_check_3'
            )
        }),
    )


@admin.register(ConfiguracionContacto)
class ConfiguracionContactoAdmin(admin.ModelAdmin):
    # Impide crear registros múltiples por error para mantener uno solo global
    def has_add_permission(self, request):
        return not ConfiguracionContacto.objects.exists()



@admin.register(Resena)
class ResenaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tiempo')
    search_fields = ('nombre', 'texto')



@admin.register(Profesor)
class ProfesorAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'disciplinas')
    search_fields = ('nombre', 'disciplinas')



@admin.register(FotoInstalacion)
class FotoInstalacionAdmin(admin.ModelAdmin):
    list_display = ('seccion', 'orden', 'imagen')
    list_filter = ('seccion',)
    ordering = ('seccion', 'orden')



@admin.register(FotoComunidad)
class FotoComunidadAdmin(admin.ModelAdmin):
    list_display = ('id', 'orden', 'imagen')
    list_display_links = ('id',)  # El clic para entrar se hace sobre el ID
    list_editable = ('orden',)    # El orden se puede editar directamente en la tabla




@admin.register(PreguntaFrecuente)
class PreguntaFrecuenteAdmin(admin.ModelAdmin):
    list_display = ('pregunta', 'columna')
    list_filter = ('columna',)
    search_fields = ('pregunta', 'respuesta')