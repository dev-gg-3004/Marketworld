import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ImageView from '../../common/TextInputImageView/ImageView'
import TextInputImage from '../../common/TextInputImageView/TextInputImage'
import  illustrationImage from '../../../assests/images/tokenImage.jpg'
import TouchableButton from '../../common/TouchableButton/Index'
import { useDispatch, useSelector } from 'react-redux'
import { getDataUsingTokenStart } from '../../../redux/actions/TokenActions'
import { useNavigation } from '@react-navigation/native'
import { empty, isArrayNotNullUndefined } from '../../../utils/Validation'

export default function TaskOne() {

    let t="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyZWMyQHRyYW1wb2xpbmUuY29tIiwic21heCI6MSwidXNlcl9uYW1lIjoicmVjMkB0cmFtcG9saW5lLmNvbSIsImlzcyI6Imh0dHBzOi8vdGVuYW50MS5yaXBwbGVoaXJlLmNvbS9hdXRoL29hdXRoL3Rva2VuIiwiY29pZCI6Miwic2Vzc2lvbklkIjoiNzU2MDg2NkU5QkU3OUU0MEMzN0I4RDYyQzA2MjVGNkEiLCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl0sInRpZCI6InRlbmFudDEiLCJjbGllbnRfaWQiOiJyaXBwbGVoaXJlIiwiYXVkIjpbInJpcHBsZWhpcmUiXSwibWRsIjpudWxsLCJzc29fZW5hYmxlZCI6ZmFsc2UsInNjb3BlIjpbIm9wZW5pZCIsInJlYWQiLCJ0cnVzdCIsIndyaXRlIl0sImV4cCI6MTY3MjgxNzQ3MiwiaWF0IjoxNjcyODExNDcyLCJqdGkiOiJsMXBsM0w3NjMwNW5aMnh0TVFKSXZYVWpPR3cifQ.bvyPNEkmUKYrfir9QkXxPN6RqZ3D5ixfGvsFojGFZUx3WBwXyqpA1ke2ov1GIs5vVNOaWBap8juRQaA46kx9c4A2G45rflSFWYZVwNaBopORVwUhn2tWfSqm6spDxlhLexcd0_QKQOAcX3kPWEpTFDSkoAbz7gx2mRS_dXfmUaDdX2Sysf5vfdrK1wBpohSjgWdjb8C8nlmBRxxHaRyGF5coRBG8VUxXSpOzWebFPAFq37uRLxH-4rPD4wNwM4_cR_0pM_qTOsCf08oyRiMxf7kuHmEaIQqbWpyNaitXmZskeR07cUKLtNMiQfTl8R6cpkjiv4vQOrfA4cSwucRqCZM6lFqbcxDpXjEqQXMHlQvZS13qSBHjvxen28YqSgOTmbcmsAZint79p3fzqkQUORofpM95MTOqS6PjutWSZvFHOYBIADhKgbiOEQu_YUAk3Y90O3h1ev7fnzXBaWtn3aGtfRQLjLA8XgzrzkMTqQG5wxI8vH5Ia1VUjEOkUjdhPoCOc2aRYPDnnxBhoVXMf0mJSlznkmfubnkZm7wPVH7NghOnBlPi9JmW0kKpK2E31lNrQCroSIEZwOEb2wYrkTgvu4PhabidTTib_HE4c5aG1n8jm_P2zzE7KUmCNn89m0teu10nq8KCnd2gDjzUw9VlkRh7Jls3kT3nv0Zm3I8"
    const [token,setToken] =useState({tokenID:t});
   let {tokenData} =useSelector(state=>state.adminReducers)
   const[showErrorMsg,setShowErrorMsg] =useState(false);

    const dispatch =useDispatch()
    const navigation=useNavigation()
    function onChangeFields(text){
        let temp={...token,"tokenID":text}
        setToken(temp)
    }

    useEffect(()=>{
        if(isArrayNotNullUndefined(tokenData)){
            navigation.navigate('showTokenData')
        }
     
    },[tokenData])


    function handleOnPressSubmit(){
        setShowErrorMsg(true)
        const t="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyZWMyQHRyYW1wb2xpbmUuY29tIiwic21heCI6MSwidXNlcl9uYW1lIjoicmVjMkB0cmFtcG9saW5lLmNvbSIsImlzcyI6Imh0dHBzOi8vdGVuYW50MS5yaXBwbGVoaXJlLmNvbS9hdXRoL29hdXRoL3Rva2VuIiwiY29pZCI6Miwic2Vzc2lvbklkIjoiM0Q1QUEyODVBNDgxQjQwQTYzOTFBQzkzN0M3NjAzMzgiLCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl0sInRpZCI6InRlbmFudDEiLCJjbGllbnRfaWQiOiJyaXBwbGVoaXJlIiwiYXVkIjpbInJpcHBsZWhpcmUiXSwibWRsIjpudWxsLCJzc29fZW5hYmxlZCI6ZmFsc2UsInNjb3BlIjpbIm9wZW5pZCIsInJlYWQiLCJ0cnVzdCIsIndyaXRlIl0sImV4cCI6MTY3Mjc1Mjc0MCwiaWF0IjoxNjcyNzQ2NzQwLCJqdGkiOiI3MkVaTURRN3ZvbU1hUFVxS2VJT1lOdzZmRncifQ.bjuQz_z8JvKvuMbKqbkfz69GCqvrXeJrtVbbJ6dDFlffMRwqXRhLCLz8onBY5qwVLT3SZYAE-yZlXwPDI1vb7ubK83-6DfQF8JKlXma5XdKwNhfa02auzYWIrgpLFWMQpG-FoqIYX6k36gYIk21UwBk7iYnJSUWhIJ7d58uiC7gTIwmDBr6CYKjK87F8gJ5QQ0VjerQe_g4CJANoQWHtoXGRUT3EsGxAqixYmJp4sPoYllL3KvnzyVfofDNHNcGfo2-Ll49SPTaPpMBN9IEJCdjKkMgMOyDCTIL10x2bj2yTprOFN1Mk3MwstGNUf6LX0JlgXhunnqAHnTkiBA6CUVqhEZMrmTWxbnnH5bLWsleBP_QvORAeZWb0oz7heIYRiSND7C3VPNldJQVAmKNq7JpNdVOANTFbPw605Z9_OjO8Yry0V3mLDwzrqe00LdSPjPUzmWjHnDfrKpktJj4F5V1fUDzYibb3UG0gOaKzDH2bysNiTo49ZY8kp5YjA_4wXCNAtYI_9XvLiBFlFjRIW6-HuUIrWBKCKesqvqizC_hR0l-eEqM2FGE2gPsR_aVOFaB-s49C0VPZP4r1djvquHrSmVRHHyBvFA5i58qwoVTeVrQZWvQtGgwB95XYdbCH80AJETkYbPtP82WHZUdiBe0J45pd4Gr_vbsyYl5AVWQ"
        // setToken(t)
        dispatch(getDataUsingTokenStart(token.tokenID))
    }

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>

            <View style={{flex:0.45}}>

                <ImageView  illustrationImage={illustrationImage} />
            </View>

            <TextInputImage title="UseToken"  
                textStyle={{ color: 'black',
                fontSize: 35,
                fontFamily: 'Roboto-Medium',}}
            />

            <TextInputImage
                inputTitle="🔐"
                placeholder="Enter Token"
                value={token.tokenID}
                onChangeText={text => onChangeFields(text)}
            />
            {
                !empty(token.tokenID)  && showErrorMsg && !isArrayNotNullUndefined(tokenData) &&
                <Text style={styles.emptyErrorMsgStyle}>* Enter valid Token!!</Text>

            }
         

            <TouchableButton
                onPress={handleOnPressSubmit}
                touchableViewStyle={{...styles.loginViewButton, height: 45}}
                buttonTitle="submit"
                textStyle={styles.loginButton}
            />

        </View>
    )
}

const styles=StyleSheet.create({
    loginViewButton: {
        width: '90%',
        alignSelf: 'center',
        height: '10%',
        borderRadius: 15,
        backgroundColor: '#1e90ff',
        justifyContent: 'center',
        paddingTop: 1,
        marginTop: 40,
    }, 
    loginButton: {
    color: 'white',
    height: '100%',
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    fontSize: 25,
    },
    emptyErrorMsgStyle: {
        color: 'red',
        fontSize: 20,
        textAlign: 'center',
      },
})