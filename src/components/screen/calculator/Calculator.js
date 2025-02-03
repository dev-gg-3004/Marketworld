import axios from 'axios';
import React, {Fragment, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {empty} from '../../../utils/Validation';
import CalculatorCard from '../../common/calculatorcard/CalculatorCard';

export default function Calculator() {
  const [result, setResult] = useState('');
  const [valueArray, setValueArray] = useState([]);

  const options = [
    {option: 'C', style: {color: 'red', textAlign: 'center', fontSize: 35}},
    '%',  '⌫', '/', '1',  '2',  '3',  '*', '4',  '5',  '6',  '-',  '7', '8',  '9',  '+',  '00',  '0', '.', 
    {option: '=', style: {color: 'green', textAlign: 'center', fontSize: 60}},
  ];

  function onPressOptions(value) {
    let temp;
    let tempNumbers = '';
    let tempResult = [];

    if (value !== '=' && value !== '⌫' && value !== 'C') {
      temp = [...valueArray, value];
      setValueArray(temp);
      
    }

    switch (value) {
      case 'C':
        setValueArray([]);
        setResult('');
        break;

      case '⌫':
        let temp = [...valueArray];
        temp.splice(-1);
        setValueArray(temp);
        break;

      case '=':
        for (let i = 0; i < valueArray.length; i++) {
          if (!checkOperator(valueArray[i])) {
            tempNumbers = tempNumbers.concat(valueArray[i]);

            if (i === valueArray.length - 1) {
              tempResult = [...tempResult, tempNumbers];
              calculate(tempResult);
            }
          } else if (checkOperator(valueArray[i])) {
            tempResult = [...tempResult, tempNumbers, valueArray[i]];
            tempNumbers = '';
          }
        }
        break;
      default:
        setResult('');
        break;
    }
  }

  function calculate(tempResult) {
    let temp = [...tempResult];
    let operator = ['*', '/', '%', '+', '-'];


    operator.forEach(element => {
      let index=temp.indexOf(element)
      if(index>-1){
        temp= commonCalculate(index,element,temp)
        let i=temp.indexOf(element)
        if(i>-1){
          temp =  calculate(temp)
        }
      }
    });
  
    setResult(temp);
    setValueArray(temp[0])
    return  temp;
  }

  function commonCalculate(index,operator,array) {
    let temp=[...array]
    let a;

    switch(operator){
      case '*' :
        a = parseFloat(temp[index - 1]) * parseFloat(temp[index + 1]);
        break;
      case '/' :
        a = parseFloat(temp[index - 1]) / parseFloat(temp[index + 1]);
        break;
      case '%' :
        a = parseFloat(temp[index - 1]) % parseFloat(temp[index + 1]);
        break;
      case '+' :
        a = parseFloat(temp[index - 1]) + parseFloat(temp[index + 1]);
        break;
      case '-' :
        a = parseFloat(temp[index - 1]) - parseFloat(temp[index + 1]);
      break;
    }

    temp.splice(index -1, 3, a.toString());
    return temp;
  }
  
  function renderCard() {
    return options.map((value, i) => {
      return (
        <Fragment key={i}>
          <CalculatorCard
            title={value.option ? value.option : value}
            style={value.style}
            onPress={() => onPressOptions(value.option ? value.option : value)}
          />
        </Fragment>
      );
    })
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.viewTextStyle}>
        <Text style={styles.textStyle}>{valueArray}</Text>

        {!empty(result) && (
          <Text style={{...styles.textStyle, color: '#00ffff'}}>{result}</Text>
        )}
      </View>

      <View style={styles.viewCardStyle}>{renderCard()}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
  },
  viewTextStyle: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'black',
  },
  viewCardStyle: {
    justifyContent:"center",
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'grey',
    height:"60%"
  },
});

function checkOperator(value) {
  return (
    value === '+' ||
    value === '-' ||
    value === '*' ||
    value === '/' ||
    value === '%'
  );
}

// stock api calling practise
    // var API = require('indian-stock-exchange');

    // var NSEAPI = API.NSE;
    // var BSEAPI = API.BSE;
    // BSEAPI.getGainers()
    // .then(function (response) {
    // console.log("jyhg",response.data); //return the api data
    // })
    // .catch((reason) => {
    //   // rejection handler
    //   console.log(reason);
    // })

