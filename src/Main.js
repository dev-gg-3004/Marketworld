import React, { Fragment, useEffect, useState } from 'react';
import NavigationHome from '../src/components/screen/NavigationHome'
import DrawerProfile from '../src/components/common/drawerprofile/DrawerProfile'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import AuthHome from './AuthHome';
import { getSession, memberDataKey, removeItemValue } from './utils/Session';
import { useDispatch, useSelector } from 'react-redux';
import { setValidUserFalse } from './redux/actions/LoginAction';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
export default function Main() {

  const [isSession,setIsSession] =useState(false)
  const [showDrawer,setShowDrawer]=useState(false)

  const store=useSelector(reduxStoreData)
  const dispatch=useDispatch()

  useEffect(()=>{
    checkSession()
  },[store.activeMember])

  useEffect(()=>{
    if(!store.validUser){
      setIsSession(false)
    }
  },[store.validUser])


  function handleOnPressIcon(){
    setShowDrawer(!showDrawer)
  }

  async function checkSession(){
    let session = await getSession()
      if(session){
        setIsSession(true)
    }
  }

  async function handleOnPressLogout() {
    console.log('Homepress');
    let clear = await removeItemValue(memberDataKey());
    dispatch(setValidUserFalse())
    setIsSession(false)
  }
  

  return (
    <Fragment>
    <NavigationContainer>
    { !isSession ?
      <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }} 
      >
        <Stack.Screen name='authHome' component={AuthHome} />
      </Stack.Navigator>
      :
      <Drawer.Navigator drawerContent={props=><DrawerProfile {...props} />} 
        screenOptions={{
        swipeEnabled:true,
        drawerStyle:{backgroundColor:"skyblue"},
        drawerActiveBackgroundColor:"blue",
        keyboardDismissMode:"on-drag"
      }}>
        <Stack.Screen name="navigationHome"  options={{headerShown:false,}}  >
        {(props)=> <NavigationHome {...props} handleOnPressLogout={()=>handleOnPressLogout()}/> }
        </Stack.Screen>

      </Drawer.Navigator>
}
    </NavigationContainer>
    </Fragment>
  )
}
 
function reduxStoreData(store) {
  return {
    activeMember: store.adminReducers.activeMember,
    validUser  : store.adminReducers.validUser,
  };
}