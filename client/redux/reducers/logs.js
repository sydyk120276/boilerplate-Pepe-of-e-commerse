export const LOG_ITEM = '@logs/LOG_ITEM'

const initialState = {
  logArray: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_ITEM:
      return {
        ...state,
        logArray: action.payload
      }
    default:
      return state
  }
}
