const GET_RATES = '@cards/GET_RATES'
const CHECK_RATE_DATE = '@cards/CHECK_RATE_DATE'
export const CURRENCY_NAME = '@cards/CURRENCY_NAME'
export const SORT_TYPE = '@cards/SORT_TYPE'

const initialState = {
  rates: { USD: 1 },
  currensyName: 'USD',
  sortType: 'name',
  sort: {
    name: true,
    price: true
  },
  rateDate: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RATES: {
      return {
        ...state,
        rates: action.payload
      }
    }
    case CHECK_RATE_DATE: {
      return {
        ...state,
        rateDate: action.payload
      }
    }
    case CURRENCY_NAME: {
      return {
        ...state,
        currensyName: action.payload
      }
    }
    case SORT_TYPE: {
      return {
        ...state,
        sort: action.payload.direction,
        sortType: action.payload.sortType
      }
    }
    default:
      return state
  }
}

export const getRates = () => {
  return (dispatch, getState) => {
    const { rateDate } = getState().rate
    const date = +new Date()
    if (rateDate + 1000 * 60 * 15 <= date) {
      fetch('/api/v1/rates')
        .then((obj) => obj.json())
        .then((rates) => dispatch({
          type: GET_RATES,
          payload: rates
        }))
      dispatch({
        type: CHECK_RATE_DATE,
        payload: date
      })
    }
  }
}

export const currensyNames = (value) => {
  return (dispatch, getState) => {
    const { currensyName } = getState().rate
    if (currensyName !== value) {
      dispatch({ type: CURRENCY_NAME, payload: value })
    }
  }
}

export function setSortToggle(sortType) {
  return (dispatch, getState) => {
    const { sort } = getState().rate
    dispatch({
      type: SORT_TYPE,
      payload: {
        direction: {
          ...sort,
          [sortType]: !sort[sortType]
        },
        sortType
      }
    })
  }
}
