import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import TextInputImage from '../components/common/TextInputImageView/TextInputImage';
import TouchableButton from '../components/common/TouchableButton/Index';
import {styles} from '../components/screen/login/LoginNew';
import {createList, deleteList, getAllList, updateList} from './Realm';
import {empty, isArrayNotNullUndefined} from './Validation';

export default function RealmTask() {

  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  const [realmData, setRealmData] = useState([]);

  const [data, setData] = useState({
    username: '',
    contactNo: '',
    _id: 0,
  });

  useEffect(() => {
    getDataFromRealm();
  }, []);

  async function getDataFromRealm() {
    let temp = await getAllList();
    if (!isArrayNotNullUndefined(temp)) {
      setRealmData(temp);
    }
  }

  function onChangeFields(text, name) {
    // let temp = _.cloneDeep(data);
    let temp=JSON.parse(JSON.stringify(data))
    temp[name] = text;
    console.log("temp onChangeFields==>",temp);
    // console.log(temp)
    setData(temp);
  }

  function handleOnPressSubmit(value) {

    if(empty(data.username) || empty(data.contactNo)){
      Alert.alert('please Enter Valid Details')
      return
    }

    if (value === 'Add') {
      let temp = {...data, _id:(Math.random() * 100)};
      createList(temp);
      getDataFromRealm();
      setShowAdd(false);
      setData({ username: '',contactNo: '',_id: ''})
    }
    if (value === 'Delete' && !empty(data.username)) {
      deleteList(data.username);
      getDataFromRealm();
    }
    if (value === 'Update' && !empty(data.username) && !empty(data.contactNo)) {
     
      let tempIndex = realmData.findIndex(value => {
        return value._id === data._id;
      });

      if (tempIndex !== -1) {
        updateList(data)
        setShowAdd(false);
        setShowUpdate(false)
        setData({ username: '',
        contactNo: '',
        _id: '',})


      }
    }
  }

  function handleOnClickDelete(value) {
    console.log("handleOnClickDelete",value);
    deleteList(value);
    getDataFromRealm();
  }

  async function onPressViewDetails() {
    setShowAdd(false);
    setShowDelete(false);
    setShowUpdate(false);
    setShowDetails(true);
  }

  function handleOnClickEdit(value) {
    console.log("handleOnClickEdit",value);
    setShowAdd(false);
    setShowDetails(false);
    // setShowDelete(false);
    setData(value)
    setShowUpdate(!showUpdate);
  }

  function showRealmDetails() {
    return realmData?.map((value, i) => {
      return (
        <View
          key={i}
          style={{
            flexDirection: 'row',
            borderColor: 'blue',
            borderWidth: 1,
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Text
            style={{fontFamily: 'Roboto-Medium',width: '10%', fontSize: 20, color: 'red'}}>
            {value._id}
          </Text>
          <Text style={{fontFamily: 'Roboto-Medium', fontSize: 20,width:"30%",color:"black"}}>
            {value.username}
          </Text>
          <Text style={{fontFamily: 'Roboto-Medium', fontSize: 20,width:"30%",color:"black"}}>
            {value.contactNo}
          </Text>

          <View
            style={{
              width: '25%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => handleOnClickEdit(value)}>
              <Image
                source={require('../assests/images/draw.png')}
                style={{height: 25, width: 25}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOnClickDelete(value)}>
              <Image
                source={require('../assests/images/delete.png')}
                style={{height: 25, width: 25}}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  }

  function addDetails() {
    return (
      <View style={{height: 500}}>
        <TextInputImage
          title="Enter Details"
          textStyle={styles.loginTextStyle}
          inputTitle="＠"
          placeholder="username"
          onChangeText={text => onChangeFields(text, 'username')}
        />
        <TextInputImage
          inputTitle="📞"
          placeholder="Mobile"
          onChangeText={text => onChangeFields(text, 'contactNo')}
        />

        <TouchableButton
          onPress={() => handleOnPressSubmit('Add')}
          touchableViewStyle={{...styles.loginViewButton, height: 40}}
          textStyle={styles.loginButton}
          buttonTitle="submit"
        />
      </View>
    );
  }

  function updateDetails() {
    return (
      <View style={{height: 500}}>
      
        <TextInputImage
          title="Update Details"
          textStyle={styles.loginTextStyle}
          inputTitle="＠"
          value={data.username}
          placeholder="new username"
          onChangeText={text => onChangeFields(text, 'username')}
        />
        <TextInputImage
          inputTitle="📞"
          value={data.contactNo}
          placeholder="Mobile"
          onChangeText={text => onChangeFields(text, 'contactNo')}
        />

        <TouchableButton
          onPress={() => handleOnPressSubmit('Update')}
          touchableViewStyle={{...styles.loginViewButton, height: 40}}
          textStyle={styles.loginButton}
          buttonTitle="submit"
        />
      </View>
    );
  }

  function DeleteDetails() {
    return (
      <View style={{height: 500}}>
        <TextInputImage
          title="Delete Details"
          textStyle={styles.loginTextStyle}
          inputTitle="＠"
          placeholder="username"
          onChangeText={text => onChangeFields(text, 'userName')}
        />

        <TouchableButton
          onPress={() => handleOnPressSubmit('Delete')}
          touchableViewStyle={{...styles.loginViewButton, height: 40}}
          textStyle={styles.loginButton}
          buttonTitle="submit"
        />
      </View>
    );
  }

  function handleOnPressAdd() {
    setShowAdd(!showAdd);
    // setShowDelete(false);
    // setShowUpdate(false);
    setShowDetails(false);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{height: '100%', backgroundColor: 'white'}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1, padding: 10}}>
          <Button onPress={onPressViewDetails} title="View Details" />
          <View style={{paddingTop: 20}}>
            <Button onPress={handleOnPressAdd} title="+Add Detail" />
          </View>
          {showDetails && (
            <View style={{borderColor: 'blue', borderWidth: 2, marginTop: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 20,
                    color: 'blue',
                  }}>
                  _id
                </Text>
                <Text
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 20,
                    color: 'blue',
                  }}>
                  username
                </Text>
                <Text
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 20,
                    color: 'blue',
                  }}>
                  contactNo
                </Text>
                <Text
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 20,
                    color: 'blue',
                  }}>
                  Edit
                </Text>
                <Text
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 20,
                    color: 'blue',
                  }}>
                  Delete
                </Text>
              </View>
              <View>{showRealmDetails()}</View>
            </View>
          )}
          <View style={{marginTop: 20}}>{showAdd && addDetails()}</View>
          <View style={{marginTop: 20}}>{showUpdate && updateDetails()}</View>
          <View style={{marginTop: 20}}>{showDelete && DeleteDetails()}</View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
