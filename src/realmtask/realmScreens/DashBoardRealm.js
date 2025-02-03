import { valueToPercent } from '@mui/base'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Button, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { isArrayNotNullUndefined } from '../../utils/Validation'
import { deleteNewsList, getAllNewsList } from '../schema/NewsSchema'
import { deleteStockList, getAllStockList } from '../schema/StockSchema'
import { deleteUserList, getAllUserList } from '../schema/UserSchema'

export default function DashBoardRealm() {

    const [type,setType]=useState('Add')
    const [realmData, setRealmData] = useState([]);
   
    const [showNewsData,setShowNewsData]=useState(false)
    const [showStockData,setShowStockData]=useState(false)
    const [showUserData,setShowUserData]=useState(false)
    const navigation =useNavigation()

    function handleOnPressButton(value,type){

        if(type==="News"){
            setShowNewsData(false);
            navigation.navigate('NewsScreen',{item:value})
        }

        if(type==="Stock"){
            setShowStockData(false);

            navigation.navigate('StockScreen',{item:value})
        }
        if(type==="UserData"){
          
            setShowUserData(false)
            navigation.navigate('UserAccountScreen',{item:value})
        }
    }

    useEffect(()=>{
        getDataFromRealm();
    },[type])

    async function getDataFromRealm() {
        let temp=[];
        if(type==="News"){
         temp = await getAllNewsList()}
        if(type==="UserData"){
         temp = await getAllUserList()}
        if(type==="Stock"){
         temp = await getAllStockList()
    }
        // console.log(temp);
        if (!isArrayNotNullUndefined(temp)) {
          setRealmData(temp);
        }
    }
    function handleOnPressDelete(data,type){

        if(type==="UserData"){

            deleteUserList(data);
            setType("UserData")
        }
        if(type==="News"){

            deleteNewsList(data)
            setType("News")
        }
        if(type==="Stock"){

            deleteStockList(data);
            setType("Stock")
        }
        getDataFromRealm()
    } 

    function handleOnClickShowNews(){
        setType('News')
        setShowNewsData(true)
        setShowStockData(false)
        setShowUserData(false)
    }
    function handleOnClickShowStock(){
        setType('Stock')
        setShowStockData(true)
        setShowNewsData(false)
        setShowUserData(false)
    }
    function handleOnClickShowUserData(){
        setType('UserData')
        setShowUserData(true)
        setShowNewsData(false)
        setShowStockData(false)
    }

    function renderUserData(){

        return realmData?.map((value,i)=>{

            return(
                <View key={i} style={{margin:10,borderWidth:1,borderColor:"blue",padding:10}}>
                    <Text style={{color:"black",fontSize:25,textAlign:"center",paddingBottom:20}}> User Data</Text>
                    <View style={{}}>

                        <View style={{flexDirection:"row",paddingBottom:15}}>

                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black",width:"35%"}}>User Name :</Text>
                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black"}}>{value.userName}</Text>

                        </View>

                        <View style={{flexDirection:"row",paddingBottom:15}}>

                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black",width:"35%"}}>Account No:</Text>
                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black"}}>{value.accountNo}</Text>

                        </View>

                        <View style={{flexDirection:"row",paddingBottom:15}}>

                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black",width:"35%"}}>Aadhar No:</Text>
                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black"}}>{value.aadharNo}</Text>

                        </View>

                        <View style={{flexDirection:"row",paddingBottom:15}}>

                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black",width:"35%"}}>Ifsc Code:</Text>
                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black"}}>{value.ifscCode}</Text>

                        </View>
                    
                        <View style={{flexDirection:"row",justifyContent:"space-between",padding:20}}>

                            <Button   title='Edit' onPress={()=>handleOnPressButton(value,"UserData")}/>
                            <Button   title='Delete' onPress={()=>handleOnPressDelete(value,'UserData')}/>

                        </View>
                    </View>

                </View>

            )
        })

    }
    function renderStocksData(){
        return realmData?.map((value,i)=>{

            return(
                <View key={i} style={{margin:10,borderWidth:1,borderColor:"blue",padding:10}}>
                    <Text style={{color:"black",fontSize:25,textAlign:"center",paddingBottom:20}}> Stocks</Text>
                    <View style={{}}>

                        <View style={{flexDirection:"row",paddingBottom:15}}>

                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black",width:"35%"}}>Stock Name :</Text>
                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black"}}>{value.stockName}</Text>

                        </View>

                        <View style={{flexDirection:"row",paddingBottom:15}}>

                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black",width:"35%"}}>Current Price:</Text>
                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black"}}>{value.currentPrice}</Text>

                        </View>

                        <View style={{flexDirection:"row",paddingBottom:15}}>

                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black",width:"35%"}}>Day High:</Text>
                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black"}}>{value.dayHigh}</Text>

                        </View>

                        <View style={{flexDirection:"row",paddingBottom:15}}>

                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black",width:"35%"}}>Day Low:</Text>
                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black"}}>{value.dayLow}</Text>

                        </View>
                    
                        <View style={{flexDirection:"row",justifyContent:"space-between",padding:20}}>

                            <Button   title='Edit' onPress={()=>handleOnPressButton(value,"Stock")}/>
                            <Button   title='Delete' onPress={()=>handleOnPressDelete(value,'Stock')}/>

                        </View>
                    </View>

                </View>

            )
        })
    }
    function renderNewsData(){
        return realmData?.map((value,i)=>{
        
            return(
                <View key={i} style={{margin:10,borderWidth:1,borderColor:"blue",padding:10}}>
                    <Text style={{color:"black",fontSize:25,textAlign:"center",paddingBottom:20}}> News</Text>
                    <View style={{}}>

                        <View style={{flexDirection:"row",paddingBottom:15}}>

                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black",width:"35%"}}>News-Title :</Text>
                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black"}}>{value.newsTitle}</Text>

                        </View>

                        <View style={{flexDirection:"row",paddingBottom:15}}>

                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black",width:"35%"}}>NewsContent:</Text>
                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black"}}>{value.newsContent}</Text>

                        </View>

                        <View style={{flexDirection:"row",paddingBottom:15}}>

                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black",width:"35%"}}>Source:</Text>
                        <Text  style={{fontFamily:"Roboto-Regular", fontSize:20,color:"black"}}>{value.source}</Text>

                        </View>
                    
                        <View style={{flexDirection:"row",justifyContent:"space-between",padding:20}}>

                            <Button   title='Edit' onPress={()=>handleOnPressButton(value,"News")}/>
                            <Button   title='Delete' onPress={()=>handleOnPressDelete(value,"News")}/>

                        </View>
                    </View>

                </View>

            )
        })
    }

    return (
        <ScrollView>
            <View style={{padding:20}}>
                <View style={{flexDirection:"row",justifyContent:'space-between',marginBottom:10}}>

                    <Button title='Add News' onPress={()=>navigation.navigate('NewsScreen')}/>
                    <Button title='Add Stock'   onPress={ ()=>navigation.navigate('StockScreen')}/>
                    <Button title='Add UserData' onPress={()=>navigation.navigate('UserAccountScreen')}/>
                </View>
           

                <View style={{marginBottom:10}}>
                    <Button title='show News'  onPress={()=>handleOnClickShowNews()}/>
                </View>
                <View style={{marginBottom:10}}>
                    <Button title='show Stock' onPress={()=>handleOnClickShowStock()}/>
                </View>
                <View style={{marginBottom:10}}>
                    <Button title='show User Data' onPress={()=>handleOnClickShowUserData()}/>
                </View>
            </View>

              
            {showNewsData &&  renderNewsData()}
            {showStockData && renderStocksData()}
            { showUserData && renderUserData()}
            
        </ScrollView>
    )
}
