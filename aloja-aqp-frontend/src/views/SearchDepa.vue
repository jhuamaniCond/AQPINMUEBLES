<template>
  <div class="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-white">
    <div class="flex flex-col min-h-screen">

      <HeaderComponent />

      <main class="flex-grow">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2">
              <div class="mb-8">
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg aria-hidden="true" class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="currentColor"
                      viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path clip-rule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        fill-rule="evenodd"></path>
                    </svg>
                  </div>
                  <input
                    class="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-background-dark border border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary transition"
                    placeholder="Search for rentals near universities..." type="text" />
                </div>
                <div class="mt-4 flex flex-wrap gap-3">
                  <button
                    class="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <span>University</span>
                    <svg aria-hidden="true" class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path clip-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        fill-rule="evenodd"></path>
                    </svg>
                  </button>
                  <button
                    class="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <span>Price Range</span>
                    <svg aria-hidden="true" class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path clip-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        fill-rule="evenodd"></path>
                    </svg>
                  </button>
                  <button
                    class="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <span>Bedrooms</span>
                    <svg aria-hidden="true" class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path clip-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        fill-rule="evenodd"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Rentals near Stanford University</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  
                  <PropertyCard
                    v-for="(property, index) in properties"
                    :key="index"
                    :title="property.title"
                    :description="property.description"
                    :distance="property.distance"
                    :image="property.image"
                    :isSelected="selectedIndex === index"   
                    @card-clicked="selectedIndex = index"       
                  />

                </div>
                <div class="mt-8 flex justify-center">
                  <nav class="flex items-center gap-2">
                    <a class="flex items-center justify-center h-10 w-10 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      href="#">
                      <svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd"
                          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                          fill-rule="evenodd"></path>
                      </svg>
                    </a>
                    <a class="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-sm"
                      href="#">1</a>
                    <a class="flex items-center justify-center h-10 w-10 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-sm transition-colors"
                      href="#">2</a>
                    <a class="flex items-center justify-center h-10 w-10 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-sm transition-colors"
                      href="#">3</a>
                    <span class="text-gray-500 dark:text-gray-400">...</span>
                    <a class="flex items-center justify-center h-10 w-10 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-sm transition-colors"
                      href="#">8</a>
                    <a class="flex items-center justify-center h-10 w-10 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      href="#">
                      <svg aria-hidden="true" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                          fill-rule="evenodd"></path>
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
            </div>

            <PropertyDetails 
              :title="properties[selectedIndex].title"
              :direccion="properties[selectedIndex].direccion"
              :precio="properties[selectedIndex].precio"
              :distacia="properties[selectedIndex].distance"
              :habitaciones="properties[selectedIndex].habitaciones"
              :servicios="properties[selectedIndex].servicios"
              :latitud ="properties[selectedIndex].latitud"
              :longitud ="properties[selectedIndex].longitud"
              />
            
          </div>
        </div>
      </main>

      <FooterComponent />

    </div>

  </div>
</template>
<script>
import PropertyCard from "../components/PropertyCard.vue";
import MapView from "../components/MapView.vue";
import PropertyDetails from "../components/PropertyDetails.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";

export default {
  name: "SeacrhDepa",
  components:{
    PropertyCard,
    MapView,
    PropertyDetails,
    HeaderComponent,
    FooterComponent
  },
  data() {
    return {
      selectedIndex: 0, 
      properties: [
        {
          title: "Cozy Studio Apartment",
          description: "A comfortable studio perfect for students.",
          direccion: "1057 Campus Drive, Stanford, CA",
          precio: 950,
          habitaciones: 1,
          distance: "0.5 miles to campus",
          image: "https://img10.naventcdn.com/avisos/resize/111/01/47/07/99/85/1200x1200/1557832212.jpg",
          servicios: ["Fully furnished", "Utilities included", "High-speed internet"],
          latitud:-16.409047,
          longitud:-71.537451
        },
        {
          title: "Spacious 2-Bedroom Condo",
          description: "A spacious condo, ideal for sharing.",
          direccion: "123 University Ave, Stanford, CA",
          precio: 1500,
          habitaciones: 2,
          distance: "1.2 miles to campus",
          image: "https://img10.naventcdn.com/avisos/resize/111/01/46/76/88/92/1200x1200/1539977692.jpg",
          servicios: ["Fully furnished", "High-speed internet"],
          latitud:-16.404047,
          longitud:-71.527451
        },
        {
          title: "Modern 1-Bedroom Flat",
          description: "A modern flat, close to campus.",
          direccion: "456 College St, Stanford, CA",
          precio: 1200,
          habitaciones: 1,
          distance: "0.8 miles to campus",
          image: "https://img10.naventcdn.com/avisos/resize/111/01/47/56/05/59/1200x1200/1559477041.jpg",
          servicios: ["Utilities included", "Agua caliente"],
          latitud:-16.410047,
          longitud:-71.537451
        },{
          title: "Charming Garden Apartment",
          description: "Quiet apartment with a beautiful garden view.",
          direccion: "789 Elm St, Stanford, CA",
          precio: 1100,
          habitaciones: 1, 
          distance: "1.5 miles to campus",
          image: "https://img10.naventcdn.com/avisos/resize/111/01/47/44/63/44/1200x1200/1556599390.jpg",
          servicios: ["Fully furnished", "Electricidad incluida"],
          latitud:-16.411047,
          longitud:-71.537451
        },
        {
          title: "Bright Loft with High Ceilings",
          description: "Open-plan loft with plenty of natural light.",
          direccion: "321 Maple Ave, Stanford, CA",
          precio: 1300,
          habitaciones: 1,
          distance: "2.0 miles to campus",
          image: "https://img10.naventcdn.com/avisos/resize/111/01/47/56/01/67/1200x1200/1559458836.jpg",
          servicios: ["High-speed internet", "Gas included"],
          latitud:-16.412047,
          longitud:-71.537451
        },
        {
          title: "Shared House near Campus",
          description: "Rent a room in a friendly shared house.",
          direccion: "654 Oak St, Stanford, CA",
          precio: 700,
          habitaciones: 1,
          distance: "0.3 miles to campus",
          image: "https://img10.naventcdn.com/avisos/resize/111/01/46/76/75/77/1200x1200/1539966748.jpg",
          servicios: ["Utilities included"],
          latitud:-16.413047,
          longitud:-71.537451
        },
      ]
    };
  },
};
</script>
<style scoped>
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
}
</style>
