import React from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function CalculatorCard(props) {
    function renderRowOptions(){
        return(
            <TouchableOpacity  onPress={props.onPress} >
                <Text style={props.style?props.style:styles.textStyle} >{props.title}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.viewStyle} >
         {renderRowOptions()}
        </View>
    )
}
const styles= StyleSheet.create(
    {
        textStyle:{
            color:"white",
            textAlign:"center",
            fontSize:35
        },
        viewStyle:{
           
            width:"23.60%",
            height:"19%",
            margin:2,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:"black",
            borderRadius:10
        }
    }
)