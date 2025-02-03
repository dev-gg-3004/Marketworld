import * as types from "../../utils/Actions";

export const getStockListStart = () => ({ 
    type: types.GET_STOCKS_LIST_START
})

export const getStocksListSuccess = (value) => ({
    type: types.GET_STOCKS_LIST_SUCCESS,
    payload: value,
})

export const getDisplayError = (error) => ({
    type: types.ERROR_MESSAGE,
    payload: error
})

export const addStockStart = (value) => ({ 
    type: types.ADD_STOCK_START,
    payload:value
})

export const addStockSuccess = (value) => ({
    type: types.ADD_STOCK_SUCCESS,
    payload: value,
})
export const updateStockStart = (index,value) => ({ 
    type: types.UPDATE_STOCK_START,
    meta:index,
    payload:value
})

export const updateStockSuccess = (value,metavalue) => ({
    type: types.UPDATE_STOCK_SUCCESS,
    payload: value,
    meta:metavalue
})
export const removeStockStart = (value,index) => ({ 
    type: types.REMOVE_STOCK_START,
    meta:index,
    payload:value
})

export const removeStockSuccess = (value,metavalue) => ({
    type: types.REMOVE_STOCK_SUCCESS,
    payload: value,
    meta:metavalue
})

export const getWatchListStart = () => ({ 
    type: types.GET_WATCH_LIST_START
})
  
export const getWatchListSuccess = (value) => ({
    type: types.GET_WATCH_LIST_SUCCESS,
    payload: value,
})