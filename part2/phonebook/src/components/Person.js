import React from 'react'

const Person = ({ person }) => {
    return (
        <li>{person.name} {person.number}</li>
    )
}

export default Person