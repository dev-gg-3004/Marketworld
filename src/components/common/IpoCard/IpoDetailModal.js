import moment from 'moment/moment'
import React from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { empty } from '../../../utils/Validation'

export default function IpoDetailModal(props) {

  const tableTitle=[
    {key:"Investor type",value:"Individual investor"},
    {key:"Issue size",value:"0"},
    {key:"Discount",value:"N/A"},
    {key:"Lot Size",value:props.lotSize?props.lotSize:0}
  ]

  function handleOnPressApply(){

  }

  function renderTable(){

    return tableTitle.map((item,i)=>{
      return(
        <View key={i} style={{flexDirection:"row",justifyContent:"space-between",marginTop:"4%"}}>
          <Text style={{...styles.titleIpoNameStyle}}>{item.key}</Text>
          <Text style={{...styles.titleIpoNameStyle,fontSize:18,color:"black"}}>{item.value}</Text>
        </View>
      )
    })
    
  }

  const ipoStatus=[
    {key:"Offer start",value:props.openDate},
    {key:"offer end",value:props.closeDate},
    {key:"Allotment",value:props.allotment},
    {key:"Refund Initiation",value:props.refundDate},
    {key:"Demat Transfer",value:props.dematTransfer},
    {key:"Listing",value:props.listingDate},
    {key:"Mandate End",value:props.mandateEnd},
  ]

  // moment('2010-10-20').isBefore('2010-10-21'); // true     ////////  vvimp

  function renderIpoStatus(){

    let date =moment().format('YYYY-MM-DD')

    return ipoStatus.map((value,i)=>{
      return(
        <View key={i} 
        style={{borderColor:"white",
        borderStartColor:moment(date).isBefore(value.value)?"grey":"royalblue",
        borderWidth:3,width:"90%",paddingLeft:"20%"}}>
          <Text style={{...styles.titleIpoNameStyle,fontSize:18,color:"black" }}>{value.key}</Text>
          <Text style={{...styles.titleIpoNameStyle,paddingBottom:"5%"}}>{value.value}</Text>
        </View>
      )
    })
  }

  return (
    <View>
      <View style={{padding:"4%",paddingTop:"1%"}}> 
        <Text style={{...styles.titleIpoNameStyle,fontSize:22,color:"black"}}>{props.title}</Text>
        <Text style={styles.titleIpoNameStyle}>{props.ipoName}</Text>
      </View>
      
      <View style={styles.childView}>
        {
         props.status==="Apply" &&
          <TouchableOpacity style={styles.applyViewStyle} onPress={handleOnPressApply}>
            <Text style={styles.applyTextStyle}>Apply</Text>
          </TouchableOpacity>
        }
        {
          props.status==="Closed" && 
          <Text style={{...styles.titleIpoNameStyle,fontSize:18,marginBottom:"4%"}}>This IPO closed on  {props.closeDate}</Text>
        }
        <Text style={styles.titleIpoNameStyle} >{props.companyDetails}</Text>
        
        <View style={styles.qtyPriceParent}>

          <View style={{ width:"30%",marginRight:"20%"}}>
            <Text style={styles.titleIpoNameStyle}>Min qty.</Text>
            <Text style={{...styles.titleIpoNameStyle,fontSize:18,color:"black"}}>{props.lotSize}</Text>
          </View>
        
          <View style={{ width:"30%"}}>
            <Text style={styles.titleIpoNameStyle}>Price range</Text>
            <Text style={{...styles.titleIpoNameStyle,fontSize:18,color:"black"}}>{props.offerPrice}</Text>
          </View>

        </View>

        <View style={{ marginRight:"20%",marginTop:"4%"}}>
          <Text style={styles.titleIpoNameStyle}>Dates</Text>
          <Text style={{...styles.titleIpoNameStyle,fontSize:18,color:"black"}}>{props.dateRange}</Text>
        </View>

        <View style={styles.tableViewStyle}>
          {renderTable()}
        </View>

        <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:"3%"}}> 
          <Text style={{...styles.titleIpoNameStyle,color:"blue",fontSize:16}}>Red herring prospectus</Text>
          <Text style={{...styles.titleIpoNameStyle,color:"blue",fontSize:16}}>Subscription data</Text>
        </View>

        <View style={{marginTop:"5%",paddingBottom:"10%"}}>
          <Text style={{...styles.titleIpoNameStyle,fontSize:22,color:"black"}}>IPO Status</Text>
          <View style={{marginTop:"5%"}}>

            {renderIpoStatus()}
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
    borderTopColor:"lightgrey",
    padding:"5%",
    height:"100%"
  },
  applyViewStyle:{
    backgroundColor:"royalblue",
    width:"100%",
    borderRadius:5,
    justifyContent:"center",
    marginBottom:"8%",
  },
  applyTextStyle:{
    color:"white",
    fontSize:18,
    margin:"5%",
    textAlign:"center",
    fontWeight:"bold"
  },
  qtyPriceParent:{
    flexDirection:"row",
    marginTop:"3%"
  },
  qtyPriceChildStyle:{
    width:"30%"
  },
  tableViewStyle:{
    borderColor:"white",
    borderWidth:1,
    borderTopColor:"lightgrey",
    marginTop:"5%",
  }


})
