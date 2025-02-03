import * as types from '../../utils/Actions'

export const getDataUsingTokenStart = (value) => ({ 
    type: types.GET_DATABY_TOKEN_START,
    payload:value
})

export const getDataUsingTokenSuccess = (value) => ({
    type: types.GET_DATABY_TOKEN_SUCCESS,
    payload: value,
})