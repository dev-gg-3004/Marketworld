import React from 'react'
import { Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'



export default function KinsDisplay(props) {

    return (
        <View style={{flexDirection:"row",justifyContent:"space-between",borderColor:"white",borderWidth:2,padding:2,paddingBottom:5,paddingTop:5,elevation:2}}>

            <View style={{width:"44%",paddingLeft:"2%"}}>
                <View style={{flexDirection:"row" ,alignItems:"center"}}>
                    <Ionicons name='person'size={23} color="lightseagreen" />
                    <Text style={{color:"black",fontSize:18,marginLeft:10}}> {props.firstName}</Text>
                    <Text style={{color:"black",fontSize:18}}> {props.lastName}</Text>
                </View>
                <View style={{flexDirection:"row",alignItems:'center'}}>
                    <Fontisto name='email' size={23} color="lightseagreen" />
                    <Text  style={{color:"black",fontSize:18,marginLeft:10}}> {props.email}</Text>
                </View>

            </View>
            <View style={{width:"46%"}}>

                <View style={{flexDirection:"row"}}>
                    <MaterialIcons name='family-restroom' size={23} color="lightseagreen"/>
                    <Text style={{color:"black",fontSize:18,marginLeft:10}}>{props.relationship}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Entypo name='home' size={23} color="lightseagreen"/>
                    <Text style={{color:"black",fontSize:18,marginLeft:10}}>{props.homeNo}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    <Ionicons name='ios-call'size={23} color="lightseagreen"/>
                    <Text style={{color:"black",fontSize:18,marginLeft:10}} >{props.mobileNo}</Text>
                </View>
            </View>

            <View style={{width:"8%"}}>
                {/* <Entypo name='edit'  size={23} color='black'  /> */}
                <AntDesign name='delete'  size={23} color='black'  onPress={props.onPressDelete}/>

            </View>

               
            
        
        </View>
    )
}
