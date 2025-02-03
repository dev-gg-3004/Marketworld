import React from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Styles } from '../../screen/login/ForgetPassword'
import { styles } from '../../screen/login/LoginNew'
import eyehidechange from '../../../assests/images/hideEye.png'
import eyeicon from '../../../assests/images/iconseye.png'


export default function TextInputImage(props) {

    return (

        <View style={{paddingLeft:40}}>
           {props.title &&  <Text style={{...props.textStyle,marginBottom:20,marginTop:10}}>{props.title}</Text>}

            { 
                props.placeholder && !props.passwordPlaceholder &&
                <View style={{flexDirection:"row",alignItems:"center",marginBottom:15}}>
               { props.inputTitle && <Text style={style.userNamePasswordIconStyle}>{props.inputTitle}</Text>}
               { props.image && <View style={{width:"15%"}}><Image source={props.image} style={props.imageStyle}/></View>}
                <TextInput
                    placeholder={props.placeholder}
                    style={styles.userNameInputStyle}
                    value={props.value}
                    onChangeText={ props.onChangeText}
                    placeholderTextColor="lightgrey"
                    secureTextEntry={props.placeholder==="password"? true:false}
                />
                </View>
            }
            { 
                props.passwordPlaceholder && 
                <View style={{flexDirection:"row",alignItems:"center",marginBottom:15}}>
                    { props.inputTitle && <Text style={style.userNamePasswordIconStyle}>{props.inputTitle}</Text>}
                    { props.image && <View style={{width:"15%"}}><Image source={props.image} style={props.imageStyle}/></View>}
                    <View style={style.passwordViewStyle}>
                        <TextInput
                            placeholder={props.passwordPlaceholder}
                            placeholderTextColor="lightgrey"
                            style={style.passwordInputStyle}
                            onChangeText={ props.onChangeText}
                            secureTextEntry={props.secure}
                        />
                        <TouchableOpacity onPress={props.onShowEyeClick}>
                        {props.secure? <Image source={eyehidechange} style={Styles.passwordEye}/>
                        :  <Image source= {eyeicon}  style={Styles.passwordEye}/>}
                        </TouchableOpacity>
                    </View>
                </View>
            }
    </View>
    )
}

const style=StyleSheet.create({
    userNamePasswordIconStyle:{
        fontSize: 30,
        width:"15%",
        color:"grey"

    },
    passwordViewStyle:{
        flexDirection:"row",
        width:"70%",
        borderBottomColor:"grey",
        borderBottomWidth:1,
        alignItems:"center",
        justifyContent:"space-between"
    },
    passwordInputStyle:{
        width:"85%",
        color:"black", 
        fontSize:26
    },
})