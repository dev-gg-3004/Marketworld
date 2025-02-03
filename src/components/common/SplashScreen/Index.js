import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'

export default function Index({navigation}) {

    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('loginNew') 
        },2500)
    })
    
    return (

        <View style={{justifyContent:"center",alignItems:"center",backgroundColor:"lightblue", flex:1}} >
            <Image source={require('../../../assests/images/app.png') } style={{height:100,width:100}} ></Image>
        </View>
    )
}

