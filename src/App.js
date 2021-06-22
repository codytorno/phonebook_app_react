import "./App.css";
import React, { useState, useEffect } from "react";
import People from "./components/People";
import InputFilter from "./components/InputFilter";
import InputPerson from "./components/InputPerson";
import Notification from "./components/Notification";
import pBService from "./services/phonebook";

const doesPersonExistInList = (people, newperson) => {
  return people.some(
    (person) => person.name.toUpperCase() === newperson.toUpperCase()
  );
};

const App = () => {
  const [people, setPeople] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [notification, setNotification] = useState("test");

  // gets data from json server on first load
  useEffect(() => {
    console.log("Getting data");
    pBService.getAll().then((people) => {
      setPeople(people);
    });
  }, []);

  // event Handler => delete person from json
  const handleDeleteClick = (e, person) => {
    e.preventDefault();
    // verify you want that person removed
    if (window.confirm(`Are you sure you want to delete ${person.name}`)) {
      // set state to update people after deleting this person
      // delete
      pBService
        .deleteItem(person.id)
        .then((people) => {
          setPeople(people);
        })
        .then(() => {
          setNotification(`Deleted ${person.name} from phonebook`);
          setTimeout(() => setNotification(null), 3000);
        });
    }
  };

  // event Handler => adds person to json
  const handleAddClick = (event, person) => {
    event.preventDefault();
    if (doesPersonExistInList(people, person.name)) {
      setNotification(`${person.name} is already added to phonebook`);
      setTimeout(setNotification(null), 3000);
      return;
    }
    pBService
      .createNew(person)
      .then((addedperson) => {
        setPeople(people.concat(addedperson));
      })
      .then(() => {
        setNotification(`Added ${person.name} to phonebook`);
        setTimeout(() => setNotification(null), 3000);
        return;
      });
  };

  // event Handler => updates a person that is already present in json
  const handleUpdatePerson = (event, person) => {
    event.preventDefault();
    pBService
      .updateItem(person)
      .then((updatedPerson) => {
        setPeople(
          people.map((person) =>
            person.id !== updatedPerson.id ? person : updatedPerson
          )
        );
      })
      .then(() => {
        setNotification(`Updated ${person.name} in phonebook`);
        setTimeout(() => setNotification(null), 3000);
      })
      .catch((error) => {
        setNotification(
          `Note '${person.name}' was already removed from server`
        );
        setTimeout(() => {
          setNotification(null);
        }, 5000);
        setPeople(people.filter((n) => n.name !== person.name));
      });
  };

  // event Handler => updates the state input everytime the input is changed
  const handleFilterChange = (event) => {
    let value = event.target.value;
    setFilterValue(value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <InputFilter value={filterValue} onValueChange={handleFilterChange} />
      <h2> add a new</h2>
      <InputPerson
        addPersonHandled={handleAddClick}
        updatePersonHandled={handleUpdatePerson}
        people={people}
      />
      <h2>Numbers</h2>
      <People
        people={people}
        filterValue={filterValue}
        handlePeopleChange={handleDeleteClick}
      />
    </div>
  );
};

export default App;
