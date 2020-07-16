export const Celsius = (temp) => {
    return temp && parseFloat(temp - 273.15).toFixed(1)
}

export const Fahrenheit = (temp) => {
    return temp && parseFloat((temp - 273.15) * 1.8 + 32).toFixed(1)
}
