import * as types  from "../../utils/Actions";

export const getNewsListStart = () => ({ 
    type: types.GET_NEWS_lIST_START
})

export const getNewsListSuccess = (value) => ({
    type: types.GET_NEWS_lIST_SUCCESS,
    payload: value,
})

export const getNewsListError = (error) => ({
    type: types.ERROR_MESSAGE,
    payload: error
})
