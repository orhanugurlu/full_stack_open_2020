import React from 'react'
import personService from '../services/persons'

const Person = ({ person, persons, setPersons, setMessage }) => {

    const deletePerson = (id) => {
        const person = persons.find(p => p.id === id)
        if (window.confirm (`Delete ${person.name}?`)) {
            personService
                .deleteIt(person.id).then(response => {
                    setMessage({text:`Deleted '${person.name}'`, class:'info'})
                })
                .catch(error => {
                    setMessage({text:`Information of '${person.name}' has already been removed from server`,
                                class:'error'})
                })
            setPersons(persons.filter(p => p.id !== id))
            setTimeout(() => {
              setMessage(null)
            }, 3000)            
        }
    }
    
    return (
        <li className='person'>
            {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>Delete</button>
        </li>
    )
}

export default Person