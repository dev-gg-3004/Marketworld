import { head } from 'lodash'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function TokenCardData(props) {

    return (
        <View style={style.containerStyle}>
        <View style={style.viewStyle}>
           <Text style={style.textStye}>display_name :</Text>
           <Text  style={{...style.textStye,color:"blue"}}>{props.display_name}</Text>
        </View>
        <View style={style.viewStyle}>
           <Text style={style.textStye}>field_name :</Text>
           <Text style={{...style.textStye,color:"blue"}}>{props.field_name}</Text>
        </View>
        <View style={style.viewStyle}>
           <Text style={style.textStye}>input_type :</Text>
           <Text style={{...style.textStye,color:"blue"}}>{props.input_type}</Text>
        </View>
        <View style={style.viewStyle}>
           <Text style={style.textStye}>section :</Text>
           <Text style={{...style.textStye,color:"blue"}}>{props.section}</Text>
        </View>
           
     </View>
    )
}

const style=StyleSheet.create({
    viewStyle:{
       justifyContent:"space-between",
       paddingLeft:10,
       paddingRight:10,
       flexDirection:"row",
       margin:10
    },
    textStye:{
       color:"black",
       fontSize:25
    },
    containerStyle:{
       borderColor:"grey",
       backgroundColor:"white",
       borderWidth:2,
       width:"100%",

    }
 
 })
 