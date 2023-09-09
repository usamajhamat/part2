import { useState, useEffect } from 'react'
import PhonbookServices from './Services/Person'
import axios from 'axios'
import Filter from './Component/Filter.component'
import PersonForm from './Component/PersonForm.component'
import Person from './Component/Person.component'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber , setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(()=>{
    PhonbookServices
      .getAll()
      .then(data =>{
        setPersons(data)
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
      PhonbookServices
      .create(personObject)
      .then(data =>{
        setPersons([...persons, data])
        setNewName('')
        setNewNumber('')
      })
      .catch(error =>{
        console.log('Error Adding Person', error);
      })
    } 
  }
  const filteredPersons = persons.filter(person =>(person.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())))
const HandleDelete = (id) =>{
  const personToDelete = persons.find(person => person.id === id)

  if(personToDelete){
    const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`)
    if(confirmDelete){
      PhonbookServices
        .deletePerson(id)
        .then(()=>{
          setPersons(persons.filter((person) => person.id !== id))
        })
        .catch((error)=>{
          console.log('Error Deleting Person', error);
        }) 
        
    }
  }
}

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
      <ul>
        {filteredPersons.map(person => (
          <li key={person.id}>
            <Person person={person} onDelete={HandleDelete} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App