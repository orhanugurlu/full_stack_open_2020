import React from 'react'

const CountryDetail = ({ country }) => {
    return(
        <div>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>Spoken languages</h2>
            <ul>
                {country.languages.map((lang) =>
                <li key={lang.name}>{lang.name}</li>
                )} 
            </ul>
            <img width="200px" src={country.flag} alt={country.name}/>
        </div>
    )
}

export default CountryDetail