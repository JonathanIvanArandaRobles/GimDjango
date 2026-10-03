from django.db import models

# ==========================================
# 1. CONFIGURACIÓN DE CONTACTO Y HORARIOS
# ==========================================
class ConfiguracionContacto(models.Model):
    # Contacto directo
    whatsapp = models.CharField("Número de WhatsApp (ej: 11539396546)", max_length=30)
    email = models.EmailField("Correo Electrónico")
    
    # Horarios de atención
    horario_semana = models.CharField("Lunes a Viernes", max_length=50, default="06:30 — 22:00 HS")
    horario_sabados = models.CharField("Sábados", max_length=50, default="09:00 — 17:00 HS")
    horario_feriados = models.CharField("Feriados", max_length=50, default="09:00 — 15:00 HS")

    # Redes Sociales
    instagram = models.URLField("Link de Instagram", blank=True, null=True)
    facebook = models.URLField("Link de Facebook", blank=True, null=True)
    tiktok = models.URLField("Link de TikTok", blank=True, null=True)

    class Meta:
        verbose_name = "Configuración de Contacto"
        verbose_name_plural = "Configuraciones de Contacto"

    def __str__(self):
        return "Configuración de Contacto y Horarios"

        


# ==========================================
# 2. PLANES Y PRECIOS
# ==========================================
class Plan(models.Model):
    nombre = models.CharField("Nombre del Plan", max_length=100)
    destacado = models.BooleanField("¿Es el plan recomendado?", default=False)
    
    # Modalidad 1 (Ej: 2x SEMANA)
    modalidad_1_titulo = models.CharField("Título Modalidad 1", max_length=100)
    modalidad_1_precio = models.CharField("Precio Modalidad 1", max_length=50)
    
    # Modalidad 2 (Ej: 3x SEMANA)
    modalidad_2_titulo = models.CharField("Título Modalidad 2", max_length=100, blank=True)
    modalidad_2_precio = models.CharField("Precio Modalidad 2", max_length=50, blank=True)

    class Meta:
        verbose_name = "Plan / Membresía"
        verbose_name_plural = "Planes y Membresías"

    def __str__(self):
        return self.nombre

class BeneficioPlan(models.Model):
    plan = models.ForeignKey(Plan, related_name='beneficios', on_delete=models.CASCADE)
    descripcion = models.CharField("Descripción del beneficio", max_length=100)

    def __str__(self):
        return f"{self.plan.nombre} - {self.descripcion}"


# ==========================================
# 3. STAFF / PROFESORES
# ==========================================
class Profesor(models.Model):
    nombre = models.CharField("Nombre completo", max_length=100)
    disciplinas = models.CharField("Disciplinas (separadas por coma)", max_length=200)
    foto = models.ImageField("Foto del profesor", upload_to="profesores/")
    
    # Redes
    instagram = models.URLField("Instagram", blank=True, null=True)
    facebook = models.URLField("Facebook", blank=True, null=True)
    tiktok = models.URLField("TikTok", blank=True, null=True)
    linkedin = models.URLField("LinkedIn", blank=True, null=True)
    youtube = models.URLField("YouTube", blank=True, null=True)

    class Meta:
        verbose_name = "Profesor"
        verbose_name_plural = "Profesores"

    def __str__(self):
        return self.nombre


# ==========================================
# 4. CLASES Y DISCIPLINAS (Sistema Dinámico)
# ==========================================

class Clase(models.Model):
    # ─── SECCIÓN 1: HERO ───
    nombre = models.CharField(max_length=50, verbose_name="Nombre de la clase (Ej: YOGA)")
    slug = models.SlugField(unique=True, help_text="Identificador para la URL (Ej: yoga)")
    descripcion_hero = models.TextField(verbose_name="Bajada de texto (Hero)")
    imagen_hero = models.ImageField(upload_to='clases/hero/', verbose_name="Foto de fondo principal")
    
    # 3 Métricas de la derecha
    stat_1_titulo = models.CharField(max_length=30, default="INSTRUCTOR", verbose_name="Stat 1 - Título")
    stat_1_sub = models.CharField(max_length=50, default="GUIADO EN CADA CLASE", verbose_name="Stat 1 - Subtítulo")
    stat_2_titulo = models.CharField(max_length=30, default="50-60", verbose_name="Stat 2 - Título")
    stat_2_sub = models.CharField(max_length=50, default="MINUTOS POR SESIÓN", verbose_name="Stat 2 - Subtítulo")
    stat_3_titulo = models.CharField(max_length=30, default="+500", verbose_name="Stat 3 - Título")
    stat_3_sub = models.CharField(max_length=50, default="SOCIOS ACTIVOS", verbose_name="Stat 3 - Subtítulo")

    # ─── SECCIÓN 2: DE QUÉ SE TRATA (CON CAROUSEL) ───
    sec2_tag = models.CharField(max_length=50, default="¿DE QUÉ SE TRATA?", verbose_name="Etiqueta verde")
    sec2_titulo = models.CharField(max_length=100, default="CONECTÁ CON TU INTERIOR", verbose_name="Título grande")
    sec2_parrafo_1 = models.TextField(blank=True, default="", verbose_name="Primer párrafo")
    sec2_parrafo_2 = models.TextField(blank=True, default="", verbose_name="Segundo párrafo")

    # Checks / Beneficios de la Sección 2
    sec2_check_1 = models.CharField(max_length=120, blank=True, verbose_name="Check 1 (Ej: Aumenta la flexibilidad)")
    sec2_check_2 = models.CharField(max_length=120, blank=True, verbose_name="Check 2 (Ej: Reduce la ansiedad y el estrés)")
    sec2_check_3 = models.CharField(max_length=120, blank=True, verbose_name="Check 3 (Ej: Fortalece la musculatura y el core)")
    sec2_check_4 = models.CharField(max_length=120, blank=True, verbose_name="Check 4 (Ej: Corrige y mejora la postura corporal)")
    sec2_check_5 = models.CharField(max_length=120, blank=True, verbose_name="Check 5 (Ej: Mejora la concentración)")

    # ─── SECCIÓN 3: VIDEO Y PROPUESTA COMERCIAL ───
    sec3_tag = models.CharField(max_length=50, default="UN MOMENTO PARA VOS", verbose_name="Etiqueta verde")
    sec3_titulo = models.CharField(max_length=100, default="YOGA + GIM", verbose_name="Título comercial")
    sec3_bajada = models.CharField(max_length=200, default="La clase está incluida en tu membresía. No pagás extra. Solo consultás y venís.", verbose_name="Texto aclaratorio")
    
    # Video
    video_archivo = models.FileField(upload_to='clases/videos/', blank=True, null=True, verbose_name="Archivo de Video (.mp4)")
    video_poster = models.ImageField(upload_to='clases/posters/', blank=True, null=True, verbose_name="Imagen fija del video (Poster)")

    # Checks de la Sección 3 (al lado del video)
    sec3_check_1 = models.CharField(max_length=120, blank=True, verbose_name="Punto clave 1 (Ej: Mejora la flexibilidad y postura)")
    sec3_check_2 = models.CharField(max_length=120, blank=True, verbose_name="Punto clave 2 (Ej: Alivia tensiones y reduce el estrés)")
    sec3_check_3 = models.CharField(max_length=120, blank=True, verbose_name="Punto clave 3 (Ej: No requiere experiencia previa)")

    def __str__(self):
        return self.nombre


