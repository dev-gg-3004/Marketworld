import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Fragment } from 'react'
import AddKin from './components/screen/Taskone/AddKin';
import AnimatedTask from './components/screen/Taskone/AnimatedTask';
import TaskOne from './components/screen/Taskone/Index'
import RoasterUI from './components/screen/Taskone/RoasterUI';
import ShowTokenData from './components/screen/Taskone/ShowTokenData';

const Stack = createNativeStackNavigator();

export default function Task() {
  return (
    <Fragment>
        <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} >

         <Stack.Screen name='taskone' component={AnimatedTask} />

        {/* <Stack.Screen name='taskone' component={RoasterUI} />
        <Stack.Screen name='AddKin' component={AddKin} />  */}
        {/* <Stack.Screen name='taskone' component={TaskOne} />
        <Stack.Screen name='showTokenData' component={ShowTokenData}  /> */}
      </Stack.Navigator>
        </NavigationContainer>
    </Fragment>
  )
}
