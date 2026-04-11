import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // envía cookies JWT automáticamente
})

export default API
