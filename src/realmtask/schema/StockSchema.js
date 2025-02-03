import Realm from 'realm';
import { newsSchema } from './NewsSchema';
import { userSchema } from './UserSchema';

export const stockSchema = {
  name: 'stockDatas',
  properties: {
    _id:'int',
    stockName: 'string',
    currentPrice: 'int',
    dayHigh:'int',
    dayLow:'int'
  },
  primaryKey: '_id',
};

export async function getAllStockList() {
    try {
      const realm =await Realm.open({
        schema: [userSchema,newsSchema,stockSchema],
      });
     let temp= realm.objects("stockDatas")
    //  realm.close()
    //   console.log("====>getAllUserList",realm.objects('UserDetails'));
      return realm.objects("stockDatas")
    } catch (error) {
      console.log(error);
    }
}

export async function createStockList(Data) {
    try {
      const realm =await Realm.open({
        schema: [userSchema,newsSchema,stockSchema],
      });
      realm.write(() => {
        realm.create("stockDatas", Data );
      }) 
      console.log("Data",Data);
  }catch (error) {
      console.log("createList error==>",error);
    }
  }

  export async function updateStockList(Data) {
    try {
      const realm =await Realm.open({
        schema: [userSchema,newsSchema,stockSchema],
      });
      realm.write(() => {
          realm.create('stockDatas',Data,true);
      }) 
    //   realm.close()
  }catch (error) {
      console.log(error);
    }
}

export async function deleteStockList(Data) {
    try {
      const realm =await Realm.open({
        schema: [userSchema,newsSchema,stockSchema],
      });
      console.log(Data);
      realm.write(() => {
        realm.delete(Data)
      }) 
    //   realm.close()
    }catch (error) {
      console.log(error);
    }
}

