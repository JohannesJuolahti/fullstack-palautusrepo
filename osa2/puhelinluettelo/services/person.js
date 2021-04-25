import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const del = (id) => {
  axios.delete(baseUrl.concat(`/${id}`))

} 

const update = (id, number) => {
  axios.put(baseUrl.concat(`/${id}`), number)
  
}

const personService = {
    getAll,
    create,
    del,
    update,
  };

  export default personService;