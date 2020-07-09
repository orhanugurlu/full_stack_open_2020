import React, { useState } from 'react'
import personService from '../services/persons'

const PersonForm = ({ persons, setPersons, setMessage }) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const updatePersons = (persons, message) => {
      setPersons(persons)
      setNewName('')
      setNewNumber('')
      setMessage({text:message, class:'info'})
      setTimeout(() => {
        setMessage(null)
      }, 3000)      
    }

    const addEntry = (event) => {
      event.preventDefault()
      if (persons.some(e => e.name === newName)) {
        let personToUpdate = {...persons.find(e => e.name === newName)}
        if (window.confirm (`${personToUpdate.name} is already added to phonebook, replace the old number with a new one?`)) {
          personToUpdate.number = newNumber
          personService.update(personToUpdate)
            .then(updatedPerson => {
              updatePersons(persons.filter(e => e.name !== newName).concat(updatedPerson),
                            `Updated '${updatedPerson.name}'`)
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
            updatePersons(persons.concat(createdPerson),
                        `Added '${createdPerson.name}'`)
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