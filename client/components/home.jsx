import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getGoods } from '../redux/reducers/cards'
import { getRates } from '../redux/reducers/rate'
import Cards from './cards'
import Headers from './header'

const Home = () => {
  const { list } = useSelector((s) => s.cards)
  console.log('list', list)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGoods())
  }, [])
  useEffect(() => {
    dispatch(getRates())
  }, [])

  return (
    <div>
      <Headers />
      <div className="container grid grid-cols-4 gap-4 pt-36">
        {Object.values(list).map((item) => {
          return <Cards key={item.id} card={item} />
        })}
      </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
