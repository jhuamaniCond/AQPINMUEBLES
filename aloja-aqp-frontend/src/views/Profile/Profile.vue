<template>

    <body class="font-display bg-background-light dark:bg-background-dark text-black dark:!text-white">
        <div class="flex flex-col min-h-screen">
            <header
                class="sticky top-0 z-10 flex items-center justify-between h-16 px-6 md:px-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-black/10 dark:border-white/10">
                <div class="flex items-center gap-4">
                    <svg class="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd"
                            d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                            fill="currentColor" fill-rule="evenodd"></path>
                        <path clip-rule="evenodd"
                            d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                            fill="currentColor" fill-rule="evenodd"></path>
                    </svg>
                    <router-link to="/" class="text-xl font-bold tracking-tight text-black dark:!text-white">
                        AlojaAQP

                    </router-link>
                </div>
                <div class="hidden md:flex items-center gap-6">
                    <router-link to="/search"
                        class="text-sm font-medium text-black/70 dark:text-white/70 hover:text-primary dark:hover:text-primary transition-colors">
                        Explorar Alojamientos
                    </router-link>
                    <a class="text-sm font-medium text-black/70 dark:text-white/70 hover:text-primary dark:hover:text-primary transition-colors"
                        href="#">Help</a>
                </div>
                <div class="flex items-center gap-4">
                    <ProfileButton />
                </div>
            </header>
            <div class="flex flex-1">
                <aside class="w-72 p-6 hidden md:flex flex-col border-r border-black/10 dark:border-white/10">
                    <h2 class="text-lg font-bold mb-6 text-black dark:!text-white">Ajustes de la Cuenta</h2>
                    <nav class="flex flex-col gap-2">
                        <router-link to="/perfil/ver-perfil"
                            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            :class="[
                                (route.path === '/perfil/ver-perfil' || route.path === '/perfil/editar-perfil')
                                    ? 'bg-primary/10 text-primary dark:!bg-primary/20 dark:!text-primary'
                                    : ''
                            ]">
                            <span class="material-symbols-outlined text-xl">person</span>
                            Editar Perfil
                        </router-link>
                        <router-link class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            to="/perfil/verificar-perfil"
                            exact-active-class="bg-primary/10 text-primary dark:!bg-primary/20 dark:!text-primary"
                            >
                            <span class="material-symbols-outlined text-xl">verified_user</span>
                            Verificar Perfil
                        </router-link>
                        <router-link class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative"
                            to="/perfil/mensajes"
                            exact-active-class="bg-primary/10 text-primary dark:!bg-primary/20 dark:!text-primary">
                            <span class="material-symbols-outlined text-xl">chat_bubble</span>
                            Mensajes
                            <span class="absolute right-3 top-1/2 -translate-y-1/2 size-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
                        </router-link>
                        <router-link class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            to="/perfil/propiedades-guardadas"
                            exact-active-class="bg-primary/10 text-primary dark:!bg-primary/20 dark:!text-primary">
                            
                            <span class="material-symbols-outlined text-xl">bookmark</span>
                            Propiedades Guardadas
                        </router-link>
                        <router-link
                            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            to="/perfil/configuracion"
                            exact-active-class="bg-primary/10 text-primary dark:!bg-primary/20 dark:!text-primary">
                            <span class="material-symbols-outlined text-xl">settings</span>
                            Configuracion
                        </router-link>
                    </nav>
                </aside>
                <router-view />
            </div>
        </div>

    </body>
</template>
<script setup lang="ts">
import ProfileButton from '../../components/ProfileButton.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>