class HorarioClase(models.Model):
    clase = models.ForeignKey(Clase, on_delete=models.CASCADE, related_name="horarios")
    dias = models.CharField(max_length=50, verbose_name="Días (Ej: Mar · Jue)")
    turnos = models.CharField(max_length=50, verbose_name="Turnos (Ej: 09:00 hs · 18:00 hs)")
    duracion = models.CharField(max_length=30, default="50-60 min", verbose_name="Duración")

    def __str__(self):
        return f"{self.dias} - {self.turnos}"


class ImagenCarruselClase(models.Model):
    clase = models.ForeignKey(Clase, on_delete=models.CASCADE, related_name="carrusel")
    imagen = models.ImageField(upload_to='clases/carrusel/', verbose_name="Foto de la postura")
    
    # --- CAMBIO APLICADO ACÁ ABAJO ---
    titulo = models.CharField(max_length=50, blank=True, default="", verbose_name="Nombre de la postura (Ej: BALASANA)")
    
    descripcion = models.CharField(max_length=80, blank=True, default="", verbose_name="Subtítulo (Ej: Postura del Niño)")
    orden = models.PositiveIntegerField(default=1, verbose_name="Número de diapositiva (Ej: 1, 2, 3)")
    
    class Meta:
        ordering = ['orden']

    def __str__(self):
        return f"{self.titulo} ({self.clase.nombre})"
    

# ==========================================
# 5. EXTRAS: REVIEWS Y PREGUNTAS FRECUENTES
# ==========================================
class Resena(models.Model):
    nombre = models.CharField("Nombre del cliente", max_length=100)
    avatar = models.URLField("Link de la foto de perfil (Google)")
    texto = models.TextField("Texto de la reseña")
    tiempo = models.CharField("Tiempo (Ej: Hace 1 mes)", max_length=50)
    link_google = models.URLField("Link a la reseña en Google Maps")

    class Meta:
        verbose_name = "Reseña de Google"
        verbose_name_plural = "Reseñas de Google"

    def __str__(self):
        return f"Reseña de {self.nombre}"


class PreguntaFrecuente(models.Model):
    pregunta = models.CharField("Pregunta", max_length=255)
    respuesta = models.TextField("Respuesta")
    
    # Para dividir en columnas (opcional, ayuda al diseño)
    columna = models.IntegerField("Columna (1 o 2)", default=1, choices=[(1, 'Columna 1'), (2, 'Columna 2')])

    class Meta:
        verbose_name = "Pregunta Frecuente"
        verbose_name_plural = "Preguntas Frecuentes"

    def __str__(self):
        return self.pregunta




# ==========================================
# 6. GALERÍAS DE INSTALACIONES (SERVICIOS)
# ==========================================
class FotoInstalacion(models.Model):
    SECCION_CHOICES = [
        ('musculacion', 'Galería Musculación'),
        ('cardio', 'Galería Cardio'),
    ]
    seccion = models.CharField("Sección", max_length=20, choices=SECCION_CHOICES)
    imagen = models.ImageField("Foto", upload_to="instalaciones/")
    orden = models.PositiveIntegerField("Orden", default=1)

    class Meta:
        ordering = ['orden']
        verbose_name = "Foto de Instalación"
        verbose_name_plural = "Fotos de Instalaciones"

    def __str__(self):
        return f"{self.get_seccion_display()} - Foto #{self.orden}"








# ==========================================
# 7. COMUNIDAD (CARRUSEL DE FOTOS)
# ==========================================
class FotoComunidad(models.Model):
    imagen = models.ImageField("Foto de la comunidad", upload_to="about/comunidad/")
    orden = models.PositiveIntegerField("Orden", default=1)

    class Meta:
        ordering = ['orden']
        verbose_name = "Foto de Comunidad"
        verbose_name_plural = "Fotos de Comunidad"

    def __str__(self):
        return f"Foto #{self.orden}"