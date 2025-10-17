<template>
  <div class="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm overflow-hidden p-6 mb-8">
    <!-- Encabezado con switch -->
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold text-gray-800 dark:text-white">Property Overview</h3>

      <!-- Switch -->
      <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" v-model="open" class="sr-only peer" />
        <div class="relative w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors">
          <div
            class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5">
          </div>
        </div>
        <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">Show details</span>
      </label>
    </div>

    <!-- Contenido colapsable con animación -->
    <transition name="slide-fade">
      <div
        v-show="open"
        class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm overflow-hidden"
      >
        <div
          v-for="(detail, index) in details"
          :key="index"
          class="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-600"
        >
          <p class="text-gray-700 dark:text-gray-300 font-medium">{{ detail.label }}:</p>
          <div class="flex items-center gap-2">
            <span class="text-gray-600 dark:text-gray-400">{{ detail.value }}</span>
            <span
              class="material-symbols-outlined text-xl"
              :class="detail.color === 'green' ? 'text-green-500' : 'text-orange-400'"
            >
              {{ detail.status }}
            </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const open = ref(true)

const details = [
  { label: 'Property Type', value: 'Apartment', status: 'check_circle', color: 'green' },
  { label: 'Bedrooms', value: '2', status: 'check_circle', color: 'green' },
  { label: 'Bathrooms', value: '1', status: 'check_circle', color: 'green' },
  { label: 'Square Footage', value: '850 sq ft', status: 'check_circle', color: 'green' },
  { label: 'Address', value: '123 University Ave, City, State', status: 'check_circle', color: 'green' },
  { label: 'Furnished', value: 'Yes', status: 'check_circle', color: 'green' },
  { label: 'Wi-Fi', value: 'Included', status: 'check_circle', color: 'green' },
  { label: 'Parking', value: 'Available', status: 'check_circle', color: 'green' },
  { label: 'Laundry', value: 'In-unit', status: 'check_circle', color: 'green' },
  { label: 'Main Photo', value: 'Living Room', status: 'check_circle', color: 'green' },
  { label: 'Additional Photos', value: '3 uploaded', status: 'pending', color: 'orange' },
  { label: 'Monthly Rent', value: '$1,200', status: 'check_circle', color: 'green' },
  { label: 'Security Deposit', value: '$1,200', status: 'check_circle', color: 'green' },
  { label: 'Lease Term', value: '12 months', status: 'pending', color: 'orange' }
]
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
  overflow: hidden;
}

.slide-fade-enter-from {
  max-height: 0;
  opacity: 0;
}

.slide-fade-enter-to {
  max-height: 1000px; /* suficiente para mostrar el contenido */
  opacity: 1;
}

.slide-fade-leave-from {
  max-height: 1000px;
  opacity: 1;
}

.slide-fade-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
