<template>
  <div
  class="cursor-pointer"
    :class="[
      isSelected
        ? 'bg-blue-50 dark:bg-primary/20 ring-2 ring-primary rounded-xl shadow-lg overflow-hidden transition-shadow duration-300'
        : 'bg-white dark:!bg-background-dark rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'
    ]"
    @click="$emit('card-clicked')"
  >
    <div
      class="w-full h-40 bg-cover bg-center"
      :style="{ backgroundImage: `url(${image})` }"
    ></div>
    <div class="p-4">
      <h3 class="font-semibold text-lg text-gray-800 dark:text-white">{{ title }}</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ description }}</p>
      <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">{{ distance }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PropertyCard",
  props: {
    title: String,
    description: String,
    distance: String,
    image: String,
    isSelected: {
      type: Boolean,
      default: false, // 👈 por defecto será falso
    },
  },
};
</script>
