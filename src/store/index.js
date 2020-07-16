import { createStore } from 'vuex'

export default createStore({
    state: {
        init: false,
        useDarkMode: +localStorage.getItem('useDarkMode') || 0,
        useMetricUnits: +localStorage.getItem('useMetricUnits') || 0,
        useMilitaryTime: +localStorage.getItem('useMilitaryTime') || 0,
        weather: {
            name: localStorage.getItem('weatherName') || '',
            temp: +localStorage.getItem('weatherTemp') || null,
            location: localStorage.getItem('weatherLocation') || 'Chicago',
            lastUpdated: +localStorage.getItem('weatherLastUpdated'),
        },
    },
    mutations: {
        initialiseStore(state) {
            if (!localStorage.getItem('weatherLocation')) {
                localStorage.setItem('weatherLocation', state.weather.location)
            }
            state.init = true
        },
    },
})
