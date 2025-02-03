import {debounce} from 'lodash';
import React, {Component} from 'react';
import {
  Button,
  FlatList,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {getSession} from '../../../utils/Session';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';

import {
  isArrayNotNullUndefined,
  notNullUndefined,
} from '../../../utils/Validation';
import StockCard from '../../common/stockcard/StockCard';
import StockModalCard from '../../common/stockcard/StockModalCard';
import TouchableButton from '../../common/TouchableButton/Index';
import { setCounterValueArray, updateMemberDataStart } from '../../../redux/actions/LoginAction';

class StocksByClass extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: {},

      data: [],
      stockData: this.props.stockList,
      watchListAddArray: [],

      isOpen: false,
      titleID: 'All',
      searchValue: '',
      modalVisible: false,
      counterValue:0,
    };
    this.sheetRef = React.createRef();
    this.watchList = [
      'All',
      'watchList 1',
      'watchList 2',
      'watchList 3',
      'watchList 4',
    ];
    this.snapPoints = ['40', '70'];
  }
  // componentWillMount(){
  //   console.log("states before ",this.state);

  //   this.setState({
  //     ...this.state,titleID:"1"
  //   })
  // }

  componentWillUnmount(){
    this.props.dispatch(setCounterValueArray(this.state.counterValue))
  }

  componentDidMount() {
    // console.log("states after ",this.state);

    this.getUserSession();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.titleID !== this.state.titleID) {
      if (this.state.titleID === 'All') {
        this.setState({...this.state, stockData: this.props.stockList});
        return;
      }

      if (this.state.searchValue === '') {
        let filterlist = this.state.userData?.watchList?.filter((value, i) => {
          return value.watchListKey === this.state.titleID;
        });
        this.setState({
          ...this.state,
          stockData: filterlist,
        });
      }
    }
    if (prevState.searchValue !== this.state.searchValue) {
      let text = this.state.searchValue;
      let tempupper = text.toUpperCase();
      let filterlist = [];
      if (this.state.titleID === 'All') {
        filterlist = this.props.stockList.filter((value, i) => {
          let stockName = value.chartName.toUpperCase();
          return stockName.includes(tempupper);
        });
      } else {
        filterlist = this.state.userData?.watchList.filter((value, i) => {
          let stockName = value.chartName.toUpperCase();
          return (
            stockName.includes(tempupper) &&
            value.watchListKey === this.state.titleID
          );
        });
      }

      this.setState({...this.state, stockData: filterlist});
    }
  }

  getUserSession = async () => {
    let session = await getSession();

    if (session) {
      this.setState({...this.state, userData: session});
    }
  };

  handleOnPressWatchlistTab = item => {
    this.setState({...this.state, titleID: item});
  };

  handleOnPressStock = (item, index) => {
    this.setState({...this.state, data: item, isOpen: true});

    this.sheetRef.current?.snapToIndex(0);
  };

  onChangeSearchbar = text => {
    console.log('text', text);
    this.setState({
      ...this.state,
      searchValue: text,
    });
  };

  debouncedResults = debounce(text => {
    this.onChangeSearchbar(text);
  }, 500);

  onPressAddWatchlistKeyArray = watchlistKey => {
    let tempwatchlist = [...this.state.watchListAddArray];

    if (tempwatchlist.length === 0) {
      let temp = [...this.state.watchListAddArray, watchlistKey];
      this.setState({...this.state, watchListAddArray: temp});
      return;
    } else {
      let tempIndex = tempwatchlist.indexOf(watchlistKey);
      if (tempIndex !== -1) {
        tempwatchlist.splice(tempIndex, 1);
        this.setState({...this.state, watchListAddArray: tempwatchlist});
        console.log('tempwatchlist', tempwatchlist);
        return;
      }
      let temp = [...this.state.watchListAddArray, watchlistKey];
      console.log('temp', temp);
      this.setState({...this.state, watchListAddArray: temp});
    }
  };

  addToWatchListFinal(){
      
    let temp=[...this.state.watchListAddArray] // only keys
    let newStockData={}
    tempArray=[]
    if(temp.length===0)  return 
    temp.map((value,i)=>{      //newArray is userWatchlist array
        newStockData = {...this.state.data,"watchListKey":value}   // 
        tempArray.push(newStockData)
    })
    let updateUserWatchListData=[...this.state.userData?.watchList]
    for(let i=0; i<tempArray.length;i++){
        updateUserWatchListData.push(tempArray[i])
    }
    let newUserData={...this.state.userData,"watchList":updateUserWatchListData}
    this.props.dispatch(updateMemberDataStart(newUserData,0))
    this.setState({...this.state,modalVisible:false,userData:newUserData,watchListAddArray:[]})
  }
        
  renderHeader() {
    return (
      <View
        style={{
          alignItems: 'center',
          marginBottom: 30,
          backgroundColor: '#e6e6fa',
          height: 40,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '86%',
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 5,
            position: 'absolute',
            marginTop: 15,
            backgroundColor: 'white',
          }}>
          <TouchableButton
            buttonTitle="🔍"
            textStyle={{fontSize: 22, marginLeft: 15}}
          />
          <TextInput
            placeholder="Search & add"
            placeholderTextColor="black"
            style={{fontSize: 20, marginLeft: 15, width: '55%', color: 'black'}}
            onChangeText={text => this.debouncedResults(text)}
          />
          <Text style={{color: 'grey', fontSize: 18}}>25/50</Text>
          <TouchableButton
            buttonTitle="☵"
            textStyle={{
              fontSize: 22,
              marginLeft: 5,
              paddingLeft: 10,
              color: 'darkgrey',
            }}
          />
        </View>
      </View>
    );
  }
  renderCounter(){
    return(
      <View style={{flexDirection:"row",justifyContent:"center",height:50,alignItems:"center"}}>

        <Button title='Counter -' onPress={()=>this.setState({...this.state,counterValue:this.state.counterValue-1})}/><Text style={{fontSize:20,color:"black"}}>{this.state.counterValue}</Text>
        <Button title='Counter +' onPress={()=>this.setState({...this.state,counterValue:this.state.counterValue+1})}/>
      </View>
    )
  }

  renderStockCardModal = () => {
    if (!notNullUndefined(this.state.data)) return;

    return <StockModalCard dataItem={this.state.data} />;
  };

  renderWatchlistItem = ({item}) => (
    <TouchableOpacity onPress={() => this.handleOnPressWatchlistTab(item)}>
      <Text
        style={
          this.state.titleID === item
            ? styles.watchlistChildTextColorChange
            : styles.watchlistChildText
        }>
        {item}
      </Text>
    </TouchableOpacity>
  );

  renderequityStocks() {
    if (isArrayNotNullUndefined(this.state.stockData)) {
      return (
        <View style={{flex: 1}}>
          <FlatList
            data={this.state.stockData}
            style={{
              opacity: this.state.isOpen ? 0.2 : 1,
              backgroundColor: this.state.isOpen ? 'grey' : 'white',
            }}
            keyExtractor={(item, index) => index}
            // ListHeaderComponent={renderHeader()}    ///////////////////
            // onEndReached={() => console.log('on End Reached')}
            onEndReachedThreshold={0.5}
            renderItem={({item, i}) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => this.handleOnPressStock(item)}>
                  <StockCard
                    chartName={item.chartName}
                    highPrice={item.highPrice}
                    values={item}
                    onPressAddWatchlist={() =>
                      this.setState({
                        ...this.state,
                        modalVisible: true,
                        data: item,
                      })
                    }
                    type={this.state.titleID}
                  />
                </TouchableOpacity>
              );
            }}
          />
          {this.state.isOpen && (
            <BottomSheet
              ref={this.sheetRef}
              snapPoints={this.snapPoints}
              enablePanDownToClose={true}
              onClose={() => this.setState({...this.state, isOpen: false})}>
              <BottomSheetScrollView>
                {this.renderStockCardModal()}
              </BottomSheetScrollView>
            </BottomSheet>
          )}
        </View>
      );
    }
  }

  renderAddWatchListOption = () => {
    let temp = [...this.state.watchListAddArray];
    return this.watchList.map((watchlistKey, i) => {
      let tempIndex = temp.indexOf(watchlistKey);
      return (
        <View key={i}>
          {watchlistKey !== 'All' && (
            <TouchableOpacity
              key={i}
              onPress={() => this.onPressAddWatchlistKeyArray(watchlistKey)}
              style={
                tempIndex !== -1
                  ? {...styles.addToWatchListOptionColor}
                  : {...styles.addToWatchListOptionInitialColor}
              }>
              {
                <Text style={{...styles.watchlistChildText}}>
                  Add to {watchlistKey}
                </Text>
              }
            </TouchableOpacity>
          )}
        </View>
      );
    });
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar backgroundColor="#e6e6fa" />
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 10,
            backgroundColor: '#e6e6fa',
            height: 50,
            paddingLeft: 10,
          }}>
          <FlatList
            data={this.watchList}
            horizontal
            renderItem={this.renderWatchlistItem}
            keyExtractor={(item, index) => index}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}>
          <View
            style={{
              borderColor: 'red',
              borderWidth: 2,
              marginTop: '55%',
              backgroundColor: 'skyblue',
              padding: '5%',
              width: '80%',
              marginLeft: '10%',
            }}>
            <Text
              style={{
                color: 'black',
                marginBottom: '4%',
                fontFamily: 'Roboto-Bold',
                fontSize: 20,
              }}>
              Add {this.state.data.chartName} to WatchList
            </Text>
            {this.renderAddWatchListOption()}

            <View style={{flexDirection: 'row', marginTop: '7%'}}>
              <TouchableButton
                buttonTitle="Confirm"
                textStyle={styles.loginButton}
                touchableViewStyle={{
                  ...styles.loginViewButton,
                  marginRight: '5%',
                }}
                onPress={() => this.addToWatchListFinal()}
              />
              <TouchableButton
                buttonTitle="Cancel"
                textStyle={styles.loginButton}
                touchableViewStyle={{...styles.loginViewButton}}
                onPress={() => this.setState({...this.state,modalVisible:false,watchListAddArray:[]})}
              />
            </View>
          </View>
        </Modal>
        {this.renderHeader()}
        {this.renderCounter()}
        {this.renderequityStocks()}
      </View>
    );
  }
}

function mapStateToProps(store) {
  return {
    stockList: store.adminReducers.stockList,
    showLoader: store.adminReducers.showLoader,
  };
}

export default connect(mapStateToProps)(StocksByClass);

const styles = StyleSheet.create({
  watchlistChildText: {
    color: 'black',
    fontSize: 20,
    marginRight: 30,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
  watchlistChildTextColorChange: {
    color: 'blue',
    fontSize: 20,
    marginRight: 30,
    fontFamily: 'Roboto-Regular',
    elevation: 0.5,
    textAlign: 'center',
  },
  loginButton: {
    color: 'white',
    fontFamily: 'Roboto-Medium',
    padding: '5%',
    textAlign: 'center',
    fontSize: 20,
  },
  loginViewButton: {
    width: '44%',
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: '#1e90ff',
  },
  addToWatchListOptionColor: {
    backgroundColor: 'lightgreen',
    borderColor: 'red',
    borderWidth: 1,
    marginBottom: '4%',
  },
  addToWatchListOptionInitialColor: {
    // backgroundColor: '#1e90ff',
  },
});
