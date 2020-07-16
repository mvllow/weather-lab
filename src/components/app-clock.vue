<template>
    <div class="text-xl text-fg">{{ currentTime }}</div>
</template>

<script>
import { onMounted, watch, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { format } from 'date-fns'
import { setCorrectingInterval } from '../util/correcting-interval'

export default {
    setup() {
        let store = useStore()
        let timeFormat = computed(() => {
            return store.state.useMilitaryTime ? 'HH:mm' : 'h:mm'
        })
        let currentTime = ref(format(Date.now(), timeFormat.value))

        watch(timeFormat, () => {
            currentTime.value = format(Date.now(), timeFormat.value)
        })

        onMounted(() => {
            setCorrectingInterval(() => {
                currentTime.value = format(Date.now(), timeFormat.value)
            }, 1000)
        })

        return { currentTime }
    },
}
</script>
