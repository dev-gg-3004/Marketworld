import Realm from 'realm';

const TaskSchema = {
  name: 'UserDetails',
  properties: {
    _id:'int',
    username: 'string',
    contactNo: 'string',
  },
  primaryKey: '_id',
};




export async function getAllList() {
  try {
    const realm =await Realm.open({
      schema: [TaskSchema],
    });
    // realm.objects("UserDetails")
    console.log("====>getAllList",realm.objects('UserDetails'));
    return realm.objects('UserDetails')
  } catch (error) {
    console.log(error);
  }
}

export async function createList(Data) {
  try {
    const realm =await Realm.open({
      schema: [TaskSchema],
    });
    realm.write(() => {
      realm.create("UserDetails", Data );
    }) 
}catch (error) {
    console.log("createList error==>",error);
  }
}
export async function updateList(Data) {
  try {
    const realm =await Realm.open({
      schema: [TaskSchema],
    });
    realm.write(() => {
        realm.create('UserDetails',Data,true);
    }) 
}catch (error) {
    console.log(error);
  }
}
export async function deleteList(Data) {
  try {
    const realm =await Realm.open({
      schema: [TaskSchema],
    });
    realm.write(() => {

      realm.delete(Data)
    }) 
  }catch (error) {
    console.log(error);
  }
}
// export const UserSchema ={
//     name:MEMBER_DATA_SCHEMA,
//     primarykey:'id',
//     properties : {
//         id : 'int',
//         role:'string',
//         fullName:'string',
//         userName:'string',
//         email:'string',
//         password:'string',
//         contactNo:'int',
//         userid:'objectId',
//         accountNo:{type:'string',default:""},
//         pancardNo:{type:'string',default:""},
//         IfscCode:{type:'string',default:""},
//         // confirmAccountNo:{type:'string',default:""},
//         aadharNo:{type:'string',default:""},
//         watchList:{type:'list',default:[]},
//         userImage:{type:'string',default:""}
//     }
// }

// const realms = await Realm.open({
//     path: '../utils/Realm',
//     schema: [TaskSchema],
//   });

//   console.log(realms);

// // export default new Realm({ schema: [UserSchema]});

// // export const MemberSchema = {
// //     name:MEMBER_DATA_SCHEMA,
// //     primarykey:'id',
// //     properties : {
// //         id : 'int',
// //         role:'string',
// //         fullName:'string',
// //         userName:'string',
// //         email:'string',
// //         password:'string',
// //         contactNo:'int',
// //         userid:'objectId',
// //         accountNo:{type:'string',default:""},
// //         pancardNo:{type:'string',default:""},
// //         IfscCode:{type:'string',default:""},
// //         confirmAccountNo:{type:'string',default:""},
// //         aadharNo:{type:'string',default:""},
// //         watchList:{type:'list',default:[]},
// //         userImage:{type:'string',default:""}
// //     }
// // }

// // export const AllMemberSchema = {
// //     name:ALL_MEMBER_DATA_SCHEMA,
// //     primarykey:'id',
// //     properties : {
// //         id : 'int',
// //         name:'string',
// //         creationDate:'date',
// //         values: {type:'list',objectType:MEMBER_DATA_SCHEMA}
// //     }
// // }

// // const databaseOptions = {
// //     path: 'membersData.realm',
// //     schema: [AllMemberSchema,MemberSchema],
// //     schemaVersion:0,
// // }

// // export const insertNewMemberData= newMember => new Promise((resolve,reject)=>{
// //     Realm.open(databaseOptions).then(realm =>{
// //         realm.write(()=>{
// //             realm.create(ALL_MEMBER_DATA_SCHEMA,newMember);
// //             resolve(newMember)
// //         });
// //     }).catch((error)=>reject(error));
// // })

// // export const updateMemberData= memberDetail => new Promise((resolve,reject)=>{
// //     Realm.open(databaseOptions).then(realm =>{
// //         realm.write(()=>{
// //             let updateMemberDetails = realm.objcetForPrimaryKey(ALL_MEMBER_DATA_SCHEMA,memberDetail.id)
// //             // required what you are updating  eg =>  updateMemberDetails.password =  memberDetail.password
// //             resolve()
// //         });
// //     }).catch((error)=>reject(error));
// // })

// // export const allMemberData= () => new Promise((resolve,reject)=>{
// //     Realm.open(databaseOptions).then(realm =>{
// //         let allMemberList =  realm.objects(ALL_MEMBER_DATA_SCHEMA);
// //         resolve(allMemberList);
// //     }).catch((error)=>reject(error));
// // })

// // export default new Realm(databaseOptions);    //realm object
