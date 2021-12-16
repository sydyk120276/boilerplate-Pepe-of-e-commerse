import React from 'react'
import { useSelector } from 'react-redux'

import Headers from './header'
import Table from './Table/tab'

const Basket = () => {
  const { currensyName, rates } = useSelector((s) => s.rate)
  const { totalAmount, totalPrice } = useSelector((s) => s.cart)
  const listId = useSelector((s) => s.cart.list)

  return (
    <>
      <Headers />
      <Table data={Object.keys(listId)} />
      {/* {Object.keys(listId).map((elem) => {
        return (
          <div key={elem} className="flex">
            <div>{list[elem].title}</div>
            <img className="h-8" src={list[elem].image} alt="" />
            <div>{list[elem].price}</div>
            <div>{listId[elem].amount}</div>
            <div>{currensyName}</div>
          </div>
        )
      })} */}
      <div>
        {totalAmount}
        <div>
          {(totalPrice * rates[currensyName]).toFixed(2)} {currensyName}
        </div>
      </div>
    </>
  )
}

export default Basket
