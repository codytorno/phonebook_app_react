import React from "react";

const Person = ({ person, onDeleteClick }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={(e) => onDeleteClick(e, person)}>Delete</button>
    </div>
  );
};

export default Person;
