import {all, call, fork, put, takeEvery} from 'redux-saga/effects'
import * as types from '../utils/Actions'
import {dataByToken, loginUserApi, memberAddIntoAPI, memberDetailsApi, NewsApiData, singleMemberDetailsApi, stockAddIntoAPI, stockApiData, stockRemoveFromAPI, stockUpdateIntoAPI, UpdateMembersDataAPI, watchListApiData} from '../utils/BaseURL'
import { addMembersDataSuccess, getMembersDataSuccess, loginUserSuccess, updateMemberDataSuccess } from './actions/LoginAction';
import { getNewsListSuccess } from './actions/NewsActions';
import { addStockSuccess, getStocksListSuccess, getWatchListSuccess, removeStockSuccess, updateStockSuccess } from './actions/StockActions';
import { getDataUsingTokenSuccess } from './actions/TokenActions';


function* onStartAddMemberData(action){
    try{
        const response = yield call(memberAddIntoAPI,action.payload)
        if(response.status===201){
            yield put(addMembersDataSuccess(action.payload))
        }
    }
    catch (error) {
        console.log(error)
       yield alert('session Time Out Please Try Again')
    }
}

export  function* addMemberDetails() {
    yield takeEvery(types.ADD_MEMBERS_START, onStartAddMemberData);
}
function* onLoginGetUserStartAsync(action) {
    try{
        const response= yield call(loginUserApi,action.payload.userName)
        if(response.status===200){
            yield put(loginUserSuccess(response.data, action.payload))
        }
    }
    catch (error) {
    //    yield alert('session Time Out Please Try Again')
       console.log(error);
    }
}
export  function* onLoginUser() {
    yield takeEvery(types.LOGIN_USER_START, onLoginGetUserStartAsync);
}

function* onSignUpGetMemberDetailsStart() {
    try{
        const response= yield call(memberDetailsApi)
        if(response.status===200){
            yield put(getMembersDataSuccess(response.data))
        }
    }
    catch (error) {
       yield console.log('error')
    }
}
  
export  function* getMembersDetails() {
    yield takeEvery(types.GET_MEMBERDATAS_START, onSignUpGetMemberDetailsStart);
}

function* startUpdateMemmbersDetails(action){
    try{
        const response=yield  call(UpdateMembersDataAPI,action.payload)
        if(response.status===200){
            yield put(updateMemberDataSuccess(response.data,action.meta))
        }
    }
    catch (error) {
        yield console.log(error);
    }
}

export function* updateMembersDetails(){
    yield takeEvery(types.UPDATE_MEMBERDATA_START,startUpdateMemmbersDetails)
}

function* getSingleMemberDetailsStart(action) {
    try{
        const response= yield call(singleMemberDetailsApi,action.payload)
        if(response.status===200){
            yield put(getSingleMembersDataSuccess(response.data))
        }
    }
    catch (error) {
       yield alert('session Time Out Please Try Again')
    }
}

export  function* getSingleMembersDetails() {
    yield takeEvery(types.GET_SINGLE_MEMBERDATAS_START, getSingleMemberDetailsStart);
}

function* onStartGetNewsDataAsync(){
    try{
        const response= yield call(NewsApiData)
        if(response.status===200){
            yield put(getNewsListSuccess(response.data.articles))
        }
    }
    catch (error) {
       yield alert('session Time Out Please Try Again')
    }
}

export function* getNewsData(){
    yield takeEvery (types.GET_NEWS_lIST_START,onStartGetNewsDataAsync);
}

function* onStartGetStocksDataAsync(){
    try{
        const response = yield call(stockApiData)
        if(response.status===200){
            console.log("get stock data response===>",response);
            yield put(getStocksListSuccess(response.data))
        }
    }
    catch (error) {
        console.log(error)
       yield alert('session Time Out Please Try Again')
    }
}

export function * getStocksData(){
    yield takeEvery(types.GET_STOCKS_LIST_START,onStartGetStocksDataAsync);
}


function* onStartAddStocksDataAsync(action){
    try{
        const response = yield call(stockAddIntoAPI,action.payload)
        if(response.status===201){
            yield put(addStockSuccess(action.payload))
        }
    }
    catch (error) {
        console.log(error)
       yield alert('session Time Out Please Try Again')
    }
}

export function * addStocksData(){
    yield takeEvery(types.ADD_STOCK_START,onStartAddStocksDataAsync);
}

function* onStartUpdateStocksDataAsync(action){
    try{
        const response = yield call(stockUpdateIntoAPI,action.payload)
        if(response.status===200){
            yield put(updateStockSuccess(action.payload,action.meta))
        }
    }
    catch (error) {
        console.log(error)
       yield alert('session Time Out Please Try Again')
    }
}

export function * updateStocksData(){
    yield takeEvery(types.UPDATE_STOCK_START,onStartUpdateStocksDataAsync);
}


function* onStartRemoveStocksDataAsync(action){
    try{
        console.log(action.payload);
        console.log(action.meta);
        const response = yield call(stockRemoveFromAPI,action.payload)
        if(response.status===200){
            yield put(removeStockSuccess(action.payload,action.meta))
        }
    }
    catch (error) {
        console.log(error)
       yield alert('session Time Out Please Try Again')
    }
}

export function * removeStocksData(){
    yield takeEvery(types.REMOVE_STOCK_START,onStartRemoveStocksDataAsync);
}

function* onStartGetWatchListData(){
    try{
        const response = yield call(watchListApiData)
        if(response.status===200){
            yield put(getWatchListSuccess(response.data))
        }
    }
    catch (error) {
        console.log(error)
       yield alert('session Time Out Please Try Again')
    }
}

export function * getWatchListData(){
    yield takeEvery(types.GET_WATCH_LIST_START,onStartGetWatchListData);
}
function* onStartGetTokenData(action){
    try{
        const response = yield call(dataByToken,action.payload)
        console.log("response",response.data.records);
        if(response.status===200){
            yield put(getDataUsingTokenSuccess(response.data.records))
        }
    }
    catch (error) {
        console.log(error)
    }
}

export function * getDataByToken(){
    yield takeEvery(types.GET_DATABY_TOKEN_START,onStartGetTokenData);
}


const marketSagas=[
    fork(onLoginUser),
    fork(getMembersDetails),
    fork(addMemberDetails),
    fork(updateMembersDetails),
    fork(getNewsData),
    fork(getStocksData),
    fork(addStocksData),
    fork(updateStocksData),
    fork(removeStocksData),
    fork(getWatchListData),
    fork(getDataByToken),

]

export default function* rootSaga() {
    yield all([...marketSagas]);
}