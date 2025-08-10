import { useEffect, useState } from 'react'
import SearchComponent from './components/SearchComponent'
import FormComponent from './components/FormComponent'
import ResultDisplayComponent from './components/ResultDisplayComponent'
import axios from 'axios'
import PhonebookServices from './services/phonebook'
import Notification from './components/Notification'

function App() {
  const [persons, setPersons] = useState([])
  useEffect(()=>{axios.get('http://localhost:3001/persons').then(response => {
    setPersons(response.data)
  })},[])
 console.log(persons)
  
  const [newName, setNewName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [searchString, setSearchString] = useState("") 
  const [successMessage, setSuccessMessage] = useState("")
  const [result, setResult] = useState("") 
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const personObject = {name: newName, number: phoneNumber}
    const ifExistsPerson = persons.find(person => person.name === newName)
    if(ifExistsPerson !== undefined)
    {
      if(window.confirm(`Are you sure you wish to update the details of ${ifExistsPerson.name}`)){
        PhonebookServices.updateEntry(ifExistsPerson.id, personObject).then(returnedObject => { setResult("success")
          setSuccessMessage(`Updated the phone number of ${returnedObject.name}`)}).catch(error => {
        setResult("error")  
        setSuccessMessage(`The entries of ${personObject.name} have already been removed`)
      })
        
        setTimeout(setSuccessMessage(""),5000)
      }
    }
    else{
         PhonebookServices.create(personObject).then(returnedObject => {setPersons(persons.concat(returnedObject))          
          setResult("success")
          setSuccessMessage(`Added the phone number of ${returnedObject.name}`)
         })         
         setTimeout(setSuccessMessage(""),5000)
    setNewName("")
  setPhoneNumber("")}
  }



  const handleSearchStringChange = (event) => {setSearchString(event.target.value)}
  const handleNameChange = (event) =>{setNewName(event.target.value)}
  const handleNumberChange = (event)=>{setPhoneNumber(event.target.value)}

  const searchResult = searchString === "" ? persons : persons.filter(person => person.name.toLowerCase().includes(searchString.toLowerCase()))

 
 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {successMessage} className= {result}/>
      <SearchComponent value = {searchString} onChange = {handleSearchStringChange}/>
      <h2>add a new</h2>
      <FormComponent nameValue = {newName} onNameChange = {handleNameChange} numberValue = {phoneNumber} onNumberChange = {handleNumberChange} onSubmit = {handleSubmit}/>       
      <h2>Numbers</h2>
      <ResultDisplayComponent array = {searchResult} handleDelete={() => handleDelete()}/>     
    </div>
  )
}

export default App
