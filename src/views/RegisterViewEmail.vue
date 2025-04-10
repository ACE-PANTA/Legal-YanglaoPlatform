<script setup lang="ts">

import { reactive, ref } from 'vue'
import { ElMessage, type ComponentSize, type FormInstance, type FormRules } from 'element-plus'
import { sha256 } from 'js-sha256'
import request from '../utils/request'

interface RegisterForm {
    userName: string,
    name: string,
    password: string,
    checkPass: string,
    identificationNumber:string,
    gender: string,
    phone: string,
    vcode: string
}

const registerForm = ref<RegisterForm>({
    userName: '',
    name: '',
    password: '',
    checkPass: '',
    identificationNumber:'',
    gender: '',
    phone: '',
    vcode: '' 
})


const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else {
    if (registerForm.value.checkPass !== registerForm.value.password) {
        callback(new Error('两次输入密码不一致!'))
    }
    callback()
  }
}

const checkEmail = (rule:any, value: any, callback: any )=> {
    const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (value === '') {
        callback(new Error('请输入邮箱'))
    }
    else if (!regEmail.test(value)) {
        callback(new Error('请输入正确的邮箱格式'))
    }
}

const rules = reactive<FormRules<RegisterForm>>({
    userName: [
        { required: true, message: '用户名不能为空！', trigger: 'blur' },
    ],
    name: [
        { required: true, message: '昵称不能为空！', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空！', trigger: 'blur' },
        { min: 8, max: 16, message: '密码长度在8-16位之间', trigger: 'blur' }
    ],
    checkPass: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { validator: validatePass, message: '两次密码输入不匹配！', trigger: 'blur' }
    ],
    vcode: [
        {required: true, message: '请输入邮箱验证码', trigger: 'blur'}
    ]
})

//注册
const register = async () => {
    if (registerForm.value.userName === '') {
        ElMessage.error('用户名不能为空！')
        return;
    }
    if (registerForm.value.name === '') {
        ElMessage.error('姓名不能为空！')
        return;
    }
    if (registerForm.value.password === '') {
        ElMessage.error('密码不能为空！')
        return;
    }   
    if (registerForm.value.checkPass === '') {
        ElMessage.error('请再次输入密码！')
        return;
    }
    if (registerForm.value.password !== registerForm.value.checkPass) {
        ElMessage.error('两次输入密码不一致！')
        return;
    }
    if (registerForm.value.vcode === '') {
        ElMessage.error('请输入验证码！')
        return;
    }
    if (registerForm.value.identificationNumber.length !== 18) {
        ElMessage.error('请输入正确的身份证号码！')
        return;
    }
    if (registerForm.value.phone.length !== 11) {
        ElMessage.error('请输入正确的手机号！')
        return;
    }
        const data = {
            userName: registerForm.value.userName,
            name: registerForm.value.name,
            password: sha256(registerForm.value.password)
        }
        request.post('/register', data).then(res => {
            if (res.data.code === 200) {
                ElMessage.success('注册成功')
            } else {
                ElMessage.error(res.data.msg);
            }
        }).catch(err => {
            console.log(err)
        })
        console.log('submit!', registerForm)
}


//验证码计时相关
let haveSend = ref(false);
let restTime = ref(0);
var timeStr = ref('');

const getEmailVcode = () => {
    // if (registerForm.email === '') {
    //     ElMessage("请输入邮箱！");
    //     return;
    // }
    // const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    // if (!regEmail.test(registerForm.email)) {
    //     ElMessage("请输入正确的邮箱格式！");
    //     return;
    // }
    console.log(haveSend);
    if (haveSend.value) {
        ElMessage("请稍后再获取验证码！")
    }
    else {
        haveSend.value = true;
        restTime.value = 60;
        timeStr.value = "60s";
        const changeTime = setInterval(() => {
            restTime.value--;
            timeStr.value = restTime.value+'s';
            if (restTime.value == 0) {
                haveSend.value = false;
                clearInterval(changeTime);
            }
        }, 1000);
    }
}



</script>

