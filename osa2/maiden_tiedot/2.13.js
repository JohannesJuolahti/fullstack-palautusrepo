import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
        Find countries with: <input value={props.newFilter} onChange={props.handleFilterChange}/>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const handleSelection = (countriesToShow, name) => {
    console.log(name)
    let usedCountry = [{}]
    countriesToShow.map(country => {
      if (country['name'] === name) {
        usedCountry = name
        return (
          <Countries countriesToShow={usedCountry} />
        )
      }
    }
    )
    
}

const Country = (props) => {
  return (
    <div>
      {props.name} <Button handleClick={handleSelection(props.countriesToShow, props.name)} text={"Show"} />
    </div>
  )
}

const CountryInfo = (props) => {
  return (
    <div>
      <h1>{props.nameAsHeader}</h1>
      <p>Capital: {props.capital}</p>
      <p>Capital: {props.population}</p>
      <h2>Languages</h2>
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
            <Country key={country.name} name={country.name} countriesToShow={props.countriesToShow}/>
          )}
      </div>
    )
  } else if (Array.isArray(props.countriesToShow) && props.countriesToShow.length) {
    let onlyCountry = props.countriesToShow[0]
    return (
      <div>
        <CountryInfo nameAsHeader={onlyCountry['name']} capital={onlyCountry['capital']} 
        population={onlyCountry['population']} languages={onlyCountry['languages']}
        flag={onlyCountry['flag']}/>
      </div>
    )
  }
  return (<p>Loading countries...</p>)
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