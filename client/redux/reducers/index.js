import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import cards from './cards'
import cart from './cart'
import rate from './rate'

const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    cards,
    cart,
    rate
  })
}

export default createRootReducer
