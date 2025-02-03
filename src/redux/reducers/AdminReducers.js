import * as actions from '../../utils/Actions'
import { createSession, getSession } from '../../utils/Session';

let initialList={
    stockList:[],
    newsList:[],
    members:[],
    showLoginErrorMessage:{},
    forgetMemberData:{},
    singleMemberData:null,
    activeMember:getSession(),
    showLoader:false,
    validUser:false,
    tokenData:[],
    
    kinData:[],
    counterValueArray:[],
    locationTitles:[]
}

export default function adminReducers(state=initialList,action){

    switch(action.type){

        case actions.SET_COUNTERVALUE_START:
            let temp=action.payload;
            let tempArray=[...state.counterValueArray,temp]
            console.log("tempArray",tempArray);
            return {
                ...state,
             counterValueArray:tempArray
            }
        case actions.DELETE_LOCATION_TITLE_START :
            let Array=[...state.locationTitles]
            let Index=action.meta
            Array.splice(Index,1)
            return {
                ...state,
                locationTitles:Array
            }
        case actions.ADD_LOCATION_TITLE_START :
            let temptext=action.payload;
            let tempLocationArray=[...state.locationTitles,temptext]
            return{
                ...state,
                locationTitles:tempLocationArray
            }
        case actions.ADD_KIN_START :
            let tempData=action.payload;
            let tempArrayData=[...state.kinData,tempData]
            return {
                ...state,
                kinData:tempArrayData
            }
        case actions.DELETE_KIN_START :
            let kinArray=[...state.kinData]
            console.log(action.meta);
            let tempIndex=action.meta
            kinArray.splice(tempIndex,1)
            console.log("kinArray",kinArray);
            return {
                ...state,
                kinData:kinArray
            }

        case actions.ADD_MEMBERS_SUCCESS:
            let addMember =[...state.members];
            addMember.push(action.payload);
            return{
                ...state,
                members:addMember
            }

        case actions.GET_MEMBERDATAS_SUCCESS:
            return{
                ...state,
                members: action.payload,
                showLoader:false
            }
        case actions.STORE_FORGET_MEMBERDATA:
            let forgetData=action.payload
            let index=action.meta
            let data={...state.forgetMemberData,forgetData,index}
            return{
                ...state,
                forgetMemberData:data
            }
        
        case actions.UPDATE_MEMBERDATA_SUCCESS:
            let updateDetails=[...state.members];
            updateDetails.splice(action.meta,1,action.payload);
            createSession(action.payload)
            return{
                ...state,
                members:updateDetails
            }

        case actions.GET_SINGLE_MEMBERDATAS_SUCCESS:

            return{
                ...state,
                singleMemberData:action.payload,
            }
      
        case actions.LOGIN_USER_SUCCESS:
            
            if(action.payload.length===0){
                let AccountNotExist="Account Does not Exists Check UserName"
                let temp={...state.showLoginErrorMessage,AccountNotExist}
                alert("Account Does not Exists Check UserName")
             return {
                ...state,
                // showLoginErrorMessage:temp
             }
            }
            let tempdata=action.payload[0]
            if(tempdata.userName!==action.meta.userName){
                let temp={InvalidUserID:"Invalid user'id "}
                return{
                    ...state,
                    showLoginErrorMessage:temp
                }
            }
            if(tempdata.password!==action.meta.password){
                let temp={InvalidPassword:"Invalid Password"}
                // alert("Invalid Password ")
                return{
                    ...state,
                    showLoginErrorMessage:temp
                }
            }
            createSession(tempdata)
            return {
                ...state,
                validUser:true,
                activeMember:tempdata,
                showLoader:false
            }
   
        case actions.SET_VALID_USER:
            return{
                ...state,
                validUser:false
            }
        
        case actions.ERROR_MESSAGE:
        alert("Please Try Again")
        return{
            ...state,
            showLoader:false
            }

        case actions.GET_NEWS_lIST_START: 
            return{
                ...state,
                // showLoader:true
            }

        case actions.GET_NEWS_lIST_SUCCESS:
            return{
                ...state,
                newsList: action.payload,
                // showLoader:false
            }

        case actions.GET_STOCKS_LIST_START :
            return{
                ...state,
                showLoader:true
            }
        
        case actions.GET_STOCKS_LIST_SUCCESS: 
            return{
                ...state,
                stockList: action.payload,
                showLoader:false
            }
        case actions.ADD_STOCK_SUCCESS:
            console.log(action.payload);
            let addStocks=[...state.stockList];
            addStocks.push(action.payload);  
            alert("Stock added SucessFully")

            return{
                ...state,
                stockList: addStocks

            }

        case actions.UPDATE_STOCK_SUCCESS:
        let updateStocks=[...state.stockList];
        updateStocks.splice(action.meta,1,action.payload);
        alert('stocks updated  successfully')
        return {...state,
            stockList:updateStocks
            }

        case actions.REMOVE_STOCK_SUCCESS: 
        let removeStocks =[...state.stockList];
        removeStocks.splice(action.meta ,1);
        alert("stocks Deleted Successfully")
        return{
            ...state,
            stockList:removeStocks
            }
        case actions.GET_DATABY_TOKEN_SUCCESS:
            return{
                ...state,
                tokenData: action.payload,
            }

        
        default : return {...state} 

    }
}