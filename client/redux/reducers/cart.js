const ADD_AMMOUNT = '@cart/ADD_AMMOUNT'
const INCREMENT_ITEM = '@cart/INCREMENT_ITEM'
const DECREMENT_ITEM = '@cart/DECREMENT_ITEM'
const DELETE_ITEM = '@cart/DELETE_ITEM'
const TOTAL_VALUES = '@cart/TOTAL_VALUES'

const initialState = {
  list: {},
  totalAmount: 0,
  totalPrice: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_AMMOUNT: {
      return {
        ...state,
        list: action.payload.list,
        totalAmount: state.totalAmount + 1,
        totalPrice: state.totalPrice + action.payload.price
      }
    }
    case INCREMENT_ITEM:
    case DECREMENT_ITEM: {
      return {
        ...state,
        list: {
          ...state.list,
          ...action.payload
        }
      }
    }
    case DELETE_ITEM: {
      return {
        ...state,
        list: action.payload
      }
    }
    case TOTAL_VALUES: {
      return {
        ...state,
        totalPrice: action.payload.totalPrice,
        totalAmount: action.payload.totalAmount
      }
    }

    default:
      return state
  }
}

export const addAmmount = (id) => {
  return (dispatch, getState) => {
    const { list } = getState().cart
    const product = getState().cards.list[id]
    const itemAmount = typeof list[id] === 'undefined' ? 1 : list[id].amount + 1
    dispatch({
      type: ADD_AMMOUNT,
      payload: {
        list: {
          ...list,
          [id]: { ...product, amount: itemAmount }
        },
        price: product.price,
        product
      }
    })
  }
}

export const changeItem = (id, count) => {
  return (dispatch, getState) => {
    const { list, totalPrice, totalAmount } = getState().cart
    const { price } = getState().cart.list[id]
    const { amount } = list[id]
    const newAmount = amount + count
    if (count > 0) {
      dispatch({ type: INCREMENT_ITEM, payload: { [id]: { ...list[id], amount: newAmount } } })
    }
    if (count < 0) {
      dispatch({
        type: DECREMENT_ITEM,
        payload: { [id]: { ...list[id], amount: newAmount } }
      })
    }
    if (newAmount <= 0) {
      delete list[id]
      dispatch({
        type: DELETE_ITEM,
        payload: list
      })
    }
    dispatch({
      type: TOTAL_VALUES,
      payload: {
        totalAmount: totalAmount + count,
        totalPrice: totalPrice + price * count
      }
    })
  }
}

export const removeItem = (id) => {
  return (dispatch, getState) => {
    const { list, totalPrice, totalAmount } = getState().cart
    const { price } = getState().cart.list[id]
    const rmProductAmount = list[id].amount
    delete list[id]
    dispatch({
      type: DELETE_ITEM,
      payload: list
    })
    dispatch({
      type: TOTAL_VALUES,
      payload: {
        totalAmount: totalAmount - rmProductAmount,
        totalPrice: totalPrice - price * rmProductAmount
      }
    })
  }
}
