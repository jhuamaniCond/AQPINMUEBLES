<template>

    <main class="flex-1 p-6 sm:p-8 md:p-10">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-2xl font-bold mb-1 text-black dark:!text-white">Propiedades guardadas</h2>
            <p class="text-sm text-black/60 dark:text-white/60 mb-8">Organiza y administra visualmente tus propiedades favoritas.</p>
            <div class="flex items-center gap-4 mb-8">
                <div class="relative">
                    <select
                        class="block w-48 appearance-none bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/10 text-black dark:!text-white py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-background-light dark:focus:bg-background-dark focus:border-primary">
                        <option>Todas las propiedades</option>
                        <option>Apartamentos ideales</option>
                        <option>Opción económica</option>
                        <option>Hogares familiares</option>
                    </select>
                    <div
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black/60 dark:text-white/60">
                        <svg class="fill-current h-4 w-4" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
                        </svg>
                    </div>
                </div>
                <button
                    class="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
                    <span class="material-symbols-outlined text-lg">add</span>
                    Nuevo tablero
                </button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="saved-properties-grid">
                <PropertyCard v-for="(property, index) in properties" :key="index" :title="property.title"
                    :price="property.price" :image="property.image" />
            </div>
        </div>
    </main>
</template>

<script setup>
import PropertyCard from '../../components/Profile/SavedProperty.vue';


        const properties = [
  {
    title: "Cozy Studio",
        price: "S/950/mes",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBBZ0FQvPTgA5YsoOVhQLNId9Dcuvctc3UNX02dn84mKDxMLxdTyAC2FA0EehUZfJjfOLi6JgF1ujdzchEJXA0Rvs4vSeBZ576v0uaYSetEZ4te-qSAk7NSjbCMc6jhGZs3l7_27cB8Q8qhkqjMHL1Tq7vSLFt0LDx_oTdGMqCaejqjMewEukHQwm8ibPhMc7ZMOBDH9alg9O1jE_P9DZmtKxSIeEhFh9ScrOtYjrejxOuE6m7ry_yELJZR7YmKvzVgECEQhNgQTqsT",
  },
  {
    title: "Spacious Condo",
    price: "S/2,100/mes",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC1N0CIudegEzwfhjsqjHO888OswMiGSDWWFwRA8cHRaykqlBTiVfd43hYJTge4aw4D7hC0ui5XNGcgOqjbVUR-I2Lw2KKFtz_1dm0dmrKLdrpL92L4XjmD8d2KQGo-r98320nvl3HwbqsXwkwFjWfp2r6kMClcGqL_XgHEu3TBBxIOYM0MbfAUuZTGZC68Oto8D_lKENMkIY7J2h-NvmTzUt7t_7qU6flYCtuyeLJkgnXdooWzB3tCZZ5LbYlQfDrxrIXUP2XJKvPl",
  },
  {
    title: "Downtown Apt",
    price: "S/1,800/mes",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZUbRvmcNk66mjTIzQL8FHOMG90hx9Z6i9k2b29l6UyrBFt6qSec9-rYh6pBUGlp8sueAMBNUTktxIfO1TKobBPxsWYv0GpZ18Dxhy-5QbcCheObz98_WCdKFIqviIHPX40JBAC2MpJ86IXgrPYuLsEDbb8INvwM-8dSpJtHbty0VrVInnTc3K91RLvNnhl8S--TNQcTNDt3W1ceENwDYV1RZKUbOe3ZsGULo2Pa1nn-5l3DiQzgPidmshG-hZsYoPSp5TCXm3ELUV",
  },
  {
    title: "Suburban House",
    price: "S/2,500/mes",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ04quXzKCc_rqV7PPmjWJQhrx9Wx4BkQcPI0EpVY07cXjLO6ZvevFQhHQKghVjYBG_WFhQqwPBNtU1bzxdwHTQ6K-tGBduzLGnkskewX_bdwt2_KEbCKr4-Jscc1vZLfj3Shhi81S0vA_snDofvLhRP16Ok_yjZUfveYJra9K-GWFByxMauL1LOX5hmeiaiOBySh8O7bNv8wzg4IHr-nsihC0rFUExejQ-V9BaICjv45wz8TXQ-Su230GqQAMoh1aL2j98HUZSZco",
  },
  {
    title: "Charming Cottage",
    price: "S/1,300/mes",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkluunQjAudeJFpkPaLubCrEiOD1dXMFa4Vi5JPfCpJOQd6ePN9ap8A1JoSygN0IfHUB5EEcdKm8L32TZ_MaNBZ0tRtd_M2DwQSrPUIKq5xHnQ1JlJQpyBw4CCk0lqxgDDpEQTGrEVthD9IbGisgqlZfeUc1oVgIiUvPXiMzKnf3qTYAk3DdnUHgkXJ1rlH8Etga9otkpNu3rsw2JqenwrP1AtNaqWGqSLOV-IOD2g36gTV36shT1PHtbLnJHGaL_8MaFoPR5FweZJ",
  },
];
</script>