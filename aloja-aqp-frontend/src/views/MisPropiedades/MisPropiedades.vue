<template>
    <div class="bg-background-light dark:!bg-background-dark font-display">
        <div class="flex min-h-screen">
            <!-- SideNavBar -->
            <aside class="w-64 bg-white dark:!bg-gray-800 shadow-md flex flex-col p-4">
                <div class="flex items-center gap-3 mb-8">
                    <router-link to="/" class="flex items-center gap-2 text-gray-900 dark:text-white" href="#">
                        <svg class="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd"
                                d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                                fill="currentColor" fill-rule="evenodd"></path>
                            <path clip-rule="evenodd"
                                d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                                fill="currentColor" fill-rule="evenodd"></path>
                        </svg>
                        <div class="text-xl font-bold">
                            AlojaAQP
                        </div>
                    </router-link to="/">
                </div>
                <nav class="flex flex-col gap-2">
                    <a class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/30"
                        href="#">
                        <span class="material-symbols-outlined">dashboard</span>
                        <p class="text-sm font-medium">Dashboard</p>
                    </a>
                    <router-link class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/30"
                        to="/mis-propiedades"
                        exact-active-class="bg-primary/20 dark:bg-primary/30 text-primary"
                        >
                        <span class="material-symbols-outlined">apartment</span>
                        <p class="text-sm font-medium">My Properties</p>
                    </router-link>
                    <router-link class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/30"
                        to="/mis-propiedades/agregar"
                        exact-active-class="bg-primary/20 dark:bg-primary/30 text-primary"
                        >
                        <span class="material-symbols-outlined">add_circle_outline</span>
                        <p class="text-sm font-medium">Add Property</p>
                    </router-link>
                    <a class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/30"
                        href="#">
                        <span class="material-symbols-outlined">analytics</span>
                        <p class="text-sm font-medium">Analytics</p>
                    </a>
                    <a class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/30"
                        href="#">
                        <span class="material-symbols-outlined">settings</span>
                        <p class="text-sm font-medium">Settings</p>
                    </a>
                </nav>
            </aside>
            <div class="flex-1 flex flex-col">
                <!-- TopNavBar -->
                <header
                    class="flex items-center justify-between whitespace-nowrap border-b border-gray-200 dark:!border-gray-700 px-10 py-3 bg-white dark:!bg-gray-800">
                    <label class="flex flex-col min-w-40 !h-10 max-w-sm w-full">
                        <div class="flex w-full flex-1 items-stretch rounded-lg h-full">
                            <div
                                class="text-gray-500 flex border-none bg-gray-100 dark:bg-gray-700 items-center justify-center pl-4 rounded-l-lg border-r-0">
                                <span class="material-symbols-outlined">search</span>
                            </div>
                            <input
                                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-800 dark:text-white focus:outline-0 focus:ring-0 border-none bg-gray-100 dark:bg-gray-700 focus:border-none h-full placeholder:text-gray-500 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                                placeholder="Search properties or messages" value="" />
                        </div>
                    </label>
                    <div class="flex items-center gap-4">
                        <NotificacionButton />
                        <ProfileButton />
                    </div>
                </header>
                <!-- Main Content Area -->
                <main class="flex-1 p-8">
                    <router-view />
                </main>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">

import NotificacionButton from '../../components/NotificacionButton.vue';
import ProfileButton from '../../components/ProfileButton.vue';



</script>