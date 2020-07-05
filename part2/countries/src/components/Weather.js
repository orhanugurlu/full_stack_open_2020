import React, { useState, useEffect } from 'react';
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY.trim()

const WeatherDetail = ({ weather }) => {
    return (
        <>
            <h2>Weather in {weather.name}</h2>
            <div>
                <b>temperature:</b> {weather.weather.current.temperature} Celcius
            </div>
            <div>
                {weather.weather.current.weather_icons.map((iconUrl, i) => 
                    <img key={iconUrl} src={iconUrl} alt={weather.weather.current.weather_descriptions[i]} />)
                }
            </div>
            <div>
                <b>wind:</b> {weather.weather.current.wind_speed} mph direction {weather.weather.current.wind_speed}
            </div>        
        </>
    )
}

const Weather = ({ filter, countries }) => {
    const [ weather, setWeather ] = useState({name : ''})

    const getWeatherHook = () => {
        let countriesFiltered = countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()))
        if (countriesFiltered.length === 1
            && (weather.name === '' || weather.name !== countriesFiltered[0].capital)) {
                const params = {
                    access_key: api_key,
                    query: countriesFiltered[0].capital
                }
                axios
                    .get('http://api.weatherstack.com/current', {params})
                    .then(response => {
                        if ('current' in response.data) {
                            setWeather ( { name : params.query, weather : response.data })
                        } else {
                            setWeather({name : ''})
                            console.log('Cannot retieve weather', response.data)
                        }
                     }).catch(error => {
                        setWeather({name : ''})
                        console.log(error);
                    });
        } else if (weather.name !== '') {
            setWeather({name : ''})
        }
    }
    useEffect(getWeatherHook, [filter]);

    return (
        <div>
            {weather.name !== '' && weather.weather ? <WeatherDetail weather={weather} /> : ''}
        </div>
    )
}

export default Weather