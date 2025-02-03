import React from 'react'
import { Image, View } from 'react-native'
import marketlogo from '../../../assests/images/newlogo.jpg'

export default function HeaderLogo() {
  return (
    <View style={{alignItems:"center",backgroundColor:"#d9eeeb"}}>
      <Image source={marketlogo}  style={{height:75 , width:190}}/>
    </View>
  )
}
