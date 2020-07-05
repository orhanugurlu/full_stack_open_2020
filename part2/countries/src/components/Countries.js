import React from 'react'

const Country = ({ country, setFilter }) => {

    const handleShowClick = () => {
        setFilter(country.name)
    }

    return (<div>{country.name}<button onClick={handleShowClick}>show</button></div>)
}
  
const Countries = ({ countries, setFilter }) => {
    let showList = (countries.length <= 10)
    return (
        <div>
            {showList ? countries.map((country) => <Country key={country.numericCode} country={country} setFilter={setFilter} />)
                      : 'Too many matches, specify another filter'
            }
        </div>
    )
}

export default Countries