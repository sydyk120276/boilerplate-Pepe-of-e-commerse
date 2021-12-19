const GET_RATES = '@cards/GET_RATES'
export const CURRENCY_NAME = '@cards/CURRENCY_NAME'
export const SORT_TYPE = '@cards/SORT_TYPE'

const initialState = {
  rates: { USD: 1 },
  currensyName: 'USD',
  sortType: 'name',
  sort: {
    name: true,
    price: true
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RATES: {
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
  return (dispatch) => {
    fetch('/api/v1/rates')
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: GET_RATES, payload: data })
      })
      .catch((err) => console.log(err))
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
