import React, { useState } from 'react'
import { Button, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo'
import image from '../../../assests/images/bganimated.jpeg'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { deleteLocationDetail } from '../../../redux/actions/KinAction'

export default function AllLocationScreens({navigation}) {
    const {locationTitles} =useSelector(state=>state.adminReducers)
    
    const [locationArray,setLocationArray]=useState(locationTitles)

    const dispatch = useDispatch()
    
    function handleOnPressIcon(value){
        navigation.navigate('MapsHome' ,{location:value})
    }

    function handleOnPressDelete(value,i){
        dispatch(deleteLocationDetail(value,i))
        let temp=[...locationArray]
        temp.splice(i,1);
        setLocationArray(temp)
    }

    function renderCard(){
        return locationArray?.map((value,i)=>{
            return (
               <ShowLocationCard key={i}   handleOnPressIcon={handleOnPressIcon} value={value} handleOnPressDelete={handleOnPressDelete}  />
            )
        })
    }

    return (
        <View style={{flex:1}}>
            <ImageBackground source={image}  style={{flex:1,width:"100%"}} blurRadius={50}>
                <Button  title='Add Loaction' onPress={()=>navigation.navigate('MapsHome')}/>
                <ScrollView contentContainerStyle={{alignItems:"center"}}>
                    {renderCard()}
                </ScrollView>
            </ImageBackground>
        </View>
    )
}


const styles=StyleSheet.create({
    cardMainViewStyle:{
        height:80,width:"90%",
        backgroundColor:"white",
        margin:"5%",
        borderRadius:25,
        borderColor:"white",
        elevation:5,
        alignItems:"center",
        flexDirection:"row"
    },
    locationTitleStyle:{
        color:"lightseagreen",
        fontSize:22,
        width:"70%",
        paddingLeft:"10%",
      
    },
    iconsViewStyle:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:"25%"
    }

})

    function ShowLocationCard({ handleOnPressIcon, value, handleOnPressDelete}) {
      return (
        <View  style={styles.cardMainViewStyle}>
            <Text style={styles.locationTitleStyle}>{value.locationTitle}</Text>
            <View style={styles.iconsViewStyle}>
                <Entypo name='location' size={30} color="blue" onPress={() => handleOnPressIcon(value)} />
                <AntDesign name='delete' size={30} color="red" onPress={() => handleOnPressDelete(value, i)} />
            </View>
        </View>);
    }
  