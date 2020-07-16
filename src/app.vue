<template>
    <main class="pl-20 min-h-screen flex flex-col justify-center">
        <app-clock />
        <app-weather />
    </main>

    <footer
        class="px-10 h-20 flex items-center justify-end fixed bottom-0 inset-x-0"
    >
        <app-settings />
    </footer>
</template>

<script>
import AppClock from './components/app-clock.vue'
import AppWeather from './components/app-weather.vue'
import AppSettings from './components/app-settings.vue'

export default {
    components: { AppClock, AppWeather, AppSettings },
}
</script>
