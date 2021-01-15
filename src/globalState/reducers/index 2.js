import { combineReducers } from 'redux'
import {
  tokenReducer,
  idReducer,
  nameReducer,
  verifiedReducer,
  emailReducer,
  accountTypeReducer,
} from './LoginReducer'
import { sidebarReducer } from './SidebarReducer'

export const root = combineReducers({
  token: tokenReducer,
  id: idReducer,
  name: nameReducer,
  sidebar: sidebarReducer,
  verified: verifiedReducer,
  email: emailReducer,
  type: accountTypeReducer,
})
