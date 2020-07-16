let numOfIntervals = 0
let intervals = {}

export const setCorrectingInterval = (func, delay) => {
    let id = numOfIntervals++
    let planned = Date.now() + delay

    function tick() {
        func()

        // If clearCorrectingInterval was not called during func
        if (intervals[id]) {
            planned += delay
            intervals[id] = setTimeout(tick, planned - Date.now())
        }
    }

    intervals[id] = setTimeout(tick, delay)

    return id
}

export const clearCorrectingInterval = (id) => {
    clearTimeout(intervals[id])
    delete intervals[id]
}
