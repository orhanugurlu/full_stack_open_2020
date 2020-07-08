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

const update = updatedObject => {
  const request = axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
  return request.then(response => response.data)
}

const deleteIt = id => {
  axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, deleteIt }