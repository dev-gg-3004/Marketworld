import React from 'react';
import { Text, TouchableOpacity, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Calculator from '../calculator/Calculator';
import CheckCAGR from '../checkCagr/CheckCAGR';
import Profile from '../profile/Profile';
import RealmTask from '../../../utils/RealmTask';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialTopTabNavigator();
export default function TopTabHome() {
  const navigation = useNavigation();

  function renderFirstRow() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Roboto-Medium',
              fontSize: 23,
              margin: 10,
            }}>
            TopTabHome
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '20%',
            justifyContent: 'space-between',
          }}>
          <FontAwesome name='search' color='white' size={20}/>
          
          <TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontSize: 30,
                transform: [{rotate: '90deg'}],
              }}>
              ...
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderSecondRow() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarPressColor: 'white',
          tabBarStyle: {backgroundColor: 'green'},
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'lightgrey',
          tabBarLabelStyle: {fontSize: 13},
          tabBarItemStyle: {width: 115},
          tabBarScrollEnabled: true,
          tabBarIconStyle: {width: 120},
        }}
        initialRouteName="📷">
        <Tab.Screen
          name="profile"
          component={Profile}
          options={{
            tabBarShowLabel: false,
            tabBarIconStyle: {alignContent:"center"},
            tabBarIcon: ({size}) => {
              return <FontAwesome name="camera" color="white" size={20} />;
            },
          }}
        />

        <Tab.Screen name="RealmTask" component={RealmTask} />
        <Tab.Screen name="Calculator" component={Calculator} />
        <Tab.Screen name="CheckCAGR" component={CheckCAGR} />
      </Tab.Navigator>
    );
  }
  return (
    <View style={{flex: 1}}>
      <View style={{height: '7%', backgroundColor: 'green'}}>
        {renderFirstRow()}
      </View>
      {renderSecondRow()}
    </View>
  );
}



// <tab.Screen
// name="home"
//    children={()=><ComponentName propName={propValue}/>}
// />