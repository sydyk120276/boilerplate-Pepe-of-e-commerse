import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ButtonAmount from '../buttonAmount'
import { removeItem } from '../../redux/reducers/cart'

const TableRow = ({ id, n }) => {
  const dispatch = useDispatch()
  const { currensyName, rates } = useSelector((s) => s.rate)
  const listId = useSelector((s) => s.cart.list)

  return (
    <>
      <tr className="flex flex-col sm:flex-col md:flex-row">
        <td className="text-center basis-1/6  md:justify-center">{n}</td>
        <td className="text-center h-6 md:w-20 md:h-12 galaxy_fold:overflow-hidden md:overflow-hidden basis-1/6  md:justify-center">
          {listId[id].title}
        </td>
        <td className="flex basis-1/6 galaxy_fold:justify-center md:justify-center ">
          <img className="h-8 " src={listId[id].image} alt="" />
        </td>
        <td className="text-center basis-1/6  md:justify-center">
          {(listId[id].price * rates[currensyName]).toFixed(2)} {currensyName}
        </td>
        <td className="product__amount flex justify-center basis-1/6  md:justify-center">
          <ButtonAmount id={id} basketCount={listId[id]?.amount} />
        </td>
        <td className="text-center basis-1/6  md:justify-center">
          {(listId[id].price * rates[currensyName] * listId[id].amount).toFixed(2)}
        </td>
        <td className="text-center basis-1/6  md:justify-center">{currensyName}</td>
        <td className="text-center basis-1/6  md:justify-center">
          <button
            type="button"
            className="cursor-pointer p-2 bg-gray-300 hover:text-gray-700 hover:bg-gray-400"
            onClick={() => dispatch(removeItem(id))}
          >
            Remove
          </button>
        </td>
      </tr>
    </>
  )
}

export default TableRow
