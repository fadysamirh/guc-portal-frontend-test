export const tokenReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.payload
    case 'UNSET_TOKEN':
      return ''
    default:
      return state
  }
}

export const idReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_ID':
      return action.payload
    case 'UNSET_ID':
      return ''
    default:
      return state
  }
}

export const nameReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NAME':
      return action.payload
    case 'UNSET_NAME':
      return ''
    default:
      return state
  }
}

export const emailReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return action.payload
    case 'UNSET_EMAIL':
      return ''
    default:
      return state
  }
}

export const verifiedReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_VERIFIED':
      return action.payload
    case 'UNSET_VERIFIED':
      return ''
    default:
      return state
  }
}

export const accountTypeReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_ACCOUNT_TYPE':
      return action.payload
    case 'UNSET_ACCOUNT_TYPE':
      return ''
    default:
      return state
  }
}
