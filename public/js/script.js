const timeRunner = document.querySelector('#timeRunnig')
let time = 0

const finalTime = setInterval(() => {
    time++
    timeRunner.value = time
    return time
}, 1000)