<template>
    <div class="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-white">
        <div class="flex flex-col min-h-screen">
            <header
                class="bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between h-16">
                        <div class="flex items-center gap-8">
                            <a class="flex items-center gap-2 text-gray-900 dark:text-white" href="#">
                                <svg class="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd"
                                        d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                    <path clip-rule="evenodd"
                                        d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                                        fill="currentColor" fill-rule="evenodd"></path>
                                </svg>
                                <router-link to="/" class="text-xl font-bold">
                                AlojaAQP
                                </router-link>
                            </a>
                            <nav class="hidden md:flex items-center gap-6">
                                <a class="text-sm font-medium text-primary dark:text-primary" href="#">Explore</a>
                                <a class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                                    href="#">List your place</a>
                                <a class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                                    href="#">Help</a>
                            </nav>
                        </div>
                        <div class="flex items-center gap-4">
                            <button
                                class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">Sign
                                up</button>
                            <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDAlo91pnfJSsmHzc7pE-x3DyhQpI5SdlPENuRZV09BVDE07nVggll8-ZPJv_zOvrbGND65gR_1J1PkODUb__E4-qoBIEklzVkCJdqbKXmo7K3YMwkG4waSkHJsJr-czKTozUCQvl8Kt43MwPX2yN3M-BOBZr3_kL8M3-RuXO58o5SMBBG1kDO35zhXduURZU2Jm6HkHDCEHapiNvC5Y-iyVdtU9D4zhkzgwkwa-4aV3gzkJU038j6day4QXDxGw1qavnntTNVitAE");'>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main class="flex-grow">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div class="mb-4">
                        <router-link to="/search" class="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                            <span class="material-symbols-outlined">arrow_back</span>
                            <span>Back to search results</span>
                        </router-link>

                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div class="lg:col-span-2">
                            <div class="grid grid-cols-4 gap-2 h-[500px] rounded-xl overflow-hidden">
                                <div class="col-span-3">
                                    <img alt="Living room of the apartment" class="w-full h-full object-cover"
                                        src="https://img10.naventcdn.com/avisos/resize/111/01/44/67/06/90/1200x1200/1488274064.jpg" />
                                </div>
                                <div class="col-span-1 grid grid-rows-4 gap-2">
                                    <img alt="Bedroom of the apartment" class="w-full h-full object-cover"
                                        src="https://img10.naventcdn.com/avisos/resize/111/01/44/67/06/90/1200x1200/1488274054.jpg" />
                                    <img alt="Kitchen of the apartment" class="w-full h-full object-cover"
                                        src="https://img10.naventcdn.com/avisos/resize/111/01/44/67/06/90/1200x1200/1488274061.jpg" />
                                    <img alt="Bathroom of the apartment" class="w-full h-full object-cover"
                                        src="https://img10.naventcdn.com/avisos/resize/111/01/44/67/06/90/1200x1200/1488274059.jpg" />
                                    <img alt="Balcony of the apartment" class="w-full h-full object-cover"
                                        src="https://img10.naventcdn.com/avisos/resize/111/01/44/67/06/90/1200x1200/1488274065.jpg" />
                                </div>
                            </div>
                            <div class="mt-8">
                                <div class="flex flex-col md:flex-row md:items-start md:justify-between">
                                    <div>
                                        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Modern 1-Bedroom
                                            Flat</h1>
                                        <p class="mt-2 text-lg text-gray-600 dark:text-gray-400">123 University Ave,
                                            Palo Alto, CA 94301</p>
                                        <div
                                            class="mt-4 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                            <div class="flex items-center gap-1">
                                                <span class="material-symbols-outlined text-base">bed</span>
                                                <span>1 Bedroom</span>
                                            </div>
                                            <div class="flex items-center gap-1">
                                                <span class="material-symbols-outlined text-base">bathtub</span>
                                                <span>1 Bathroom</span>
                                            </div>
                                            <div class="flex items-center gap-1">
                                                <span class="material-symbols-outlined text-base">square_foot</span>
                                                <span>600 sqft</span>
                                            </div>
                                            <div class="flex items-center gap-1">
                                                <span class="material-symbols-outlined text-base">directions_walk</span>
                                                <span>0.8 miles to campus</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-4 md:mt-0">
                                        <div class="text-3xl font-bold text-primary">$2,500<span
                                                class="text-lg font-medium text-gray-500 dark:text-gray-400">/month</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">About this property
                                    </h2>
                                    <p class="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed"> This modern and
                                        stylish 1-bedroom flat is the perfect home for a student at Stanford University.
                                        Located just a short walk from campus, you'll have easy access to all your
                                        classes and university facilities. The apartment is fully furnished and equipped
                                        with modern appliances, including a washer and dryer. The open-plan living area
                                        is bright and airy, with large windows that let in plenty of natural light. The
                                        bedroom is spacious and features a comfortable queen-sized bed and ample storage
                                        space. </p>
                                </div>
                                <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Amenities</h2>
                                    <div class="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                        <div class="flex items-center gap-2"><span
                                                class="material-symbols-outlined text-primary">wifi</span><span>High-speed
                                                Wi-Fi</span></div>
                                        <div class="flex items-center gap-2"><span
                                                class="material-symbols-outlined text-primary">airware</span><span>Air
                                                Conditioning</span></div>
                                        <div class="flex items-center gap-2"><span
                                                class="material-symbols-outlined text-primary">local_laundry_service</span><span>In-unit
                                                Laundry</span></div>
                                        <div class="flex items-center gap-2"><span
                                                class="material-symbols-outlined text-primary">kitchen</span><span>Fully
                                                Equipped Kitchen</span></div>
                                        <div class="flex items-center gap-2"><span
                                                class="material-symbols-outlined text-primary">tv</span><span>Smart
                                                TV</span></div>
                                        <div class="flex items-center gap-2"><span
                                                class="material-symbols-outlined text-primary">desk</span><span>Workspace</span>
                                        </div>
                                        <div class="flex items-center gap-2"><span
                                                class="material-symbols-outlined text-primary">balcony</span><span>Private
                                                Balcony</span></div>
                                        <div class="flex items-center gap-2"><span
                                                class="material-symbols-outlined text-primary">local_parking</span><span>Parking
                                                Available</span></div>
                                    </div>
                                </div>
                                <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Floor Plan</h2>
                                    <div
                                        class="mt-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex justify-center items-center">
                                        <img alt="Floor plan" class="max-w-full h-auto rounded-md"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2d_f_g-h_j_k-l_m_n-p_q_r-s_t_u-v_w_x-y_z_a-b_c_d_e_f-g_h_j_k-l_m_n_p-q_r_s_t-u_v_w_x_y_z_a_b-c_d_e_f-g_h_j_k-l_m_n_p_q_r_s" />
                                    </div>
                                </div>
                                
                                <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Location</h2>
                                    <div class="mt-4 flex flex-wrap gap-4">
                                        <FilterButtonMultipleOptions
                                            :opciones="universities.map(u => u.name)"
                                            @optionFiltroSelected="handleUniversitySelected"
                                        />

                                        <FilterButtonMultipleOptions
                                            v-if="selectedUniversity"
                                            :opciones="selectedUniversity.sedes.map(s => s.name)"
                                            @optionFiltroSelected="handleSedeSelected"
                                        />
                                    </div>
                                    
                                    <div
                                        class="mt-4 aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden">
                                        
                                        
                                        <MapView :latitudCasa="dataHouse.lat" :longitudCasa="dataHouse.lng" :latitudUni="selectedSede.lat" :longitudUni="selectedSede.lng" :UniImgUrl="selectedUniversity.imageUrl"/>

                                    </div>
                                </div>
                                <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Comments</h2>
                                    <div class="mt-6 space-y-6">
                                        <div class="flex gap-4">
                                            <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                                                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDAlo91pnfJSsmHzc7pE-x3DyhQpI5SdlPENuRZV09BVDE07nVggll8-ZPJv_zOvrbGND65gR_1J1PkODUb__E4-qoBIEklzVkCJdqbKXmo7K3YMwkG4waSkHJsJr-czKTozUCQvl8Kt43MwPX2yN3M-BOBZr3_kL8M3-RuXO58o5SMBBG1kDO35zhXduURZU2Jm6HkHDCEHapiNvC5Y-iyVdtU9D4zhkzgwkwa-4aV3gzkJU038j6day4QXDxGw1qavnntTNVitAE");'>
                                            </div>
                                            <div class="flex-1">
                                                <p class="font-semibold text-gray-800 dark:text-white">Kenji Tanaka</p>
                                                <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">2 days ago</p>
                                                <p class="text-gray-600 dark:text-gray-300">"Does anyone know if the
                                                    kitchen has a microwave? It's not listed in the amenities but I
                                                    can't imagine a modern kitchen without one."</p>
                                            </div>
                                        </div>
                                        <div class="flex gap-4">
                                            <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                                                style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB-q5pD2v7R6e3F-h4G-i2J_k1L_m3N_o5P_q7R_s9T-u0V-w2X-y4Z_a6B-c8D_e0F_g1H_i3J_k5L-m7N_o9P_q1R_s3T-u5V-w7X_y9Z_a1B-c3D_e5F_g7H");'>
                                            </div>
                                            <div class="flex-1">
                                                <p class="font-semibold text-gray-800 dark:text-white">Sarah Johnson
                                                    (Agent)</p>
                                                <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">1 day ago</p>
                                                <p class="text-gray-600 dark:text-gray-300">"Hi Kenji, great question!
                                                    Yes, the kitchen is fully equipped and includes a microwave. We'll
                                                    update the amenities list. Let me know if you have any other
                                                    questions!"</p>
                                            </div>
                                        </div>
                                        <div class="mt-8">
                                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Leave a
                                                comment</h3>
                                            <div class="flex items-start gap-4">
                                                <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                                                    style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDAlo91pnfJSsmHzc7pE-x3DyhQpI5SdlPENuRZV09BVDE07nVggll8-ZPJv_zOvrbGND65gR_1J1PkODUb__E4-qoBIEklzVkCJdqbKXmo7K3YMwkG4waSkHJsJr-czKTozUCQvl8Kt43MwPX2yN3M-BOBZr3_kL8M3-RuXO58o5SMBBG1kDO35zhXduURZU2Jm6HkHDCEHapiNvC5Y-iyVdtU9D4zhkzgwkwa-4aV3gzkJU038j6day4QXDxGw1qavnntTNVitAE");'>
                                                </div>
                                                <div class="flex-1">
                                                    <textarea
                                                        class="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-primary focus:border-primary transition"
                                                        placeholder="Write your comment..." rows="4"></textarea>
                                                    <button
                                                        class="mt-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">Post
                                                        Comment</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="hidden lg:block relative">
                            <div class="sticky top-24">
                                <div
                                    class="bg-white dark:bg-background-dark rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
                                    <h3 class="text-xl font-bold text-gray-900 dark:text-white">Contact Agent</h3>
                                    <div class="mt-4 flex items-center gap-4">
                                        <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-14"
                                            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB-q5pD2v7R6e3F-h4G-i2J_k1L_m3N_o5P_q7R_s9T-u0V-w2X-y4Z_a6B-c8D_e0F_g1H_i3J_k5L-m7N_o9P_q1R_s3T-u5V-w7X_y9Z_a1B-c3D_e5F_g7H");'>
                                        </div>
                                        <div>
                                            <p class="font-semibold text-gray-800 dark:text-white">Sarah Johnson</p>
                                            <p class="text-sm text-gray-500 dark:text-gray-400">Rental Agent</p>
                                        </div>
                                    </div>
                                    <div class="mt-6 space-y-4">
                                        <button
                                            class="w-full bg-primary text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                                            <span class="material-symbols-outlined">calendar_month</span>
                                            <span>Schedule a viewing</span>
                                        </button>
                                        <button
                                            class="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                                            <span class="material-symbols-outlined">mail</span>
                                            <span>Inquire about property</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import MapView from "../components/MapView.vue";
