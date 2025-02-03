import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { empty, isArrayNotNullUndefined, notNullUndefined } from '../../../../utils/Validation';
import  BottomSheet,{ BottomSheetScrollView } from '@gorhom/bottom-sheet';
import StockCard from '../../../common/stockcard/StockCard';
import StockModalCard from '../../../common/stockcard/StockModalCard';

export default function All(props) {

    const [userData,setUserData]=useState({})
    const [isOpen,setIsOpen]=useState(false)
    const [stockData,setStockData]=useState([])
    const [searchValue,setSearchValue]=useState("")
    const [modalVisible, setModalVisible] = useState(false);
    const [data,setData]=useState({})
    const [watchListAddArray,setWatchListAddArray] =useState([])

    const {stockList, showLoader} = useSelector(state => state.adminReducers);
    const sheetRef= useRef(null);
    let dispatch =useDispatch();

    const snapPoints=['40','70'];

    useEffect(()=>{  /////////  searching n filtering for ALl
        if(!empty(props.searchValue)) setSearchValue(props.searchValue)

        if( isArrayNotNullUndefined(stockList)){
            let length=stockList.length
            props.stockListLength(length)
           
           if(searchValue==="") return setStockData(stockList);
            
            let text=searchValue
            let tempupper = text.toUpperCase();

            let filterlist = stockList?.filter((value, i) => {
                let stockName = value.chartName.toUpperCase();
                return (stockName.includes(tempupper));
            });
            setStockData(filterlist);
        }
    },[props.searchValue,searchValue])
    

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
                                    onPressAddWatchlist={()=>{setModalVisible(true);setData(item)}} type={'All'} />
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
    function renderStockCardModal(){

        if (!notNullUndefined(data)) return

        return(
            <StockModalCard
                dataItem={data}
            />
        )
    }
    

    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            {props.renderHeader}
        {renderequityStocks()}
        </View>
    )
}
