import React from 'react'

const Filter = ( {filter, setFilter}) => {

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }  

    return (
        <div>
        find countries <input value={filter} onChange={handleFilterChange}/>
        </div>
    )
}
  
export default Filter  