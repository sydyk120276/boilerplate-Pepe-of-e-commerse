import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { sortProducts } from '../redux/reducers/cards'
import { currensyNames, setSortToggle } from '../redux/reducers/rate'
import CustomizedBadges from './CustomizedBadges'

const Headers = ({ seatchDeviceValue }) => {
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(false)
  const { currensyName, rates, sort } = useSelector((s) => s.rate)
  const { totalPrice } = useSelector((s) => s.cart)

  // const ratesButton = (name) => {
  //   dispatch(getRates())
  //   dispatch(currensyNames(name.toUpperCase()))
  // }

  const sortByType = (sortType) => {
    dispatch(setSortToggle(sortType))
    dispatch(sortProducts(sortType, sort[sortType]))
  }

  return (
    <>
      <div className="flex container h-20 bg-blue-400 items-center justify-between fixed z-50">
        <div className="flex gap-2 items-center lg:flex-col md:flex-col xl:flex-row md:ml-4">
          {/* <div className="flex justify-between w-36 pl-4 text-xs">
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
          </div> */}
          <div className="flex justify-between gap-2 md:flex sm:hidden mobile:hidden mobile2:hidden galaxy_fold:hidden">
            <span className="font-semibold text-white">Currency:</span>
            <div className="currency_btn ">
              <button
                className="font-bold "
                type="button"
                onClick={() => dispatch(currensyNames('USD'))}
              >
                $
              </button>
            </div>
            <div className="currency_btn">
              <button
                className="font-bold"
                type="button"
                onClick={() => dispatch(currensyNames('EUR'))}
              >
                €
              </button>
            </div>
            <div className="currency_btn">
              <button
                className="font-bold "
                type="button"
                onClick={() => dispatch(currensyNames('CAD'))}
              >
                C$
              </button>
            </div>
          </div>
          <div className="flex gap-4 bg-gray-200 p-2 rounded-lg md:flex sm:hidden mobile:hidden mobile2:hidden galaxy_fold:hidden">
            <div className="">Sorting: </div>
            <div className="sorting_btn">
              <button className="font-bold" type="button" onClick={() => sortByType('name')}>
                Name <span className="">{sort.name ? '▼' : '▲'}</span>
              </button>
            </div>
            <div className="sorting_btn">
              <button className="font-bold" type="button" onClick={() => sortByType('price')}>
                Price <span>{sort.price ? '▼' : '▲'}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Link to="/" id="#brand-name">
            <img
              className="h-20 w-36 lg:w-36 md:w-24 mobile:w-20 mobile2:w-14"
              src="https://object.pscloud.io/cms/cms/Uploads/sulpak_colour_cool.gif"
              alt=""
            />
          </Link>
        </div>
        <div className="flex gap-10 mobile:gap-10 mobile2:gap-4 ">
          <div className="flex md:flex-col xl:flex-row lg:flex-col lg:gap-2 md:gap-2 md:items-center ">
            <div className="flex items-center gap-2 md:flex sm:hidden mobile:items-center mobile:hidden mobile2:hidden galaxy_fold:hidden">
              <button type="button" className="login_btn">
                Login
              </button>
              <Link to="/signup" className="login_btn">
                Sign Up
              </Link>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                className="border-2 focus:outline-none h-8 rounded-md border-red-400 pl-4 mobile:w-44 mobile2:w-28 galaxy_fold:w-28"
                placeholder="search . . ."
                onChange={seatchDeviceValue}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-col mobile2:flex galaxy_fold:hidden">
            <div className="flex">
              <Link to="/basket" id="#order-count">
                <CustomizedBadges />
              </Link>
            </div>
            <div className="flex font-bold  md:mr-4 sm:mr-0 md:ml-0 items-center">
              <div className="">{(totalPrice * rates[currensyName]).toFixed(2)}</div>
              <div className="ml-2">{currensyName}</div>
            </div>
            {/* <div className="ml-4 font-semibold">{totalAmount}</div> */}
          </div>
          {!toggle ? (
            <button
              type="button"
              onClick={() => setToggle(true)}
              className="flex-col justify-center space-y-2 pr-4 md:hidden sm:flex mobile:flex mobile2:flex mobile:pl-0 mobile2:pl-4"
            >
              <span className="block w-8 h-1 bg-gray-600 transform  transition duration-500 ease-in-out" />
              <span className="block w-8 h-1 bg-gray-600 transform  transition duration-500 ease-in-out" />
              <span className="block w-8 h-1 bg-gray-600 transform  transition duration-500 ease-in-out" />
            </button>
          ) : (
            <button
              type="button"
              className="flex-col justify-center pr-4 md:hidden sm:flex xs:flex items-center mobile:flex mobile2:flex mobile:pl-0 mobile2:pl-4"
              onClick={() => setToggle(false)}
            >
              <span className="block w-8 h-1 bg-gray-600 rotate-45 transform  transition duration-500 ease-in-out translate-y-1" />
              <span className="block w-8 h-1 bg-gray-600 -rotate-45 transform  transition duration-500 ease-in-out" />
            </button>
          )}
        </div>
      </div>
      {toggle && (
        <div className="md:hidden sm:flex xs:flex mobile:flex w-full h-screen bg-green-400 relative mt-14 justify-center pt-10 ">
          <div className="flex flex-col absolute">
            <div className="flex gap-2 mb-10 justify-center">
              <button type="button" className="login_btn">
                Login
              </button>
              <button type="button" className="login_btn">
                Sign Up
              </button>
            </div>
            <div className="flex justify-between h-6 mb-10 mobile2:justify-between galaxy_fold:justify-start mobile2:gap-0 galaxy_fold:gap-2">
              <span className="font-semibold text-white">Currency:</span>
              <div className="currency_btn ">
                <button
                  className="font-bold "
                  type="button"
                  onClick={() => dispatch(currensyNames('USD'))}
                >
                  $
                </button>
              </div>
              <div className="currency_btn">
                <button
                  className="font-bold"
                  type="button"
                  onClick={() => dispatch(currensyNames('EUR'))}
                >
                  €
                </button>
              </div>
              <div className="currency_btn">
                <button
                  className="font-bold "
                  type="button"
                  onClick={() => dispatch(currensyNames('CAD'))}
                >
                  C$
                </button>
              </div>
            </div>
            <div className="flex gap-4 bg-gray-200 p-2 rounded-lg mobile2:p-2 galaxy_fold:p-0 mobile2:gap-4 galaxy_fold:gap-0">
              <div className="">Sorting: </div>
              <div className="sorting_btn">
                <button className="font-bold" type="button" onClick={() => sortByType('name')}>
                  Name <span className="">{sort.name ? '▼' : '▲'}</span>
                </button>
              </div>
              <div className="sorting_btn">
                <button className="font-bold" type="button" onClick={() => sortByType('price')}>
                  Price <span>{sort.price ? '▼' : '▲'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Headers
