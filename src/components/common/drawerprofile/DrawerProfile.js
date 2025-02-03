import { DrawerContentScrollView} from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux';
import { memberDataKey, removeItemValue } from '../../../utils/Session';

export default function DrawerProfile(props) {

    const navigation = useNavigation()
    const {singleMemberData} =useSelector(state => state.adminReducers);
    // console.log(singleMemberData);

    async function handleOnPressLogout() {
        console.log('press');
        let clear = await removeItemValue(memberDataKey());
    
        if (clear) {
          navigation.navigate('loginNew');
        }
    }
    
    return ( 
        <View style={{flex:1,marginTop:-4}}>    
            <DrawerContentScrollView {...props}  >
               <ImageBackground source={require('../../../assests/images/bgprofile.webp')} style={{height:150,width:300}}>
                   <View style={{flexDirection:"column",marginTop:10}}>
                        <View style={{flexDirection:"row",marginLeft:10,marginBottom:10}}>
                            <Text style={{color:"skyblue",fontFamily:"Roboto-Bold",fontSize:25}}>MarketWorld</Text>
                            <Text style={{color:"skyblue",marginTop:10}}>.in</Text>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <View style={{width:"65%",paddingLeft:10
                        }}>
                            <Text style={{color:"skyblue",fontSize:20,fontFamily:"Roboto-Medium"}}>Hello, trader!</Text>
                            <Text style={{color:"orange",fontSize:25,fontFamily:"Roboto-Medium"}}>Gopal Gupta{singleMemberData?.userName}</Text>
                            </View>
                            <View style={{justifyContent:"center"}}>
                                <Image source={require('../../../assests/images/mypic.jpeg')} style={{height:80,width:80,borderRadius:50}}/>
                            </View>
                        </View>
                    </View>
               </ImageBackground>
               
               <TouchableOpacity onPress={()=>navigation.navigate("Home")} style={style.drawerTitleViewStye}>
                    <Text style={style.drawerTitleStyle}>Home</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={()=>navigation.navigate("Marketwatch")} style={style.drawerTitleViewStye}>
                    <Text style={style.drawerTitleStyle}>Marketwatch</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={()=>navigation.navigate("News")} style={style.drawerTitleViewStye}>
                    <Text style={style.drawerTitleStyle}>News</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={()=>navigation.navigate("CheckCAGR")} style={style.drawerTitleViewStye}>
                    <Text style={style.drawerTitleStyle}>CheckCAGR</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={()=>navigation.navigate("Calculator")} style={style.drawerTitleViewStye}>
                    <Text style={style.drawerTitleStyle}>Calculator</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={()=>navigation.navigate("Profile")} style={style.drawerTitleViewStye}>
                    <Text style={style.drawerTitleStyle}>Profile</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={()=>handleOnPressLogout()} style={style.drawerTitleViewStye}>
                    <Text style={style.drawerTitleStyle}>Log-out</Text>
               </TouchableOpacity>
               
            </DrawerContentScrollView>
        </View>
    )
}

const style=StyleSheet.create({
    drawerTitleStyle:{
        fontSize:20,
        color:"black"

    },
    drawerTitleViewStye:{
        marginTop:20,
        paddingLeft:15,
        backgroundColor:"skyblue",
    }
})