import axios from 'axios'

// singleton axios instance
const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/cc4393c/events',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents() {
    return apiClient.get('/events')
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  }
}