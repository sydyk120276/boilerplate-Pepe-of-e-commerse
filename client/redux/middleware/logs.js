import { CURRENCY_NAME, SORT_TYPE } from '../reducers/rate'
import { LOG_ITEM } from '../reducers/logs'
import {
  ADD_AMMOUNT,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  DELETE_ITEM
} from '../reducers/cart'

const Logs = () => {
  return (store) => {
    const { dispatch, getState } = store
    return (next) => {
      return (action) => {
        const formateDate = () => {
          const data = new Date().toISOString()
          return `${data.slice(0, 10)} ${data.slice(11, 19)}`
        }
        const toServerLog = (text) => {
          const data = +new Date()
          fetch('/api/v1/logs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: data,
              string: text
            })
          })
            .then((r) => r.json())
            .then((list) => {
              console.log('list', list)
              dispatch({ type: LOG_ITEM, payload: list })
            })
            .catch((err) => {
              console.log(err)
            })
        }
        switch (action.type) {
          case CURRENCY_NAME: {
            const { currensyName } = getState().rate
            const newCurrency = action.payload
            toServerLog(`${formateDate()}: change currency from ${currensyName} to ${newCurrency}`)
            break
          }
          case ADD_AMMOUNT:
          case INCREMENT_ITEM: {
            const item = action.payload.product
            toServerLog(`${formateDate()}: add ${item.title} to the backet`)
            break
          }
          case DELETE_ITEM:
          case DECREMENT_ITEM: {
            const item = action.payload.product
            toServerLog(`${formateDate()}: add ${item.title} to the backet`)
            break
          }
          case '@@router/LOCATION_CHANGE': {
            const url = action.payload.location.pathname
            const logString = `${formateDate()}: navigate to ${url} page`
            toServerLog(logString)
            break
          }
          case SORT_TYPE: {
            const { sortType, direction } = action.payload
            const logString = `${formateDate()}: sort by ${sortType} - ${
              direction[sortType] ? 'a-z' : 'z-a'
            }`
            toServerLog(logString)
            break
          }
          default:
            return next(action)
        }
        return next(action)
      }
    }
  }
}

export default Logs()
