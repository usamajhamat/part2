import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Component/Filter.component'
import PersonForm from './Component/PersonForm.component'
import Person from './Component/Person.component'

const App = () => {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '040-123456', id: 1 },
    // { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    // { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber , setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:3001/persons')
    .then(response=>{
      setPersons(response.data)
    })
    .catch(error =>{
      console.log('Error fetching data:', error)
    })
  },[])
  const addPerson = (event)=>{
    event.preventDefault()
    const personObject = {
      name : newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to Phonbook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName ('')
      setNewNumber('')
    }
    
  }
 
 
  const filteredPersons = persons.filter(person =>(person.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} setSearchName={setSearchName}/>
      <h3>Add a New</h3>
      <PersonForm 
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Person persons={filteredPersons}/>
    </div>
  )
}

export default App