import FilterButtonMultipleOptions from "../components/FilterButtonMultipleOptions.vue";

export default {
    name: "ViewDepa",
    components:{
    MapView,
    FilterButtonMultipleOptions,
    },
    data(){
        return {
            dataHouse: {
                lat: -16.409047,
                lng: -71.537451,
            },
            universities: [
                {
                name: "Universidad Nacional de San Agustin", 
                imageUrl: "../public/Escudo_UNSA.png",
                sedes: [
                    { name: "Ingenieria", lat: -16.404684, lng: -71.524577},
                    { name: "Biomedicas", lat: -16.412480, lng: -71.534752},
                    { name: "Sociales", lat: -16.405969, lng: -71.520543 },]
                },
                {
                name: "Universidad Catolica de Santa Maria",
                imageUrl: "../public/Escudo_UCSM.png",
                sedes: [
                    { name: "Campus Central Umacollo", lat: -16.406310, lng: -71.547563 },
                ]
                },
                {
                name: "Universidad Tecnologica del Peru",
                imageUrl: "../public/Escudo_UTP.png",
                sedes: [
                    { name: "Sede av. Tacna y arica", lat: -16.408627, lng: -71.541031 }, 
                    { name: "Sede av. Parra", lat: -16.408469, lng: -71.542242 }, 
                    { name: "Nueva Sede", lat: -16.409622, lng: -71.543182 }, 

                ]
                },
                {
                name: "Universidad Continental",
                imageUrl: "../public/Escudo_Continental.jpg",
                sedes: [
                    { name: "Campus Principal", lat: -16.412307, lng: -71.524355 }, , 
                ]
                },
                {
                name: "Universidad de San Martin de Porres",
                imageUrl: "../public/Escudo_USMP.png",
                sedes: [
                    { name: "Campus Principal Arequipa", lat: -16.424397, lng: -71.521655 }, , 
                ]
                },
            ],
            selectedUniversity: null,
            selectedSede: null,
        }
    },
    created() {
        this.selectedUniversity = this.universities[0];
        this.selectedSede = this.selectedUniversity.sedes[0];
    },methods: {
        handleUniversitySelected(universityName) {
        this.selectedUniversity = this.universities.find(
            (u) => u.name === universityName
        );
        console.log("Universidad seleccionada:", this.selectedUniversity);
        this.selectedSede = this.selectedUniversity.sedes[0]; // reset al cambiar de universidad
        },
        handleSedeSelected(sedeName) {
        this.selectedSede = this.selectedUniversity.sedes.find(
            (s) => s.name === sedeName
        );
        console.log("Sede seleccionada:", this.selectedSede);
        },
        handlePriceSelecterd(range) {
        console.log("Rango de precios seleccionado:", range);
        },
        handleBedroomsSelected(range) {
        console.log("Rango de habitaciones seleccionado:", range);
        },
    }
};
</script>