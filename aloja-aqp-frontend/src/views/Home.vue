<template>
  <div>
    <!-- HERO con VIDEO de fondo -->
    <section class="video-hero">
      <video
        autoplay
        muted
        loop
        playsinline
        class="video-background"
        :style="{ opacity: videoOpacity }"
      >
        <source src="../public/arequipa.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>

      <!-- Overlay de texto -->
      <div class="hero-overlay">
        <h1 class="hero-title">Aloja AQP</h1>
        <p class="hero-subtitle">
          Encuentra tu alojamiento ideal cerca de la universidad en Arequipa
        </p>
        <router-link to="/map" class="btn-explore">
          Buscar alojamiento
        </router-link>
      </div>
    </section>

    <!-- Alojamientos destacados -->
    <v-container class="my-12">
      <h2 class="section-title text-center mb-8">Alojamientos destacados</h2>
      <v-row>
        <v-col cols="12" md="4" v-for="casa in casas" :key="casa.id">
          <v-card class="elevation-6 hover-card">
            <v-img :src="casa.imagen" height="220px" cover />
            <v-card-title>{{ casa.titulo }}</v-card-title>
            <v-card-subtitle>{{ casa.descripcion }}</v-card-subtitle>
            <v-card-actions>
              <v-btn color="primary" variant="flat">Reservar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Beneficios -->
    <v-container class="my-12 text-center">
      <h2 class="section-title mb-8">¿Por qué elegir Aloja AQP?</h2>
      <v-row>
        <v-col cols="12" md="4">
          <v-icon size="56" color="primary">mdi-school</v-icon>
          <h3 class="benefit-title">Cerca de universidades</h3>
          <p>Opciones a pocos minutos de las principales facultades.</p>
        </v-col>
        <v-col cols="12" md="4">
          <v-icon size="56" color="primary">mdi-cash-multiple</v-icon>
          <h3 class="benefit-title">Precios accesibles</h3>
          <p>Opciones adaptadas al presupuesto estudiantil.</p>
        </v-col>
        <v-col cols="12" md="4">
          <v-icon size="56" color="primary">mdi-shield-check</v-icon>
          <h3 class="benefit-title">Seguridad y confianza</h3>
          <p>Alojamientos verificados para vivir tranquilo.</p>
        </v-col>
      </v-row>
    </v-container>

    <!-- Testimonios -->
    <v-container class="my-12">
  <h2 class="section-title text-center mb-8">Lo que dicen los estudiantes</h2>
  <v-row>
    <v-col cols="12" md="4" v-for="t in testimonios" :key="t.id">
      <v-card class="pa-6 elevation-3 text-center">
        <!-- Imagen redondeada -->
        <v-avatar size="80" class="mb-4">
          <v-img :src="t.imagen" alt="Foto de {{ t.nombre }}"></v-img>
        </v-avatar>

        <!-- Texto del testimonio -->
        <p class="mb-4">"{{ t.texto }}"</p>
        <strong>- {{ t.nombre }}</strong>
      </v-card>
    </v-col>
  </v-row>
</v-container>
    <!-- CTA -->
    <v-container class="cta-section text-center py-12">
      <div class="cta-content">
        <h2 class="cta-title">¿Listo para encontrar tu próximo hogar en Arequipa?</h2>
        <router-link to="/map" class="btn-explore">Explorar alojamientos</router-link>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      casas: [
        {
          id: 1,
          titulo: "Habitación compartida en Vallecito",
          descripcion: "Cerca de la UNSA, ideal para estudiantes.",
          imagen: "https://a0.muscache.com/im/pictures/94b0443d-6f04-41f4-9036-e50051b5aa2d.jpg",
        },
        {
          id: 2,
          titulo: "Mini departamento en Umacollo",
          descripcion: "Espacio moderno con internet incluido.",
          imagen: "https://img10.naventcdn.com/avisos/resize/111/01/47/57/95/13/1200x1200/1559974817.jpg",
        },
        {
          id: 3,
          titulo: "Casa de estudiantes en Yanahuara",
          descripcion: "Ambiente cómodo y seguro para universitarios.",
          imagen: "https://img10.naventcdn.com/avisos/resize/111/01/46/45/69/56/1200x1200/1532474731.jpg",
        },
      ],
      testimonios: [
  { 
    id: 1, 
    nombre: "María, UNSA", 
    texto: "Encontré un cuarto cerca de mi facultad a un precio justo.", 
    imagen: "https://randomuser.me/api/portraits/women/44.jpg" 
  },
  { 
    id: 2, 
    nombre: "Carlos, UCSM", 
    texto: "El proceso fue rápido y me siento seguro en mi nuevo depa.", 
    imagen: "https://randomuser.me/api/portraits/men/32.jpg" 
  },
  { 
    id: 3, 
    nombre: "Ana, UTP", 
    texto: "Excelente plataforma, encontré roomies y ahora compartimos gastos.", 
    imagen: "https://randomuser.me/api/portraits/women/68.jpg" 
  },
],
      videoOpacity: 1, // opacidad del video
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollTop = window.scrollY;
      let opacity = 1 - scrollTop / 400; // baja progresivamente hasta 400px
      if (opacity < 0.03) opacity = 0.03; // mínimo 0.03
      this.videoOpacity = opacity;
    },
  },
};
</script>

<style scoped>
/* HERO VIDEO */
.video-hero {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.video-background {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
  z-index: 1;
  transition: opacity 0.3s linear;
}

.hero-overlay {
  position: relative;
  z-index: 2;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 0 20px;
}

/* Texto */
.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 15px;
}
.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 25px;
}

/* Botón */
.btn-explore {
  padding: 14px 36px;
  background: linear-gradient(90deg, #4a00e0, #8e2de2);
  border-radius: 30px;
  color: white;
  font-weight: bold;
  text-decoration: none;
  transition: 0.3s ease;
}
.btn-explore:hover {
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  transform: translateY(-3px);
}

/* SECCIONES */
.section-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  position: relative;
}
.section-title::after {
  content: "";
  display: block;
  width: 60px;
  height: 4px;
  background: #4a00e0;
  margin: 10px auto 0;
  border-radius: 2px;
}

/* Cards */
.hover-card {
  transition: transform 0.3s, box-shadow 0.3s;
}
.hover-card:hover {
  transform: scale(1.03);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

/* CTA */
.cta-section {
  background: linear-gradient(90deg, #1a2980, #26d0ce);
  color: white;
  border-radius: 12px;
  margin-bottom: 40px;
}
.cta-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.cta-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
}
</style>
