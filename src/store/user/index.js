import { Map } from 'immutable'

/* ------------types------------- */
export const SET_USER_INFO = 'SET_USER_INFO'
export const CLEAR_USER_INFO = 'CLEAR_USER_INFO'

/* ------------actions------------- */
export const setUserInfo = userInfo => (
  { type: SET_USER_INFO, userInfo }
)

export const clearUserInfo = () => (
  { type: CLEAR_USER_INFO }
)

/* ------------reducer------------- */
const defaultState = Map({
  token: null,
  roles: [],
  username: ''
})

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return state.set('token', action.userInfo.token).set('roles', action.userInfo.roles).set('username', action.userInfo.username)

    case CLEAR_USER_INFO:
      return state.set('token', null)

    default:
      return state
  }
}
