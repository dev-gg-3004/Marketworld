import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import { ipoList } from '../../../utils/Data'
import IpoCard from '../../common/IpoCard/IpoCard'
import IpoDetailModal from '../../common/IpoCard/IpoDetailModal'
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { isArrayNotNullUndefined, notNullUndefined } from '../../../utils/Validation'

export default function IPO({route, ...props}) {
  const ipoDetials= ipoList   //  ipo details list  from Data.js
  const sheetRef= useRef(null);
  const [isOpen,setIsOpen]=useState(false)
  const [data,setData]=useState({})
  const [searchValue,setSearchValue]=useState([])

  useEffect(()=>{

    let text=props.searchText?props.searchText:""
    let tempupper = text.toUpperCase();

    let filterlist = ipoDetials?.filter((value, i) => {
      let ipoFullName = value.ipoName.toUpperCase();
      let ipoShortName =value.ipoShortTitle.toUpperCase()
      return (ipoFullName.includes(tempupper) || ipoShortName.includes(tempupper));
    });
    setSearchValue(filterlist);

  },[props.searchText])

  const snapPoints=['40','60',"90%"];
  // console.log("IPO",route.params);
  
  const handleOnPressIpo = useCallback((item,index) =>{
    setData(item)
    sheetRef.current?.snapToIndex(0)
    setIsOpen(true)
  },[])

  function renderIpoDetailCard(){
    
    if (!notNullUndefined(data)) return

    return(
      <IpoDetailModal title={data.ipoShortTitle} 
      ipoName={data.ipoName} 
      // Apply={data.status==="Apply"? "Apply":""}
      status={data.status}
      companyDetails={data.companyDetails}
      lotSize={data.lotSize}
      openDate={data.openDate}
      closeDate={data.closeDate}
      offerPrice={data.offerPrice}
      dateRange={data.dateRange}
      allotment={data.allotment}
      refundDate={data.refundDate}
      dematTransfer={data.dematTransfer}
      listingDate={data.listingDate}
        mandateEnd={data.mandateEnd}
      />

    )
  }

  return (
    <SafeAreaView style={{flex:1,paddingBottom:"2%",height:"100%"}}>
      <FlatList 
        data={isArrayNotNullUndefined(searchValue)?searchValue: ipoDetials}
        keyExtractor={(item,index) => index}
        style={{opacity :isOpen ? 0.2 : 1, backgroundColor:isOpen ?"grey":"white"}}
        renderItem={({item})=>{
            return(
              <IpoCard  
              ipoName={item.ipoName}
              ipoShortTitle={item.ipoShortTitle} 
              offerPrice={item.offerPrice} 
              dateRange={item.dateRange}
              status={item.status}
              onPress={()=>handleOnPressIpo(item)}
                />
            )
        }}
      />

      { isOpen && <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={()=>setIsOpen(false)}
          >
            
              <BottomSheetScrollView >
                { renderIpoDetailCard() }
              </BottomSheetScrollView>

          </BottomSheet> }
   


    </SafeAreaView>
  )
}
