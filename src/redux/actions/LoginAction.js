import * as types from '../../utils/Actions'
export const getMembersDataStart = () => ({ 
    type: types.GET_MEMBERDATAS_START,
  })
  
export const getMembersDataSuccess = (value) => ({
type: types.GET_MEMBERDATAS_SUCCESS,
payload: value,
})

export const getSingleMembersDataStart = (value) => ({ 

    type: types.GET_SINGLE_MEMBERDATAS_START,
    payload:value
})
export const setCounterValueArray = (value) => ({ 

    type: types.SET_COUNTERVALUE_START,
    payload:value
})
  
export const getSingleMembersDataSuccess = (value) => ({
type: types.GET_SINGLE_MEMBERDATAS_SUCCESS,
payload: value,
})

export const addMembersDataStart = (value) => ({ 
    type: types.ADD_MEMBERS_START,
    payload:value
})

export const addMembersDataSuccess = (value) => ({
    type: types.ADD_MEMBERS_SUCCESS,
    payload: value,
})

export const storeForgetPasswordMemberData=(value,index)=>({
    type:types.STORE_FORGET_MEMBERDATA,
    meta:index,
    payload:value
})

export const updateMemberDataStart=(value,index)=>({
    type:types.UPDATE_MEMBERDATA_START,
    meta:index,
    payload:value
})

export const updateMemberDataSuccess=(value,metavalue)=>({
    type:types.UPDATE_MEMBERDATA_SUCCESS,
    meta:metavalue,
    payload:value
})

// STORE USER DATA IN REDUX 
export const loginUserStart = (value) => ({ 
    type: types.LOGIN_USER_START,
    payload:value
})
  
export const loginUserSuccess = (value, loginObject) => ({
type: types.LOGIN_USER_SUCCESS,
payload: value,
meta:loginObject
})

export const loginUserError = (error) => ({
type: types.ERROR_MESSAGE,
payload: error
})

export function setValidUserFalse() {
    return(
    {
        type : types.SET_VALID_USER
    })
}