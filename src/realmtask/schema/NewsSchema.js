import Realm from 'realm';
import { stockSchema } from './StockSchema';
import { userSchema } from './UserSchema';

export const newsSchema = {
  name: 'newsData',
  properties: {
    _id:'int',
    newsTitle: 'string',
    newsContent: 'string',
    source:'string'
  },
  primaryKey: '_id',
};

export async function getAllNewsList() {
    try {
      const realm =await Realm.open({
        schema: [newsSchema,userSchema,stockSchema],
      });
     let temp=realm.objects('newsData')
      return temp
    } catch (error) {
      console.log(error);
    }
}

export async function createNewsList(Data) {
    try {
      const realm =await Realm.open({
        schema: [newsSchema,userSchema,stockSchema],
      });
      realm.write(() => {
        realm.create("newsData", Data );
      }) 
      console.log("Data",Data);
  }catch (error) {
      console.log("createList error==>",error);
    }
  }

  export async function updateNewsList(Data) {
    try {
      const realm =await Realm.open({
        schema: [newsSchema,userSchema,stockSchema],
      });
      realm.write(() => {
          realm.create('newsData',Data,true);
      }) 
  }catch (error) {
      console.log(error);
    }
}

export async function deleteNewsList(Data) {
    try {
      const realm =await Realm.open({
        schema: [newsSchema,userSchema,stockSchema],
      });

      realm.write(() => {
        realm.delete(Data)
      }) 
    }catch (error) {
      console.log(error);
    }
}
