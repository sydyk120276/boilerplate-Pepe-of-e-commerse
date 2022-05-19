import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getGoods } from '../redux/reducers/cards'
import Cards from './cards'
import Headers from './header'
import Pages from './pages'
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
    <div className="container flex flex-col">
      <Headers seatchDeviceValue={seatchDeviceValue} />
      <div className="flex flex-col mt-24">
        <Pages />
        <div className="grid grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-12 pt-2">
          {listFiltered.map((item) => {
            const basketCount = Object.values(listId).find((itBas) => itBas.id === item.id)
            console.log(basketCount)
            return <Cards key={item.id} card={item} basketCount={basketCount?.amount} />
          })}
        </div>
      </div>
      <div>
        <LogButton />
      </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
