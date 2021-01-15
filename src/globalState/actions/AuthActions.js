import axios from 'axios'
import jwt from 'jsonwebtoken'
import { backendLink } from '../../keys_dev'
export const loginAPI = (email, password, history, handleAlert) => {
  return async (dispatch, getState) => {
    return await axios({
      method: 'post',
      url: `${backendLink}/account/login`,
      data: {
        Account: { email, password },
      },
    }).then((res) => {
      console.log(res)
      if (res.data.statusCode === 0) {
        dispatch(setToken(res.data.token))
        dispatch(setID(res.data.id))
        dispatch(setName(res.data.username))
        dispatch(setAccountType(res.data.type))
        history.push('/home')
        return 0
      } else {
        if (res.data.statusCode === 104) {
          dispatch(unsetToken())
          return 104
        }
        return res.data.statusCode
      }
    })
  }
}
export const loginFirstAPI = (
  email,
  password,
  newPassword,
  history,
  handleAlert
) => {
  return async (dispatch, getState) => {
    return await axios({
      method: 'post',
      url: `${backendLink}/account/firstLogin`,
      data: {
        Account: { email, password },
        newPassword,
      },
    }).then((res) => {
      console.log(res)
      if (res.data.statusCode === 0) {
        dispatch(setToken(res.data.token))
        dispatch(setID(res.data.id))
        dispatch(setName(res.data.username))
        dispatch(setAccountType(res.data.type))
        //dispatch(setAccountMemType(res.data.Memtype))

        history.go(0)

        return { code: 0 }
      } else {
        if (res.data.statusCode === 104) {
          dispatch(unsetToken())
          return { code: 104, error: res.data.error }
        }
        return { code: res.data.statusCode, error: res.data.error }
      }
    })
  }
}

export const resetToken = (token) => {
  return async (dispatch, getState) => {
    return await axios({
      method: 'post',
      url: `${backendLink}/tbhapp/accounts/resendToken`,
      data: {
        Account: {
          id: getState().id,
        },
        token,
      },
      headers: {
        authorization: getState().token,
      },
    }).then((res) => {
      console.log(res)
      if (res.data.statusCode === 0) {
        dispatch(setToken(res.data.token))
        dispatch(setID(res.data.id))
        dispatch(setName(res.data.username))
        dispatch(setVerified(res.data.state))
        return 0
      }
    })
  }
}

export const checkTokenExpired = (history) => {
  return function (dispatch, getState) {
    const token = getState().token
    if (token === '' || token === null || token === undefined) {
      dispatch(logout(history))
      return true
    }
    if (jwt.decode(token).exp < Date.now() / 1000) {
      dispatch(logout(history))
      return true
    } else {
      return false
    }
  }
}

export const changeVerified = (verified) => {
  return function (dispatch) {
    dispatch(setVerified(verified))
  }
}

export const openSidebar = () => {
  return function (dispatch) {
    dispatch(setOpenSidebar(true))
  }
}
export const closeSidebar = () => {
  return function (dispatch, getState) {
    dispatch(closeSidebar())
  }
}

const setToken = (payload) => {
  return {
    type: 'SET_TOKEN',
    payload,
  }
}

const unsetToken = () => {
  return {
    type: 'UNSET_TOKEN',
    payload: '',
  }
}

const setVerified = (payload) => {
  return {
    type: 'SET_VERIFIED',
    payload,
  }
}

const unsetVerified = (payload) => {
  return {
    type: 'UNSET_VERIFIED',
    payload,
  }
}

const setName = (payload) => {
  return {
    type: 'SET_NAME',
    payload,
  }
}

const unsetName = () => {
  return {
    type: 'UNSET_NAME',
    payload: '',
  }
}

export const setEmailRedux = (payload) => {
  return {
    type: 'SET_EMAIL',
    payload,
  }
}

export const unsetEmailRedux = () => {
  return {
    type: 'UNSET_EMAIL',
    payload: '',
  }
}

const setID = (payload) => {
  return {
    type: 'SET_ID',
    payload,
  }
}

const unsetID = (payload) => {
  return {
    type: 'UNSET_ID',
    payload,
  }
}

const setOpenSidebar = (payload) => {
  return {
    type: 'SET_SIDEBAR',
    payload,
  }
}

const unsetOpenSidebar = (payload) => {
  return {
    type: 'UNSET_SIDEBAR',
    payload,
  }
}

const setAccountType = (payload) => {
  return {
    type: 'SET_ACCOUNT_TYPE',
    payload,
  }
}
const unsetAccountType = (payload) => {
  return {
    type: 'UNSET_ACCOUNT_TYPE',
    payload,
  }
}

export const logout = (history) => {
  return (dispatch, getState) => {
    dispatch(unsetToken(''))
    dispatch(unsetID(''))
    dispatch(unsetName())
    dispatch(unsetAccountType(''))

    history.push('/home')
  }
}
