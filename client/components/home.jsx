import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getGoods } from '../redux/reducers/cards'
import Cards from './cards'
import Headers from './header'
import LogButton from './logButton'

const Home = () => {
  const { list } = useSelector((s) => s.cards)
  const listId = useSelector((s) => s.cart.list)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGoods())
  }, [])

  return (
    <div className="">
      <Headers />
      <div className="container grid grid-cols-4 gap-12 pt-36">
        {Object.values(list).map((item) => {
          const basketCount = Object.values(listId).find((itBas) => itBas.id === item.id)
          return <Cards key={item.id} card={item} basketCount={basketCount?.amount} />
        })}
      </div>
      <LogButton />
    </div>
  )
}

Home.propTypes = {}

export default Home
