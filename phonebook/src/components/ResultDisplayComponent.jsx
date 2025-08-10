import PhonebookServices from '../services/phonebook'
const ResultDisplayComponent = (props) => {
    const handleDelete = (id) => {
    const entry = props.array.find(person => person.id === id)
    if(window.confirm(`Sure you wish to delete ${entry.name}`)){
    PhonebookServices.deleteEntry(id)}
  }
    return (
        <div>
        <ul>
          {props.array.map(person => <li key={person.name}>{`${person.name} ${person.number}`} <button onClick={() => handleDelete(person.id)}>delete</button></li>)}
        </ul>
      </div>
    )
}

export default ResultDisplayComponent