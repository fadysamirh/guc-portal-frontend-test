export const sidebarReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SIDEBAR':
      return action.payload
    case 'UNSET_SIDEBAR':
      return ''
    default:
      return state
  }
}
