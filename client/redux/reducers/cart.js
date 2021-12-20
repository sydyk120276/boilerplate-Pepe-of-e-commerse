export const ADD_AMMOUNT = '@cart/ADD_AMMOUNT'
export const INCREMENT_ITEM = '@cart/INCREMENT_ITEM'
export const DECREMENT_ITEM = '@cart/DECREMENT_ITEM'
export const DELETE_ITEM = '@cart/DELETE_ITEM'
const TOTAL_VALUES = '@cart/TOTAL_VALUES'

const initialState = {
  list: {},
  totalAmount: 0,
  totalPrice: 0,
  ...JSON.parse(localStorage.getItem('cart'))
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
          ...action.payload.list
        }
      }
    }
    case DELETE_ITEM: {
      return {
        ...state,
        list: action.payload.list
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
    const product = getState().cart.list[id]
    const { amount } = list[id]
    const newAmount = amount + count
    if (count > 0) {
      dispatch({
        type: INCREMENT_ITEM,
        payload: {
          list: { [id]: { ...list[id], amount: newAmount } },
          product
        }
      })
    }
    if (count < 0) {
      dispatch({
        type: DECREMENT_ITEM,
        payload: { list: { [id]: { ...list[id], amount: newAmount } }, product }
      })
    }
    if (newAmount <= 0) {
      delete list[id]
      dispatch({
        type: DELETE_ITEM,
        payload: {
          list,
          product
        }
      })
    }
    dispatch({
      type: TOTAL_VALUES,
      payload: {
        totalAmount: totalAmount + count,
        totalPrice: totalPrice + product.price * count
      }
    })
  }
}

export const removeItem = (id) => {
  return (dispatch, getState) => {
    const { list, totalPrice, totalAmount } = getState().cart
    const product = getState().cart.list[id]
    const rmProductAmount = list[id].amount
    delete list[id]
    dispatch({
      type: DELETE_ITEM,
      payload: { list, product }
    })
    dispatch({
      type: TOTAL_VALUES,
      payload: {
        totalAmount: totalAmount - rmProductAmount,
        totalPrice: totalPrice - product.price * rmProductAmount
      }
    })
  }
}
