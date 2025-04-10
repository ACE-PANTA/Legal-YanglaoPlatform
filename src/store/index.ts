import { defineStore } from 'pinia';

interface UserInf {
   address:string,
   birthDate:string,
   gender:string,
   identificationNumber:string,
   name:string,
   phone:string,
   role:number,
   skill:string,
   standby:string,
   uid:string,
   userName:string,
   photoUrl:string
}


export const useMainStore = defineStore('main', {
   //添加登录信息
   state: () => ({
      userInfo: {
         address:'',
         birthDate:'',
         gender:'',
         identificationNumber:'',
         name:'',
         phone:'',
         role:1,
         skill:'',
         standby:'',
         uid:'',
         userName:'',
         photoUrl:''
      } as UserInf,
      avatarUrl:''
   }),
   persist: {
      key: 'userInf'
   }
});