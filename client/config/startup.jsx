import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useBeforeunload } from 'react-beforeunload'

import { getRates } from '../redux/reducers/rate'
// import { CheckUser, setIsAuth } from '../redux/reducers/auth'

const Startup = (props) => {
  const dispatch = useDispatch()
  const { cart } = useSelector((s) => s)

  useEffect(() => {
    dispatch(getRates())
  }, [])
  // useEffect(() => {
  //   dispatch(CheckUser())
  //   if (localStorage.getItem('token')) {
  //     dispatch(setIsAuth(true))
  //   }
  // }, [])

  return (
    <>
      {useBeforeunload(() => localStorage.setItem('cart', JSON.stringify(cart)))}
      {props.children}
    </>
  )
}

export default Startup
