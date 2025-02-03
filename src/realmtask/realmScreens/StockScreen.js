import { useNavigation, useRoute } from '@react-navigation/native'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { empty, isArrayNotNullUndefined } from '../../utils/Validation'
import { createStockList, getAllStockList, updateStockList } from '../schema/StockSchema'

export default function StockScreen(props) {

    const [stockData,setStockData] =useState({_id:0,stockName:"",currentPrice:0,dayHigh:0,dayLow:0})
    const [showAddButton,setShowAddButton]=useState(true)
    const [realmData, setRealmData] = useState([]);

    const route=useRoute()
    const navigation=useNavigation()
    
    useEffect(()=>{
        getDataFromRealm()
        if(route.params?.item){
            setShowAddButton(false)
            let temp=JSON.parse(JSON.stringify(route.params.item))

            let currentPrice=temp.currentPrice.toString()
            let dayHigh=temp.dayHigh.toString()
            let dayLow=temp.dayLow.toString()

            let tempData={...temp,"currentPrice":currentPrice,"dayHigh":dayHigh,"dayLow":dayLow}
           
            setStockData(tempData)
           
        }
    },[])

    async function getDataFromRealm() {
        let temp = await getAllStockList();
        if (!isArrayNotNullUndefined(temp)) {
            setRealmData(temp)
        }
    }
    
    function onChangeFields(text, name) {
        let temp = _.cloneDeep(stockData);
        // let temp=JSON.parse(JSON.stringify(newsData))
        temp[name] =text;
        // console.log("temp onChangeFields==>",temp);
        setStockData(temp);
    }

    function handleOnPressButton(type){
        if(empty(stockData.stockName) || empty(stockData.currentPrice) || empty(stockData.dayHigh)|| empty(stockData.dayLow)){
            Alert.alert('please Enter Valid Details')
            return
        }

        if(type==="Add"){
            let currentPrice=parseInt(stockData.currentPrice)
            let dayHigh=parseInt(stockData.dayHigh)
            let dayLow=parseInt(stockData.dayLow)
            let tempArray=realmData.slice(-1);
            let _id=0;
            if(tempArray.length>0){

              _id=tempArray[0]._id+1
            }
            
            let tempData={...stockData,"currentPrice":currentPrice,"dayHigh":dayHigh,"dayLow":dayLow,"_id":_id}
            console.log("tempStockData :===>",tempData)
            createStockList(tempData)
            navigation.navigate('DashBoardRealm',{item:"change"})
            setStockData({_id:0,stockName:"",currentPrice:0,dayHigh:0,dayLow:0})
        }
        if(type==="Update"){
            let currentPrice=parseInt(stockData.currentPrice)
            let dayHigh=parseInt(stockData.dayHigh)
            let dayLow=parseInt(stockData.dayLow)
            
            let tempData={...stockData,"currentPrice":currentPrice,"dayHigh":dayHigh,"dayLow":dayLow}
            console.log("tempStockData :===>",tempData)
            updateStockList(tempData)
            navigation.navigate('DashBoardRealm',{item:"change"})
            setStockData({_id:0,stockName:"",currentPrice:0,dayHigh:0,dayLow:0})

        }


    }


    return (
        <View style={{margin:20,flex:1}}>
            {!props.update &&  <Text style={style.titleStyle}>Add Stock Details</Text>}
           {props.update &&  <Text style={style.titleStyle}>Update Stock Details</Text>}
            <View style={{ marginTop:15,flexDirection:"row",alignItems:"center"}}>
                <Text style={{width:"30%",fontSize:22,color:"black"}}>Stock Title:</Text>
                <TextInput
                    placeholder="Enter Name"
                    style={style.userNameInputStyle}
                    value={stockData.stockName}
                    onChangeText={(text)=> onChangeFields(text,'stockName')}
                    placeholderTextColor="grey"
                />
            </View>
        
            <View style={{ marginTop:15,flexDirection:"row",alignItems:"center"}}>
                <Text style={{width:"30%",fontSize:22,color:"black"}}>current Rs:</Text>
                <TextInput
                    placeholder="Enter Current Price"
                    style={style.userNameInputStyle}
                    value={stockData.currentPrice}
                    keyboardType='numeric'
                    onChangeText={(text)=> onChangeFields(text,'currentPrice')}
                    placeholderTextColor="grey"
                />
            </View>
        
            <View style={{ marginTop:15,flexDirection:"row",alignItems:"center"}}>
                <Text style={{width:"30%",fontSize:22,color:"black"}}>Day High:</Text>
                <TextInput
                    placeholder="Enter Day High Price"
                    style={style.userNameInputStyle}
                    value={stockData.dayHigh}
                    keyboardType='numeric'
                    onChangeText={(text)=> onChangeFields(text,'dayHigh')}
                    placeholderTextColor="grey"
                />
            </View>

            <View style={{ marginTop:15,flexDirection:"row",alignItems:"center"}}>
                <Text style={{width:"30%",fontSize:22,color:"black"}}>Day Low:</Text>
                <TextInput
                    placeholder="Enter Day Low Price"
                    style={style.userNameInputStyle}
                    keyboardType='numeric'
                    value={stockData.dayLow}
                    onChangeText={(text)=> onChangeFields(text,'dayLow')}
                    placeholderTextColor="grey"
                />
            </View>

            {showAddButton &&  <View style={{marginTop:20}}>
                <Button title='Add Stock' onPress={()=>handleOnPressButton('Add')} />
            </View>}
            {!showAddButton &&  <View style={{marginTop:20}}>
                <Button title='Update Stock' onPress={()=>handleOnPressButton('Update')} />
            </View>}
           
        
        </View>
    )
}


const style=StyleSheet.create({
    titleStyle:{
        color:"black",
        fontSize:25,
        fontFamily:"Roboto-Medium"
    },
    userNameInputStyle:{
        fontSize: 20,
        width:"70%",
        color:"grey",
        borderColor:"white",
        borderWidth:1,
        borderBottomColor:"black"
    }
})