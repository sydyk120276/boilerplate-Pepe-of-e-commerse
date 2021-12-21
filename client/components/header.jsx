import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { sortProducts } from '../redux/reducers/cards'
import { currensyNames, setSortToggle, getRates } from '../redux/reducers/rate'

const Headers = () => {
  const dispatch = useDispatch()

  const { currensyName, rates, sort } = useSelector((s) => s.rate)
  const { totalAmount, totalPrice } = useSelector((s) => s.cart)

  const ratesButton = (name) => {
    dispatch(getRates())
    dispatch(currensyNames(name.toUpperCase()))
  }

  const sortByType = (sortType) => {
    dispatch(setSortToggle(sortType))
    dispatch(sortProducts(sortType, sort[sortType]))
  }

  return (
    <>
      <div className="flex h-20 w-full bg-blue-400 items-center justify-between fixed z-50 ">
        <div className="flex justify-between w-44 pl-4  text-xs">
          {Object.keys(rates).map((name) => (
            <button
              key={name.toLowerCase()}
              type="button"
              className="currency_btn"
              data-name={name.toLowerCase()}
              onClick={(e) => ratesButton(e.target.dataset.name)}
            >
              {name.toUpperCase()}
            </button>
          ))}
        </div>
        {/* <div className="flex justify-between w-44 pl-4  text-xs ">
          <div className="flex bg-red-200 hover:bg-red-400 active:bg-red-700 h-6 w-12 rounded justify-center transform duration-700 scale-100 hover:scale-110 ">
            <button
              className="font-bold "
              type="button"
              onClick={() => dispatch(currensyNames('USD'))}
            >
              USD
            </button>
          </div>
          <div className="flex bg-red-200 hover:bg-red-400 active:bg-red-700 h-6 w-12 rounded justify-center transform duration-700 scale-100 hover:scale-110">
            <button
              className="font-bold"
              type="button"
              onClick={() => dispatch(currensyNames('EUR'))}
            >
              EUR
            </button>
          </div>
          <div className="flex bg-red-200 hover:bg-red-400 active:bg-red-700 h-6 w-12 rounded justify-center transform duration-700 scale-100 hover:scale-110">
            <button
              className="font-bold "
              type="button"
              onClick={() => dispatch(currensyNames('CAD'))}
            >
              CAD
            </button>
          </div>
        </div> */}
        <div className="flex gap-8">
          <div className="flex bg-red-200 hover:bg-red-400 active:bg-red-700 h-6 w-24 rounded justify-center transform duration-700 scale-100 hover:scale-110">
            <button className="font-bold " type="button" onClick={() => sortByType('name')}>
              Name <span>{sort.name ? '▼' : '▲'}</span>
            </button>
          </div>
          <div className="flex bg-red-200 hover:bg-red-400 active:bg-red-700 h-6 w-24 rounded justify-center transform duration-700 scale-100 hover:scale-110">
            <button className="font-bold " type="button" onClick={() => sortByType('price')}>
              Price <span>{sort.price ? '▼' : '▲'}</span>
            </button>
          </div>
        </div>
        <div className="flex text-purple-700 hover:text-purple-900 text-lg transform duration-700 scale-100 hover:scale-150 rounded font-bold justify-center mr-24">
          <Link to="/" id="#brand-name">
            Shop
          </Link>
        </div>
        <div className="flex">
          <div className="mr-4">
            <div className="flex font-bold">
              <div className="">{(totalPrice * rates[currensyName]).toFixed(2)}</div>
              <div className="ml-2">{currensyName}</div>
            </div>
            <div className="ml-4 font-semibold">{totalAmount}</div>
          </div>
          <div className="flex border-0 bg-green-400 text-white h-8 w-16 rounded font-bold justify-center mr-4">
            <Link to="/basket" id="#order-count">
              Basket
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Headers
