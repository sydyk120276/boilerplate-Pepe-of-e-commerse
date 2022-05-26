import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { history } from '../redux'

import {
  updateEmailField,
  updatePasswordField,
  Registration,
  Login,
  setIsAuth,
  CheckUser
} from '../redux/reducers/auth'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { email, password } = useSelector((s) => s.auth)
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [emailError, setEmailError] = useState('Email не может быть пустым')
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')

  const click = () => {
    if (isLogin) {
      dispatch(Login(email, password))
      // if (localStorage.getItem('token')) {
      //   dispatch(CheckUser())
      //   dispatch(setIsAuth(true))
      //   history.push('/private')
      // }
    } else {
      dispatch(Registration(email, password))
      dispatch(setIsAuth(true))
    }

    if (localStorage.getItem('token')) {
      dispatch(CheckUser())
      dispatch(setIsAuth(true))
      history.push('/private')
    }
    console.log('33333333333', localStorage.getItem('token'))
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
      default:
        break
    }
  }

  const emailHandler = (e) => {
    dispatch(updateEmailField(e.target.value))
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный емейл')
    } else {
      setEmailError('')
    }
  }

  const passwordHandler = (e) => {
    dispatch(updatePasswordField(e.target.value))
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setPasswordError('Пароль должен быть длиннее 3 и меньше 8')
      if (!e.target.value) {
        setPasswordError('Пароль не может быть пустым')
      }
    } else {
      setPasswordError('')
    }
  }

  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
      <div className=" w-1/5">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex w-full h-6 justify-center mb-6 font-bold text-lg">
            <span className="">{isLogin ? 'Авторизация' : 'Регистрация'}</span>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="email ..."
              value={email}
              onBlur={(e) => blurHandler(e)}
              onChange={(e) => emailHandler(e)}
            />
            {emailDirty && emailError && (
              <div className="flex justify-center text-red-700 font-semibold">{emailError}</div>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="******************"
              value={password}
              onBlur={(e) => blurHandler(e)}
              onChange={(e) => passwordHandler(e)}
            />
            {passwordDirty && passwordError && (
              <div className="flex justify-center text-red-700 font-semibold">{passwordError}</div>
            )}
          </div>
          <div className="flex items-center justify-between">
            {isLogin ? (
              <div>
                <p>Нет аккаунта?</p>
                <Link to="/registration" className="text-blue-700 font-semibold">
                  Зарегистрируйся
                </Link>
              </div>
            ) : (
              <div>
                <p>Есть аккаунта?</p>
                <Link to="/login" className="text-blue-700 font-semibold">
                  Войдите
                </Link>
              </div>
            )}
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={click}
            >
              {isLogin ? 'Войти' : 'Регистрация'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
