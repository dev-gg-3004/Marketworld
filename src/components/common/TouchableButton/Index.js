import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'

export default function TouchableButton(props) {

    return (
        <TouchableOpacity  onPress={props.onPress} style={{...props.touchableViewStyle}}>
            {props.image && <Image source={props.image} style={{...props.imageStyle,marginBottom:18}} />}
            <Text style={{fontFamily:"Roboto-Medium",...props.textStyle}}>{props.buttonTitle}</Text>
        </TouchableOpacity>
    )
}
