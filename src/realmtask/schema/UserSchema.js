import Realm from 'realm';
import { newsSchema } from './NewsSchema';
import { stockSchema } from './StockSchema';

export const userSchema = {
  name: 'userDatas',
  properties: {
    _id:'int',
    userName: 'string',
    accountNo: 'int',
    aadharNo:'int',
    ifscCode:'string'
  },
  primaryKey: '_id',
};

export async function getAllUserList() {
    try {
      const realm =await Realm.open({
        schema: [userSchema,newsSchema,stockSchema],
      });
     let temp= realm.objects("userDatas")
    //  realm.close()
    //   console.log("====>getAllUserList",realm.objects('UserDetails'));
      return realm.objects("userDatas")
    } catch (error) {
      console.log(error);
    }
}

export async function createUserList(Data) {
    try {
      const realm =await Realm.open({
        schema: [userSchema,newsSchema,stockSchema],
      });
      realm.write(() => {
        realm.create("userDatas", Data );
      }) 
      console.log("Data",Data);
  }catch (error) {
      console.log("createList error==>",error);
    }
  }

  export async function updateUserList(Data) {
    try {
      const realm =await Realm.open({
        schema: [userSchema,newsSchema,stockSchema],
      });
      realm.write(() => {
          realm.create('userDatas',Data,true);
      }) 
    //   realm.close()
  }catch (error) {
      console.log(error);
    }
}

export async function deleteUserList(Data) {
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

