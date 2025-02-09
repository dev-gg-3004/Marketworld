import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import ProfileHeader from '../common/navbars/ProfileHeader'
import HomeScreen from '../HomeScreen'
import News from './news/News'
import CheckCAGR from './checkCagr/CheckCAGR'
import Stocks from './stocks/Stocks'
import Calculator from './calculator/Calculator'
import Profile from './profile/Profile'
import TouchableButton from '../common/TouchableButton/Index';
import { Image,  TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IPO from './IPO/Index';
import { useDispatch } from 'react-redux';
import Dashboard from '../../assests/images/dashboardicons.png'
import { debounce } from 'lodash';
import NewsDetails from './news/NewsDetails';
import StocksByClass from './stocks/StocksByClass';


const Stack = createNativeStackNavigator();

export default function NavigationHome(props) {

  const [showDrawer,setShowDrawer]=useState(false)
  const [searchText,setSearchText]=useState("")
  const navigation=useNavigation()
  const dispatch=useDispatch()


  
  function onPressDownKey(params) {

  }

  function handleOnPressIcon(){        
    // setShowDrawer(!showDrawer)
    // navigation.openDrawer();              ///for open drawer
    
    navigation.navigate('Home')
  }

  // function headerIcon(){                        /// headerLeft:()=>headerIcon()
  //   return(
  //     <TouchableOpacity onPress={handleOnPressIcon}>
  //       <Text style={{color:"black",fontSize:20,marginRight:20}}>☰</Text>
  //     </TouchableOpacity>
  //   )
  // }

  function handleSearchBar(text){
    console.log(text);
    setSearchText(text)
  }

  // useEffect(() => {
  //   return () => {
  //     debouncedResults.cancel();
  //   };
  // });

  function headerLeftIcon(){
    return(
      <TouchableOpacity onPress={handleOnPressIcon} style={{marginRight:"6%"}}>
        <Image  source={Dashboard} style={{height:40,width:40}}/>
      </TouchableOpacity>
    )
  }

  const debouncedResults = debounce((text) => {
     handleSearchBar(text)
  }, 2000);

  return(
    <Stack.Navigator initialRouteName='Home' 
      screenOptions={{
        headerShown: true ,
        headerTintColor:"",headerRight:()=><ProfileHeader handleOnChangeSearchBar={(text)=>debouncedResults(text)} />,
        headerStyle:{backgroundColor:"rgb(83, 200, 205)"},
        headerTitleStyle:{color:"black",fontSize:25}, 
        headerLeft:()=>headerLeftIcon(),
      }}
    >
      
      <Stack.Screen name="Home" options={{headerShown:false}} >{()=> <HomeScreen {...props} handleOnPressLogout={props.handleOnPressLogout}/> }</Stack.Screen>
      <Stack.Screen name="Profile" component={Profile} options={{headerRight:null}} />
      <Stack.Screen name="News" component={News}  />
      <Stack.Screen name="NewsDetails" component={NewsDetails}  />

      <Stack.Screen name="Marketwatch" component={Stocks} 
        options={{headerRight:()=>
        <TouchableButton buttonTitle="﹀" 
          textStyle={{fontSize:28,color:"black",paddingRight:30,paddingTop:20}} 
          onPress={onPressDownKey}
        />,headerStyle:{backgroundColor: "#e6e6fa",},
        headerShadowVisible:false,
          headerTitleStyle:{fontSize:25,color:'black'}}}
      />
      <Stack.Screen name="Market" component={StocksByClass} 
        options={{headerRight:()=>
        <TouchableButton buttonTitle="﹀" 
          textStyle={{fontSize:28,color:"black",paddingRight:30,paddingTop:20}} 
          onPress={onPressDownKey}
        />,headerStyle:{backgroundColor:"#e6e6fa",color:'black'},
        headerShadowVisible:false,
          headerTitleStyle:{fontSize:25}}}
      />

      <Stack.Screen name="CheckCAGR" component={CheckCAGR} />
      <Stack.Screen name="Calculator" component={Calculator}  />

      <Stack.Screen name="ipo" >
        {()=> <IPO {...props} searchText={searchText}/> }
      </Stack.Screen> 

    </Stack.Navigator>
  )
}
