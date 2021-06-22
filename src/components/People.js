import React from "react";
import Person from "./Person";

const People = ({ people, filterValue, handlePeopleChange }) => {
  const peopleToShow =
    filterValue === ""
      ? people
      : people.filter((person) =>
          person.name.toUpperCase().includes(filterValue.toUpperCase())
        );
  return (
    <div>
      {peopleToShow.map((person) => (
        <Person
          key={person.name}
          person={person}
          onDeleteClick={handlePeopleChange}
        />
      ))}
    </div>
  );
};

export default People;
