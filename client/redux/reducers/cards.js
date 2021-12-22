export const GET_GOODS = '@cards/GET_GOODS'

const initialState = {
  list: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GOODS: {
      return {
        ...state,
        list: action.payload.reduce((acc, rec) => {
          acc[rec.id] = {
            ...rec,
            image: `https://source.unsplash.com/800x600/?${/\w+(?=\s)/gi.exec(rec.title)}`
          }
          return acc
        }, {})
      }
    }
    default:
      return state
  }
}

export function getGoods() {
  return (dispatch) => {
    fetch('/api/v1/products')
      .then((res) => res.json())
      .then((result) => {
        dispatch({ type: GET_GOODS, payload: result })
      })
      .catch((err) => console.log(err))
  }
}

export function sortProducts(sortType, direction) {
  return (dispatch) => {
    fetch('/api/v1/sort', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sortType, direction })
    })
      .then((result) => result.json())
      .then((sortArray) => {
        dispatch({ type: GET_GOODS, payload: sortArray })
      })
      .catch((err) => console.log(err))
  }
}
