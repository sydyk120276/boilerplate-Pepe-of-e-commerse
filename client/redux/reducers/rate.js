const GET_RATES = '@cards/GET_RATES'
const DATE_CHEK = '@cards/DATE_CHEK'
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
    case DATE_CHEK: {
      return {
        ...state,
        rates: action.payload
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

export function getRates() {
  return (dispatch, getState) => {
    const { rateData } = getState().rate
    const data = +new Date()
    if ((rateData + 1000 * 60 * 15) <= data) {
      fetch('/api/v1/rates')
        .then((res) => res.json())
        .then((rat) => {
          dispatch({ type: GET_RATES, payload: rat })
        })
      dispatch({ type: DATE_CHEK, payload: data })
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
