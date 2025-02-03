import { values } from 'lodash'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { notNullUndefined } from '../../../utils/Validation'
import TouchableButton from '../TouchableButton/Index'
import { useNavigation } from '@react-navigation/native'
import WebViews from '../webview/WebViews'

export default function StockModalCard({dataItem}) {

  let navigation=useNavigation()
  if (!notNullUndefined(dataItem)) return

  let stockPrice = [
    {title:"Open",value:dataItem.highPrice},
    {title:"High",value:dataItem.highPrice},
    {title:"Low",value:dataItem.lowPrice},
    {title:"Prev. close",value:dataItem.previousClose}
  ]
  
  function handleOnPressViewChart(){
    let ChartURI= 'https://in.tradingview.com/'
    navigation.navigate('webView',{URI:ChartURI})
  }

  function renderStockPrices(){
    return stockPrice.map((value,i)=>{
      return(
        <View key={i} style={{ width:"25%",marginRight:"1%",paddingBottom:"1%"}}>
            <Text style={styles.titleIpoNameStyle}>{value.title}</Text>
            <Text style={{...styles.titleIpoNameStyle,fontSize:18,color:"black"}}>{value.value}</Text>
        </View>
      )
    })
  }

    return (
      <View>
        <View style={{padding:"4%",paddingTop:"1%"}}> 
          <Text style={{...styles.titleIpoNameStyle,fontSize:24,color:"black"}}>{dataItem.chartName}</Text>
          
          <View style={{flexDirection:"row"}}>
            <Text style={styles.titleIpoNameStyle}>{dataItem.stockType==="Stocks"?"NSE":"NFO"}</Text>
            <Text style={{...styles.titleIpoNameStyle,color:"green" ,marginLeft:"5%"}}> {dataItem.highPrice}</Text>
            <Text style={{...styles.titleIpoNameStyle,marginLeft:"5%"}}>{dataItem.percentageChange} (1.38%)</Text>
          </View>
        </View>
        <View style={styles.childView}>

          {  dataItem.stockType!=="Indices" &&  <View style={{flexDirection:"row",justifyContent:"space-between"}}>
              <TouchableButton  buttonTitle="Buy" touchableViewStyle={styles.BuySellViewButton}
                textStyle={styles.BuySellTextButton}
              />
              <TouchableButton  buttonTitle="Sell" touchableViewStyle={{...styles.BuySellViewButton,backgroundColor:"red"}}
                textStyle={styles.BuySellTextButton}
              />
            </View>
          }

          <TouchableOpacity style={styles.viewChartStyle} onPress={handleOnPressViewChart}>
            <Text style={styles.viewChartContentStyle}>≌  View chart ⟶</Text>
          </TouchableOpacity>
          <View style={styles.stockPriceViewStyle}>
          
            {renderStockPrices()}

          </View>
          <View style={{flexDirection:"row",paddingTop:"5%",paddingBottom:"14%"}}>
            <Text style={styles.PinTooverview}>Pin to overview</Text>
            <View style={{flexDirection:"row",justifyContent:"space-between",width:"48%"}}>
              <TouchableButton  buttonTitle="Spot 1" touchableViewStyle={styles.spotViewStyle}
                textStyle={styles.spotTextStyle}
              />
              <TouchableButton  buttonTitle="spot 2" touchableViewStyle={styles.spotViewStyle}
                textStyle={styles.spotTextStyle}
              />
            </View>
          </View>
        </View>
      </View>
    )
}

export const styles=StyleSheet.create({
    titleIpoNameStyle:{
      color:"grey",
      fontFamily:"Roboto-Regular",
      fontSize:15,
      marginBottom:"2%"
    },
    childView:{
      borderWidth:1,
      borderColor:"white",
      borderTopColor:"lightgrey",
      padding:"5%",
      height:"100%"
    },
    BuySellViewButton:{
      backgroundColor:"royalblue",
      width:"45%",
      borderRadius:5,
      justifyContent:"center",
      marginBottom:"8%",
    },
    BuySellTextButton:{
      color:"white",
      fontSize:19,
      margin:"7%",
      textAlign:"center",
      fontWeight:"bold"
    },
    viewChartStyle:{
      justifyContent:"center",
      alignItems:"center",
      paddingBottom:"3%",
      height:"20%",
     
    },
    viewChartContentStyle:{
      fontFamily:"Roboto-Medium",
      fontSize:20,
      color:"royalblue"

    },
    stockPriceViewStyle:{
      flexDirection:"row",
      marginTop:"3%",
      borderWidth:1.5,
      borderColor:"lightgrey",
      borderStartColor:"white",
      borderEndColor:"white",
      paddingTop:"4%",
    
    },
    spotTextStyle:{
      color:"black",
      fontSize:18,
      fontFamily:"Roboto-Light",
      textAlign:"center"
    },
    spotViewStyle:{
      borderColor:"black",
      borderWidth:1,
      width:"46%",
      borderRadius:2
    },
    PinTooverview:{
      color:"black",
      fontSize:17,
      width:"48%"}
  
  })