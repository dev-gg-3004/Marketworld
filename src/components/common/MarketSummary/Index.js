import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getStockListStart } from '../../../redux/actions/StockActions'
import { isArrayNotNullUndefined } from '../../../utils/Validation'
import HomepageStockCard from '../stockcard/HomepageStockCard'
import TouchableButton from '../TouchableButton/Index'

export default function MarketSummary() {

  const [titleID,setTitleId]=useState("Indices")
  const [stockData,setStockData]=useState([])

  const {stockList } =useSelector(state=>state.adminReducers)
  let dispatch=useDispatch();
 
  useEffect(()=>{
    // dispatch(getStockListStart());
    //   if(true){
    //   throw new Error("custom error")
    // }
  },[])

  useEffect(()=>{
    if(isArrayNotNullUndefined(stockList)){
      let temp=stockList.filter((value,i)=>{
        return titleID===value.stockType ;
      }) 
      setStockData(temp)
    }
  },[stockList,titleID])

  function handleOnPressSummaryTitles(key){
    setTitleId(key)
  }

  return (
    <View style={styles.summaryParentView}>
      <Text style={styles.marketSummaryTitle}>Market Summary ⟹</Text>
      <View style={styles.summaryChildView}>
      
        <TouchableButton onPress={()=>handleOnPressSummaryTitles("Indices")}
            textStyle={titleID==="Indices"?styles.summaryChildTextColorChange:styles.summaryChildText} buttonTitle="Indices" 
        />
        <TouchableButton onPress={()=>handleOnPressSummaryTitles("Stocks")}
            textStyle={titleID==="Stocks"?styles.summaryChildTextColorChange:styles.summaryChildText} buttonTitle="Stocks" 
        />
        <TouchableButton onPress={()=>handleOnPressSummaryTitles("ETF")}
            textStyle={titleID==="ETF"?styles.summaryChildTextColorChange:styles.summaryChildText} buttonTitle="ETF" 
        />
        <TouchableButton onPress={()=>handleOnPressSummaryTitles("Mutual Funds")}
            textStyle={titleID==="Mutual Funds"?styles.summaryChildTextColorChange:styles.summaryChildText} buttonTitle="Mutual Funds" 
        />
        <TouchableButton onPress={()=>handleOnPressSummaryTitles("Bonds")}
            textStyle={titleID==="Bonds"?styles.summaryChildTextColorChange:styles.summaryChildText} buttonTitle="Bonds" 
        />

      </View>

      {   isArrayNotNullUndefined(stockData)   &&   
        <FlatList 
          data={stockData}
          style={{marginTop:"5%"}}
            keyExtractor={(item,index) => index}
            horizontal
            scrollEnabled={true}
            renderItem={({item,i})=>{
            return(
              <View style={{height:100,width:300,margin:5}}>
                <HomepageStockCard 
                chartName={item.chartName} highPrice={item.highPrice}  percentageChange={item.percentageChange}   />
              </View>
            )
          }}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
    marketSummaryTitle:{
        color:"black",
        fontSize:25,
        fontFamily:"Roboto-Bold",
        marginTop:"3.5%",
      },
      summaryParentView:{
        paddingLeft:"3%",
        borderTopColor:"lightgrey",
      },
      summaryChildView:{
        flexDirection:"row",
        justifyContent:"center",
        alignContent:"center",
        marginTop:"3%"
      },
      summaryChildText:{
        color:"black",
        fontSize:17,
        fontFamily:"Roboto-Regular",
        marginRight:"6%",
        textAlign:"center"
      },
      summaryChildTextColorChange:{
        color:"black",
        fontSize:17,
        fontFamily:"Roboto-Regular",
        marginRight:"6%",
        backgroundColor:"lightblue",
        borderRadius:25,
        textAlign:"center"
      }
    
    });