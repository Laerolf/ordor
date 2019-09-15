import Vue from "vue";

Vue.filter('capitalize', (value) => {
    if (value) {
        return value.substr(0, 1).toUpperCase() + value.substr(1, value.length - 1)
    }
})

Vue.filter('itemAvailability', (active) => {
    if (active !== undefined) {
        if (active) {
            return 'available'
        } else {
            return 'unavailable'
        }
    }
    return undefined
})

Vue.filter('currencyify', (value, currencySymbol) => {

    if (typeof eval(value) == 'number') {
        let precision = value.toString().split(".")[0].length + 2
        return `${currencySymbol} ${value.toPrecision(precision)}`
    }
})

Vue.filter('orderListify', (word, quantity) => {
    if (typeof eval(quantity) === 'number') {

        switch (quantity) {
            case 0:
                return `Empty`
                break;

            case 1:
                return `${quantity} ${word}`
                break;

            default:
                return `${quantity} ${word}s`
                break;
        }

    }
    return undefined
})

Vue.filter('dateify', (value, showTime) => {
    if (value) {
        const date = new Date(value)

        let dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

        if (showTime) {
            dateString += ` ${date.getHours()}:${date.getMinutes()}`
        }

        return dateString

    }
})

Vue.filter('quantify', (value, quantity) => {
    if (typeof quantity === 'number') {

        switch (quantity) {
            case 0:
                return `no ${value}s`
                break;

            case 1:
                return `${quantity} ${value}`
                break;

            default:
                return `${quantity} ${value}s`
                break;
        }

    }
    return undefined
})

