import { combineReducers } from 'redux';
import userReducer from '../reducers/UserReducers';
import adminReducers from '../reducers/AdminReducers'

    const reducers= combineReducers({
        userReducer,
        adminReducers
    })

    function reducer(state, action){
        return reducers(state,action)
    }

export default reducer;