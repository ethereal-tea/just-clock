class Weather {

    constructor() {
        this.weatherInfo = document.querySelector('.weather__info')
        this.weatherCity = document.querySelector('.weather__city-name')
        this.weatherTemp = document.querySelector('.weather__temp-value')
        this.weatherDesc = document.querySelector('.weather__city-desc')
        this.weaherTempFeelsLike = document.querySelector('.weather__fells-like-value')
        this.wheatherWindSpeed = document.querySelector('.weather__wind-value')
        this.updateWeatherBtn = document.querySelector('.update-weather-btn')
        this.getLocation()
        this.listenBtn()
        console.log(this.weatherDesc)
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.addListeners(position.coords.latitude, position.coords.longitude)
        }, (err) => {
            console.log('Не удалось получить геолокацию, ошибка: ' + err.message)
        })
    }

    listenBtn () {
        this.updateWeatherBtn.addEventListener('click', (e)=>{
            console.log('Update Weather')
            e.preventDefault()
            this.getLocation()
        })
    }

    async getWeatherData(lat, lon) {
        try {
            const url = this.getUrl(lat, lon)
            const response = await fetch(url)
            return await response.json()
        }

        catch (error) {
            console.error(error)
        }
    }

    async addListeners(lat, lon) {
        this.weatherData = await this.getWeatherData(lat, lon)
        this.renderWeatherInfo()
    }

    renderWeatherInfo() {
        this.weatherInfo.classList.remove('hidden')
        this.weatherCity.textContent = this.weatherData.name
        this.weatherTemp.textContent = `${Math.floor(this.weatherData.main.temp - 273.15)} °C`
        this.weatherDesc.textContent = this.weatherData.weather[0].main
        this.weaherTempFeelsLike.textContent = `${Math.floor(this.weatherData.main.feels_like - 273.15)} °C`
        this.wheatherWindSpeed.textContent = `${this.weatherData.wind.speed} m/s`
    }

    getUrl(lat, lon) {
        const apiKey = 'f4134a1e0dee84b7ff1122a96055a4ff'
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    }
}

new Weather()


// https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f4134a1e0dee84b7ff1122a96055a4ff