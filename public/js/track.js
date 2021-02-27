const secRunner = document.querySelector('#secRunnig')
const minRunner = document.querySelector('#minRunnig')
const hrsRunner = document.querySelector('#hrsRunnig')


let time = 0
let min = 0
let hrs = 0

const finalTime = setInterval(() => {
    time++

    if (time >= 60) {
        time = 0
        min++
    }
    secRunner.value = time

    if (min >= 60) {
        min = 0
        hrs++
    }
    minRunner.value = min

    hrsRunner.value = hrs
    
    return time
}, 1000)