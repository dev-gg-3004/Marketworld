import _ from 'lodash';
import React, {useState} from 'react';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {useSelector} from 'react-redux';

export default function CheckCAGR() {
  const [listValue, setListValue] = useState();
  const [displayCAGR, setDisplayCAGR] = useState(false);
  const [inputFieldData, setInputFieldData] = useState({
    quantity: '',
    buyPrice: '',
    holdTime: '',
  });
  const {stockList, showLoader} = useSelector(state => state.adminReducers);
  const [modalVisible, setModalVisible] = useState(true);
  function handleOnChangeName(item) {
    let temp = item;
    // let tempvalue=_.cloneDeep(stockList);

    // let data=tempvalue.find((value)=>{    // used find method bcz we have to return  one object not array of object
    //     return value.chartName===temp;
    // })
    // setListValue(data);
  }
  function onChangeInputField(text, id) {
    let temp = id;
    let value = text;
    let updatedData = _.cloneDeep(inputFieldData);
    updatedData[temp] = parseInt(value);
    setInputFieldData(updatedData);
  }

  function handleOnClickCheckCAGR() {
    console.log("working");
    let totalprice = inputFieldData.quantity * inputFieldData.buyPrice;
    let currentPriceTotal = listValue.highPrice * inputFieldData.quantity;
    let returnamount = currentPriceTotal - totalprice; // currentprice-investedprice
    let ROI = (returnamount * 100) / totalprice; //total return percentage on investment
    let stockCAGR = ROI / inputFieldData.holdTime; //cagr by holding year
    console.log("stockCAGR",stockCAGR);
    return (
      <View>
        <Text>{listValue.chartName}</Text>
        <View>
          <Text>Total Return ::</Text>
          <Text>{returnamount}</Text>
        </View>
        <View>
          <Text>ROI ::</Text>
          <Text>{ROI} %</Text>
        </View>
        <View>
          <Text> CAGR ::</Text>
          <Text>{stockCAGR} PA</Text>
        </View>
        <View>
          <Button title="Close" onPress={() => setDisplayCAGR(false)} />
        </View>
      </View>
    );
  }

  function onSelectItem(item){
    setListValue(item);
  }

  function renderCagrForm() {

    return (
      <View style={{padding: '5%', height: '100%'}}>
        <View style={style.inlineStyle}>
          <Text style={style.textStyle}>Enter Stock Name :</Text>
          <View style={{width:"50%",borderRadius:20,}}>
            <Dropdown 
                inputSearchStyle={{backgroundColor:"skyblue"}}
                search
                data={stockList  ?? []}
                valueField={"chartName"}
                labelField={"chartName"}
                // value={value}
                onChange={onSelectItem}
                onFocus={() => console.log(true)}
                onBlur={() => console.log(false)}
                placeholder={ 'Select here'}
                searchPlaceholder="Search..."
                style={{backgroundColor:"#00ced1",borderRadius:20}}
            />
          </View>
        </View>
        <View style={style.inlineStyle}>
          <Text style={style.textStyle}>Enter Quantity Size :</Text>
          <TextInput
            placeholder={'Quantity Size'}
            placeholderTextColor="black"
            style={style.textInputStyle}
            onChangeText={text => onChangeInputField(text, 'quantity')}
          />
        </View>
        <View style={style.inlineStyle}>
          <Text style={style.textStyle}>Enter Buying Price :</Text>
          <TextInput
            placeholder={'Buying Price'}
            placeholderTextColor="black"
            style={style.textInputStyle}
            onChangeText={text => onChangeInputField(text, 'buyPrice')}
          />
        </View>
        <View style={style.inlineStyle}>
          <Text style={style.textStyle}>Holding Years :</Text>
          <TextInput
            placeholder={'No. of Holding Peroid'}
            placeholderTextColor="black"
            style={style.textInputStyle}
            onChangeText={text => onChangeInputField(text, 'holdTime')}
          />
        </View>
        <View style={{marginTop: '10%'}}>
          <Button
            title="Check CAGR"
            onPress={() => {
              setDisplayCAGR(false);
              handleOnClickCheckCAGR()
            }}
          />
        </View>
      </View>
    );
  }

  function onPressCancel(){
    setModalVisible(false)
  }

  function onPressConfirm(){
    setModalVisible(false)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{height:"100%"}}>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{backgroundColor: 'grey'}}>
          {renderCagrForm()}
          {/* {displayCAGR && handleOnClickCheckCAGR()}  */}
          </View>
        </TouchableWithoutFeedback>
        {/* <Modal animationType="slide" transparent={true} visible={modalVisible} 
         >
        <CustomAlert showPopup="false" onPressCancel={onPressCancel} onPressConfirm={onPressConfirm}/>
        </Modal> */}
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth:2,
    borderColor:"red"
},
  inlineStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  textStyle: {
    color: '#00ffff',
    fontSize: 20,
    width: '50%',
  },
  textInputStyle: {
    color: 'black',
    fontSize: 15,
    backgroundColor: '#00ced1',
    width: '50%',
    borderRadius: 20,
  },
});



// import React from "react";
// import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar } from "react-native";

// const DATA = [
//   {
//     title: "Main dishes",
//     data: ["Pizza", "Burger", "Risotto"]
//   },
//   {
//     title: "Sides",
//     data: ["French Fries", "Onion Rings", "Fried Shrimps"]
//   },
//   {
//     title: "Drinks",
//     data: ["Water", "Coke", "Beer"]
//   },
//   {
//     title: "Desserts",
//     data: ["Cheese Cake", "Ice Cream"]
//   }
// ];

// const Item = ({ title }) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
// );

// const CheckCAGR = () => (
//   <SafeAreaView style={styles.container}>
//     <SectionList
//       sections={DATA}
//       keyExtractor={(item, index) => item + index}
//       renderItem={({ item }) => <Item title={item} />}
//       renderSectionHeader={({ section: { title } }) => (
//         <Text style={styles.header}>{title}</Text>
//       )}
//     />
//   </SafeAreaView>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: StatusBar.currentHeight,
//     marginHorizontal: 16
//   },
//   item: {
//     backgroundColor: "#f9c2ff",
//     padding: 20,
//     marginVertical: 8
//   },
//   header: {
//     fontSize: 32,
//     backgroundColor: "#fff"
//   },
//   title: {
//     fontSize: 24
//   }
// });

// export default CheckCAGR;