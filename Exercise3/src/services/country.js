import axios from 'axios'
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/all';
const api_key = import.meta.env.VITE_SOME_KEY

function GetAll(){
    const request =  axios.get(baseURL)
    return(
        request.then((response) => response.data)
    )
}

function GetWeather(lat, lon){
    const request =  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    return(
        request.then((response) => response.data)
    )
}

function GetWeatherIcon(iconID){
    const request = `https://openweathermap.org/img/wn/${iconID}@2x.png`;
    return(
        request
    )
}

export default { GetAll, GetWeather, GetWeatherIcon };