const findMin = document.querySelector('#click1')
const findMax = document.querySelector('#click2')
const findAvg = document.querySelector('#click3')
const showData = document.querySelector('#click4')
const predictForm = document.querySelector('#form2')
const from = document.querySelector('#from')
const to = document.querySelector('#to')
const day = document.querySelector('#day')
const resultFind = document.querySelector('#result1')
const resultPredict = document.querySelector('#result2')

const findAverage = data => data.reduce((accumulator, current) => {
    return accumulator += current
})/data.length

const findDateChange = data => {
    index = []
    for (i=1; i<data.length; i++) {
        if (data[i-1].getDate() != data[i].getDate()) {
            index.push(i)
        }
    }
    return index
}

const findDayAvg = (data, time) => {
    dayIndex = [0, ...findDateChange(time)]
    dayAvg = []
    for (i=1; i<dayIndex.length; i++) {
        dayAvg.push(findAverage(data.slice(dayIndex[i-1], dayIndex[i])))
    }
    return dayAvg
}

const url = 'http://3.1.189.234:8091/data/ttntest'
const data = []
let time = []

fetch(url).then((res) => {
    res.json().then((body) => {
        body.map(x => data.push(x.data))
        time = body.map(x => new Date(x.timestamp))
    })
})

predictForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const val = parseInt(day.value)
    let predict = 0
    const dayDiff = []
    if (isNaN(val) || val == 0) {
        return resultPredict.textContent = 'Invalid Input!'
    }

    const dataDayAvg = findDayAvg(data, time)
    for (i=1; i<8; i++) {
        dayDiff.push(dataDayAvg[i] - dataDayAvg[i-1])
    }
    dayDiff.splice(0, 0, ...dayDiff.splice(5))

    const dayDiffSum = dayDiff.reduce((accumulator, current) => accumulator += current)

    predict += dataDayAvg.at(-1)
    predict += dayDiffSum*(Math.floor(val/7))
    if (val%7 != 0) {
        predict += dayDiff.slice(0, val%7).reduce((accumulator, current) => accumulator += current)
    }

    resultPredict.textContent = predict
})

findMin.addEventListener('click', (e) => {
    e.preventDefault()
    if (from.value >= to.value || from.value === '' || to.value === '') {
        return resultFind.textContent = 'Invalid Input!'
    }
    result1.textContent = Math.min(...data.slice(parseInt(from.value), parseInt(to.value)))
})

findMax.addEventListener('click', (e) => {
    e.preventDefault()
    if (from.value >= to.value || from.value === '' || to.value === '') {
        return resultFind.textContent = 'Invalid Input!'
    }
    result1.textContent = Math.max(...data.slice(parseInt(from.value), parseInt(to.value)))
})

findAvg.addEventListener('click', (e) => {
    e.preventDefault()
    if (from.value >= to.value || from.value === '' || to.value === '') {
        return resultFind.textContent = 'Invalid Input!'
    }
    result1.textContent = findAverage(data.slice(parseInt(from.value), parseInt(to.value)))
})

showData.addEventListener('click', (e) => {
    e.preventDefault()
    if (from.value >= to.value || from.value === '' || to.value === '') {
        return resultFind.textContent = 'Invalid Input!'
    }
    let dataRange = data.slice(parseInt(from.value), parseInt(to.value))
    if (dataRange.length < 10) {
        resultFind.textContent = dataRange.toString().replace(/,/g, ' ') + ' ... '
    } else {
        resultFind.textContent = dataRange.slice(0,10).toString().replace(/,/g, ' ') + ' ... ' + (dataRange.length-10) + ' more items'
    }
})