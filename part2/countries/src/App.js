import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import CountryDetail from './components/CountryDetail'
import Weather from './components/Weather'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  const getCountriesHook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(getCountriesHook, []);

  let countriesFiltered = countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      {countriesFiltered.length > 1 && filter.length > 0 ?
        <Countries countries={countriesFiltered} setFilter={setFilter}/> : ''
      } 
      {countriesFiltered.length === 1 ?
        <CountryDetail country={countriesFiltered[0]} /> : ''
      }
      <Weather filter={filter} countries={countries} />
    </div>
  );
}

export default App
