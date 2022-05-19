import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getGoods } from '../redux/reducers/cards'
import Cards from './cards'
import Headers from './header'
import LogButton from './logButton'

const Home = () => {
  const { list } = useSelector((s) => s.cards)
  const listId = useSelector((s) => s.cart.list)
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGoods())
  }, [])

  const seatchDeviceValue = (e) => {
    setSearchValue(e.target.value)
  }

  const listFiltered = Object.values(list).filter((elem) => elem.title.toLowerCase().includes(searchValue.toLowerCase()))

  return (
    <div className="">
      <Headers seatchDeviceValue={seatchDeviceValue} />
      <div className="container grid grid-cols-4 gap-12 pt-36">
        {listFiltered.map((item) => {
          const basketCount = Object.values(listId).find((itBas) => itBas.id === item.id)
          console.log(basketCount)
          return <Cards key={item.id} card={item} basketCount={basketCount?.amount} />
        })}
      </div>
      <LogButton />
    </div>
  )
}

Home.propTypes = {}

export default Home
