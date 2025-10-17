<template>
  <div class="flex justify-between items-center mb-8 relative">
    <!-- Línea de fondo -->
    <div class="absolute w-full h-1 bg-gray-200 dark:bg-gray-700 top-1/2 -translate-y-1/2 rounded-full"></div>

    <!-- Línea de progreso -->
    <div
      class="absolute h-1 bg-primary top-1/2 -translate-y-1/2 rounded-full transition-all duration-500"
      :style="{ width: progressWidth }"
    ></div>

    <!-- Pasos -->
    <div
      v-for="(s, index) in steps"
      :key="index"
      class="flex flex-1 justify-center items-center flex-col gap-2 relative z-10"
    >
      <div
        class="size-10 flex items-center justify-center rounded-full font-bold transition-colors duration-300"
        :class="{
          'bg-primary text-white': step >= s.number,
          'bg-gray-200 dark:bg-gray-700 text-gray-500': step < s.number
        }"
      >
        {{ s.number }}
      </div>
      <p
        class="text-sm font-medium transition-colors duration-300 text-center"
        :class="step >= s.number ? 'text-primary' : 'text-gray-500 dark:text-gray-400'"
      >
        {{ s.label }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  step: {
    type: Number,
    required: true,
  },
});

const steps = [
  { number: 1, label: "Property Details" },
  { number: 2, label: "Amenities" },
  { number: 3, label: "Photos" },
  { number: 4, label: "Pricing" },
  { number: 5, label: "Review & Publish" },
];

// 🧮 Ajuste para que la línea llegue exactamente al centro del círculo actual
const progressWidth = computed(() => {
  if (props.step == 1) return "10%";
  else if (props.step == 2) return "30%"; 
  else if (props.step == 3) return "50%";
  else if (props.step == 4) return "70%";
  else return "100%";

});
</script>
