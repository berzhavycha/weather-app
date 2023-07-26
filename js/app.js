const inputCity = document.querySelector('.weather-input input')
const weatherInner = document.querySelector('.weather-inner')
const searchBtn = document.querySelector('.search-icon')
const weatherSuccess = document.querySelector('.weather-success')
const weatherFailure = document.querySelector('.weather-success')
const weatherContentImg = document.querySelector('.weather-result-header img')
const weatherTemp = document.querySelector('.temperature .number')
const weatherDesc = document.querySelector('.desc')
const weatherHumidity = document.querySelector('.humidity')
const weatherWindSpeed = document.querySelector('.speed')
const weatherHeader = document.querySelector('.weather-result-header')
const weatherBottom = document.querySelector('.weather-result-bottom')

const API_KEY = '900f667a157264180762e1f017053b20'

async function getWeather(input) {
    try {
        let dataArr = []
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=` + API_KEY + '&units=metric')

        if (response.status !== 200) {
            throw new Error(response.status)
        }

        const data = await response.json()
        console.log(data)
        dataArr.push(data.weather[0].main)
        dataArr.push(data.main.temp)
        dataArr.push(data.weather[0].description)
        dataArr.push(data.main.humidity)
        dataArr.push(data.wind.speed)

        return dataArr

    } catch (error) {
        console.log('Error' + error)
        return error
    }
}

searchBtn.addEventListener('click', () => {

    const result = getWeather(inputCity)
    result
        .then(arr => {
            if(weatherInner.classList.contains('failure')){
                weatherInner.classList.remove('failure')
            }
            weatherInner.classList.add('growth')
            weatherInner.classList.add('open')
            weatherBottom.classList.add('fade-in')
            weatherHeader.classList.add('fade-in')

            arr.forEach((item, index) => {
                switch (index) {
                    case 0:
                        weatherContentImg.src = `images/${item}.png`
                        break
                    case 1:
                        weatherTemp.innerHTML = `${item}
                        <img src="images/celcius.png" alt="">`
                        break
                    case 2:
                        weatherDesc.innerText = item
                        break
                    case 3:
                        weatherHumidity.innerText = item + '%'
                        break
                    case 4:
                        weatherWindSpeed.innerText = item + 'Km/h'
                }
            })
        })
        .catch(error => {
            if(weatherInner.classList.contains('open')){
                weatherInner.classList.remove('open')
            }
            weatherInner.classList.add('failure')
        })
})