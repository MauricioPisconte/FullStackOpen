import { useState, useEffect } from 'react';
import personsData from './services/dataService';
import './styles/App.css';

function Filter({ filterName, handleFilterChange }) {
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          filter shown: <input value={filterName} onChange={handleFilterChange} />
        </div>
      </form>
    </div>
  )
}

function PhoneNotification({ notification, type }) {
  return (
    <>
      {notification && <div className={`notification ${type}`}>{notification}</div>}
    </>
  )
}

function Register({ data, setNotification, setNotificationType }) {
  const { persons, setPersons, newName, setNewName, newNumber, setNewNumber } = data;

  function handleSubmit(event) {
    event.preventDefault();
    if (newName.trim() === "") return;
    if (newNumber.trim() === "") return;

    const existeNombre = persons.some((element) => element.name === newName);
    const existeNumero = persons.some((element) => element.number === newNumber);

    if (existeNombre) {
      alert(newName + " es un nombre ya existe en la lista");
      return;
    }

    if (existeNumero) {
      alert(newNumber + " es un numero ya existe en la lista");
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    personsData.Create(newPerson)
      .then((createdPerson) => {
        setPersons((prev) => [...prev, createdPerson]);
        setNotification(`${createdPerson.name} was added`);
        setNotificationType('added');
        setNewName('');
        setNewNumber('');

        setTimeout(() => {
          setNotification(null);
          setNotificationType('');
        }, 5000);
      })
      .catch((error) => console.error("Error al crear la persona:", error));
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    if (name === 'nombre') {
      setNewName(value);
    }

    else if (name === 'numero') {
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

function PeopleList({ filterName, people, handleDelete }) {

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {filteredPeople.map((person) => (
          <li className='userReg' key={person.id} >
            {person.name} {person.number} <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

function App() {
  const [persons, setPersons] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState('');

  useEffect(() => {
    personsData.GetAll()
      .then((data) => {
        setPersons(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const dataPersonas = { persons, setPersons, newName, setNewName, newNumber, setNewNumber };

  function handleFilterChange(event) {
    setFilterName(event.target.value);
  };

  function handleDelete(id, name) {
    const confirmDelete = window.confirm(`Delete ${name}?`);
    if (confirmDelete) {
      personsData.DeleteUser(id)
        .then(() => personsData.GetAll())
        .then((newPersonsData) => {
          setPersons(newPersonsData);
          setNotification(`${name} was deleted`);
          setNotificationType('deleted');
          setTimeout(() => {
            setNotification(null);
            setNotificationType('');
          }, 5000);
        })
        .catch((error) => console.error("Error al eliminar la persona:", error));
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <PhoneNotification notification={notification} type={notificationType} />
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <Register data={dataPersonas} setNotification={setNotification} setNotificationType={setNotificationType} />
      <PeopleList filterName={filterName} people={persons} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
