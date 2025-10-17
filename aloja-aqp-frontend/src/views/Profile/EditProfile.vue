<template>
    <main class="flex-1 p-6 sm:p-8 md:p-10">
        <div class="max-w-4xl mx-auto">
            <button @click="onSaveChanges"
                class="w-full flex-shrink-0 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity mb-8">
                Save Changes
            </button>
            <div
                class="mb-10 bg-white/50 dark:bg-black/20 p-6 sm:p-8 rounded-xl border border-black/10 dark:border-white/10">
                <h2 class="text-2xl font-bold mb-6 text-black dark:!text-white ">Profile</h2>
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div class="relative inline-block">
                        <!-- Imagen de perfil -->
                        <div class="size-24 sm:size-32 rounded-full bg-cover bg-center flex-shrink-0" :style="{
                            backgroundImage:
                                `url(${auth.user.avatar})`
                        }">
                        </div>

                        <!-- Botón de cambiar imagen -->
                        <button
                            class="absolute bottom-0 right-0 bg-white text-gray-700 rounded-full p-1.5 shadow hover:bg-gray-100 transition"
                            title="Cambiar imagen de perfil">
                            <span class="material-symbols-outlined text-lg">edit</span>
                        </button>
                    </div>
                    <div class="flex-grow">
                        <div class="flex flex-col gap-2 mb-1">
                            <input
                                class="w-full px-4 py-2 text-xl font-bold text-black bg-transparent border border-black/20 dark:border-white/20 focus:border-primary focus:ring-primary rounded-lg transition-all dark:!text-white"
                                type="text" :value="auth.user.first_name" />
                            <input
                                class="w-full px-4 py-2 text-sm bg-transparent text-black border border-black/20 dark:border-white/20 focus:border-primary focus:ring-primary rounded-lg transition-all dark:!text-white"
                                type="email" :value="auth.user.email" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="space-y-10">
                <div>
                    <h2 class="text-2xl font-bold mb-1 text-black dark:!text-white ">About</h2>
                    <p class="text-sm text-black/60 dark:text-white/60 mb-6">Your personal information and bio.</p>
                    <div class="divide-y divide-black/10 dark:divide-white/10">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 py-4 items-center">
                            <p class="font-medium text-black/60 dark:text-white/60">Gender</p>
                            <input
                                class="md:col-span-2 w-full px-4 py-2 text-black dark:!text-white bg-transparent border border-black/20 dark:border-white/20 focus:border-primary focus:ring-primary rounded-lg transition-all"
                                type="text" value="Female" />
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 py-4 items-center">
                            <p class="font-medium text-black/60 dark:text-white/60">Age</p>
                            <input
                                class="md:col-span-2 w-full px-4 py-2 text-black dark:!text-white bg-transparent border border-black/20 dark:border-white/20 focus:border-primary focus:ring-primary rounded-lg transition-all"
                                type="text" value="20" />
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 py-4 items-center">
                            <p class="font-medium text-black/60 dark:text-white/60">University</p>
                            <input
                                class="md:col-span-2 w-full px-4 py-2 text-black dark:!text-white bg-transparent border border-black/20 dark:border-white/20 focus:border-primary focus:ring-primary rounded-lg transition-all"
                                type="text" value="State University" />
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 py-4 items-center">
                            <p class="font-medium text-black/60 dark:text-white/60">Major</p>
                            <input
                                class="md:col-span-2 w-full px-4 py-2 text-black dark:!text-white bg-transparent border border-black/20 dark:border-white/20 focus:border-primary focus:ring-primary rounded-lg transition-all"
                                type="text" value="Business Administration" />
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 py-4 items-center">
                            <p class="font-medium text-black/60 dark:text-white/60">Bio</p>
                            <textarea
                                class="md:col-span-2 w-full px-4 py-2 text-black dark:!text-white bg-transparent border border-black/20 dark:border-white/20 focus:border-primary focus:ring-primary rounded-lg transition-all"
                                rows="4">I'm a student at State University, passionate about business and exploring new opportunities. I enjoy meeting new people and learning about different cultures.</textarea>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 class="text-2xl font-bold mb-1 text-black dark:!text-white ">Contact</h2>
                    <p class="text-sm text-black/60 dark:text-white/60 mb-6">How others can get in touch with you.</p>
                    <div class="divide-y divide-black/10 dark:divide-white/10">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 py-4 items-center">
                            <p class="font-medium text-black/60 dark:text-white/60">Phone</p>
                            <input
                                class="md:col-span-2 w-full px-4 py-2 text-black dark:!text-white bg-transparent border border-black/20 dark:border-white/20 focus:border-primary focus:ring-primary rounded-lg transition-all"
                                type="text" value="(555) 123-4567" />
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 py-4 items-center">
                            <p class="font-medium text-black/60 dark:text-white/60">Email</p>
                            <input
                                class="md:col-span-2 w-full px-4 py-2 text-black dark:!text-white bg-transparent border border-black/20 dark:border-white/20 focus:border-primary focus:ring-primary rounded-lg transition-all"
                                type="email" :value="auth.user.email" disabled/>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="onSaveChanges"
                class="w-full flex-shrink-0 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity mt-8">
                Save Changes
            </button>
        </div>
    </main>
</template>

<script setup lang="ts">
import { useAuthStore } from "../../stores/auth";
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore();
console.log("User Data:", JSON.stringify(auth.user));

function onSaveChanges() {
    router.push('/perfil/ver-perfil');
}
</script>