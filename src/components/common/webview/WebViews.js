import React from 'react'
import WebView from 'react-native-webview'

export default function WebViews({route}){
    const { URI } = route.params;
    console.log(URI);

    return <WebView source={{uri:URI}}/>
}

