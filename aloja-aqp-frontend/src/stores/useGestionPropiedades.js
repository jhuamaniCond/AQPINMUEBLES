import { defineStore } from "pinia";
import axios from "axios";

export const useGestionPropiedades = defineStore("gestionPropiedades", {
  state: () => ({
    myPropiedades: null, // lista de alojamientos del usuario
    myPropiedadActual: null, // alojamiento seleccionado
    propiedadesPublicas:null,
    propiedadPublicaActual:null,
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
        this.myPropiedades = res.data;
        console.log("✅ Propiedades cargadas:", this.myPropiedades);
      } catch (error) {
        this.error = error.response?.data || error.message;
        console.error("❌ Error al obtener mys Propiedades:", this.error);
      } finally {
        this.loading = false;
      }
    },
    async getMisPropiedades() {
      if (this.myPropiedades === null) {
        await this.fetchMisPropiedades();
      }
      return this.myPropiedades;
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
        return this.myPropiedades;
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
        return this.myPropiedades;
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

        return this.myPropiedades;
      } catch (error) {
        console.error(
          "❌ Error al ocultar propiedad:",
          error.response?.data || error.message
        );
        throw error;
      }
    },

    // ✏️ Editar propiedad existente
    async actualizarMyPropiedad(id, data) {
      try {
        const res = await axios.patch(
          `http://127.0.0.1:8000/api/accommodations/${id}/`,
          data,
          this.getAuthHeaders()
        );
        // Actualiza en el array local
        const index = this.myPropiedades.findIndex((p) => p.id === id);
        if (index !== -1) this.myPropiedades[index] = res.data;
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
    async fetchMyPropiedad(id) {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/accommodations/${id}/`,
          this.getAuthHeaders()
        );
        this.myPropiedadActual = res.data;
        console.log("✅ Propiedad con id ",id ," obtenida :",res.data);
        return res.data;
      } catch (error) {
        this.error = error.response?.data || error.message;
        console.error("❌ Error al obtener propiedad con id ",id,":", this.error);
      } finally {
        this.loading = false;
      }
    },
    async getMyPropiedadActual(id) {
      if (this.myPropiedadActual === null) {
        await this.fetchMyPropiedad(id);
      }
      return this.myPropiedadActual;
    },
    async updateStateMyPropiedadActual(id) {
      await this.fetchMyPropiedad(id);
    },
    async fetchPropiedadesPublicas() {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/public/accommodations/",
          this.getAuthHeaders()
        );
        this.propiedadesPublicas = res.data;
        console.log("✅ Propiedades publicas cargadas:", this.propiedadesPublicas);
      } catch (error) {
        this.error = error.response?.data || error.message;
        console.error("❌ Error al obtener Propiedades publicas:", this.error);
      } finally {
        this.loading = false;
      }
    },
    async getPropiedadesPublicas() {
      if (this.propiedadesPublicas === null) {
        await this.fetchPropiedadesPublicas();
      }
      return this.propiedadesPublicas;
    },
    async updateStatePropiedadesPublicas() {
      await this.fetchPropiedadesPublicas();
    },
    async fetchPropiedadPublica(id) {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/accommodations/${id}/`,
          this.getAuthHeaders()
        );
        this.propiedadPublicaActual = res.data;
        console.log("✅ Propiedad con id ",id ," obtenida :",res.data);
        return res.data;
      } catch (error) {
        this.error = error.response?.data || error.message;
        console.error("❌ Error al obtener propiedad con id ",id," publica:", this.error);
      } finally {
        this.loading = false;
      }
    },
    async getPropiedadPublicaActual(id) {
      if (this.propiedadPublicaActual === null) {
        await this.fetchPropiedadPublica(id);
      }
      return this.propiedadPublicaActual;
    },
    async updateStatePropiedadPublicaActual(id) {
      await this.fetchPropiedadPublica(id);
    },
  },
  
});
