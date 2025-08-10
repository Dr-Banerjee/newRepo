import { useState } from 'react'
const Button = (props) =>{
  return(
  <>
  <button onClick={props.onClick}>{props.text}</button>
  </>
  )
}

const StatisticLine = (props) => {
  return(
    <>
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
    </>
  )
} 

const DisplayStatistics = (props) => {
  if (props.good === 0 && props.bad === 0 && props.neutral === 0){
    return(<div><h2>statistics</h2>
    <p>No feedback given</p></div>)
  }
  return(
    <div><h2>statistics</h2>
    <table>
      
      <tbody>
        <StatisticLine text = "good" value = {props.good}/>
        <StatisticLine text = "neutral" value= {props.neutral}/>
        <StatisticLine text = "bad" value = {props.bad}/>
        <StatisticLine text = "total" value = {props.total}/>
        <StatisticLine text = "average" value = {props.average}/>
        <StatisticLine text = "positive" value = {props.percentagePositive}/>
    </tbody>        
    
    </table>
    </div>
  )
}

function App() {
  const[good, setGood] = useState(0)
  const[neutral, setNeutral] = useState(0)
  const[bad, setBad] = useState(0)
  const[total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [percentagePositive, setPercentagePositive] = useState(0)
  const handleGood = () => {
    const newGood = good+1
    setGood(newGood)
    const newTotal = newGood + neutral + bad
    setTotal(newTotal)
    setAverage((((newGood*1) + bad*(-1)))/newTotal)
    setPercentagePositive((newGood/newTotal)*100)
  }
  const handleNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    const newTotal = good + newNeutral + bad
    setTotal(newTotal)
    setAverage((((good*1) + bad*(-1)))/newTotal)
    setPercentagePositive((good/newTotal)*100)
  }
  const handleBad = () => {
    const newBad = bad + 1
    setBad(newBad)
    const newTotal = good + neutral + newBad
    setTotal(newTotal)
    setAverage((((good*1) + newBad*(-1)))/newTotal)
    setPercentagePositive((good/newTotal)*100)
  }  
  return (
    <>
    <div><h1>give feedback</h1></div>
    <div><Button onClick= {handleGood} text = "good"/>
    <Button onClick= {handleNeutral} text = "neutral"/>
    <Button onClick= {handleBad} text = "bad"/></div>
    <DisplayStatistics good = {good} neutral = {neutral} bad = {bad} total = {total} average = {average} percentagePositive={percentagePositive}/>             
    </>
  )
}

export default App
