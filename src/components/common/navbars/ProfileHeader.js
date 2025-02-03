import React, { useEffect } from 'react'
import {  StyleSheet, TextInput, View } from 'react-native'
import { getNewsListStart } from '../../../redux/actions/NewsActions'
import { useDispatch } from 'react-redux'
import { getStockListStart } from '../../../redux/actions/StockActions'


export default function ProfileHeader(props) {


    let dispatch=useDispatch();
    
    useEffect(()=>{
        dispatch(getStockListStart());
        dispatch(getNewsListStart());
    },[])

    function renderProfileHeader() {

        return (
            <View style={styles.profileHeader}>
                <View>
                    <TextInput keyboardType="search" placeholder='Search Here.. '
                        style={{height:50,fontSize:18}}  placeholderTextColor="black" 
                        onChangeText={props.handleOnChangeSearchBar}
                    ></TextInput>
                </View>
             
            </View>
        )
    }

    return (
        <View style={{position: "relative"}}>
            {renderProfileHeader()}
        </View>
    )
}


const styles= StyleSheet.create({

    profileHeader:{
        flexDirection:"row",
        alignItems:"center",
        padding:8,
        height: 50,
        backgroundColor: 'rgb(83, 200, 205)',
        textDecorationColor:"black",
    }   
}
)