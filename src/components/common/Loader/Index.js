import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

export default function Loader(props) {

    return (
        <View style={{flex:1,backgroundColor:"transparent",justifyContent:"center",alignItems:"center"}}>
           <View style={{height:180,width:280,borderColor:"grey",flexDirection:"row",borderWidth:2,justifyContent:"center",alignItems:"center",backgroundColor:"#f8f8ff"}}>
                <View>
                    <ActivityIndicator size={props.size ?? "large"} color="black"/>
                </View>
                <Text style={{color:"black",fontSize:24,fontFamily:"Roboto-Regular",marginLeft:"20%"}}>Loading</Text>
           </View>
        </View>
    )
}
