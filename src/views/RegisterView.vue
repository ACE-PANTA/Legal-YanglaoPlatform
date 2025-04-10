<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, type ComponentSize, type FormInstance, type FormRules } from 'element-plus'
import { sha256 } from 'js-sha256'
import { Register} from '@/api/staff'
import { setStaffRegion } from '@/api/region'
import Dentify from '@/components/Dentify.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

enum E_Role
{
    /// <summary>
    /// 高管
    /// </summary>
    Manager = 0,

    /// <summary>
    /// 员工
    /// </summary>
    Staff = 1,

    /// <summary>
    /// 志愿者
    /// </summary>
    Volunteer = 2,

    /// <summary>
    /// 超级管理员
    /// </summary>
    SuperAdmin = 88
}

interface RegisterForm {
    userName: string,
    name: string,
    password: string,
    checkPass: string,
    identificationNumber:string,
    gender: string,
    phone: string,
    vcode: string,
    role: E_Role,
    province: number,
    municipality: number,
    district: number,
    townshipStreets: number,
    region: number[]
}

const getRandomDigit = () => {
    return Math.floor(Math.random() * 10)
}

var vcode = ref()

const getvCode = () => {
    vcode.value = ""
    vcode.value = String(getRandomDigit())
    vcode.value += String(getRandomDigit())
    vcode.value += String(getRandomDigit())
    vcode.value += String(getRandomDigit())
    console.log(vcode.value)
}

const registerForm = reactive<RegisterForm>({
    userName: '',
    name: '',
    password: '',
    checkPass: '',
    identificationNumber:'',
    gender: '',
    phone: '',
    vcode: '',
    role: E_Role.Staff,
    province: 0,
    municipality: 0,
    district: 0,
    townshipStreets: 0,
    region: []
})

const registerFormRef = ref<FormInstance>()

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else {
        if (registerForm.checkPass !== registerForm.password) {
            callback(new Error('两次输入密码不一致!'))
        }
        callback()
    }
}

const rules = reactive<FormRules<RegisterForm>>({
    userName: [
        { required: true, message: '用户名不能为空！', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空！', trigger: 'blur' },
        { min: 8, max: 16, message: '密码长度在8-16位之间', trigger: 'blur' }
    ],
    name:[
        { required: true, message: '姓名不能为空！', trigger: 'blur' },
    ],
    checkPass: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { validator: validatePass, message: '两次密码输入不匹配！', trigger: 'blur' }
    ],
    vcode: [
        { required: true, message: '请输入验证码', trigger: 'blur' }
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'blur' }
    ],
    role: [
        { required: true, message: '请选择角色', trigger: 'blur' }
    ],
    identificationNumber: [
        { required: true, message: '身份证号不能为空！', trigger: 'blur' },
        { pattern: /^\d{18}$/, message: '身份证号必须为18位数字', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '手机号不能为空！', trigger: 'blur' },
        { pattern: /^\d{11}$/, message: '手机号必须为11位数字', trigger: 'blur' }
    ]
})

// 添加区域数据相关的响应式变量
const regions = ref([])


// 添加防抖函数
const debounce = (fn: Function, delay: number) => {
    let timer: number | null = null
    return (...args: any[]) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
            timer = null
        }, delay)
    }
}

