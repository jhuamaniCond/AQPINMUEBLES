<template>
    <!-- PageHeading -->
    <div class="flex flex-wrap justify-between gap-3 mb-8">
        <h2 class="text-gray-800 dark:text-white text-3xl font-bold leading-tight">Mis Propiedades</h2>
    </div>
    <!-- ImageGrid -->
    <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">

        <MyPropertyCard v-for="propiedad in propiedades" :key="propiedad.id" :id="propiedad.id"
            :titulo="propiedad.titulo" :precio="propiedad.precio" :estado="propiedad.estado" :imagen="propiedad.imagen"
            @editar="editarPropiedad" @ver="verPropiedad" @eliminar="eliminarPropiedad" />


    </div>
</template>

<script setup lang="ts">
import MyPropertyCard from '../../components/MisPropiedades/MyPropertyCard.vue';
const propiedades = [
  {
    id: 1,
    titulo: "Cozy Apartment near Campus",
    precio: 1200,
    estado: "Available",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAGTovKVmRJNP7u5BW7Aip-IKFzXnVLx1no8LAVMS2S34mAHpbeQfymM4dblqNnxmvqrr82O0nAmmReVkNWXoA1S8fEHOl6y3qR0iPULGIC2kkn3DKSQ4Bqnb0YK2akoBaNz-IgxBfCylDLGRSPpGefDkkJqu9uzTihTevO0MZHwTF_8JMi58mzPHJ3BVDGINVUKPoTj9VZeHBA9qatTqZHpCHUNrMLgH8T9IyafFLj2aoFMNQsYp0r9rNGo7FUu_2MVuzjZIwwPJM",
  },
  {
    id: 2,
    titulo: "Spacious Loft Downtown",
    precio: 1500,
    estado: "Rented",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCPJXKgZCLjJd--j_6RFNw9RSh9sJo0bFeMbdVN8kMdc6bvc-ZDq3YFcirIkh3cnzsOmyeyTerTLOuDj8WV-WueK1R7SJtErjf1S_hN1UbNkbxII043bw--ZONiWO6xhCfSqwmViCzvklBEO7BNtE7uR0MQdG9XxlOgF_DhgVSO7e6-Bq7BIEA1YhySvnMy72XN93qz-t_AL8ys3kbGuAneHD5OQUN0Dd-HBnRJuIYGHYV8ljtbYv1VaXlj-rkyQKbrBFEJd_jSWcA",
  },
  {
    id: 3,
    titulo: "Modern Studio with City View",
    precio: 1000,
    estado: "Available",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA15uxfcJzK-78n5vBaPED07bUpvBy_elBX9rGkeDko2zLuaXIEUbix877Z1DTdt-CS9cwvQXaXZeiPZ2xOAl0tH_6XH5CQAHQllbAy1TUx-ZrZWdcSZhjIdrfLZqMx-WY6sXTpByCneyEZe1K7wQoAH3vtTXSz-QD60MND2y7wKifY0QmIGPQJskC7H0CYiTPbJqTJZMVSU4Le7KJXgcAKwyIr-YKGlP76g0YSRRO5aVUUBSppd4dctq-JKnvflqPXKX4vhlFIfgE",
  },
  {
    id: 4,
    titulo: "Charming Room in Shared House",
    precio: 800,
    estado: "Pending",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIBjT9QzZoua5is7OXM5cUrLn2g2SXDxJ1mhNlaSpOmImIh-Q3ScyS5X4QQ6e6XuZW4xl4wGbPvMkedEpuKacVQdKvVgUqxpgJK-Kx-KkG1_Tnb5kR3XJCodcQeBQr8fMbveg7idVxqqvxgYe_peSNBSi0ejq_0oBxpzaMq44bVCgERDXPh7DC6bzHrGRajjvyzUgxbRnY8xnNZ9CqXSisoKOl4MVSxm6YU-GC9hLDqNZ-PnJuDZe0bMEV16zdFIXwMqKBZTNvq6E",
  },
];



const editarPropiedad = (id) => {
  console.log("Editar propiedad con ID:", id);
};

const verPropiedad = (id) => {
  console.log("Ver propiedad con ID:", id);
};

const eliminarPropiedad = (id) => {
  console.log("eliminar con ID:", id);
};

</script>