import { borderColor } from '@mui/system';
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {BackHandler, Button, Image, ImageBackground, Keyboard, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import { confirmPass, empty, isMobContact, isName, isPassword, isUsername, popUpConfirmPassword, popUpFullName, popUpPassword, popUpUserName, popUpValidEmail, validEmail } from '../../../utils/Validation'
import loginBackground from '../../../assests/images/loginbg.jpg';
import eyehidechange from '../../../assests/images/hideEye.png'
import eyeicon from '../../../assests/images/iconseye.png'
import { Styles } from '../../../assests/styleSheets/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserStart } from '../../../redux/actions/LoginAction';


const Login = ({navigation}) => {
    const[showPassword,setShowPassword] =useState(false);
    const[showRequired,setShowRequired] =useState("");
    const[showEmptyMsg,setShowEmptyMsg] =useState(false);
    const [loginData, setLoginData] = useState({
        userName: '',
        email: '',
        password: '',
    });

    // function setInitialRoute(){
    //     navigation.reset({
    //         index: 0,
    //         routes: [
    //           {
    //             name: 'login',
    //           },
    //         ],
    //       })
    // }
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
        // setInitialRoute()
      }, [])
    const dispatch=useDispatch();
    let stores=useSelector(reduxStoreData);  

    useEffect(()=>{
        if(stores.validUser){
            navigation.navigate('Home')
        }
    
    },[stores.validUser])

    function onChangeLoginFields(text, name) {
        let value = text;
        let elementId = name;
        let tempLoginData = _.cloneDeep(loginData);
        tempLoginData[elementId] = value;
        showRequiredInput(elementId,value);
        setLoginData(tempLoginData);
    }

    function showRequiredInput(elementId,value){
        switch(elementId){
            
            case "fullName" :  setShowRequired(isName(value)?null:(empty(value)?null : popUpFullName()));
            break;

            case "userName" :  setShowRequired(isUsername(value)?null: (empty(value)?null :popUpUserName()));
            break;

            case "email" :  setShowRequired(validEmail(value)?null: (empty(value)?null :popUpValidEmail()));
            break; 

            case "contact_No" : setShowRequired(isMobContact(value)?null:(empty(value)?null :popUpContactNo()));
            break;

            case "password" : setShowRequired(isPassword(value)?null:(empty(value)?null :popUpPassword()));
            break;

            case "confirmPassword" : setShowRequired(confirmPass(value,memberData.password)?null:(empty(value)?null :popUpConfirmPassword()));
            break;

            default : 
        
        }
    } 

    function onShowEyeClick(){ 
        setShowPassword(!showPassword) 
    }

    function handleOnClickLogin(){
        setShowEmptyMsg(true)
        dispatch(loginUserStart(loginData))

    }

    return (
        <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} style={{height:"100%"}}  >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View >
                <ImageBackground source={loginBackground} style={{height:"100%"}}>
                <ScrollView>

                    <Text style={{color: 'lightblue', fontSize: 30,marginBottom:"8%",textAlign:"center"}}>Marketworld</Text>
                    <View style={Styles.inlineViewStyle}>
                        <Text style={{color: '#00ffff', fontSize: 25,textDecorationLine:"underline",marginRight:"20%"}}>Login</Text>
                        <TouchableOpacity onPress={() =>  navigation.navigate('signup') }>
                            <Text style={{color: '#00ffff', fontSize: 25,textDecorationLine:"underline"}}>Signup First!</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginBottom:20,marginTop:20}}>
                        <View style={Styles.inlineViewStyle}>
                            <Text style={{color: '#00ffff', fontSize: 25,width:"35%"}}>Username : </Text>
                            <TextInput
                                placeholder="Enter username"r
                                placeholderTextColor="white"
                                style={Styles.textInputStyle}
                                onChangeText={text => onChangeLoginFields(text, 'userName')}
                            />
                        </View>
                        { showEmptyMsg  && empty(loginData.userName) && <Text style={{color:"red",fontSize:20,textAlign:"center"}}>UserName  cannot be Empty!!</Text> }
                    </View>
                    <View style={{marginBottom:20}}>
                        <View style={Styles.inlineViewStyle}>
                            <Text style={{color: '#00ffff', fontSize: 25,width:"35%"}}>Email :  </Text>
                            <TextInput
                                placeholder="Enter email"
                                placeholderTextColor="white"
                                style={Styles.textInputStyle}
                                onChangeText={text => onChangeLoginFields(text, 'email')}
                                />
                        </View>
                        { showEmptyMsg  && empty(loginData.email) && <Text style={{color:"red",fontSize:20,textAlign:"center"}}>Email  cannot be Empty!!</Text> }
                    </View>
                    <View style={{marginBottom:20}}>
                        <View style={Styles.inlineViewStyle}>
                            <Text style={{color: '#00ffff', fontSize: 25,width:"35%"}}>Password :  </Text>
                            <View style={Styles.passwordInputStyle}>
                                <TextInput
                                    placeholder="Enter password"
                                    placeholderTextColor="lightgrey"
                                    style={{color:'black',fontSize: 20,width:"85%"}}
                                    secureTextEntry={showPassword?false:true}
                                    onChangeText={text => onChangeLoginFields(text, 'password')}
                                    />
                                <TouchableOpacity onPress={onShowEyeClick}>
                                    {showPassword? <Image source={eyehidechange} style={Styles.passwordEye}/>
                                    :  <Image source= {eyeicon}  style={Styles.passwordEye}/>}
                                </TouchableOpacity>
                            </View>
                        </View>
                        { showEmptyMsg  && empty(loginData.password) && <Text style={{color:"red",fontSize:20,textAlign:"center"}}>Password  cannot be Empty!!</Text> }
                    </View>

                {showRequired && <Text style={{textAlign:"center"}}>{showRequired}</Text>}
            </ScrollView>

                </ImageBackground>
                
                <View style={{position:"absolute",bottom:1,width:"100%"}}>
                    <Button title="Login" color="blue" onPress={handleOnClickLogin} />
                    <Button title="Forget Password" color="red" />
                </View>
            </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Login;

function reduxStoreData(store){
    return{
        members: store.adminReducers.members,
        validUser:store.adminReducers.validUser
    }
    
}