// 注册
const register = debounce(async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            const data = {
                Username: registerForm.userName,
                Password: sha256(registerForm.password),
                Role: registerForm.role,
                Name: registerForm.name,
                IdentificationNumber: registerForm.identificationNumber,
                Gender: registerForm.gender,
                Phone: registerForm.phone,
            }
            console.log(data);
            Register(data).then(res => {
                console.log(res.data);
                if (res.data.code === 200) {
                    ElMessage.success('注册成功')
                    router.push('/login')
                } else {
                    ElMessage.error(res.data.msg)
                }
            }).catch(err => {
                console.log(err)
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}, 1000)  // 设置1秒的防抖延迟

onMounted(() => {
    getvCode()
})
</script>

<template>
    <el-container id="loginPage">
        <el-header style="background-color: rgba(250,250,250,0.6);">
            <div id="topTitle">
                <el-icon><svg t="1742307418721" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4794" width="200" height="200"><path d="M644.949333 192.056889V161.564444a13.084444 13.084444 0 0 0-12.970666-13.255111H371.712a13.084444 13.084444 0 0 0-12.970667 13.255111v714.126223h37.546667V219.591111c0-15.189333 12.401778-27.534222 27.591111-27.534222h221.070222z m8.533334 257.422222c-133.12 25.144889-233.301333 135.395556-233.301334 267.662222 0 59.164444 20.024889 113.834667 54.044445 158.549334h4.323555c6.599111 0 12.003556 7.566222 12.003556 16.896v0.682666c0 9.329778-5.347556 16.952889-11.946667 16.952889H125.724444C119.125333 910.222222 113.777778 902.599111 113.777778 893.269333v-0.739555c0-9.329778 5.347556-16.952889 12.003555-16.952889h31.516445V373.873778c0-25.941333 21.333333-46.990222 47.502222-46.990222H324.266667V161.564444c0-26.339556 21.333333-47.786667 47.502222-47.786666h260.209778c26.168889 0 47.502222 21.447111 47.502222 47.786666v165.432889h119.466667c26.168889 0 47.502222 21.048889 47.502222 46.990223v103.651555a17.351111 17.351111 0 0 1-17.294222 17.237333 17.351111 17.351111 0 0 1-17.294223-17.237333V373.873778a12.743111 12.743111 0 0 0-12.913777-12.458667h-38.001778v84.195556a373.134222 373.134222 0 0 0-52.280889-3.640889c-10.126222 0-20.138667 0.568889-29.980445 1.706666v-3.697777a17.351111 17.351111 0 0 1-25.144888 9.500444zM223.573333 875.064889v-455.68c0-12.344889 10.012444-22.471111 22.471111-22.471111H323.697778v-35.384889H204.8a12.686222 12.686222 0 0 0-12.913778 12.458667v501.077333h31.687111zM682.666667 514.958222a194.389333 194.389333 0 1 1 0 388.721778 194.389333 194.389333 0 0 1 0-388.721778z m-152.348445 128.568889c-4.209778 3.584-10.865778 14.392889-5.006222 29.980445 5.973333 15.644444 28.216889 5.461333 28.216889 5.461333l88.177778-37.376c2.218667-1.308444 4.608-1.934222 6.826666-2.503111 6.314667-1.706667 8.760889-0.568889 19.114667 3.185778 10.353778 3.811556 32.938667 12.970667 38.172444 15.132444 1.820444 0.682667 2.844444 2.048 3.584 3.527111a9.386667 9.386667 0 0 1-7.509333 13.084445c-2.616889 0.284444-4.778667 0-4.778667 0l-49.322666-7.850667c-5.973333-0.853333-9.955556 7.623111-9.955556 7.623111a4.096 4.096 0 0 0-0.568889 1.820444c0 4.494222 7.964444 9.102222 7.964445 9.102223l72.704 28.273777s12.8 7.111111 36.693333 7.111112c23.893333 0 69.745778-37.774222 69.745778-37.774223 14.791111-15.416889 12.344889-61.212444 0.398222-69.063111-11.946667-7.907556-45.340444-12.515556-58.595555-13.255111-13.255111-0.568889-34.417778-6.883556-61.269334-15.075555-26.908444-8.248889-57.002667-7.623111-70.087111 0-14.506667 8.419556-100.295111 54.897778-104.504889 58.595555z m296.96 134.712889c4.266667-3.640889 10.922667-14.449778 5.006222-30.094222-5.916444-15.587556-28.216889-5.404444-28.216888-5.404445l-88.120889 37.376c-2.275556 1.308444-4.664889 1.934222-6.883556 2.503111-6.314667 1.706667-8.760889 0.568889-19.114667-3.185777a1590.044444 1590.044444 0 0 1-38.172444-15.132445 6.485333 6.485333 0 0 1-3.527111-3.527111 9.386667 9.386667 0 0 1 7.509333-13.084444 18.204444 18.204444 0 0 1 4.721778 0s42.666667 6.826667 49.322667 7.793777c5.973333 0.910222 9.955556-7.566222 9.955555-7.566222a4.096 4.096 0 0 0 0.568889-1.820444c0-4.494222-7.964444-9.159111-7.964444-9.159111l-72.704-28.273778s-12.743111-7.054222-36.693334-7.054222c-23.893333 0-69.688889 37.774222-69.688889 37.774222-14.791111 15.416889-12.401778 61.212444-0.455111 69.063111 11.946667 7.850667 45.340444 12.515556 58.652445 13.255111 13.198222 0.568889 34.360889 6.883556 61.269333 15.075556 26.851556 8.248889 57.002667 7.623111 70.030222 0 14.506667-8.419556 100.295111-54.897778 104.504889-58.595556z" fill="#000000" p-id="4795"></path></svg></el-icon>
                竞秀区智慧养老院信息化服务平台
            </div>
        </el-header>
        
        <el-main>
            <div class="register">
                <div style="width:100%; margin-bottom: 10px;">
                    <div>
                        <el-icon style="color: rgb(253, 185, 82);"><Avatar /></el-icon>
                        <span class="title">注册</span>
                    </div>
                    <div class="iconImg"></div>
                </div>
                <el-form ref="registerFormRef" :model="registerForm" style="width:100%; padding: 0 30px;" :rules="rules">
                    <el-form-item prop="username" style="margin-bottom: 20px">
                        <el-input size="large" v-model="registerForm.userName" placeholder="请输入用户名">
                            <template #prefix>
                                <el-icon><UserFilled /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="username" style="margin-bottom: 20px">
                        <el-input size="large" v-model="registerForm.name" placeholder="请输入姓名">
                            <template #prefix>
                                <el-icon><UserFilled /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password" style="margin-bottom: 20px">
                        <el-input size="large" type="password" v-model="registerForm.password" placeholder="请输入密码 (8-16位)" show-password>
                            <template #prefix><el-icon><Key /></el-icon></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="checkPass" style="margin-bottom: 20px">
                        <el-input size="large" type="password" v-model="registerForm.checkPass" placeholder="请再次输入密码" show-password>
                            <template #prefix><el-icon><Key /></el-icon></template>
                        </el-input>         
                    </el-form-item>

                    <el-form-item prop="phone" style="margin-bottom: 30px">
                        <div style="display: flex; justify-content: space-between; width:100%">
                            <el-input size="large" v-model="registerForm.phone" placeholder="请输入手机号" style="margin-right:30px;">
                            <template #prefix><el-icon><Iphone /></el-icon></template>
                            </el-input>
                        </div>
                    </el-form-item>

                    <el-form-item prop="identificationNumber" style="margin-bottom: 30px">
                        <div style="display: flex; justify-content: space-between; width:100%">
                            <el-input size="large" v-model="registerForm.identificationNumber" placeholder="请输入身份证号" style="margin-right:30px;">
                            <template #prefix><el-icon><Postcard /></el-icon></template>
                            </el-input>
                        </div>
                    </el-form-item>

                    <el-form-item prop="gender" style="margin-bottom: 20px">
                        <label style="color: black;margin-right: 10%;margin-left: 2%;">性别</label>
                        <el-radio-group v-model="registerForm.gender">
                            <el-radio label="男" value="男">男</el-radio>
                            <el-radio label="女" value="女">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item prop="role" style="margin-bottom: 20px">
                        <label style="color: black;margin-right: 10%;margin-left: 2%;">角色</label>
                        <el-radio-group v-model="registerForm.role">
                            <el-radio label="1" :value="E_Role.Staff">工作人员</el-radio>
                            <el-radio label="2" :value="E_Role.Volunteer">志愿者</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item prop="vcode" style="margin-bottom: 30px">
                        <div style="display: flex; justify-content: space-between; width:100%">
                            <el-input size="large" v-model="registerForm.vcode" placeholder="请输入验证码" style="margin-right:30px;">
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
                        <el-button style="width: 100% ;margin: auto;" type="primary" @click="register(registerFormRef)">注册</el-button>
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
#topTitle {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 1000;
    color: rgb(62, 63, 65);
}
.register {
    display: flex;
    margin: auto;
    position: relative;
    max-width: 600px;
    max-height: fit-content;
    padding: 50px;
    top: 50px;
    background-color: rgba(255, 255, 255, 0.98);
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
    color: rgb(253, 185, 82);
}

#loginPage {
    height: 100vh;
    margin:0px;
    background: url(../assets/loginBackground.jpg) no-repeat;
    background-size:100% 100%;
    background-attachment:fixed;
}
.iconImg {
    margin:auto;
    width: 100px;
    height: 100px;
    background: url(../assets/icon.png) no-repeat;
    background-size: 100% 100%;
}
</style>