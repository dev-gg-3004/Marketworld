import { configureStore } from "@reduxjs/toolkit";
import reducers from "../redux/reducers";
import rootSaga from '../redux/Saga';
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware= createSagaMiddleware()

const Store =configureStore({
    reducer: reducers,
    preloadedState:{},
    middleware:()=>[sagaMiddleware]
})
sagaMiddleware.run(rootSaga)

export default Store;