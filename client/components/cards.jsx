import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addAmmount } from '../redux/reducers/cart'

const Cards = ({ card }) => {
  const dispatch = useDispatch()

  const { currensyName, rates } = useSelector((s) => s.rate)
  const { list } = useSelector((s) => s.cart)

  return (
    <div className="flex-col h-72 bg-gray-200 gap-4">
      <div className="h-3/4">
        <img className="h-full w-full" src={card.image} alt="" />
      </div>
      <div className="flex justify-between">
        <div className="font-bold ml-4">
          <div>{card.title}</div>
          <div className="font-bold gap-4">Amount: {list[card.id]?.amount}</div>
          <div className="flex gap-2">
            Price: <p>{(card.price * rates[currensyName]).toFixed(2)}</p>
            <p>{currensyName}</p>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="flex items-center mr-8 font-bold bg-blue-300 hover:bg-blue-500 h-8 w-16 mt-4 rounded-lg justify-center cursor-pointer transform duration-700 scale-100 hover:scale-110"
            onClick={() => dispatch(addAmmount(card.id))}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cards
