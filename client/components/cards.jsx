import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addAmmount } from '../redux/reducers/cart'
import ButtonAmount from './buttonAmount'

const Cards = ({ card, basketCount }) => {
  console.log(basketCount)
  const dispatch = useDispatch()

  const { currensyName, rates } = useSelector((s) => s.rate)

  return (
    <div className="flex-col h-80 bg-gray-200 shadow-2xl cursor-pointer transform duration-1000 scale-100 hover:scale-105">
      <div className="h-3/4">
        <img className="h-full w-full" src={card.image} alt="" />
      </div>
      <div className="flex justify-between">
        <div className="font-bold ml-4">
          <div>{card.title}</div>
          <div className="flex gap-2">
            Price: <p>{(card.price * rates[currensyName]).toFixed(2)}</p>
            <p>{currensyName}</p>
          </div>
        </div>
        <div>
          {!basketCount && (
            <button
              type="button"
              className="flex items-center mr-8 font-bold bg-blue-300 hover:bg-blue-500 p-2 mt-4 rounded-lg justify-center cursor-pointer transform duration-700 scale-100 hover:scale-110"
              onClick={() => dispatch(addAmmount(card.id))}
            >
              Add
            </button>
          )}
          {basketCount && <ButtonAmount id={card.id} basketCount={basketCount} />}
        </div>
      </div>
    </div>
  )
}

export default Cards
