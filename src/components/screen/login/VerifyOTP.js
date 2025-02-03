import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { Image, Text, TextInput, View } from 'react-native'
import illustrationImage from "../../../assests/images/newotp.png"
import { Styles } from './ForgetPassword';
import TouchableButton from '../../common/TouchableButton/Index';
import { styles } from './LoginNew'
import keyIcon from '../../../assests/images/password.png'
import ImageView from '../../common/TextInputImageView/ImageView';
import { notNullUndefined } from '../../../utils/Validation';
import { useSelector } from 'react-redux';

export default function VerifyOTP({navigation}) {
  
    const [showRegenerateOTP,setShowRegenerateOTP]=useState(false)
    const[checkOTP,setCheckOTP]=useState('');
    let { forgetMemberData } = useSelector(state => state.adminReducers);

    useEffect(()=>{
        generateOTP();
    },[])

    function generateOTP(){
        let digits='0123456789';
        let OTP='';

        for( let i=0;i<6;i++){
            OTP+=digits[Math.floor(Math.random()*10)]
        }
        setCheckOTP(OTP)
        console.log(checkOTP);
        return alert("your one Time Password is :" + OTP)
    }
 
    function verifyOTP(text){
        let temp=text;
        if(temp.length===6){
            console.log(checkOTP);
            if(notNullUndefined(checkOTP)){
                if(temp===checkOTP){
                    navigation.navigate('resetPassword')
                }
                else {
                    setShowRegenerateOTP(true)
                    alert("enter Valid OTP")

                }
            }
        }
        
    }
    function handleOnClickVerify(){
        // navigation.navigate('resetPassword')
        console.log("forgetMemberData",forgetMemberData.forgetData);
    }

    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            <ImageView illustrationImage={illustrationImage} title="Enter OTP" textStyle={styles.loginTextStyle}/>

            <View style={{flex:1}}>
                <Text style={{...Styles.descriptionTextStyle,}}>An 6 digit code has been sent to +91{forgetMemberData.forgetData.contactNo}</Text>
                <View style={{...Styles.inlineViewStyle, marginTop:50, marginBottom:100}}>
                    <TextInput
                        placeholder="Enter OTP"
                        style={{...styles.userNameInputStyle,fontSize:22,width:"50%",paddingLeft:50}}
                        onChangeText={text => verifyOTP(text)}
                    />
                    <Image source={keyIcon} style={{height:50,width:50}}/>
                </View>
            { showRegenerateOTP && <TouchableButton onPress={generateOTP} buttonTitle="Regenerate OTP" touchableViewStyle={{...styles.loginViewButton,backgroundColor:"white"}} textStyle={{...styles.loginButton,color:"blue",fontSize:20}}  />}
                <TouchableButton onPress={handleOnClickVerify} touchableViewStyle={styles.loginViewButton} buttonTitle="Verify"  textStyle={styles.loginButton}/>
            </View>

        </View>
    )
}
