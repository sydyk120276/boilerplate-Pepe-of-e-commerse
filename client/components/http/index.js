import axios from 'axios'

const $host = axios.create({
  baseURL: 'http://localhost:8080/'
})

const $authHost = axios.create({
  baseURL: 'http://localhost:8080/'
})

const authInterceptor = (config) => {
  console.log('config', config.headers)
  // eslint-disable-next-line
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

$authHost.interceptors.request.use(authInterceptor)

export { $host, $authHost }
