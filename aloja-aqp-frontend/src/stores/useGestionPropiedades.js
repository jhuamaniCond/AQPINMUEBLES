import { defineStore } from "pinia";
import axios from "axios";

export const useGestionPropiedades = defineStore("gestionPropiedades", {
  state: () => ({
    propiedades: null, // lista de alojamientos del usuario
    propiedadActual: null, // alojamiento seleccionado
    loading: false,
    error: null,
  }),

  actions: {
    // 🔐 Configura encabezados con token
    getAuthHeaders() {
      const token = localStorage.getItem("access_token");
      const headers = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      return { headers };
    },

    // 📥 Listar mis propiedades
    async fetchMisPropiedades() {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/accommodations/",
          this.getAuthHeaders()
        );
        this.propiedades = res.data;
        console.log("✅ Propiedades cargadas:", this.propiedades);
      } catch (error) {
        this.error = error.response?.data || error.message;
        console.error("❌ Error al obtener propiedades:", this.error);
      } finally {
        this.loading = false;
      }
    },
    async getMisPropiedades() {
      if (this.propiedades === null) {
        await this.fetchMisPropiedades();
      }
      return this.propiedades;
    },
    async updateStateMisPropiedades() {
      await this.fetchMisPropiedades();
    },
    // 🗑️ Eliminar (borrado lógico)
    async eliminarPropiedad(id) {
      try {
        const res = await axios.post(
          `http://127.0.0.1:8000/api/accommodations/${id}/delete-original/`,
          {},
          this.getAuthHeaders()
        );
        console.log("✅ Propiedad eliminada lógicamente:", res.data);
        await this.fetchMisPropiedades();
        return this.propiedades;
      } catch (error) {
        console.error(
          "❌ Error al eliminar propiedad:",
          error.response?.data || error.message
        );
        throw error;
      }
    },

    // 🌐 Publicar propiedad
    async publicarPropiedad(id) {
      try {
        const res = await axios.post(
          `http://127.0.0.1:8000/api/accommodations/${id}/publish/`,
          {},
          this.getAuthHeaders()
        );

        console.log("✅ Propiedad publicada:", res.data);

        await this.fetchMisPropiedades();
        return this.propiedades;
      } catch (error) {
        console.error(
          "❌ Error al publicar:",
          error.response?.data || error.message
        );
        throw error;
      }
    },

    // 👁️ Ocultar propiedad
    async ocultarPropiedad(id) {
      try {
        const res = await axios.post(
          `http://127.0.0.1:8000/api/accommodations/${id}/hide/`,
          {},
          this.getAuthHeaders()
        );
        console.log("✅ Propiedad ocultada:", res.data);

        await this.fetchMisPropiedades();

        return this.propiedades;
      } catch (error) {
        console.error(
          "❌ Error al ocultar propiedad:",
          error.response?.data || error.message
        );
        throw error;
      }
    },

    // ✏️ Editar propiedad existente
    async actualizarPropiedad(id, data) {
      try {
        const res = await axios.patch(
          `http://127.0.0.1:8000/api/accommodations/${id}/`,
          data,
          this.getAuthHeaders()
        );
        // Actualiza en el array local
        const index = this.propiedades.findIndex((p) => p.id === id);
        if (index !== -1) this.propiedades[index] = res.data;
        console.log("✅ Propiedad actualizada:", res.data);
        return res.data;
      } catch (error) {
        console.error(
          "❌ Error al actualizar propiedad:",
          error.response?.data || error.message
        );
        throw error;
      }
    },
    // 📄 Obtener una propiedad específica (detalle)
    async fetchPropiedad(id) {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/accommodations/${id}/`,
          this.getAuthHeaders()
        );
        this.propiedadActual = res.data;
        console.log("✅ Propiedad con id ",id ," obtenida :",res.data);
        return res.data;
      } catch (error) {
        this.error = error.response?.data || error.message;
        console.error("❌ Error al obtener propiedad:", this.error);
      } finally {
        this.loading = false;
      }
    },
    async getPropiedadActual(id) {
      if (this.propiedadActual === null) {
        await this.fetchPropiedad(id);
      }
      return this.propiedadActual;
    },
  },
  
});
