import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, setPersons }) => {
  return (
    <ul>
      {persons.filter(e => e.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
        <Person key={person.id} person={person} persons={persons} setPersons={setPersons}/>
      )}
    </ul>
  )
}

export default Persons