import React, { useEffect, useState } from 'react'
import {  StyleSheet, Text, View } from 'react-native'
import { styles } from './LoginNew'
import illustrationImage from "../../../assests/images/forgetPassword.jpg"
import TouchableButton from '../../common/TouchableButton/Index'
import _ from 'lodash'
import { empty, isArrayNotNullUndefined, isUsername } from '../../../utils/Validation'
import ImageView from '../../common/TextInputImageView/ImageView'
import TextInputImage from '../../common/TextInputImageView/TextInputImage'
import { useDispatch, useSelector } from 'react-redux'
import { getMembersDataStart, storeForgetPasswordMemberData } from '../../../redux/actions/LoginAction'

export default function ForgetPassword({navigation}) {
    const[showEmptyMsg,setShowEmptyMsg] =useState(false);
    const[showErrorMsg,setShowErrorMsg] =useState("");
    const [fieldData, setFieldData] = useState({
        userName: '',
    });
    let stores=useSelector(reduxStoreData);  
    let storeUserData=stores.members
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getMembersDataStart())   // calling members api data 
    },[])


    function onChangeField(text,name) {
        let value = text;
        let elementId = name;
        let tempLoginData = _.cloneDeep(fieldData);
        tempLoginData[elementId] = value;
        setFieldData(tempLoginData);
    }

    function handleOnClickSubmit(){
        let isSuccess=false;
        setShowEmptyMsg(true)

        if(isArrayNotNullUndefined(storeUserData) && isUsername(fieldData.userName)) {
            
            for(let i = 0;i<storeUserData.length;i++){
                let obj=storeUserData[i]
                if(fieldData.userName===obj.userName ){
                    console.log(obj);
                    console.log("i",i);
                    dispatch(storeForgetPasswordMemberData(obj,i))
                    isSuccess=true
                    break;
                }
            }

            if(!isSuccess){
                setShowErrorMsg('UserName is Not Valid')
                return 
            }

            navigation.navigate('verifyOTP')
        }
    }

    return (
        <View style={{flex:1,backgroundColor:"white"}}>
          
            <ImageView illustrationImage={illustrationImage}  illustrationImageStyle={{height:"90%", width:"90%"}}/>
            <TextInputImage 
                title="Forget password? " textStyle={{...styles.loginTextStyle,width:200}}
            />
            <View style={{flex:1,paddingTop:"2%"}}>
                <Text style={Styles.descriptionTextStyle}>Don't worry! it happens. Please enter the address associated with your account.</Text>
            
                <View style={{ paddingTop:"10%", marginBottom:"10%"}}>
                    <TextInputImage 
                        inputTitle="＠"  placeholder="Username" 
                        onChangeText={text => onChangeField(text,"userName")} 
                    />
                    {   
                        showEmptyMsg  && empty(fieldData.userName) && 
                        <Text style={styles.emptyErrorMsgStyle}>* Fields cannot be Empty!!</Text>
                    }
                    {   
                        showEmptyMsg  && !empty(showErrorMsg) && 
                        <Text style={styles.emptyErrorMsgStyle}>{showErrorMsg}</Text>
                    }
                </View>
                <TouchableButton onPress={handleOnClickSubmit} touchableViewStyle={{...styles.loginViewButton,height:"12%"}} buttonTitle="Submit"  textStyle={styles.loginButton}/>
            </View>
        </View>
    )
}

function reduxStoreData(store){
    return{
        members: store.adminReducers.members,

    }
    
}

export const Styles=StyleSheet.create({
    descriptionTextStyle:{
        color:"grey", 
        fontSize:20,
        fontFamily:"Roboto-Bold",
        width:"90%",
        marginLeft:35,
        marginTop:10

    },inlineViewStyle:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
       
    }
})