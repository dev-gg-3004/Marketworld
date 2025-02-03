import React, { Fragment } from 'react'
import { Button, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function CustomAlert(props) {

    function renderAlertBox(){
        return(
            <View style={styles.containerStyle}>
                <View style={styles.topContainer}>
                    <Text style={styles.mainTitleStyle}>{props.mainTitle}</Text>   
                   {props.subTitle &&  <Text style={styles.subTitleStyle}>{props.subTitle}</Text> }
                </View>
                <View style={styles.bottomContainer}>
                   {/* {    props.buttonTitleOne && 
                        <TouchableOpacity onPress={props.onPressButtonTitleOne}>
                            <Text style={styles.learMoreStyle}>{props.buttonTitleOne}</Text>
                        </TouchableOpacity> 
                    } */}
                     <View style={{...styles.buttonContainer,width:"35%"}}>
                        <Button title={props.buttonTitleOne} onPress={props.onPressButtonTitleOne} style={{color:"white"}} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title={props.buttonTitleTwo} onPress={props.onPressButtonTitleTwo} style={{color:"white"}} />
                        <Button title={props.buttonTitleThree} onPress={props.onPressButtonTitleThree}  style={{color:"white"}}/>
                    </View>
                </View>
            </View>
        )
    }



    return (
        <View style={{alignItems:"center",height:"100%",justifyContent:"center"}}>
            {props.showPopup && renderAlertBox()}
        </View>
    )
}

const styles=StyleSheet.create({
    mainTitleStyle:{
        fontSize:30,
        color:"white"
    },
    subTitleStyle:{
        fontSize:20,
        color:"white",
        marginTop:10
    },
    topContainer:{
        marginLeft:8,
        marginTop:8,
        height:"65%"
    },
    bottomContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        padding:5,height:"30%",
        marginBottom:10,
        marginRight:5
    },
    learMoreStyle:{
        color:"white",
        textDecorationLine:"underline",
        fontSize:20
    },
    buttonContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:"65%"
    },
    containerStyle:{
        backgroundColor:"mediumblue",
        height:200,
        width:"88%",
        borderRadius:5
    }




})
