<template>
    <div class="flex flex-col  bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
        <div class="mb-8">
            <h2 class="text-gray-800 dark:text-white text-3xl font-bold leading-tight mb-2">Add New Property</h2>
            <p class="text-gray-500 dark:text-gray-400 text-lg">Follow the steps to list your property effectively.</p>
        </div>
        <div class="flex justify-between items-center mb-8 relative">
            <div class="absolute w-full h-1 bg-gray-200 dark:bg-gray-700 top-1/2 -translate-y-1/2 rounded-full"></div>
            <div class="flex flex-1 justify-center items-center flex-col gap-2 relative z-10">
                <div class="size-10 flex items-center justify-center rounded-full bg-primary text-white font-bold">1
                </div>
                <p class="text-sm text-primary font-medium">Property Details</p>
            </div>
            <div class="flex flex-1 justify-center items-center flex-col gap-2 relative z-10">
                <div
                    class="size-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 font-bold">
                    2</div>
                <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Amenities</p>
            </div>
            <div class="flex flex-1 justify-center items-center flex-col gap-2 relative z-10">
                <div
                    class="size-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 font-bold">
                    3</div>
                <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Photos</p>
            </div>
            <div class="flex flex-1 justify-center items-center flex-col gap-2 relative z-10">
                <div
                    class="size-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 font-bold">
                    4</div>
                <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Pricing</p>
            </div>
            <div class="flex flex-1 justify-center items-center flex-col gap-2 relative z-10">
                <div
                    class="size-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 font-bold">
                    5</div>
                <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Review &amp; Publish</p>
            </div>
        </div>
        <div class="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto py-8">
            <h3 class="text-gray-800 dark:text-white text-2xl font-bold mb-6">Property Details</h3>
            <div class="grid grid-cols-1 gap-6 w-full">
                <label class="flex flex-col gap-2">
                    <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Property Title</span>
                    <input
                        class="form-input w-full h-12 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary placeholder:text-gray-500 text-base"
                        placeholder="e.g., Spacious 2-Bedroom Apartment" type="text" />
                </label>
                <label class="flex flex-col gap-2">
                    <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Property Description</span>
                    <textarea
                        class="form-textarea w-full h-32 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary placeholder:text-gray-500 text-base resize-none"
                        placeholder="Describe your property in detail..."></textarea>
                </label>
                <label class="flex flex-col gap-2">
                    <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Address</span>
                    <input
                        class="form-input w-full h-12 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary placeholder:text-gray-500 text-base"
                        placeholder="Street Address, City, Postal Code" type="text" />
                </label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label class="flex flex-col gap-2">
                        <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Property Type</span>
                        <select
                            class="form-select w-full h-12 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary text-base">
                            <option>Apartment</option>
                            <option>House</option>
                            <option>Condo</option>
                            <option>Room</option>
                        </select>
                    </label>
                    <label class="flex flex-col gap-2">
                        <span class="text-lg font-medium text-gray-700 dark:text-gray-300">Bedrooms</span>
                        <input
                            class="form-input w-full h-12 rounded-lg text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary placeholder:text-gray-500 text-base"
                            min="0" placeholder="e.g., 2" type="number" />
                    </label>
                </div>
            </div>
            <div class="mt-10 w-full flex justify-end">
                <button
                    class="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-lg font-bold leading-normal tracking-[0.015em] transition-colors duration-200 ease-in-out hover:bg-blue-600">
                    <span class="truncate">Next Step</span>
                    <span class="material-symbols-outlined ml-2">arrow_forward</span>
                </button>
            </div>
        </div>
    </div>
</template>