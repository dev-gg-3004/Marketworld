import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { empty, isArrayNotNullUndefined, notNullUndefined } from '../../../../utils/Validation';
import  BottomSheet,{ BottomSheetScrollView } from '@gorhom/bottom-sheet';
import StockCard from '../../../common/stockcard/StockCard';
import StockModalCard from '../../../common/stockcard/StockModalCard';
import _ from 'lodash';
import WatchlistCommon from '../WatchlistCommon';

export default function WatchList2(props) {
    const [userData,setUserData]=useState(props.userData?props.userData:{})
    const [isOpen,setIsOpen]=useState(false)
    const [stockData,setStockData]=useState([])
    const [searchValue,setSearchValue]=useState("")
    const [data,setData]=useState({})

    const {stockList, showLoader} = useSelector(state => state.adminReducers);
    const sheetRef= useRef(null);
    let dispatch =useDispatch();

    const snapPoints=['40','70'];



    // useEffect(()=>{ 

    //     setSearchValue(props.searchValue) 
        
    //     if(!notNullUndefined(userData?.watchList)) return setStockData([])


    //     if( isArrayNotNullUndefined(userData?.watchList)){
    //         // let length=stockList.length
    //         // props.stockListLength(length)
    //         console.log("searchValue",searchValue);
    //         if(searchValue===""){
    //             let filterlist = userData?.watchList.filter((value, i) => {
    //                 return (value.watchListKey==='watchList 2');
    //             });
    //             setStockData(filterlist)
    //             return
    //         }

    //         let text=_.cloneDeep(searchValue)
    //         let tempupper = text.toUpperCase();
    //         console.log("text=====>",text);
            
    //         let filterlist = userData?.watchList.filter((value, i) => {
    //             let stockName = value.chartName.toUpperCase();
    //             return (stockName.includes(tempupper) && value.watchListKey==='watchList 2');
    //         });
    //         setStockData(filterlist);
    //     }
    // },[props.searchValue,searchValue])

    // const handleOnPressStock = useCallback((item,index) =>{
    //     setData(item)
    //     sheetRef.current?.snapToIndex(0)
    //     setIsOpen(true)
    // },[])

    
    // function renderequityStocks(){

    //     if(isArrayNotNullUndefined(stockData)){
    //         return(
    //             <View style={{flex:1}}>
    //                 <FlatList
    //                     data={stockData}
    //                     style={{opacity :isOpen ? 0.2 : 1, backgroundColor:isOpen ?"grey":"white"}}
    //                     keyExtractor={(item,index) => index}
    //                     // ListHeaderComponent={renderHeader()}    ///////////////////
    //                     onEndReached={()=>console.log("on End Reached")}
    //                     onEndReachedThreshold={0.5}
    //                     renderItem={({item,i})=>{
    //                         return(
    //                             <TouchableOpacity key={i} onPress={()=>handleOnPressStock(item)}>
    //                                 <StockCard  chartName={item.chartName} highPrice={item.highPrice}  values={item}
    //                                 onPressAddWatchlist={()=>{setModalVisible(false);setData(item)}} />
    //                             </TouchableOpacity>
    //                         )
    //                     }}
    //                 />
    //                 { isOpen && 
    //                     <BottomSheet
    //                         ref={sheetRef}
    //                         snapPoints={snapPoints}
    //                         enablePanDownToClose={true}
    //                         onClose={()=>setIsOpen(false)}
    //                         >
    //                             <BottomSheetScrollView >
    //                                 {renderStockCardModal()}
    //                             </BottomSheetScrollView>
    //                     </BottomSheet> 
    //                 }
    //             </View>
    //         )
    //     }

    // }

    // function renderStockCardModal(){

    //     if (!notNullUndefined(data)) return

    //     return(
    //         <StockModalCard
    //             dataItem={data}
    //         />
    //     )
    // }

    return (
        // <View style={{flex:1,backgroundColor:"white"}}>
        //     {props.renderHeader}
        // {renderequityStocks()}
        // </View>
        <View style={{flex:1,backgroundColor:"white"}}>
            <WatchlistCommon watchlistName='watchList 2' renderHeader={props.renderHeader} userData={props.userData} stockListLength={props.stockListLength} searchValue={props.searchValue} />
        </View>
    )

}
