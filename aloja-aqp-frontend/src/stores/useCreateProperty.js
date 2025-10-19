import { defineStore } from "pinia";
import axios from "axios";

export const useCreateProperty = defineStore("propiedad", {
  state: () => ({
    title: "",
    description: "",
    address: "",
    accommodation_type: "",
    habitaciones: 0,
    latitude: "",
    longitude: "",
    amenidades: [],
    imagenes: [],
    monthly_price: 0,
    coexistence_rules: "",
  }),

  actions: {
    // 🔹 Paso 1: Crear alojamiento
    async crearAlojamiento(token) {
      const data = {
        title: this.title,
        description: this.description,
        accommodation_type: this.accommodation_type,
        address: this.address,
        latitude: parseFloat(this.latitude),
        longitude: parseFloat(this.longitude),
        monthly_price: this.monthly_price,
        coexistence_rules: this.coexistence_rules || "",
      };
      console.log("Creando alojamiento con datos:", JSON.stringify(data));
      const res = await axios.post(
        "http://127.0.0.1:8000/api/accommodations/",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data; // devuelve el alojamiento creado (con id)
    },

    // 🔹 Paso 2: Crear servicios (amenidades)
    async crearServicios(accommodationId, token) {
      // amenidades es un array de IDs o de objetos
      for (const servicioId of this.amenidades) {
        await axios.post(
          "http://127.0.0.1:8000/api/accommodation-services/",
          {
            accommodation: accommodationId,
            service: servicioId, // si tu modelo usa FK "service"
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    },

    // 🔹 Paso 3: Subir fotos
    async subirFotos(accommodationId, token) {
      for (let i = 0; i < this.imagenes.length; i++) {
        const formData = new FormData();
        formData.append("accommodation", accommodationId);
        formData.append("image", this.imagenes[i]); // debe ser File
        formData.append("order_num", i + 1);
        formData.append("is_main", i === 0);

        await axios.post(
          "http://127.0.0.1:8000/api/accommodation-photos/",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
    },
    // 🔹 Flujo completo (si lo quieres automatizar todo)
    async publicarPropiedad() {
      const token = localStorage.getItem("access_token");
      const alojamiento = await this.crearAlojamiento(token);
      console.log("-Alojamiento creado:", alojamiento);
      console.log("id recibido:", alojamiento.id);
      await this.crearServicios(alojamiento.id, token);
      await this.subirFotos(alojamiento.id, token);
      this.limpiarDatos();
      return alojamiento;
    },
    
    // Métodos para guardar datos paso a paso (como ya tenías)
    setDatosPaso1(data) {
      this.title = data.titulo;
      this.description = data.descripcion;
      this.address = data.direccion;
      this.accommodation_type = data.tipo;
      this.habitaciones = data.habitaciones;
      this.latitude = data.latitud;
      this.longitude = data.longitud;
    },
    setDatosPaso2(data) {
      this.amenidades = data.amenidades;
    },
    setDatosPaso3(data) {
      this.imagenes = data.imagenes;
    },
    setDatosPaso4(data) {
      this.monthly_price = data.precio;
      this.coexistence_rules = data.reglas || "";
    },

    limpiarDatos() {
      this.$reset();
    },
  },

  persist: {
    key: "propiedad-data",
    storage: sessionStorage,
  },
});
