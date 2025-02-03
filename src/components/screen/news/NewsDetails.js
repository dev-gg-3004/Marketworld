import { useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux';
import { isArrayNotNullUndefined, notNullUndefined } from '../../../utils/Validation';

export default function NewsDetails({route}) {
    let {newsList, showLoader} = useSelector(state => state.adminReducers);

    console.log("route",route.params.dataId);
    // const newsData=props.data
    // console.log("newsData",newsData);

    console.log(route.name);
    useEffect(()=>{
        if(isArrayNotNullUndefined(newsList)){

            let tempId=route.params.dataId;
            let filterlist = newsList.filter((value, i) => {
                
                return (i===tempId);
            });
            console.log(filterlist);
        }
    },[])
    return (
        <View>
        
        </View>
    )
}
