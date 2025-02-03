import React, { Component } from 'react'
import { Button, Image, Text, View } from 'react-native'
import errorimg from '../../../assests/images/error.jpg'
import TouchableButton from '../TouchableButton/Index'
export default class ErrorBoundaryScreen extends Component {

    constructor()
    {
        super()
        this.state={
            error:null
        }
        this.renderErrorScreen=this.renderErrorScreen.bind(this);
    }
    static getDerivedStateFromError(){
        return {error:true}
    }
    renderErrorScreen(){
        return(

            <View style={{justifyContent:"center",alignItems:"center",height:"75%",}}>
                    <Image source={errorimg}  style={{height:"80%",width:"75%"}}/>

                <Text style={{color:"black",fontFamily:"Roboto-Medium",fontSize:20}}>Oops! Some thing went Wrong</Text>
                <TouchableButton  buttonTitle="Retry" 
                touchableViewStyle={{width:"45%",alignItems:"center",borderColor:"red",borderWidth:1,backgroundColor:"blue",borderRadius:20,marginTop:"5%"}}  
                textStyle={{color:"white",fontSize:20}}/>            
            </View>
        )

    }


    render() {
        return (
            <View>

                {this.state.error ?  this.renderErrorScreen() : this.props.children}

                
            </View>
        )
    }
}

  
    