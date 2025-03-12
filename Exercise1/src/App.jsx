import { useState } from 'react';

function CourseDescription({courses}){
  return(
    <>
      {courses.map((element) => (
        <div key = {element.id}>
          <Header name = {element.name}/>
          <Content parts = {element.parts}/>
          <Total total={element.parts}/>
        </div>
      ))}
    </>
  )
}

function Header({name}) {
  return (
    <h1>{name}</h1>
  );
}

function Content({ parts }) {
  return (
    <div>
      {parts.map((elemento) => (
        <Part key={elemento.id} part={elemento} />
      ))}
    </div>
  );
}

function Part({ part }) {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
}

function Total({total}) {

  const totalExercises = total.reduce((sum, current) => sum + current.exercises,0)
  return (
    <h4>Total of  {totalExercises} exercises</h4>
  );
}

function App() {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      <h1>Web development curriculum</h1>
      <CourseDescription courses = {courses}/>
    </div>
  );
}

export default App;
