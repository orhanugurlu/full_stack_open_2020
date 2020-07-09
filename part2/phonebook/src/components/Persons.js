import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, setPersons, setMessage }) => {
  return (
    <ul>
      {persons.filter(e => e.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
        <Person key={person.id}
                person={person}
                persons={persons}
                setPersons={setPersons}
                setMessage={setMessage}/>
      )}
    </ul>
  )
}

export default Persons