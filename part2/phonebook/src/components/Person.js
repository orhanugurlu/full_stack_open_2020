import React from 'react'
import personService from '../services/persons'

const Person = ({ person, persons, setPersons }) => {

    const deletePerson = (id) => {
        const person = persons.find(p => p.id === id)
        if (window.confirm (`Delete ${person.name}?`)) {
            personService.deleteIt(person.id)
            setPersons(persons.filter(p => p.id !== id))
        }
    }
    
    return (
        <li>
            {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>Delete</button>
        </li>
    )
}

export default Person