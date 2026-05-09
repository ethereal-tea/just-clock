const hourArrow = document.querySelector('#hours')
const minuteArrow = document.querySelector('#minutes')
const secondArrow = document.querySelector('#seconds')
const time = document.querySelector('.time')

const getDate = () =>{
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return {
    hours,
    minutes,
    seconds
  }
}

const updateClock = () => {
  const {hours, minutes, seconds} = getDate()
  hourArrow.style.rotate = `${(hours + (hours / 60)) * 30}deg`
  minuteArrow.style.rotate = `${minutes * 6}deg`
  secondArrow.style.rotate = `${seconds * 6}deg`
  time.innerHTML = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}

setInterval(updateClock, 1000)