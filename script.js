const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')
const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=aa19d1955ea59a989169dcca517d6a37'
const API_UNITS = '&units=metric'

const getWeather = () => {
	const city = input.value || 'Oslo'
	const URL = API_LINK + city + API_KEY + API_UNITS

	axios
		.get(URL)
		.then(res => {
			const temp = res.data.main.temp
			const hum = res.data.main.humidity
			const status = Object.assign({}, ...res.data.weather)

			cityName.textContent = res.data.name
			temperature.textContent = Math.floor(temp) + '℃'
			humidity.textContent = hum + '%'
			weather.textContent = status.main
			warning.textContent = ''
			input.value = ''
			if (status.id >= 200 && status.id < 250) {
				photo.setAttribute('src', './img/thunderstorm.png')
			} else if (status.id >= 300 && status.id < 350) {
				photo.setAttribute('src', './img/drizzle.png')
			} else if (status.id >= 500 && status.id < 550) {
				photo.setAttribute('src', './img/rain.png')
			} else if (status.id >= 600 && status.id < 650) {
				photo.setAttribute('src', './img/snow.png')
			} else if (status.id >= 700 && status.id < 750) {
				photo.setAttribute('src', './img/fog.png')
			} else if (status.id === 800) {
				photo.setAttribute('src', './img/sun.png')
			} else if (status.id >= 801 && status.id < 810) {
				photo.setAttribute('src', './img/cloud.png')
			} else {
				photo.setAttribute('src', './img/unknown.png')
			}

			if (input.value != '') {
				input.textContent = 'Write city name...'
			}
		})
		.catch(() => (warning.textContent = 'Write correct city name!'))
}

const enterChceck = (e) => {
    if (e.key === 'Enter')
    {getWeather()}
    
}

button.addEventListener('click', getWeather)
input.addEventListener('keyup', enterChceck)
