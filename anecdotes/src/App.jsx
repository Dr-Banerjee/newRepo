import { useState } from 'react'
import './App.css'
const Button = (props) => {
  return(
  <button onClick={props.onClick}>{props.text}</button>)
}
const DisplayAnecdote = (props) => {
  return(
    <>
      <h1>{props.text}</h1>
      {props.anecdote} has {props.votes} votes
    </>
  )
}

function App() {
  const anecdotes = ['If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.']
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(8).fill(0))
    const handleNextAnecdote = () =>{
      const newSelected = Math.floor(Math.random()*(anecdotes.length))
      setSelected(newSelected)
    }
    const handleVote = () =>{
      const newVotes = [...votes]
      newVotes[selected] += 1
      setVotes(newVotes)
    }

  return (
    <div>
      <DisplayAnecdote text = "Anecdote of the day" anecdote = {anecdotes[selected]} votes = {votes[selected]}/>      
      <Button text = 'next anecdote' onClick={handleNextAnecdote}/>
      <Button text = 'vote' onClick={handleVote}/>
      <DisplayAnecdote text = "Anecdote with most votes" anecdote = {anecdotes[votes.indexOf(Math.max(...votes))]} votes = {votes[votes.indexOf(Math.max(...votes))]}/>
      </div>
  )
}

export default App
