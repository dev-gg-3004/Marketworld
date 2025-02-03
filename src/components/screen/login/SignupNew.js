import _ from 'lodash';
import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import TouchableButton from '../../common/TouchableButton/Index';
import { styles } from './LoginNew';
import illustrationImage from "../../../assests/images/newsignup.png"
import { empty } from '../../../utils/Validation';
import { addMembersDataStart, getMembersDataStart } from '../../../redux/actions/LoginAction';
import { useDispatch, useSelector } from 'react-redux';
import { createSession } from '../../../utils/Session';
import ImageView from '../../common/TextInputImageView/ImageView';
import TextInputImage from '../../common/TextInputImageView/TextInputImage';
import userpng from '../../../assests/images/user.png'

export default function SignupNew({navigation}) {

    const[showEmptyMsg,setShowEmptyMsg] =useState(false);
    const[showPassword,setShowPassword] =useState(false);
    const[showExtraField, setShowExtraField] =useState(false)

    const [signupFeildData, setSignupFeildData] = useState({
        fullName:'',
        userName: '',
        email: '',
        contactNo:'',
        password: '',
        confirmPassword:'',
    });

    let stores=useSelector(reduxStoreData);  
    let dispatch=useDispatch()


    useEffect(()=>{
        dispatch(getMembersDataStart())   // calling members api data 
    },[])

    function onChangeSignupFields(text, name) {
        let value = text;
        let elementId = name;
        let tempLoginData = _.cloneDeep(signupFeildData);
        tempLoginData[elementId] = value;
        setSignupFeildData(tempLoginData);
    }

    function onShowEyeClick(){ 
        setShowPassword(!showPassword) 
    }

    function handleOnClickContinue(){
        setShowEmptyMsg(true)
        if(!(empty(signupFeildData.fullName) ||  empty(signupFeildData.email) || empty(signupFeildData.contactNo))){
            setShowExtraField(true)
        }
    }

    function handleOnClickSignup(e){
        setShowEmptyMsg(false)
        e.preventDefault()
        console.log(signupFeildData);
        if(!( empty(signupFeildData.userName)  
         || empty(signupFeildData.password) || empty(signupFeildData.confirmPassword))){
             
            let id= stores.members.length+1;
            console.log(stores.members.length);
            const userData={...signupFeildData,role:"user",userid:id}
            addMoreUser(userData);
            createSession(userData);
            dispatch(addMembersDataStart(userData));
            navigation.navigate('loginNew')
        }
    }
    function addMoreUser(userData){
        let temp=_.cloneDeep(stores.members)
        temp.push(userData);
        // sessionStorage[allMemberData()]=JSON.stringify(temp)
        navigation.navigate('loginNew' , {state:{newData:temp}})
        alert("sign Up succeessfully")
    }

    function showFirstField(){
        return(
            <>
                <TextInputImage 
                    inputTitle="＠"  placeholder="abc@gmail.com" 
                    onChangeText={text => onChangeSignupFields(text, 'email')} 
                />
                {   
                    showEmptyMsg  && empty(signupFeildData.email) && 
                    <Text style={styles.emptyErrorMsgStyle}>Email  cannot be Empty!!</Text>
                }
                <TextInputImage 
                    image={userpng} imageStyle={{height:35,width:35}} placeholder="Full Name" 
                    onChangeText={text => onChangeSignupFields(text, 'fullName')} 
                />
                {   
                    showEmptyMsg  && empty(signupFeildData.fullName) && 
                    <Text style={styles.emptyErrorMsgStyle}>Name cannot be Empty!!</Text>
                }
                <TextInputImage
                    inputTitle="📞"  placeholder="Mobile" 
                    onChangeText={text => onChangeSignupFields(text, 'contactNo')} 
                />
                {   
                    showEmptyMsg  && empty(signupFeildData.contact_No) && 
                    <Text style={styles.emptyErrorMsgStyle}>Mobile number  cannot be Empty!!</Text>
                }
        
            </>
        )
    }

    function showSecondField(){
        return(
            <>
                <TextInputImage 
                    inputTitle="＠"  placeholder="Enter user'id" 
                    onChangeText={text => onChangeSignupFields(text, 'userName')} 
                />
                {   
                    !showEmptyMsg  && empty(signupFeildData.userName) && 
                    <Text style={styles.emptyErrorMsgStyle}>   User'id  cannot be Empty!!</Text>
                }

                <TextInputImage 
                    inputTitle="🔐"  placeholder="password" 
                    onChangeText={text => onChangeSignupFields(text, 'password')} 
                />
                {   
                    !showEmptyMsg  && empty(signupFeildData.password) && 
                    <Text style={styles.emptyErrorMsgStyle}>Password cannot be Empty!!</Text>
                }  
                <TextInputImage 
                    inputTitle="🔐"  passwordPlaceholder="confirm password" 
                    onChangeText={text => onChangeSignupFields(text, 'confirmPassword')}
                    secure={showPassword?false:true} onShowEyeClick={onShowEyeClick}
                />
                  {   
                    !showEmptyMsg  && empty(signupFeildData.confirmPassword) && 
                    <Text style={styles.emptyErrorMsgStyle}>Password should match!!</Text>
                }
            </>
        )
    }
    return (
        <View style={{flex:1,backgroundColor:"white"}}>
         
            <ImageView illustrationImage={illustrationImage} title="Sign up" textStyle={styles.loginTextStyle}/>
            <TextInputImage 
                title="Sign up" textStyle={styles.loginTextStyle}
            />
            <View style={{flex:1}}>
                { !showExtraField && showFirstField()}
                { 
                !showExtraField &&  <TouchableButton onPress={handleOnClickContinue} touchableViewStyle={{...styles.loginViewButton,height:"11%"}} buttonTitle="Continue"  textStyle={styles.loginButton}/>
                }
                { showExtraField && showSecondField()}
                { 
                showExtraField &&  <TouchableButton onPress={handleOnClickSignup} touchableViewStyle={styles.loginViewButton} buttonTitle="Submit"  textStyle={styles.loginButton}/>
                }

            </View>
        </View>
    )
}

function reduxStoreData(store){
    return{
        members: store.adminReducers.members,
        singleMemberData: store.adminReducers.singleMemberData,
    }
    
}


