const Header = (props) => {
  return(
    <>
    <h1>{props.course.name}</h1>
    </>
  )
}
const Part = (props) =>{
  return(
    <>
    <p>{props.part} {props.exercises}</p>
    </>
  )
}
const Content = (props) => {
  return(
    <div>
      {props.course.parts.map(part => <Part key = {part.id} part = {part.name} exercises = {part.exercises}/>)}    
    </div>
  )
}
const Total = (props) => {
  return(
    <>
    <p>Number of exercises = {props.course.parts.reduce((sum,part)=>{return sum + part.exercises},0)}</p>
    </>
  )
}

const Course = ({course}) => {
  return(
    <>
    <Header course = {course}/>
    <Content course = {course}/>
    <Total course = {course}/>
    </>
  )
}

export default Course