<script setup lang="ts">

import { reactive, ref } from 'vue'
import { ElMessage, type ComponentSize, type FormInstance, type FormRules } from 'element-plus'
import request from '../utils/request'
import { onMounted } from 'vue'
import Dentify from '../components/Dentify.vue'
import { sha256 } from 'js-sha256'
import { getStaffPhoto, Login } from '../api/staff'
import { useMainStore } from '@/store'
import { useRouter} from 'vue-router'

onMounted(()=>{
    getvCode();
})

const router= useRouter()

interface LoginForm {
    username: string
    password: string
    vcode: string
}

var vcode = ref();

const loginFormRef = ref<FormInstance>()

const loginForm = reactive<LoginForm>({
    username: '',
    password: '',
    vcode: ''
})

const activeTab = ref("staff")

const rules = reactive<FormRules<LoginForm>>({
    username: [
        { required: true, message: '用户名不能为空！', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空！', trigger: 'blur' },
    ]

})

let loginStore = useMainStore();
const login = async (formEl: FormInstance | undefined) => {

    if (!formEl) return
    await formEl.validate((valid, fields) => {
    if (valid) {
        if (vcode.value !== loginForm.vcode) {
            ElMessage.warning("验证码错误！");
        }
        else {
            const data = {
                UserName: loginForm.username,
                Password: sha256(loginForm.password)
            }
            Login(data).then(res => {
                console.log(res.data);
                if (res.data.code === 200) {
                    ElMessage.success('登录成功')
                    loginStore.userInfo = res.data.loginuser

                    if(loginStore.userInfo.photoUrl !=''){
                        getStaffPhoto(loginStore.userInfo.photoUrl).then(res => {
                            if (res.data.code === 200) {
                                loginStore.avatarUrl = res.data.photoUrl
                                
                            } else {
                                ElMessage.error("获取用户头像失败！")
                            }
                        }).catch(err => {
                            console.error(err);
                            ElMessage.error("获取用户头像失败！")
                        })
                    }
                    router.push({
                        path: '/home',
                    })
                }
            }).catch(err => {
                console.error(err);
                ElMessage.error("登录失败！")
            })
        }
    } else {
        console.log('error submit!', fields)
    }
    })
    getvCode();
}

const getRandomDigit = () => {
    return Math.floor(Math.random()*10);
}

const getvCode = () => {
    vcode.value = ""
    vcode.value = String(getRandomDigit());
    vcode.value += String(getRandomDigit());
    vcode.value += String(getRandomDigit());
    vcode.value += String(getRandomDigit());
}

</script>

<template>
    <el-container id="loginPage">
        <el-header style="background-color: rgba(255,255,255,0.6);">
            <div id="topTitle">
                <el-icon><img src="/public/logo.jpg" style="width: 130%;aspect-ratio: 1/1;margin-right: 50%;"></el-icon>
                计生特殊家庭全方位帮扶云平台
            </div>
        </el-header>
        
        <el-main>
            <div class="login">
                <div style="width:100%; margin-bottom: 10px;">
                    <div>
                        <el-icon style="color: rgb(253, 185, 82);"><Avatar /></el-icon>
                        <span class="title">登录</span>
                    </div>
                    <div class="iconImg"></div>
                </div>
                <!-- <el-tabs class="custom-tabs" v-model="activeTab">
                    <el-tab-pane label="工作人员" name="staff"></el-tab-pane>
                    <el-tab-pane label="志愿者" name="volunteer"></el-tab-pane>
                </el-tabs> -->
                <el-form ref="loginFormRef" :model="loginForm" style="width:100%; padding: 0px,30px;"
                    :rules="rules">
                    <el-form-item prop="username" style="margin-bottom: 30px">
                        <el-input size="large" v-model="loginForm.username" placeholder="请输入用户名">
                            <template #prefix>
                                <el-icon><User /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item  prop="password" style="margin-bottom: 30px">
                        <el-input size="large" type="password" v-model="loginForm.password" placeholder="请输入密码" show-password>
                            <template #prefix>
                                <el-icon><Key /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item  prop="vcode" style="margin-bottom: 30px">
                        <div style="display: flex; justify-content: space-between; width:100%">
                            <el-input size="large" v-model="loginForm.vcode" placeholder="请输入验证码" style="margin-right:30px;">
                                <template #prefix>
                                    <el-icon><Key /></el-icon>
                                </template>
                            </el-input>
                            <div v-on:click="getvCode">
                                <Dentify :identifyCode="vcode"/>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item style="text-align: center; margin:auto">
                        <el-button style="width: 100% ;margin: auto;" type="primary" @click="login(loginFormRef)">登录</el-button>
                    </el-form-item>
                    <div style="text-align: end; margin-right:10px; margin-top:30px">
                        <router-link to="/register">没有账号？点击注册</router-link>
                    </div>
                </el-form>
        </div>

        </el-main>
        
        <el-footer style=" display: flex; width:100%; text-align: center; ">
            <div style=" margin:auto">
                <el-icon class="icon" name="el-icon-s-home"></el-icon>
                <span style="color:white">竞秀区智慧养老院信息化平台服务平台@2025</span>
            </div>
        </el-footer>
    </el-container>

</template>

<style scoped>
#topTitle {
    display: flex;
    justify-content: left;
    align-items: center;
    font-size: 30px;
    font-weight: 1000;
    color: rgb(62, 63, 65);
}
.login {
    display: flex;
    margin: auto;
    position: relative;
    max-width: 600px;
    max-height: fit-content;
    padding: 50px;
    top: 60px;
    background-color: rgba(255, 255, 255, 0.98);
    align-items: center;
    box-shadow: 20px 20px 20px rgba(218, 218, 218, 0.216);
    border-radius: 10px;
    place-content: center;
    flex-direction: column;
}

.iconImg {
    margin:auto;
    width: 100px;
    height: 100px;
    background: url(../assets/icon.png) no-repeat;
    background-size: 100% 100%;
}

.title {
    margin-left:15px;
    font-size: 20px;
    font-weight: 1000;
    color: rgb(253, 185, 82);
}

#loginPage {
    height: 100vh;
    margin:0px;
    background: url(../assets/loginBackground.jpg) no-repeat;
    background-size:100% 100%;
    background-attachment:fixed;
}

.custom-tabs {
    margin-bottom: 20px;
    --el-tabs-header-border-color: #dcdfe6;
    --el-tabs-header-active-color: #ff9940;
    --el-tabs-header-hover-color: #ffb574;
}

.custom-tabs :deep(.el-tabs__item) {
    font-size: 16px;
    font-weight: 600;
    color: #46484b;
    padding: 10px 20px;
    border-radius: 5px;
    transition: all 0.3s ease;
}

.custom-tabs :deep(.el-tabs__item:hover){
    color: #fd8923ec;
}

.custom-tabs :deep(.el-tabs__item.is-active) {
    color: #ff9940;
    box-shadow: 0 2px 8px rgba(255, 203, 125, 0.2);
}
</style>