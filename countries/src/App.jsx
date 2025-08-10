import axios from 'axios';
import { useEffect, useState } from 'react'

const Info = (props) => {
  if(props.result){
    return(<div>
      <ul>
        {props.result}
      </ul>
      
      </div>)
  }
  }
  const Weather = (props) => {
    if(props.weather){
      return(
        <div>
          {props.weather}
        </div>
      )
    }
  }
function App() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState(null);
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_SOME_KEY
  console.log(api_key)  
  let info;
  
  
  useEffect(()=>{
    if(result){
    const city = result[0].capital[0]    
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`).then(response => {setWeather(response.data.main.temp)})}},[result])
  
  useEffect(()=>{axios.get(`https://restcountries.com/v3.1/name/${value}`).then(response => {setResult(response.data)})},[value])
  
 if(result){
   if(result.length > 10){
  info = [<li key={"narrow"}>{"narrow down your search"}</li>]
 }else if(result.length > 1){
  info = result.map(country => <li key={country.name.official}>{country.name.common} <button onClick={() => setResult([country])}>show</button></li>)
 }else{
  info = [<li key={"name"}>{result[0].name.common}</li>, <li key={"flag"}>{result[0].flags.svg}</li>, <li key={"capital"}>{result[0].capital[0]}</li>]      
 }
 
 

  return (
    <>
    <div>
      find countries <input value={value} onChange={(event)=> setValue(event.target.value)}/>
    </div>
    <Info result = {info}/>
    <Weather weather = {weather}/>
    </>   
  )
}
else{
  return(
    <>
    <div>
      find countries <input value={value} onChange={(event)=> setValue(event.target.value)}/>
    </div>
    </> 
  )
}
}


export default App