<template>
    <el-container id="loginPage">
        <el-header style="background-color: rgba(250,250,250,0.9);">
            <div>
                <el-icon><svg t="1742307418721" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4794" width="200" height="200"><path d="M644.949333 192.056889V161.564444a13.084444 13.084444 0 0 0-12.970666-13.255111H371.712a13.084444 13.084444 0 0 0-12.970667 13.255111v714.126223h37.546667V219.591111c0-15.189333 12.401778-27.534222 27.591111-27.534222h221.070222z m8.533334 257.422222c-133.12 25.144889-233.301333 135.395556-233.301334 267.662222 0 59.164444 20.024889 113.834667 54.044445 158.549334h4.323555c6.599111 0 12.003556 7.566222 12.003556 16.896v0.682666c0 9.329778-5.347556 16.952889-11.946667 16.952889H125.724444C119.125333 910.222222 113.777778 902.599111 113.777778 893.269333v-0.739555c0-9.329778 5.347556-16.952889 12.003555-16.952889h31.516445V373.873778c0-25.941333 21.333333-46.990222 47.502222-46.990222H324.266667V161.564444c0-26.339556 21.333333-47.786667 47.502222-47.786666h260.209778c26.168889 0 47.502222 21.447111 47.502222 47.786666v165.432889h119.466667c26.168889 0 47.502222 21.048889 47.502222 46.990223v103.651555a17.351111 17.351111 0 0 1-17.294222 17.237333 17.351111 17.351111 0 0 1-17.294223-17.237333V373.873778a12.743111 12.743111 0 0 0-12.913777-12.458667h-38.001778v84.195556a373.134222 373.134222 0 0 0-52.280889-3.640889c-10.126222 0-20.138667 0.568889-29.980445 1.706666v-3.697777a17.351111 17.351111 0 0 1-25.144888 9.500444zM223.573333 875.064889v-455.68c0-12.344889 10.012444-22.471111 22.471111-22.471111H323.697778v-35.384889H204.8a12.686222 12.686222 0 0 0-12.913778 12.458667v501.077333h31.687111zM682.666667 514.958222a194.389333 194.389333 0 1 1 0 388.721778 194.389333 194.389333 0 0 1 0-388.721778z m-152.348445 128.568889c-4.209778 3.584-10.865778 14.392889-5.006222 29.980445 5.973333 15.644444 28.216889 5.461333 28.216889 5.461333l88.177778-37.376c2.218667-1.308444 4.608-1.934222 6.826666-2.503111 6.314667-1.706667 8.760889-0.568889 19.114667 3.185778 10.353778 3.811556 32.938667 12.970667 38.172444 15.132444 1.820444 0.682667 2.844444 2.048 3.584 3.527111a9.386667 9.386667 0 0 1-7.509333 13.084445c-2.616889 0.284444-4.778667 0-4.778667 0l-49.322666-7.850667c-5.973333-0.853333-9.955556 7.623111-9.955556 7.623111a4.096 4.096 0 0 0-0.568889 1.820444c0 4.494222 7.964444 9.102222 7.964445 9.102223l72.704 28.273777s12.8 7.111111 36.693333 7.111112c23.893333 0 69.745778-37.774222 69.745778-37.774223 14.791111-15.416889 12.344889-61.212444 0.398222-69.063111-11.946667-7.907556-45.340444-12.515556-58.595555-13.255111-13.255111-0.568889-34.417778-6.883556-61.269334-15.075555-26.908444-8.248889-57.002667-7.623111-70.087111 0-14.506667 8.419556-100.295111 54.897778-104.504889 58.595555z m296.96 134.712889c4.266667-3.640889 10.922667-14.449778 5.006222-30.094222-5.916444-15.587556-28.216889-5.404444-28.216888-5.404445l-88.120889 37.376c-2.275556 1.308444-4.664889 1.934222-6.883556 2.503111-6.314667 1.706667-8.760889 0.568889-19.114667-3.185777a1590.044444 1590.044444 0 0 1-38.172444-15.132445 6.485333 6.485333 0 0 1-3.527111-3.527111 9.386667 9.386667 0 0 1 7.509333-13.084444 18.204444 18.204444 0 0 1 4.721778 0s42.666667 6.826667 49.322667 7.793777c5.973333 0.910222 9.955556-7.566222 9.955555-7.566222a4.096 4.096 0 0 0 0.568889-1.820444c0-4.494222-7.964444-9.159111-7.964444-9.159111l-72.704-28.273778s-12.743111-7.054222-36.693334-7.054222c-23.893333 0-69.688889 37.774222-69.688889 37.774222-14.791111 15.416889-12.401778 61.212444-0.455111 69.063111 11.946667 7.850667 45.340444 12.515556 58.652445 13.255111 13.198222 0.568889 34.360889 6.883556 61.269333 15.075556 26.851556 8.248889 57.002667 7.623111 70.030222 0 14.506667-8.419556 100.295111-54.897778 104.504889-58.595556z" fill="#000000" p-id="4795"></path></svg></el-icon>
                竞秀区智慧养老院信息化服务平台
            </div>
        </el-header>
        
        <el-main>
            <div class="register">
                <div style="width:100%; margin-bottom: 10px;">
                    <div>
                        <el-icon><Avatar /></el-icon>
                        <span class="title">注册</span>
                    </div>
                    <div class="iconImg"></div>
                </div>
                <el-form ref="registerFormRef" :model="registerForm" style="width:100%; padding: 0,30px;"
                    :rules="rules">
                    <el-form-item prop="username" style="margin-bottom: 20px">
                        <el-input size="large" v-model="registerForm.userName" placeholder="请输入用户名">
                            <template #prefix>
                                <el-icon><UserFilled /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="nickname" style="margin-bottom: 20px">
                        <el-input size="large" v-model="registerForm.name" placeholder="请输入昵称">
                            <template #prefix>
                                <el-icon><User /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item  prop="password" style="margin-bottom: 20px">
                        <el-input size="large" type="password" v-model="registerForm.password" placeholder="请输入密码 (8-16位)" show-password>
                            <template #prefix><el-icon><Key /></el-icon></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item  prop="checkPass" style="margin-bottom: 20px">
                        <el-input size="large" type="password" v-model="registerForm.checkPass" placeholder="请再次输入密码" show-password>
                            <template #prefix><el-icon><Key /></el-icon></template>
                        </el-input>         
                    </el-form-item>
                    <!-- <el-form-item prop="email" style="margin-bottom: 20px">
                        <el-input size="large" v-model="registerForm.email" placeholder="请输入邮箱">
                            <template #prefix>
                                <el-icon>
                                    <svg t="1742384778736" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4643" width="200" height="200"><path d="M838.954667 234.666667H170.666667c-3.626667 0-7.168 0.448-10.56 1.322666l323.690666 323.669334a21.333333 21.333333 0 0 0 30.165334 0L838.954667 234.666667z m46.144 14.186666l-260.693334 260.693334 262.933334 262.912c5.44-7.168 8.661333-16.106667 8.661333-25.792V277.333333c0-10.944-4.117333-20.906667-10.88-28.48zM843.861333 789.333333l-249.6-249.621333-50.133333 50.133333a64 64 0 0 1-90.517333 0l-50.112-50.133333L156.373333 786.88c4.48 1.578667 9.28 2.453333 14.314667 2.453333h673.194667zM128.661333 754.218667L373.333333 509.525333 129.578667 265.813333A42.709333 42.709333 0 0 0 128 277.333333v469.333334c0 2.56 0.213333 5.098667 0.661333 7.552zM170.666667 192h682.666666a85.333333 85.333333 0 0 1 85.333334 85.333333v469.333334a85.333333 85.333333 0 0 1-85.333334 85.333333H170.666667a85.333333 85.333333 0 0 1-85.333334-85.333333V277.333333a85.333333 85.333333 0 0 1 85.333334-85.333333z" fill="#333333" p-id="4644"></path></svg>
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item> -->
                    <el-form-item prop="vcode" style="margin-bottom: 30px;">
                        <div style="width:100%; display: flex; justify-content: space-between;">
                        <el-input size="large" v-model="registerForm.vcode" placeholder="请输入验证码">
                            <template #prefix>
                                <el-icon><User /></el-icon>
                            </template>
                        </el-input>
                        <el-button style="margin:auto; margin-left: 30px;" v-if="!haveSend" @click="getEmailVcode">获取验证码</el-button>
                        <el-button style="margin:auto; margin-left: 30px;" v-if="haveSend">{{ timeStr }}</el-button>
                    </div>
                    </el-form-item>
                    <el-form-item style="text-align: center; margin:auto">
                        <el-button style="width: 100% ;margin: auto;" type="primary" @click="register()">注册</el-button>
                    </el-form-item>
                    
                    <div style="text-align: end; margin-right:10px; margin-top:30px">
                        <router-link to="/login">返回登录</router-link>
                    </div>
                </el-form>
        </div>

        </el-main>
        
        <el-footer style=" display: flex; width:100%; text-align: center; ">
            <div style="margin:auto">
                <span style="color:white">竞秀区智慧养老院信息化平台服务平台@2025</span>
            </div>
        </el-footer>
    </el-container>

</template>

<style scoped>
.register {
    display: flex;
    margin: auto;
    position: relative;
    max-width: 600px;
    max-height: fit-content;
    padding: 50px;
    top: 10px;
    background-color: rgba(255,255, 255, 0.8);;
    align-items: center;
    box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    place-content: center;
    flex-direction: column;
}

.title {
    margin-left:15px;
    font-size: 20px;
    font-weight: 1000;
}

#loginPage {
    height: 100vh;
    margin:0px;
    background: url(../assets/bk.png) no-repeat;
    background-size:100% 100%;
    background-attachment:fixed;
}
.iconImg {
    margin:auto;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: url(../assets/icon.png) no-repeat;
    background-size: 100% 100%;
}

</style>