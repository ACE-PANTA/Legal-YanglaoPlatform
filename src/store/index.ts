import { defineStore } from 'pinia';

interface UserInf {
   userName: String,
   passwordHash: String,
   photoUrl: string,
   name: String,
   phone: String,
   identificationNumber: String,
   gender: String,
   birthDate: String,
   address: String,
   standby: String,
   skill: String,
   provinceId: Number,
   provinceName: String,
   municipalityId: Number,
   municipalityName: String,
   districtId: Number,
   districtName: String,
   townshipStreetsId: Number,
   townshipStreetsName: String,
   role: Number,
   havePermissionLevel: Number
}


export const useMainStore = defineStore('main', {
   //添加登录信息
   state: () => ({
      userInfo: {
         userName: '',
         passwordHash: '',
         photoUrl: '',
         name: '',
         phone: '',
         identificationNumber: '',
         gender: '',
         birthDate: '',
         address: '',
         standby: '',
         skill: '',
         provinceId: 0,
         provinceName: '',
         municipalityId: 0,
         municipalityName: '',
         districtId: 0,
         districtName: '',
         townshipStreetsId: 0,
         townshipStreetsName: '',
         role: 0,
         havePermissionLevel: 0
      } as UserInf,
      avatarUrl:''
   }),
   persist: {
      key: 'userInf'
   }
});