// const data= async ()=> await NSEAPI.getGainers()

// const myPrivateData = {
//     "appSource": "12122",
//     "appName": "5P51082513",
//     "userId": "E6DVHrr7MuW",
//     "password": "ad2Amdn38fK",
//     "userKey": "NTQkcNfoZLreZk2Ozen31L2DcRbplHvt",
//     "encryptionKey": "TFMgVawGSDpd1bA7FukrHRNvEQmugCLk"
// }

// const { FivePaisaClient } = require("5paisajs")

// // var client = new FivePaisaClient(myPrivateData)
// useEffect(() => {
//   // var API = require('indian-stock-exchange');
//   // var NSEAPI = API.NSE;
//   // var BSEAPI = API.BSE;
//   // // Examples
//   // NSEAPI.getIndices().then(function (response) {
//   //   console.log(typeof response); //return the api data
//   // }).catch(err=> console.log("err ", err))
//   // BSEAPI.getIndices().then(function (response) {
//   //   console.log(response.data); //return the api data
//   // });
// }, []);


// code for calculator

    // for(let i=0; i<operator.length;i++){
    //   for(let j=0;j<temp.length;j--){
    //     if(temp[i]=="*"){
    //       console.log("temp[i - 1]",temp[i - 1]);
    //       console.log("temp[i +1]",temp[i + 1]);
    //       let a = temp[i - 1] * temp[i + 1]
    //       temp=temp.splice(i - 1, 3, a)

    //     }
    //   }
    // }






//another one 
 // let mult = temp.indexOf('*');
    // if (mult > -1) {
    //   temp=commonCalculate(mult,"*",temp)
    //   let m = temp.indexOf('*');
    //   if (m > -1) {
    //    temp =  calculate(temp)
    //   }
    // }

    // let divide = temp.indexOf("/");
    // if (divide > -1) {
    //   temp=commonCalculate(divide,"/",temp)
    //   let div = temp.indexOf('/');
    //   if (div > -1) {
    //    temp= calculate(temp)
    //   }
    // }
    // let modulus = temp.indexOf("%");
    // if (modulus > -1) {
    //   temp=commonCalculate(modulus,"%",temp)
    //   let mod = temp.indexOf('%');
    //   if (mod > -1) {
    //    temp= calculate(temp)
    //   }
    // }

    // let add = temp.indexOf('+');
    // if (add > -1) {
    //   temp=commonCalculate(add,"+",temp)
    //   let ad = temp.indexOf('+');
    //   if (ad > -1) {
    //    temp= calculate(temp)
    //   }

    // }

    // let sub = temp.indexOf('-');
    // if (sub > -1) {
    //   temp=commonCalculate(sub,"-",temp)
    //   let s = temp.indexOf('-');
    //   if (s > -1) {
    //   temp= calculate(temp)
    //  }
    // }





    //another one
// let mult = temp.indexOf('*');
// if (mult > -1) {
//   // let a = parseFloat(temp[mult - 1]) * parseFloat(temp[mult + 1]);
//   // temp.splice(mult -1, 3, a.toString());
//   let m = temp.indexOf('*');
//   if (m > -1) {
//    temp =  calculate(temp)
//   }
// }

// let divide = temp.indexOf("/");
// if (divide > -1) {
//   let b = parseFloat(temp[divide - 1]) / parseFloat(temp[divide + 1]);
//   temp.splice(divide -1, 3, b.toString());
//   let div = temp.indexOf('/');
//   if (div > -1) {
//    temp= calculate(temp)
//   }
// }

// let add = temp.indexOf('+');
// if (add > -1) {
//   let c = parseFloat(temp[add - 1]) + parseFloat(temp[add + 1]);
//   temp.splice(add - 1, 3, c.toString());
//   let ad = temp.indexOf('+');
//   if (ad > -1) {
//    temp= calculate(temp)
//   }

// }

// let sub = temp.indexOf('-');
// if (sub > -1) {
//   let d = parseFloat(temp[sub - 1]) - parseFloat(temp[sub + 1]);
//   temp.splice(sub - 1, 3, d.toString());
//  let s = temp.indexOf('-');
//  if (s > -1) {
//   temp= calculate(temp)
//  }
// }