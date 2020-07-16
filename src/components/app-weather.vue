<template>
    <div class="w-full relative">
        <div v-if="convertedTemp" class="text-label">
            {{ convertedTemp }} &mdash;
            <input
                v-model="location"
                class="w-auto bg-transparent focus:outline-none focus:text-fg"
                @keydown.enter="fetchWeather"
                @blur="fetchWeather"
            />
        </div>
        <div v-else class="text-primary">...</div>

        <transition
            enter-active-class="transform transition duration-150 ease-in-out"
            enter-from-class="-translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transform transition duration-150 ease-in-out"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="-translate-y-1 opacity-0"
        >
            <div v-if="error" class="text-red-500 absolute">{{ error }}</div>
        </transition>
    </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { Celsius, Fahrenheit } from '../util/helpers'

export default {
    setup() {
        let store = useStore()
        let useMetricUnits = computed(() => store.state.useMetricUnits)
        let weather = reactive({
            name: store.state.weather.name,
            temp: store.state.weather.temp,
            location: store.state.weather.location,
            lastUpdated: store.state.weather.lastUpdated,
            error: null,
        })
        let convertedTemp = computed(() =>
            useMetricUnits.value
                ? `${Celsius(weather.temp)}˚c`
                : `${Fahrenheit(weather.temp)}˚f`
        )

        let shouldFetch = Date.now() - weather.lastUpdated >= 1000 * 60 * 10

        function fetchWeather() {
            let apiKey = import.meta.env.VITE_OWM_KEY
            let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${weather.location}&appid=${apiKey}`
            let hasNewLocation =
                localStorage.getItem('weatherLocation') != weather.location

            // Only ignore shouldFetch if there's a new location
            if (!shouldFetch && !hasNewLocation) return null

            console.log(`🌤 Fetching weather`)
            fetch(endpoint)
                .then((resp) => resp && resp.json())
                .then((data) => {
                    let now = Date.now()
                    localStorage.setItem('weatherName', data.name)
                    localStorage.setItem('weatherTemp', data.main.temp)
                    localStorage.setItem('weatherLocation', weather.location)
                    localStorage.setItem('weatherLastUpdated', now)
                    weather.name = store.state.weather.name = data.name
                    weather.temp = store.state.weather.temp = data.main.temp
                    weather.lastUpdated = store.state.weather.lastUpdated = now
                })
                .catch((err) => {
                    weather.error = 'Location unavailable'
                    weather.location = localStorage.getItem('weatherLocation')

                    setTimeout(() => {
                        weather.error = null
                    }, 2500)
                })
        }

        if (shouldFetch) {
            fetchWeather()
        } else {
            console.log(
                `🌤 Weather is current\n      Will fetch again in ${(
                    (1000 * 60 * 10 - (Date.now() - weather.lastUpdated)) /
                    1000 /
                    60
                ).toFixed()}min`
            )
        }

        return { convertedTemp, fetchWeather, ...toRefs(weather) }
    },
}
</script>
