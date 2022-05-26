import jwt_decode from 'jwt-decode'
import { $host, $authHost } from '../../components/http'

const SET_AUTH = '@login/SET_AUTH'
const SET_USER = '@login/SET_USER'
const GET_USER = '@login/GET_USER'
const UPDATE_LOGIN = 'UPDATE_LOGIN'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'

const initialState = {
  isAuth: false,
  user: {},
  users: [],
  email: '',
  password: ''
}

export default (state = initialState, action = '') => {
  switch (action.type) {
    case SET_AUTH: {
      return {
        ...state,
        isAuth: action.payload
      }
    }
    case SET_USER: {
      return {
        ...state,
        user: action.payload
      }
    }
    case GET_USER: {
      return {
        ...state,
        users: action.payload
      }
    }
    case UPDATE_LOGIN: {
      return { ...state, email: action.email }
    }
    case UPDATE_PASSWORD: {
      return { ...state, password: action.password }
    }
    default:
      return state
  }
}

export function setIsAuth(bool) {
  return { type: SET_AUTH, payload: bool }
}

export function getUsers() {
  return (dispatch) => {
    axios.get('/api/v1/users').then(({ data }) => {
      dispatch({ type: GET_USER, payload: data })
    })
  }
}

export function Registration(email, password) {
  return (dispatch) => {
    $host
      .post('/api/v1/user/registration', { email, password, role: 'USER' })
      .then(({ data }) => {
        localStorage.setItem('token', data.token)
        const user = jwt_decode(data.token)
        dispatch({ type: SET_USER, payload: user })
      })
      .catch((e) => {
        alert(e.response.data.message)
      })
  }
}
export function Login(email, password) {
  return (dispatch) => {
    $host
      .post('/api/v1/user/login', { email, password })
      .then(({ data }) => {
        localStorage.setItem('token', data.token)
        const user = jwt_decode(data.token)
        dispatch({ type: SET_USER, payload: user })
      })
      .catch((e) => {
        alert(e.response.data.message)
      })
  }
}
export function CheckUser() {
  return (dispatch) => {
    $authHost
      .get('/api/v1/user/auth')
      .then(({ data }) => {
        localStorage.setItem('token', data.token)
        const user = jwt_decode(data.token)
        dispatch({ type: SET_USER, payload: user })
      })
      .catch((e) => {
        console.log('hjhjkhkjhkhkj', e)
      })
  }
}

export function updateEmailField(email) {
  return { type: UPDATE_LOGIN, email }
}

export function updatePasswordField(password) {
  return { type: UPDATE_PASSWORD, password }
}
