import React, { useRef, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { checkRole, getSession } from '../../../utils/Session';
import addwatchlist from '../../../assests/images/addwatchlist.png'
export default function StockCard(props) {

    const [showEdit,setShowEdit]= useState(false);
    const [showBuyBlock,setShowBuyBlock]= useState(false);
    const[deletedData,setDeletedData]=useState([]);

    let userId=getSession.userid;
    let dispatch= useDispatch();
    // let stores=useSelector(reduxStoreData);
    let QuantityRef=useRef()

    // let getWatchListSession=getWatchList()
    // let location=useLocation();
    function handleOnClickThreeDot(){

        let data= (props.values) // object  in which you have to add
        data["userid"]=userId; 
        // createCheckWatchlist(data);

        return(   
            <View>
                <View >
                    <Text>{data.chartName}</Text>
                    { !checkRole() && <View  onClick={()=>{setShowBuyBlock(true)}}>Buy</View> }
                    { !checkRole() && <View >Sell</View> }
                    {/* { !checkRole() && !checkwatchListTrue(stores.watchList) && (location.pathname!=="/marketworld/watchlist") && <View className='forCursorPointer text-primary m-3' onClick={()=>{dispatch(addWatchList(data));setShowEdit(false)}}>Add to WatchList</View>} */}
                    {checkRole()  &&  <View onClick={props.handleOnClickUpdate}>Update</View> }
                    {checkRole() &&  <View  onClick={()=>{props.handleOnClickDelete();setShowEdit(false)}}>Delete</View> }
                    { !checkRole() && checkwatchListTrue(stores.watchList) &&  <View className='forCursorPointer text-primary m-3' onClick={props.handleOnClickRemove?(()=>{props.handleOnClickRemove();setShowEdit(false)}):()=>{handleOnClickRemove(data);dispatch(removeWatchList(data))}}>Remove from Watchlist</View>}
                    <View className='forCursorPointer text-primary m-3' onClick={()=>{setShowEdit(false)}}>cancel</View>
                </View>
            </View>
        )
    }
    
    return (
        <View style={{borderWidth:2,borderColor:"white",borderBottomColor:"lightgrey",height:70,justifyContent:"center",backgroundColor:"white",marginBottom:1}}>
            <View style={{flexDirection:"row"}}>
                <View style={{paddingLeft:10,width:"72%"}}>
                    <Text style={{fontSize:20,color:"black",fontFamily:"Roboto-Medium"}}>{props.chartName}</Text>
                    <Text style={{fontSize:14,color:"grey"}}>NSE</Text>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-between",width:"24%",paddingRight:"1%"}}>
                    <Text style={{fontSize:20,color:"green",}}>{props.highPrice}</Text>
                    {props.type==="All" &&  <TouchableOpacity style={{paddingTop:"0%"}}onPress={props.onPressAddWatchlist}><Image source={addwatchlist} style={{height:30,width:30,color:"blue"}} /></TouchableOpacity> }
                </View>
            </View>
            {/* {showEdit && handleOnClickThreeDot() }
            {showBuyBlock && renderOnClickBuy()} */}
        </View>
    )
}
