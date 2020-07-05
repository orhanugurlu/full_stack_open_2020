import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter }) => {
  return (
    <ul>
      {persons.filter(e => e.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
        <Person key={person.id} person={person}/>
      )}
    </ul>
  )
}

export default Persons