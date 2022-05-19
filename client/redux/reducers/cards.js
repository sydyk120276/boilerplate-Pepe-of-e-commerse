export const GET_GOODS = '@cards/GET_GOODS'
export const SET_CURRENT_PAGE = '@cards/SET_CURRENT_PAGE'
export const TOTAL_COUNT = '@cards/TOTAL_COUNT'
export const SER_IS_FETCHING = '@cards/TOTAL_COUNT'
export const GET_ITEM = '@cards/GET_ITEM'

const initialState = {
  list: {},
  currentPage: 1,
  perPage: 16,
  totalCount: 0,
  isFetching: true,
  item: {}
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
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.page
      }
    }
    case TOTAL_COUNT: {
      return {
        ...state,
        totalCount: action.totalCount
      }
    }
    case SER_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.bool
      }
    }
    case GET_ITEM: {
      return {
        ...state,
        item: action.payload
      }
    }
    default:
      return state
  }
}

export function getGoods(currentPage) {
  return (dispatch) => {
    fetch(`/api/v1/products/${currentPage}`)
      .then((res) => res.json())
      .then((result) => {
        dispatch({ type: GET_GOODS, payload: result.data })
      })
      .catch((err) => console.log(err))
  }
}

export function totalCountPages() {
  return (dispatch) => {
    fetch('/api/v1/totalCount')
      .then((res) => res.json())
      .then((result) => {
        dispatch({ type: TOTAL_COUNT, totalCount: result })
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

export function createPages(pages, totalCount, currentPage) {
  if (totalCount > 10) {
    if (currentPage > 8) {
      for (let i = currentPage - 4; i <= currentPage + 5; i += 1) {
        pages.push(i)
        if (i === totalCount) break
      }
    } else {
      for (let i = 1; i <= 10; i += 1) {
        pages.push(i)
        if (i === totalCount) break
      }
    }
  } else {
    for (let i = 1; i <= totalCount; i += 1) {
      pages.push(i)
    }
  }
}

export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, page })
export const setIsFetcheng = (bool) => ({ type: SER_IS_FETCHING, bool })
