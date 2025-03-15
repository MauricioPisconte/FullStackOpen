import { useState, useEffect } from 'react';
import './styles/App.css';
import countryAPI from './services/dataService';

function FindCountry({ filterCountry, handleFilterCountry }) {
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          find countries: <input value={filterCountry} onChange={handleFilterCountry} />
        </div>
      </form>
    </>
  );
}

function CountryList({ filterCountry, countryArray, handleShowCountry, wthrData, handleSetWeather}) {
  const filteredCountry = countryArray.filter((country) =>
    country.name.common.toLowerCase().includes(filterCountry.toLowerCase())
  );

  const displayedCountries = filteredCountry.slice(0, 10);
  const countriesCount = filteredCountry.length;

  return (
    <>
      {countriesCount === 1 ? (
        <CountryDetails country={displayedCountries[0]} wthrData ={wthrData} handleSetWeather = {handleSetWeather} />
      ) : countriesCount > 10 ? (
        <p>Too many matches, please specify another filter</p>
      ) : (
        <ul>
          {displayedCountries.map((country, index) => (
            <li key={index}>
              {country.name.common} <button onClick={() => handleShowCountry(country)}>Show</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function CountryDetails({ country , wthrData, handleSetWeather}) {

  const [iconW, setIconWeather] = useState(null)

  useEffect(() => {
    const [lat, lon] = country.latlng;

    countryAPI.GetWeather(lat, lon)
    .then((weatherData) => {
      handleSetWeather(weatherData);
      return weatherData.weather[0].icon;
    })
    .then((iconWeather) => {
      return countryAPI.GetWeatherIcon(iconWeather)
    })
    .then((response) => {
      setIconWeather(response);
    })
    .catch((error) => console.error("Error fetching weather:", error));

  }, [country]);

  function ConvertKtoC(kelvin){
    return parseFloat((kelvin - 273.15).toFixed(2));
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>

      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([key, language]) => (
          <li key={key}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} />

      <h2>Weather in {country.name.common}</h2>
      <p>Temperature: {ConvertKtoC(wthrData?.main?.temp)} Celsius</p>
      <img src={iconW} alt={wthrData?.weather?.main} />
      <p>Wind: {wthrData?.wind?.speed} m/s</p>
    </div>
  );
}

function App() {
  const [countryArray, setCountryArray] = useState([]);
  const [filterCountry, setFilterCountry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [wthrData, setWeather] = useState(null);

  useEffect(() => {
    countryAPI.GetAll()
      .then((data) => {
        setCountryArray(data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  function handleFilterCountry(event) {
    event.preventDefault();
    setFilterCountry(event.target.value);
    setSelectedCountry(null);
  }

  function handleShowCountry(country) {
    setSelectedCountry(country);
  }

  function handleSetWeather(weather){
    setWeather(weather);
  }

  return (
    <div>
      <FindCountry filterCountry={filterCountry} handleFilterCountry={handleFilterCountry} handleShowCountry = {handleShowCountry} />

      {selectedCountry ? (
        <CountryDetails country={selectedCountry} wthrData = {wthrData} handleSetWeather = {handleSetWeather}/>
      ) : (
        <CountryList filterCountry={filterCountry} countryArray={countryArray} handleShowCountry={handleShowCountry} wthrData = {wthrData} handleSetWeather = {handleSetWeather}/>
      )}
    </div>
  );
}

export default App;
