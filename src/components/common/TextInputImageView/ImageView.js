import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

export default function ImageView(props) {

    return (
        // <View style={{flex:0.90}}>
            <View style={{...styles.illustrationViewStyle,flex:0.90,justifyContent:"center",alignItems:"center"}}>
                <Image source={props.illustrationImage} style={props.illustrationImageStyle?props.illustrationImageStyle:styles.illustrationImageStyle}/>
            {/* </View> */}
            {/* <Text style={props.textStyle}>{props.title}</Text> */}
        </View>

    )
}

const styles=StyleSheet.create({
    illustrationViewStyle:{
        height:"100%", 
        width:"100%",

    },
   illustrationImageStyle :{
        height:"100%",
        width:"100%"
    }

})