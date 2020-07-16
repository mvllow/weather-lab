<template>
    <div class="relative">
        <button
            class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-overlay focus:outline-none focus:bg-overlay"
            @click="isMenuOpen = !isMenuOpen"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-5 h-5 text-label"
            >
                <circle cx="12" cy="12" r="3" />
                <path
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                />
            </svg>
        </button>

        <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
        >
            <div
                v-if="isMenuOpen"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
                class="mb-12 p-2 space-y-px w-56 bg-base border rounded-md shadow absolute bottom-0 right-0 overflow-hidden"
            >
                <button
                    role="menuitem"
                    class="px-2 w-full h-10 text-sm rounded-md flex items-center hover:bg-overlay focus:outline-none focus:bg-overlay"
                    :class="
                        state.useDarkMode == 1
                            ? 'text-primary'
                            : 'text-label hover:text-fg focus:text-fg'
                    "
                    @click="toggle('useDarkMode', true)"
                >
                    Use dark mode
                </button>

                <button
                    role="menuitem"
                    class="px-2 w-full h-10 text-sm rounded-md flex items-center hover:bg-overlay focus:outline-none focus:bg-overlay"
                    :class="
                        state.useMetricUnits == 1
                            ? 'text-primary'
                            : 'text-label hover:text-fg focus:text-fg'
                    "
                    @click="toggle('useMetricUnits')"
                >
                    Use metric units
                </button>

                <button
                    role="menuitem"
                    class="px-2 w-full h-10 text-sm rounded-md flex items-center hover:bg-overlay focus:outline-none focus:bg-overlay"
                    :class="
                        state.useMilitaryTime == 1
                            ? 'text-primary'
                            : 'text-label hover:text-fg focus:text-fg'
                    "
                    @click="toggle('useMilitaryTime')"
                >
                    Use 24 hour time
                </button>
            </div>
        </transition>

        <div
            v-if="isMenuOpen"
            class="fixed inset-0"
            style="z-index: -1;"
            @click="isMenuOpen = false"
        />
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        let store = useStore()
        let state = computed(() => store.state)
        let isMenuOpen = ref(false)

        function toggle(key, setHtmlClass) {
            let newValue = state.value[key] == 1 ? 0 : 1
            localStorage.setItem(key, newValue)
            state.value[key] = newValue
            if (setHtmlClass) {
                document.querySelector('html').className = newValue ? key : ''
            }
        }

        return {
            state,
            toggle,
            isMenuOpen,
        }
    },
}
</script>
