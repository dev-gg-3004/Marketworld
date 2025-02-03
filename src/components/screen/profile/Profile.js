import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

import { getSession } from '../../../utils/Session';
import { empty } from '../../../utils/Validation';
import ProfileCard from '../../common/ProfileCard/Index';
import TouchableButton from '../../common/TouchableButton/Index';
import DeviceInfo from 'react-native-device-info'
export default function Profile() {

  const [userData,setUserData]=useState({})
  const [image, setImage] = useState();
  const [deviceName, setDeviceName] = useState("");

  useEffect(()=>{
    getUserSession();
  },[])

  async function getUserSession(){
    let session = await getSession()
    let  devicesName=  await DeviceInfo.getDeviceName()
    setDeviceName(devicesName)
    if(session){
      setUserData(session)
      if(!empty(session.userImage)) return setImage(session.userImage)
    }
  }
  
  function onPressManageAccount(){

  }

  function renderProfileCard(){

    return(
      <ProfileCard  
        boldText={userData.fullName}
        normalText={userData.userName}
        image={userData.userImage}
        imageEditIcon="true"
      />
    )
  }

  function renderpasswordManage(){
    return(
      <View style={style.passwordManageViewStyle}> 
        <Text style={style.textStyle}>Password & Security</Text>
        <TouchableButton buttonTitle="Manage" textStyle={style.textBlueStyle}/>
      </View>
    )
  }

  const userDetails=[
    {key:"E-Mail",value:userData.email},
    {key:"Phone",value:userData.contactNo},
    {key:"PAN",value:userData.pancardNo},
    {key:"Aadhar No.",value:userData.aadharNo},
  ]
  
  function renderProfileTable(){
    return userDetails.map((value,i)=>{
    return(
      <View key={i} 
      style={{borderColor:"white",justifyContent:"space-between",flexDirection:"row"}}>
        <Text style={style.textStyle}>{value.key}</Text>
        <Text style={{...style.textBlackStyle,paddingBottom:"5%"}}>{value.value}</Text>
      </View>
    )
  })
  }
 
  function renderAccountNoAndSegmnets(){
    return(
      <>
        <View style={style.accountNoViewStyle}>
          <Text style={style.textStyle}>Account No.</Text>
          <Text style={style.textBlackStyle}>{userData.accountNo}</Text>
        </View>

        <View style={{...style.accountNoViewStyle,flexDirection:"column"}}>

          <View style={{...style.accountNoViewStyle,borderWidth:0,padding:0,marginBottom:"3%"}}>
              <Text style={style.textStyle}>Segments</Text>
              <Text style={style.textBlueStyle}>NSE, NFO, BSE, BCD, CDS, MF</Text>
          </View>

          <View style={{...style.accountNoViewStyle,borderWidth:0,padding:0}}>
              <Text style={style.textStyle}>PoA</Text>
              <Text style={style.textBlackStyle}>Inactive</Text>
          </View>

        </View>
      </>
    )
  }

  function renderActiveSession(){
    return(
      <>
      
        <TouchableOpacity style={{...style.accountNoViewStyle,flexDirection:"column"}}>
          <Text style={style.textBlueStyle}>Active sessions</Text>
          <Text style={{...style.textBlackStyle,marginTop:"3%"}}>* {deviceName}</Text>
        </TouchableOpacity>
    
      </>
    )
  }


  return (
    <ScrollView style={{flex:1}}>
      {renderProfileCard()}
      {renderpasswordManage()}
      <View style={{padding:"5%"}}>
        {renderProfileTable()}
        <TouchableButton  textStyle={style.textBlueStyle}  buttonTitle="Manage account" onPress={onPressManageAccount()}/>
      </View>
      {renderAccountNoAndSegmnets()}
      {renderActiveSession()}
    </ScrollView>
  );
}

const style=StyleSheet.create({
  textStyle:{
    fontFamily:"Roboto-Regular",
    fontSize:18,
    color:"grey"
  },
  textBlueStyle:{
    fontFamily:"Roboto-Regular",
    fontSize:18,
    color:"royalblue"
  },
  textBlackStyle:{
    fontFamily:"Roboto-Regular",
    fontSize:18,
    color:"black"
  },
  passwordManageViewStyle:{
    borderColor:"white",
    borderWidth:1,
    borderBottomColor:"lightgrey",
    height:"10%",
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row",
    padding:"5%"
  },
  accountNoViewStyle:{
    flexDirection:"row",
    justifyContent:"space-between",
    padding:"5%",
    borderColor:"white",
    borderWidth:1,
    borderTopColor:"lightgrey",
    borderBottomColor:"lightgrey",
  },


  
})


