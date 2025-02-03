import React from 'react'
import { Image, Text, View } from 'react-native'
import image from '../../../assests/images/user.png'

export default function HomepageStockCard(props) {

    return (
        <View style={{flex:1,justifyContent:"center",alignItems:"center",flexDirection:"row",elevation:4,backgroundColor:"white",borderRadius:6,}}>  
            <Image source={image} style={{height:40,width:40}}/>
            <View style={{marginLeft:"5%"}}>
                <Text style={{fontFamily:"Roboto-Medium",color:"black",fontSize:22}}>{props.chartName}</Text>
                <View style={{flexDirection:"row",marginTop:"2%"}}>
                    <Text style={{fontFamily:"Roboto-Medium",color:"black",fontSize:18}}>{props.highPrice}</Text>
                    <Text style={{fontFamily:"Roboto-Medium",color:"grey",fontSize:14,paddingTop:"1.5%"}}> INR   </Text>
                    <Text style={{fontFamily:"Roboto-Medium",color:"green",fontSize:18}}> +{props.percentageChange}%</Text>
                </View>
            </View>
        
        </View>
    )
}
