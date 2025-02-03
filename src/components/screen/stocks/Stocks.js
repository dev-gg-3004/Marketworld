import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, Modal, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { empty, isArrayNotNullUndefined, notNullUndefined } from '../../../utils/Validation';
import StockCard from '../../common/stockcard/StockCard'
import TouchableButton from '../../../components/common/TouchableButton/Index';
import  BottomSheet,{ BottomSheetScrollView } from '@gorhom/bottom-sheet';
import StockModalCard from '../../common/stockcard/StockModalCard'
import { debounce } from 'lodash';
import { getSession } from '../../../utils/Session';
import { updateMemberDataStart } from '../../../redux/actions/LoginAction';
export default function Stocks() {
    const {stockList, showLoader} = useSelector(state => state.adminReducers);
    const sheetRef= useRef(null);
    let dispatch =useDispatch();

    const [userData,setUserData]=useState({})

    const [isOpen,setIsOpen]=useState(false)
    const [data,setData]=useState({})
    const [titleID,setTitleId]=useState("All")
    const [stockData,setStockData]=useState([])
    const [searchValue,setSearchValue]=useState("")
    const [modalVisible, setModalVisible] = useState(false);
    const [watchListAddArray,setWatchListAddArray] =useState([])

    const watchList=[
       "All", "watchList 1","watchList 2","watchList 3","watchList 4"
    ]

    const snapPoints=['40','70'];
    
    useEffect(()=>{            /////calling user session
        getUserSession();
    },[])

    useEffect(()=>{              //////////  searching n filtering for ALl
        if(titleID==="All" && isArrayNotNullUndefined(stockList)){
           if(searchValue==="") return setStockData(stockList);
            
            let text=searchValue
            let tempupper = text.toUpperCase();

            let filterlist = stockList?.filter((value, i) => {
                let stockName = value.chartName.toUpperCase();
                return (stockName.includes(tempupper));
            });
            setStockData(filterlist);
        }

        else {
            if(!notNullUndefined(userData?.watchList)) return setStockData([])

            if(searchValue===""){
                let filterlist = userData?.watchList?.filter((value, i) => {
                    return (value.watchListKey===titleID);
                });
                setStockData(filterlist)
                return
            }

            let text=searchValue
            let tempupper = text.toUpperCase();

            let filterlist = userData?.watchList.filter((value, i) => {
                let stockName = value.chartName.toUpperCase();
                return (stockName.includes(tempupper) && value.watchListKey===titleID);
            });
            setStockData(filterlist);

        }

    },[titleID,stockList,searchValue,userData])

    async function getUserSession(){
        let session = await getSession()
          if(session){
            setUserData(session)
        }
    }

    function onChangeSearchbar(text){
        setSearchValue(text)
    }

    const debouncedResults = debounce((text) => {
        onChangeSearchbar(text)
    }, 500);

    const handleOnPressStock = useCallback((item,index) =>{
        setData(item)
        sheetRef.current?.snapToIndex(0)
        setIsOpen(true)
    },[])

    function onPressAddWatchlist(watchlistKey){
                
        let tempwatchlist=[...watchListAddArray];
        
        if(tempwatchlist.length===0){
           let temp=[...watchListAddArray,watchlistKey]
            setWatchListAddArray(temp)
            return
        }
        else{
            let tempIndex = tempwatchlist.indexOf(watchlistKey);
            if(tempIndex!==-1){
                tempwatchlist.splice(tempIndex,1)
                setWatchListAddArray(tempwatchlist)
                console.log("tempwatchlist",tempwatchlist);
              return
            }            
            let temp=[...watchListAddArray,watchlistKey]
            console.log("temp",temp);
            setWatchListAddArray(temp)
        }
    }

    function handleOnPressWatchlist(item) {
        setTitleId(item)
    }

    const renderWatchlistItem = ({ item }) => (
        <TouchableOpacity  onPress={()=>handleOnPressWatchlist(item)}>
            <Text style={titleID === item ? styles.watchlistChildTextColorChange : styles.watchlistChildText}>{item}</Text>
        </TouchableOpacity>
    );

    function renderHeader(){
        return(
            <View style={{alignItems:"center",marginBottom:30,backgroundColor:"#e6e6fa",height:40}}>
                <View style={{flexDirection:"row",alignItems:"center",width:"86%",borderWidth:1,borderColor:"lightgrey",borderRadius:5,position:"absolute",marginTop:15,backgroundColor:"white"}}>
                    <TouchableButton  buttonTitle="🔍" textStyle={{fontSize:22,marginLeft:15}} /> 
                    <TextInput placeholder='Search & add' style={{fontSize:20,marginLeft:15,width:"55%"}} onChangeText={text=>debouncedResults(text)}/>
                    <Text style={{color:"grey",fontSize:18,}}>25/50</Text>
                    <TouchableButton  buttonTitle="☵" textStyle={{fontSize:22,marginLeft:5,paddingLeft:10,color:"darkgrey"}} /> 
                </View>
            </View>
        )
    }

    function renderAddWatchListOption(){
        let temp=[...watchListAddArray]
        return watchList.map((watchlistKey,i)=>{
            let tempIndex=temp.indexOf(watchlistKey)
            return(
                <View key={i}>
                  { watchlistKey!=="All" &&  <TouchableOpacity  key={i} onPress={()=>onPressAddWatchlist(watchlistKey)} style={tempIndex!==-1?{...styles.addToWatchListOptionColor}:{...styles.addToWatchListOptionInitialColor}} >
                    {  <Text style={{...styles.watchlistChildText}}>Add to {watchlistKey}</Text>}
                    </TouchableOpacity>
                    }
                </View>
            )
        })
    }

    function renderequityStocks(){

        if(isArrayNotNullUndefined(stockData)){
            return(
                <View style={{flex:1}}>
                    <FlatList
                        data={stockData}
                        style={{opacity :isOpen ? 0.2 : 1, backgroundColor:isOpen ?"grey":"white"}}
                        keyExtractor={(item,index) => index}
                        // ListHeaderComponent={renderHeader()}    ///////////////////
                        onEndReached={()=>console.log("on End Reached")}
                        onEndReachedThreshold={0.5}
                        renderItem={({item,i})=>{
                            return(
                                <TouchableOpacity key={i} onPress={()=>handleOnPressStock(item)}>
                                    <StockCard  chartName={item.chartName} highPrice={item.highPrice}  values={item}
                                    onPressAddWatchlist={()=>{setModalVisible(true);setData(item)}} type={titleID} />
                                </TouchableOpacity>
                            )
                        }}
                    />
                    { isOpen && 
                        <BottomSheet
                            ref={sheetRef}
                            snapPoints={snapPoints}
                            enablePanDownToClose={true}
                            onClose={()=>setIsOpen(false)}
                            >
                                <BottomSheetScrollView >
                                    {renderStockCardModal()}
                                </BottomSheetScrollView>
                        </BottomSheet> 
                    }
                </View>
            )
        }

    }

    function renderStockCardModal(){

        if (!notNullUndefined(data)) return

        return(
            <StockModalCard
                dataItem={data}
            />
        )
    }

    function addToWatchListFinal(){
        setModalVisible(false);
        let temp=[...watchListAddArray] // only keys
        let newStockData={}
        tempArray=[]
        if(temp.length===0)  return 
        temp.map((value,i)=>{      //newArray is userWatchlist array
            newStockData = {...data,"watchListKey":value}   // 
            tempArray.push(newStockData)
        })
        let updateUserWatchListData=[...userData.watchList]
        for(let i=0; i<tempArray.length;i++){
            updateUserWatchListData.push(tempArray[i])
        }
        let newUserData={...userData,"watchList":updateUserWatchListData}
        setUserData(newUserData)
        dispatch(updateMemberDataStart(newUserData,0))
        setWatchListAddArray([])
    }

    return (
        <View style={{flex:1,backgroundColor:"white"}} >
            <StatusBar backgroundColor="#e6e6fa" />
            <View  style={{flexDirection:"row",paddingTop:10,backgroundColor:"#e6e6fa",height:50,paddingLeft:10}}>
            <FlatList
                data={watchList}
                horizontal
                renderItem={renderWatchlistItem}
                keyExtractor={(item,index) => index}
            />
            </View>
            <Modal animationType="slide" transparent={true} visible={modalVisible} 
            >
                <View style={{borderColor:"red",borderWidth:2,marginTop:"55%",backgroundColor:"skyblue",padding:"5%",width:"80%",marginLeft:"10%"}}>
                    <Text style={{color:"black",marginBottom:"4%",fontFamily:"Roboto-Bold",fontSize:20}}>Add to WatchList</Text>
                    {renderAddWatchListOption()}
                    
                    <View style={{flexDirection:"row",marginTop:"7%"}}>
                        <TouchableButton buttonTitle="Confirm" textStyle={styles.loginButton} touchableViewStyle={{...styles.loginViewButton,marginRight:"5%"}} onPress={()=>addToWatchListFinal()} />
                        <TouchableButton buttonTitle="Cancel" textStyle={styles.loginButton}  touchableViewStyle={{...styles.loginViewButton}}  onPress={()=>{setModalVisible(false);setWatchListAddArray([])}}  />
                    </View>

                </View>

            </Modal>
            {renderHeader()}
            {renderequityStocks()}

        </View>
    )
}


const styles=StyleSheet.create({
    watchlistChildText:{
        color:"black",
        fontSize:20,
        marginRight:30,
        fontFamily:"Roboto-Regular",
        textAlign:"center",
        
      },
      watchlistChildTextColorChange:{
        color:"blue",
        fontSize:20,
        marginRight:30,
        fontFamily:"Roboto-Regular",
        elevation:0.5,
        textAlign:"center"
      },
      loginButton: {
        color: 'white',
        fontFamily: 'Roboto-Medium',
        padding:"5%",
        textAlign: 'center',
        fontSize: 20,
      }, 
       loginViewButton: {
        width: '44%',
        alignSelf: 'center',
        borderRadius: 15,
        backgroundColor: '#1e90ff',
      },
      addToWatchListOptionColor:{
        backgroundColor: 'lightgreen',
        borderColor:"red",
        borderWidth:1,marginBottom:"4%"
      },
      addToWatchListOptionInitialColor:{
        // backgroundColor: '#1e90ff',
      

      }


})