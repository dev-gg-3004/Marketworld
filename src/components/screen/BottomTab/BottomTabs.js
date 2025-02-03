import React, { useReducer, useState } from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Stocks from '../stocks/Stocks';
import Profile from '../profile/Profile';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native"; 
import Calculator from '../calculator/Calculator';

const Tab = createBottomTabNavigator();

export default function BottomTabs({navigation}) {

    // the screen is currently focused
    // your code here
  const [routeName,setRouteName]=useState('')
  function renderTabs() {
    return (
      <View style={{flex: 1, backgroundColor: 'royalblue'}}>
        <Tab.Navigator 
        screenListeners={({route})=>{setRouteName(route.name);console.log(route.name);}}
          screenOptions={{ 
            tabBarStyle: {
              marginTop: 14,
              backgroundColor: 'white',
              borderBottomEndRadius: 25,
              borderBottomLeftRadius: 25,
              borderTopWidth: 0,
              height: '9%',
            },
            
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'black',
            tabBarLabelStyle: {color: 'white'},
            tabBarActiveBackgroundColor: 'royalblue',
            tabBarInactiveBackgroundColor:'white',
            headerShown: false,
          }}>
          <Tab.Screen
            name="Marketwatch"
            component={Stocks}
            options={{
              tabBarIcon: ({color,focused}) => {
                return <AntDesign name="linechart"  color={color} size={routeName==='Marketwatch'?30:20} />;
              },
              tabBarItemStyle: routeName==='Marketwatch'?{...style.tabBarActiveItemStyle}:{...style.tabBarItemStyle},

            }}
          />
          <Tab.Screen
            name="tools"
            component={Calculator}
            options={{
              tabBarIcon: ({color,focused}) => {
                return <AntDesign name="tool" color={color} size={routeName==='tools'?30:20} />;
              },
              tabBarItemStyle: routeName==='tools'?{...style.tabBarActiveItemStyle}:{...style.tabBarItemStyle},
            }}
          />
          <Tab.Screen
            name="portfolio"
            component={Profile}
            options={{
              tabBarIcon: ({color}) => {
                return <Ionicons name="md-basket" color={color} size={routeName==='portfolio'?30:20} />;
              },
              tabBarItemStyle: routeName==='portfolio'?{...style.tabBarActiveItemStyle}:{...style.tabBarItemStyle},

            }}
          />
          <Tab.Screen
            name="profile"
            component={Profile}
            options={{
              tabBarIcon: ({color}) => {
                return (
                  <FontAwesome name="user-circle-o" color={color} size={routeName==='profile'?30:20} />
                );
              },
              tabBarItemStyle: routeName==='profile'?{...style.tabBarActiveItemStyle}:{...style.tabBarItemStyle},

            }}
          />
        </Tab.Navigator>
      </View>
    );
  }

  return <View style={{flex: 1}}>{renderTabs()}</View>;
}

const style=StyleSheet.create({
  tabBarItemStyle:{
    borderBottomEndRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomColor: 'royalblue',
    marginRight: 15,
    marginLeft: 15,
  },
  tabBarActiveItemStyle:{
    borderBottomEndRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomColor: 'royalblue',
    marginRight: 15,
    marginLeft: 15,
    paddingBottom:25
  }
})