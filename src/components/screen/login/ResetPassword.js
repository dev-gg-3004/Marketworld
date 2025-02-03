import React, { useState } from 'react'
import {  View } from 'react-native'
import illustrationImage from "../../../assests/images/resetpassword.jpg"
import { styles } from './LoginNew';
import _ from 'lodash';
import TouchableButton from '../../common/TouchableButton/Index';
import ImageView from '../../common/TextInputImageView/ImageView';
import TextInputImage from '../../common/TextInputImageView/TextInputImage';
import { useDispatch, useSelector } from 'react-redux';
import { notNullUndefined } from '../../../utils/Validation';
import { updateMemberDataStart } from '../../../redux/actions/LoginAction';
import { useNavigation } from '@react-navigation/native';

export default function ResetPassword() {
    const[showPassword,setShowPassword] =useState(false);
    const [fieldData, setFieldData] = useState({
        password: '',
        confirmPassword: '',
    });
    let { forgetMemberData } = useSelector(state => state.adminReducers);
    const dispatch=useDispatch()
    const navigation= useNavigation()
    function onChangeFields(text,name) {
        let value = text;
        let elementId = name;
        let tempLoginData = _.cloneDeep(fieldData);
        tempLoginData[elementId] = value;
        setFieldData(tempLoginData);
    }

    function handleOnClickReset(){
        if(notNullUndefined(forgetMemberData)){

            console.log(forgetMemberData);
            let temp={...forgetMemberData.forgetData,
                "password":fieldData.password,
                "confirmPassword":fieldData.confirmPassword
            }
            dispatch(updateMemberDataStart(temp,forgetMemberData.index))
            navigation.navigate('loginNew')
        }
    }
    function onShowEyeClick(){ 
        setShowPassword(!showPassword) 
    }

    return (
        <View style={{flex:1,backgroundColor:"white"}}>

        <ImageView illustrationImage={illustrationImage}/>
        <TextInputImage 
            title="Reset Password" textStyle={{...styles.loginTextStyle,width:200}} />

        
        <View style={{flex:1,marginTop:40}}>    
            <TextInputImage 
                inputTitle="🔐"  placeholder="password" 
                onChangeText={text => onChangeFields(text, 'password')} 
            />

            <TextInputImage 
                inputTitle="🔐"  passwordPlaceholder="confirm password" 
                onChangeText={text => onChangeFields(text, 'confirmPassword')}
                secure={showPassword?false:true} onShowEyeClick={onShowEyeClick}
            />

            <TouchableButton onPress={handleOnClickReset} touchableViewStyle={{...styles.loginViewButton,height:"12%",marginTop:50}} buttonTitle="Reset"  textStyle={styles.loginButton}/>
            </View>


        </View>
    )
}
