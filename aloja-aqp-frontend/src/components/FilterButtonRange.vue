<template>
  <div class="relative">
    <!-- Botón -->
    <button
      @click="toggleMenu"
      :class="[
        'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
        isOpen
          ? 'bg-primary text-white hover:bg-primary/90'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      ]"
    >
      <span>
        {{ title }}: {{tipoDato}}{{ internalStart }} - {{tipoDato}}{{ internalEnd }}
      </span>
      <svg
        aria-hidden="true"
        class="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        />
      </svg>
    </button>

    <!-- Modal -->
    <div
      v-if="isOpen"
      class="absolute top-full mt-2 w-64 bg-white dark:!bg-background-dark rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-10"
    >
      <h4 class="font-semibold text-gray-800 dark:text-white mb-4">
        {{ title }} Range
      </h4>

      <!-- Barra -->
      <div
        ref="bar"
        class="relative h-1 bg-gray-200 dark:bg-gray-700 rounded-full"
      >
        <!-- línea seleccionada -->
        <div
          class="absolute h-1 bg-primary rounded-full"
          :style="{
            left: percentage(internalStart) + '%',
            width: percentage(internalEnd) - percentage(internalStart) + '%'
          }"
        ></div>

        <!-- thumb izquierdo -->
        <div
          class="absolute -top-1.5 -ml-2 h-4 w-4 bg-primary rounded-full cursor-pointer"
          :style="{ left: percentage(internalStart) + '%' }"
          @mousedown="startDrag('start', $event)"
        ></div>

        <!-- thumb derecho -->
        <div
          class="absolute -top-1.5 -ml-2 h-4 w-4 bg-primary rounded-full cursor-pointer"
          :style="{ left: percentage(internalEnd) + '%' }"
          @mousedown="startDrag('end', $event)"
        ></div>
      </div>

      <!-- valores -->
      <div
        class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2"
      >
        <span>{{tipoDato}}{{ internalStart }}</span>
        <span>{{tipoDato}}{{ internalEnd }}</span>
      </div>

      <button
        @click="applyFilter"
        class="mt-4 w-full bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
        <span>Apply</span>
        </button>
        
    </div>
  </div>
</template>

<script>
export default {
  name: "RangeFilter",
  props: {
    title: { type: String, default: "Rango" },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 2000 },
    start: { type: Number, default: 500 },
    end: { type: Number, default: 1500 },
    tipoDato: { type: String, default: "" }, // "number" | "date"
  },
  data() {
    return {
      isOpen: false,
      internalStart: this.start,
      internalEnd: this.end,
      dragging: null, // "start" | "end" | null
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    startDrag(which, event) {
      this.dragging = which;
      document.addEventListener("mousemove", this.onDrag);
      document.addEventListener("mouseup", this.stopDrag);
    },
    onDrag(event) {
      if (!this.dragging) return;

      const bar = this.$refs.bar;
      const rect = bar.getBoundingClientRect();
      const percent = (event.clientX - rect.left) / rect.width;
      const value = Math.round(this.min + percent * (this.max - this.min));

        

      if (this.dragging === "start") {

        if (value < this.min) this.internalStart = this.min;
        else this.internalStart = Math.min(value, this.internalEnd);

      } else if (this.dragging === "end") {

        if (value > this.max) this.internalEnd = this.max;
        else this.internalEnd = Math.max(value, this.internalStart);

      }
    },
    stopDrag() {
      this.dragging = null;
      document.removeEventListener("mousemove", this.onDrag);
      document.removeEventListener("mouseup", this.stopDrag);
    },
    percentage(value) {
      return ((value - this.min) / (this.max - this.min)) * 100;
    },applyFilter() {
      this.$emit("rangeSelected", {
        internalStart: this.internalStart,
        internalEnd: this.internalEnd,
      });
      this.toggleMenu();
    },
  },
};
</script>
