import { useState } from 'react';

function Filter({ filterName , handleFilterChange }){
  return(
    <div>
      <h1>Phonebook</h1>
      <form>
        <div>
          filter shown: <input value={filterName} onChange={handleFilterChange} />
        </div>
      </form>
    </div>
  )
}


function Register({ data }) {
  const { persons, setPersons, newName, setNewName, newNumber, setNewNumber} = data;

  function handleSubmit(event){
    event.preventDefault();
    if (newName.trim() === "") return;
    if (newNumber.trim() === "") return;

    //const existe = persons.reduce((element, current) => element || (current.name === newName), false);
    const existeNombre = persons.some((element) => element.name === newName);
    const existeNumero= persons.some((element) => element.number === newNumber);

    if (existeNombre){
      alert(newName + " es un nombre ya existe en la lista");
      return;
    }

    if(existeNumero){
      alert(newNumber + " es un numero ya existe en la lista");
      return;
    }
    
    const newPerson = { name : newName, number : newNumber };
    setPersons([...persons, newPerson]);
    setNewNumber('');
    setNewName('');
  }

  function handleInputChange(event) {
    const {name, value} = event.target;

    if(name === 'nombre'){
      setNewName(value);
    }

    else if(name === 'numero'){
      setNewNumber(value);
    }
  }

  return (
    <>
      <h2>Add new number</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input name='nombre' value={newName} onChange={handleInputChange} />
        </div>

        <div>
          number: <input name='numero' value={newNumber} onChange={handleInputChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
}

function PeopleList({ filterName, people }) {

  const filteredPeople = people.filter((person) => 
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {filteredPeople.map((person) => (
          <li key = {person.id} >{person.name} {person.number}</li>
        ))}
      </ul>
    </>
  );
}

function App() {

  const registroNumerico =
    [
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]
  

  const [persons, setPersons] = useState(registroNumerico); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  const data = { persons, setPersons, newName, setNewName , newNumber, setNewNumber};

  function handleFilterChange(event){
    setFilterName(event.target.value);
  };

  return (
    <div>
      <Filter filterName={filterName} handleFilterChange = {handleFilterChange}/>
      <Register data={data} />
      <PeopleList filterName={filterName} people={persons} />
    </div>
  );
}

export default App;
