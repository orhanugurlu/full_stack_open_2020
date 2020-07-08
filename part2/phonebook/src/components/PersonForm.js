import React, { useState } from 'react'
import personService from '../services/persons'

const PersonForm = ({ persons, setPersons }) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
  
    const addEntry = (event) => {
      event.preventDefault()
      if (persons.some(e => e.name === newName)) {
        let personToUpdate = {...persons.find(e => e.name === newName)}
        if (window.confirm (`${personToUpdate.name} is already added to phonebook, replace the old number with a new one?`)) {
          personToUpdate.number = newNumber
          personService.update(personToUpdate)
            .then(updatedPerson => {
              setPersons(persons.filter(e => e.name !== newName).concat(updatedPerson))
              setNewName('')
              setNewNumber('')
            })
        }
      } else {
        const newPerson = {
          id     : persons.length + 1,
          name   : newName,
          number : newNumber
        }

        personService.create(newPerson)
          .then(createdPerson => {
            setPersons(persons.concat(createdPerson))
            setNewName('')
            setNewNumber('')
           })
      }
    }
  
    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }  
  
    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }  
  
    return (
        <form onSubmit={addEntry}>
            <div>
                name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm