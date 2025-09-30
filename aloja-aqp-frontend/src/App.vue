<template>
  <v-app >
    <!-- Navbar -->
    <v-app-bar  v-if="$route.path !== '/map'" app flat class="navbar-gradient">
      <v-container class="d-flex align-center justify-space-between">
        <!-- Logo / Marca -->
        <div class="logo">
          <span class="brand">Aloja AQP</span>
        </div>

        <!-- Links -->
        <nav class="nav-links">
          <router-link to="/" class="nav-link">Inicio</router-link>
          <router-link to="/map" class="nav-link">Mapa</router-link>
          <router-link to="/search" class="nav-link">Buscar Departamento</router-link>
        </nav>
      </v-container>
    </v-app-bar>

    <!-- Contenido dinámico -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Footer -->
    <v-footer  v-if="$route.path !== '/map'" padless class="footer-gradient">
      <v-container>
        <v-row>
          <v-col cols="12" md="4" class="white--text">
            <h3 class="footer-title">Aloja AQP</h3>
            <p>Encuentra alojamientos únicos en la Ciudad Blanca.</p>
          </v-col>
          <v-col cols="12" md="4" class="white--text">
            <h3 class="footer-title">Enlaces rápidos</h3>
            <ul>
              <li><router-link to="/" class="footer-link">Inicio</router-link></li>
              <li><router-link to="/map" class="footer-link">Mapa</router-link></li>
            </ul>
          </v-col>
          <v-col cols="12" md="4" class="white--text text-center">
            <h3 class="footer-title">Síguenos</h3>
            <v-btn icon color="white"><v-icon>mdi-facebook</v-icon></v-btn>
            <v-btn icon color="white"><v-icon>mdi-instagram</v-icon></v-btn>
            <v-btn icon color="white"><v-icon>mdi-twitter</v-icon></v-btn>
          </v-col>
        </v-row>
        <v-divider class="my-2"></v-divider>
        <p class="text-center mt-2 white--text">
          &copy; 2025 Aloja AQP. Todos los derechos reservados.
        </p>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* ---------------- NAVBAR ---------------- */
.navbar-gradient {
  background: linear-gradient(90deg, #1a2980, #26d0ce) !important; /* Azul → turquesa */
  color: white !important;
}

.logo .brand {
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  color: white;
}

.nav-links {
  display: flex;
  gap: 25px;
}

.nav-link {
  text-decoration: none;
  color: white;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
}

.nav-link:hover {
  color: #ffd54f;
  border-bottom: 2px solid #ffd54f;
}

/* ---------------- FOOTER ---------------- */
.footer-gradient {
  background: linear-gradient(90deg, #26d0ce, #1a2980) !important;
  color: white;
  padding: 30px 0;
}

.footer-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.footer-link {
  display: block;
  color: white;
  text-decoration: none;
  margin: 5px 0;
  transition: all 0.3s;
}
.footer-link:hover {
  color: #ffd54f;
  margin-left: 5px;
}

/* ---------------- LAYOUT ---------------- */
html, body, #app {
  height: 100%;
  margin: 0;
}

.v-application {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.v-main {
  flex: 1 0 auto;
}

.v-footer {
  flex-shrink: 0;
}
</style>
