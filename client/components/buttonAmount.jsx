import React from 'react'
import { useDispatch } from 'react-redux'

import { changeItem } from '../redux/reducers/cart'

const ButtonAmount = ({ id, basketCount }) => {
  const dispatch = useDispatch()

  return (
    <>
      <div className="custom-number-input h-10 w-32">
        <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
          <button
            type="button"
            data-action="decrement"
            className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
            onClick={() => dispatch(changeItem(id, -1))}
          >
            <span className="m-auto text-2xl font-thin">−</span>
          </button>
          <span className="flex justify-center outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none">
            {basketCount}
          </span>
          <button
            type="button"
            data-action="increment"
            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
            onClick={() => dispatch(changeItem(id, 1))}
          >
            <span className="m-auto text-2xl font-thin">+</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default ButtonAmount