// previous profile code
// <View>
//     <View style={{width:"100%",flexDirection:"row",borderWidth:2,borderColor:"red",height:80,paddingLeft:20,alignItems:"center"}}>
//         <Text style={{width:"35%",color:"mediumblue",fontSize:20,fontFamily:"Roboto-Medium"}}>Name :</Text>
//         <TextInput style={{width:"64%",color:"black",fontFamily:"Roboto-Medium",fontSize:30,backgroundColor:"grey"}} value={"Gopal Gupta"}/>
//     </View>
//     <View style={{width:"100%",flexDirection:"row",borderWidth:2,borderColor:"red",height:80,paddingLeft:20,alignItems:"center"}}>
//         <Text style={{width:"35%",color:"mediumblue",fontSize:20,fontFamily:"Roboto-Medium"}}>Username :</Text>
//         <TextInput style={{width:"64%",color:"black",fontFamily:"Roboto-Medium",fontSize:30,backgroundColor:"grey"}} value={"Gopal@123"}/>
//     </View>
//     <View style={{width:"100%",flexDirection:"row",borderWidth:2,borderColor:"red",height:80,paddingLeft:20,alignItems:"center"}}>
//         <Text style={{width:"35%",color:"mediumblue",fontSize:20,fontFamily:"Roboto-Medium"}}>Email :</Text>
//         <TextInput style={{width:"64%",color:"black",fontFamily:"Roboto-Medium",fontSize:30,backgroundColor:"grey"}} value={"gg@gmial.com"}/>
//     </View>
//     <View style={{width:"100%",flexDirection:"row",borderWidth:2,borderColor:"red",height:80,paddingLeft:20,alignItems:"center"}}>
//         <Text style={{width:"35%",color:"mediumblue",fontSize:20,fontFamily:"Roboto-Medium"}}>Contact No:</Text>
//         <TextInput style={{width:"64%",color:"black",fontFamily:"Roboto-Medium",fontSize:30,backgroundColor:"grey"}} value={"9892408402"}/>
//     </View>
//     <View style={{width:"100%",flexDirection:"row",borderWidth:2,borderColor:"red",height:80,paddingLeft:20,alignItems:"center"}}>
//         <Text style={{width:"35%",color:"mediumblue",fontSize:20,fontFamily:"Roboto-Medium"}}>Password :</Text>
//         <TextInput style={{width:"64%",color:"black",fontFamily:"Roboto-Medium",fontSize:30,backgroundColor:"grey"}} value={"*********"}/>
//     </View>

// </View>



// <View style={{flex: 1}}>
// <View
//   style={{
//     justifyContent: 'center',
//     height: '25%',
//     width: '100%',
//     alignItems: 'center',
//     marginTop: '10%',
//   }}>
//   <Image
//     source={image ? {uri: image} : profileimg}
//     style={{height: 100, width: 100, borderRadius: 50}}
//   />
//   <Text style={{marginTop: '5%', color: 'black', fontSize: 20}}>
//     Welcome Gopal Gupta
//   </Text>
// </View>
// {!showEditOption && (
//   <TouchableButton
//     buttonTitle="Edit pic"
//     touchableViewStyle={{
//       ...styles.loginViewButton,
//       height: '6%',
//       marginTop: '20%',
//     }}
//     textStyle={styles.loginButton}
//     onPress={() => setShowEditOption(true)}
//   />
// )}

// {showEditOption && (
//   <View>
//     <TouchableButton
//       buttonTitle="Open Camera"
//       touchableViewStyle={{
//         ...styles.loginViewButton,
//         height: '15%',
//         marginTop: '20%',
//       }}
//       textStyle={styles.loginButton}
//       onPress={onPressOpenCamera}
//     />

//     <TouchableButton
//       buttonTitle="Open Gallery"
//       touchableViewStyle={{...styles.loginViewButton, height: '15%'}}
//       textStyle={styles.loginButton}
//       onPress={onPressOpenGallery}
//     />
//   </View>
// )}
// </View>