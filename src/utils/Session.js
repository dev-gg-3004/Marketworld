import AsyncStorage from '@react-native-async-storage/async-storage';


export const memberDataKey=()=>{
  let memberDataKey="memberData";
  return memberDataKey
}

export const createSession = async (object) => {
    try {
        const jsonValue = JSON.stringify(object)
        await AsyncStorage.setItem(memberDataKey(), jsonValue)
      } catch (e) {
        // saving error
        console.log(error);
    }
};

export const getSession = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(memberDataKey())
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
}

export const removeItemValue= async (key) => {
  try {
      await AsyncStorage.removeItem(key);
      return true;
  }
  catch(exception) {
      return false;
  }
}

export function checkRole(){
  return  getSession().role==="admin";
}