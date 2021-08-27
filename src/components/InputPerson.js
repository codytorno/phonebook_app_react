import React, { useState } from "react";

const initialValues = {
  name: "",
  number: "",
};

const InputPerson = ({ addPersonHandled, updatePersonHandled, people }) => {
  const [newPerson, setNewPerson] = useState(initialValues);

  console.log("InputPerson Component Updated!");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPerson({
      ...newPerson,
      [name]: value,
    });
  };

  // internal event handler
  // does all the checks needed and then calls necessary app event
  const addPersonEvent = (e, personToAdd) => {
    // check if any value is blank
    if (!personToAdd.name) {
      alert("Name can not be empty");
      return;
    }
    if (!personToAdd.number) {
      alert("Number can not be empty");
      return;
    }

    // if person already exists request updating phone number
    let matchingPerson = people.find(
      (person) => person.name.toUpperCase() === personToAdd.name.toUpperCase()
    );

    if (!matchingPerson) {
      addPersonHandled(e, personToAdd);
    } else {
      let confirm = window.confirm(
        `${personToAdd.name} is already in the phonebook, replace the old number with updated number?`
      );
      if (confirm) {
        matchingPerson.number = personToAdd.number;
        updatePersonHandled(e, matchingPerson);
      }
    }

    // set form to empty
    setNewPerson(initialValues);
  };

  return (
    <>
      <div>
        name:
        <input
          value={newPerson.name}
          onChange={handleInputChange}
          name="name"
        />
      </div>
      <div>
        number:
        <input
          value={newPerson.number}
          onChange={handleInputChange}
          name="number"
        />
      </div>
      <div>
        <button type="submit" onClick={(e) => addPersonEvent(e, newPerson)}>
          add
        </button>
      </div>
    </>
  );
};

export default InputPerson;
