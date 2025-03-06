import './index.css'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  // State for persons
  const [persons, setPersons] = useState([]) 
  // State for new persons
  const [newName, setNewName] = useState('new name..')
  const [newNumber, setNewNumber] = useState('000-000-0000')
  // State for filter
  const [filter, setFilter] = useState('')
  
  const [message, setMessage] = useState({
    msg: null,
    error: 0
  })

  // Start list
  useEffect(() => {
    personService
      .getAll()
      .then(initPersons => {
        setPersons(initPersons)
      })
  }, [])

  const personsToShow = persons.filter(
    person => person.name.toLowerCase().includes(filter))

  // Add person event handler
  const addPerson = (event) => {
    event.preventDefault()
    const newObj = {
      name: newName,
      number: newNumber,
      show: false
    }
    // check if name is already added
    const personAdded = persons.find(
      person => person.name.toLowerCase() === newObj.name.toLowerCase())

    // Ask user if they want to update the contact
    if(personAdded != null) {
      if(confirm(newName + " is already added to phonebook. Would you like to update the contact?")) {
        personService
          .update(personAdded.id, newObj)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personAdded.id ? person : returnedPerson))
            setNewName('new name..')
            setNewNumber('000-000-0000')
          })
          // error handling
          .catch(error => {
            setMessage({
              msg: `'${personAdded.name}' was already removed from server`,
              error: 1
            })
            setTimeout(() => {
              setMessage({msg: null, error: 0})
            }, 5000)
          })
        return
      } else {
        return
      }
    } else {
    
      personService
        .create(newObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('new name..')
          setNewNumber('000-000-0000')
          setMessage({
            msg: `'${returnedPerson.name}' has been added to the server`,
            error: 0
          })
          setTimeout(() => {
            setMessage({msg: null, error: 0})
          }, 5000)
        })
      // reset name and number
    }
  }

  // Delete persons
  const confirmDel = (id) => {
    // confirmation to delete
    const conf = () => {
      if(confirm('Are you sure you want to delete?')) {
        personService
          .deletePerson(id)
          .catch(error => {
            setMessage({
              msg: `'${persons.find((person) => person.id === id).name}' was already removed from server`,
              error: 1
            })
            setTimeout(() => {
              setMessage({msg: null, error: 0})
            }, 5000)
          })
        setPersons(persons.filter((person) => {
          return person.id !== id;
        }))
      }
    }
    return conf
  }


  // event handlers for when form is typed in
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  // event handler for filter
  const handleFilter = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
  }

  // rendered html
  return (
    <div>
      <h2>Phonebook</h2>
        <Notification
          message={message.msg}
          type={message.error} 
        />
        <Filter 
          filter={filter}
          handleFilter={handleFilter}
        /> 
      <h2>Add new</h2>
        <PersonForm 
          addPerson={addPerson}
          newName={newName}
          newNumber={newNumber}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
        <Persons
          personsToShow={personsToShow}
          confirmDel={confirmDel}
        />
    </div>
  )
}

export default App