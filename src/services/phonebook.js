import axios from "axios";
const baseURL = "/api/persons";

// Gets all elements on the json in base url
const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

// Adds a element to the json, letting it give an id value
const createNew = (person) => {
  const request = axios.post(baseURL, person);
  return request.then((response) => response.data);
};

// removes element from json by id
const deleteItem = (id) => {
  axios.delete(`${baseURL}/${id}`);
  return getAll();
};

// updating element in json by id and given object to replace it with
const updateItem = (person) => {
  const request = axios.put(`${baseURL}/${person.id}`, person);
  return request.then((response) => {
    return response.data;
  });
};

// export methods
const pbService = { getAll, createNew, deleteItem, updateItem };
export default pbService;
