import _ from 'lodash';
import React, {useState} from 'react';
import {Button, Image, ImageBackground, Keyboard, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import { confirmPass, empty, isMobContact, isName, isPassword, isUsername, popUpConfirmPassword, popUpFullName, popUpPassword, popUpUserName,popUpContactNo, popUpValidEmail, validEmail } from '../../../utils/Validation'
import eyehidechange from '../../../assests/images/hideEye.png'
import eyeicon from '../../../assests/images/iconseye.png'
import { Styles } from '../../../assests/styleSheets/Styles';


export default function Signup({navigation}) {

    const[showPassword,setShowPassword] =useState(false);
    const[showRequired,setShowRequired] =useState("");
    const[showEmpty,setShowEmpty] =useState(false);
    const [signupFeildData, setSignupFeildData] = useState({
        fullName:'',
        userName: '',
        email: '',
        contact_No:'',
        password: '',
        confirmPassword:'',
    });
    function onChangeSignupFields(text, name) {
        let value = text;
        let elementId = name;
        let tempLoginData = _.cloneDeep(signupFeildData);
        tempLoginData[elementId] = value;
        showRequiredInput(elementId,value);
        setSignupFeildData(tempLoginData);
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

            case "confirmPassword" : setShowRequired(confirmPass(value,signupFeildData.password)?null:(empty(value)?null :popUpConfirmPassword()));
            break;

            default : 
        
        }
    } 

    function onShowEyeClick(){ 
        setShowPassword(!showPassword) 
    }

    function handleOnClickSignup(){
        setShowEmpty(true)
        navigation.navigate('login')
    }
    return (
        <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} style={{height:"100%"}}  >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={{flex:1,backgroundColor:"black"}}>
            <ImageBackground source={""} style={{height:"100%"}}>
                <Text style={{color: 'lightblue', fontSize: 30,marginBottom:"6%",textAlign:"center"}}>Marketworld</Text>
                <Text style={{color: '#00ffff', fontSize: 25,textDecorationLine:"underline"}}>SignUp</Text>
                <ScrollView>
                    <View style={{marginBottom:20,marginTop:20}}>
                    <View style={Styles.inlineViewStyle}>
                        <Text style={{color: '#00ffff', fontSize: 25, width:"35%"}}>FullName : </Text>
                        <TextInput
                            placeholder="Enter FullName"
                            placeholderTextColor="white"
                            style={Styles.textInputStyle}
                            onChangeText={text => onChangeSignupFields(text, 'fullName')}
                        />
                    </View>
                    { showEmpty  && empty(signupFeildData.fullName) && <Text style={{color:"red",fontSize:20,textAlign:"center"}}>*Name  cannot be Empty!!</Text> }
                    </View>
                        <View style={{marginBottom:20}}>
                            <View style={Styles.inlineViewStyle}>
                                <Text style={{color: '#00ffff', fontSize: 25,width:"35%"}}>Username : </Text>
                                <TextInput
                                    placeholder="Enter username"r
                                    placeholderTextColor="white"
                                    style={Styles.textInputStyle}
                                    onChangeText={text => onChangeSignupFields(text, 'userName')}
                                />
                            </View>
                            { showEmpty  && empty(signupFeildData.userName) && <Text style={{color:"red",fontSize:20,textAlign:"center"}}>*UserName  cannot be Empty!!</Text> }
                    </View>
                    <View style={{marginBottom:20}}>
                            <View style={Styles.inlineViewStyle}>
                                <Text style={{color: '#00ffff', fontSize: 25,width:"35%"}}>Email :  </Text>
                                <TextInput
                                    placeholder="Enter email"
                                    placeholderTextColor="white"
                                    style={Styles.textInputStyle}
                                    onChangeText={text => onChangeSignupFields(text, 'email')}
                                    />
                            </View>
                            { showEmpty  && empty(signupFeildData.email) && <Text style={{color:"red",fontSize:20,textAlign:"center"}}>*Email  cannot be Empty!!</Text> }
                        </View>
                    <View style={{marginBottom:20}}>
                            <View style={Styles.inlineViewStyle}>
                                <Text style={{color: '#00ffff', fontSize: 25,width:"35%"}}>Contact_No:  </Text>
                                <TextInput
                                    placeholder="Enter ContactNo."
                                    placeholderTextColor="white"
                                    style={Styles.textInputStyle}
                                    onChangeText={text => onChangeSignupFields(text, 'contact_No')}
                                    />
                            </View>
                            { showEmpty  && empty(signupFeildData.contact_No) && <Text style={{color:"red",fontSize:20,textAlign:"center"}}>*Email  cannot be Empty!!</Text> }
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
                                    onChangeText={text => onChangeSignupFields(text, 'password')}
                                    />
                                <TouchableOpacity onPress={onShowEyeClick}>
                                    {showPassword? <Image source={eyehidechange} style={Styles.passwordEye}/>
                                    :  <Image source= {eyeicon}  style={Styles.passwordEye}/>}
                                </TouchableOpacity>
                            </View>
                        </View>
                        { showEmpty  && empty(signupFeildData.password) && <Text style={{color:"red",fontSize:20,textAlign:"center"}}>*Password  cannot be Empty!!</Text> }
                    </View>
                    <View style={{marginBottom:20}}>
                        <View style={Styles.inlineViewStyle}>
                            <Text style={{color: '#00ffff', fontSize: 24 ,width:"35%"}}>ConfirmPass:</Text>
                            <View style={Styles.passwordInputStyle}>
                                <TextInput
                                    placeholder="Confirm password"
                                    placeholderTextColor="lightgrey"
                                    style={{color:'black',fontSize: 20,width:"85%"}}
                                    secureTextEntry={showPassword?false:true}
                                    onChangeText={text => onChangeSignupFields(text, 'confirmPassword')}
                                    />
                            </View>
                        </View>
                        { showEmpty  && empty(signupFeildData.confirmPassword) && <Text style={{color:"red",fontSize:20,textAlign:"center"}}>* Password not match!!</Text> }
                    </View>
                    {showRequired && <Text style={{textAlign:"center"}}>{showRequired}</Text>}
                </ScrollView>

            </ImageBackground>
            
            <View style={{position:"absolute",bottom:1,width:"100%"}}>
                <Button title="Signup" color="green" onPress={handleOnClickSignup} />
                <Button title="Already have a account ? Login!" color="blue" onPress={() =>  navigation.navigate('login') } />
            </View>
        </View>

        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
