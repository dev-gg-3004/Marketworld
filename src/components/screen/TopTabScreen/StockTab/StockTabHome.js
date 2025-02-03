import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import WatchList1 from './WatchList1';
import WatchList2 from './WatchList2';
import WatchList3 from './WatchList3';
import WatchList4 from './WatchList4';
import All from './All';
import TouchableButton from '../../../common/TouchableButton/Index';
import { debounce } from 'lodash';
import { getSession } from '../../../../utils/Session';

const Tab = createMaterialTopTabNavigator();

export default function StockTabHome() {
    const [userData,setUserData]=useState({})
    const [searchValue,setSearchValue]=useState("")
    const [arrayLength,setArrayLength]=useState("")


    useEffect(()=>{
        getUserSession()
    },[])
    useEffect(()=>{
        renderHeader()
    },[arrayLength])

    function onChangeSearchbar(text){
        setSearchValue(text)
    }

    const debouncedResults = debounce((text) => {
        onChangeSearchbar(text)
    }, 500);

    function renderHeader(){
        return(
            <View style={{alignItems:"center",marginBottom:30,backgroundColor:"#e6e6fa",height:40}}>
                <View style={{flexDirection:"row",alignItems:"center",width:"86%",borderWidth:1,borderColor:"lightgrey",borderRadius:5,position:"absolute",marginTop:15,backgroundColor:"white"}}>
                    <TouchableButton  buttonTitle="🔍" textStyle={{fontSize:22,marginLeft:15}} /> 
                    <TextInput placeholder='Search & add' placeholderTextColor={'darkgrey'} style={{fontSize:20,marginLeft:15,width:"55%",color:"black"}} onChangeText={text=>debouncedResults(text)}/>
                    <Text style={{color:"grey",fontSize:18,}}>{arrayLength}/70</Text>
                    <TouchableButton  buttonTitle="☵" textStyle={{fontSize:22,marginLeft:5,paddingLeft:10,color:"darkgrey"}} /> 
                </View>
            </View>
        )
    }
    function stockListLength(value){
        console.log("value-========>",value);
        setArrayLength(value)
    }

    async function getUserSession(){
        let session = await getSession()
          if(session){
            setUserData(session)
        }
    }

    function renderWatchlistTab(){
        return(

            <Tab.Navigator
                screenListeners={({route})=>{console.log(route)}}
                screenOptions={{
                tabBarPressColor: 'lightblue',
                tabBarStyle: {backgroundColor: '#e6e6fa',borderBottomWidth:0},
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'lightgrey',
                tabBarLabelStyle: {fontSize: 13,color:"black"},
                tabBarItemStyle: {width: 115},
                tabBarScrollEnabled: true,
                tabBarIconStyle: {width: 120},
            }}
            initialRouteName="All">
     
            <Tab.Screen name="All" children={()=><All stockListLength={stockListLength} searchValue={searchValue} renderHeader={renderHeader()}/>} />
            <Tab.Screen name="WatchList1" children={()=><WatchList1 renderHeader={renderHeader(stockListLength)} userData={userData} stockListLength={stockListLength} searchValue={searchValue}/>} />
            <Tab.Screen name="WatchList2" children={()=><WatchList2 renderHeader={renderHeader()} userData={userData} stockListLength={stockListLength} searchValue={searchValue} />}/>
            <Tab.Screen name="WatchList3" children={()=><WatchList3 renderHeader={renderHeader()} userData={userData} stockListLength={stockListLength} searchValue={searchValue} />}/>
            <Tab.Screen name="WatchList4" children={()=><WatchList4 renderHeader={renderHeader()} userData={userData} stockListLength={stockListLength} searchValue={searchValue} />}/>
            
          </Tab.Navigator>

        )
    }
    
    return (
        <View style={{flex:1,backgroundColor:"white"}} >
            <StatusBar backgroundColor="#e6e6fa" />
            {renderWatchlistTab()}
        </View>
    )
}

const styles=StyleSheet.create({
    watchlistChildText:{
        color:"black",
        fontSize:20,
        marginRight:30,
        fontFamily:"Roboto-Regular",
        textAlign:"center",
        
      },
      watchlistChildTextColorChange:{
        color:"blue",
        fontSize:20,
        marginRight:30,
        fontFamily:"Roboto-Regular",
        elevation:0.5,
        textAlign:"center"
      },
      loginButton: {
        color: 'white',
        fontFamily: 'Roboto-Medium',
        padding:"5%",
        textAlign: 'center',
        fontSize: 20,
      }, 
       loginViewButton: {
        width: '44%',
        alignSelf: 'center',
        borderRadius: 15,
        backgroundColor: '#1e90ff',
      },
      addToWatchListOptionColor:{
        backgroundColor: 'lightgreen',
        borderColor:"red",
        borderWidth:1,marginBottom:"4%"
      },
      addToWatchListOptionInitialColor:{
        // backgroundColor: '#1e90ff',
      

      }


})