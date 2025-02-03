import React from 'react'
import {  FlatList, View } from 'react-native'
import { useSelector } from 'react-redux'
import TokenCardData from '../../common/TokenCardData/Index';

export default function ShowTokenData() {
   let {tokenData} =useSelector(state=>state.adminReducers)
   console.log("tokenData",tokenData);

   console.log("tokenData",tokenData);
   return (
      <View style={{ borderColor:"red",
      borderWidth:2,}}>
         <FlatList
            data={tokenData}
            keyExtractor={item => item.id}
            renderItem={({item,i})=>{
               return(
                  <TokenCardData display_name={item.display_name} field_name={item.field_name}  input_type={item.input_type} 
                  section={item.section}/>
               )
            }}
         />
      </View>
   )
}


