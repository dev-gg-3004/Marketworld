import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import Main from './src/Main'
import store from './src/redux/Store'
import Task from './src/Task';


export default function App() {
  return  (
    <Provider store={store} >
      <Main />
    </Provider>
  )
}