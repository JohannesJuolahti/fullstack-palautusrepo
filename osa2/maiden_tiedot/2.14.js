import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
        Find countries with: <input value={props.newFilter} onChange={props.handleFilterChange}/>
    </div>
  )
}

const Weather = ({capital}) => {
  const [weather, setWeather] = useState({location:{}, current: {}});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const key = process.env.REACT_APP_WEATHERSTACK_CODE
    const url = `http://api.weatherstack.com/current?access_key=${key}&query=${capital}`
    axios.get(url)
    .then(response => {
      setLoading(false);
      setWeather(response.data)
    })
  }, [capital])

  return loading ? <p>Loading...</p> : (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <p><b>Temperature:</b> {weather.current.temperature} Celcius</p>
      <img src = {weather.current.weather_icons} alt='weather'/>
      <p><b>Wind:</b> {weather.current.wind_speed} kph direction {weather.current.wind_dir}</p>
    </div>
  )
}

const Country = (props) => {
  return (
    <div>
      {props.name}
    </div>
  )
}

const CountryInfo = (props) => {
  return (
    <div>
      <h1>{props.nameAsHeader}</h1>
      <p>Capital: {props.capital}</p>
      <p>Capital: {props.population}</p>
      <h2>Spoken languages</h2>
      {props.languages.map(language => 
        <ul key={language['name']}>
          <li>{language['name']} </li>
        </ul>
      )}
      <img src={props.flag} width="150" height="150" alt='Country flag.'/>
    </div>
  )
}

const Countries = (props) => {
  if (props.countriesToShow.length > 10) {
    return (
      <p>Too many matches or empty filter, specify another filter.</p>
    )
  } else if (props.countriesToShow.length > 1) {
    return (
      <div>
          {props.countriesToShow.map(country =>
            <Country key={country.name} name={country.name}/>
          )}
      </div>
    )
  } else if (Array.isArray(props.countriesToShow) && props.countriesToShow.length) {
    let onlyCountry = props.countriesToShow[0]
    return (
      <div>
        
        <CountryInfo capital={onlyCountry['capital']} population={onlyCountry['population']}
        languages={onlyCountry['languages']} flag={onlyCountry['flag']} 
        nameAsHeader={onlyCountry['name']}/>
        <Weather capital={onlyCountry['capital']} />

      </div>
    )
  }
  return props.countriesToShow.length === 0 ? <p>No countries found, use another filter.</p> : null
}

const App = () => {

  const [ newFilter, setNewFilter ] = useState('')
  const [ countries, setCountries] = useState([])
  const [showAll] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = showAll ? countries : countries.filter(country => 
    country.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  
  return (
    <div>
      
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <Countries countriesToShow={countriesToShow}/>

    </div>
  )
}

export default App