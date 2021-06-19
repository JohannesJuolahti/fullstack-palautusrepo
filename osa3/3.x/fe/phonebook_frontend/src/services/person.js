import axios from 'axios'
const baseUrl = '/api/persons'
const deleteUrl = '/api/persons/delete/'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const del = (id) => {
  axios.delete(deleteUrl.concat(`${id}`))
} 

const update = (id, person) => {
  axios.put(baseUrl.concat(`/${id}`), person)
}

const personService = {
    getAll,
    create,
    del,
    update,
  };

  export default personService;