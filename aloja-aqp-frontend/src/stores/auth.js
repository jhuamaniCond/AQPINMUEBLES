import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLogged: false,
    user: null,
  }),

  actions: {
    // --- LOGIN NORMAL ---
    async login(email, password) {
      try {
        console.log("Iniciando login para:", email);
        const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);
          localStorage.setItem("user_info", JSON.stringify(data.user));
          this.user = data.user;
          this.isLogged = true;
          return { success: true };
        } else {
          return { success: false, message: "Credenciales incorrectas" };
        }
      } catch (error) {
        console.error("❌ Error al iniciar sesión:", error);
        return { success: false, message: "Error de conexión" };
      }
    },
    // --- LOGIN CON GOOGLE ---
    async googleLogin(id_token) {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/auth/google-login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_token }),
        });

        const data = await res.json();

        if (data.access) {
          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);
          localStorage.setItem("user_info", JSON.stringify(data.user));
          this.user = data.user;
          this.isLogged = true;
          return { success: true };
        } else {
          return { success: false, message: "Error en el login con Google" };
        }
      } catch (err) {
        console.error("❌ Error en login Google:", err);
        return { success: false, message: "Error de conexión" };
      }
    },
    // 🔹 Cierra sesión completa (incluye llamada al backend)
    async logout() {
      try {
        const refreshToken = localStorage.getItem('refresh_token')
        const accessToken = localStorage.getItem('access_token')

        if (refreshToken && accessToken) {
          const res = await fetch('http://127.0.0.1:8000/api/auth/logout/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ refresh: refreshToken }),
          })

          if (res.ok) {
            console.log('✅ Logout exitoso en el backend')
          } else {
            console.warn('⚠️ El backend respondió:', res.status, res.statusText)
          }
        }
      } catch (error) {
        console.error('❌ Error al cerrar sesión:', error)
      } finally {
        // 🔹 Limpia almacenamiento local
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user_info')

        // 🔹 Actualiza estado global
        this.isLogged = false
        this.user = null

        alert('👋 Sesión cerrada desde el auth')
      }
    },

    // 🔹 Carga usuario almacenado al iniciar la app
    loadUser() {
      const storedUser = localStorage.getItem('user_info')
      if (storedUser) {
        this.user = JSON.parse(storedUser)
        this.isLogged = true
      }
    },
  },
})
