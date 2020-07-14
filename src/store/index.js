import { createStore } from 'vuex'

export default createStore({
    state: {
        data: null,
    },
    getters: {
        data(state) {
            return state.data
        },
    },
    mutations: {
        setData(state, payload) {
            state.data = payload
        },
    },
    actions: {
        fetchData({ commit }, payload) {
            commit('setData', payload)
        },
    },
})
