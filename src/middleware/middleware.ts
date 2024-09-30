import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://0.tcp.ngrok.io:19657/api', // Cambia esto por la URL base de tu API
  timeout: 10000, // Tiempo de espera para la solicitud
  headers: {
    'Content-Type': 'application/json',
  },
})

// Puedes agregar interceptores si es necesario
instance.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

export default instance