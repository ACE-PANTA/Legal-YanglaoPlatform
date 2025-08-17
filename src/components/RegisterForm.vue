<script setup lang="ts">
import { onMounted, reactive, ref, defineEmits } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { sha256 } from 'js-sha256'
import { Register } from '@/api/staff'
import Dentify from '@/components/Dentify.vue'
import { jsonp } from 'vue-jsonp'
import { useRouter } from 'vue-router'

const emit = defineEmits(['register-success'])

const router = useRouter()

const saveCacheData = () => {
  try {
    localStorage.setItem(CACHE_KEY.PROVINCES, JSON.stringify(areaCache.provinces))
    localStorage.setItem(CACHE_KEY.CITIES, JSON.stringify(areaCache.cities))
    localStorage.setItem(CACHE_KEY.DISTRICTS, JSON.stringify(areaCache.districts))
  } catch (error) {
    console.error('保存缓存数据失败:', error)
  }
}

interface DistrictItem {
  id: string
  fullname: string
  name: string
  type?: number
  children?: DistrictItem[]
}

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
    ProvinceId: string,
    ProvinceName: string
    MunicipalityId: string,
    MunicipalityName: string
    DistrictId: string,
    DistrictName: string
    TownshipStreetsId: string,
    TownshipStreetsName: string
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
    ProvinceId: '',
    ProvinceName: '',
    MunicipalityId: '',
    MunicipalityName: '',
    DistrictId: '',
    DistrictName: '',
    TownshipStreetsId: '',
    TownshipStreetsName: '',
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
        { pattern: /^[A-Za-z0-9]{3,}$/, message: '用户名只能包含数字和英文，且不少于3个字符', trigger: 'blur' }
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
    ],
    ProvinceId:[{required:true,message:'省级单位不可为空'}],
    DistrictId:[{required:true,message:'区县单位不可为空'}],
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
                ProvinceId: registerForm.ProvinceId,
                ProvinceName: registerForm.ProvinceName,
                MunicipalityId: registerForm.MunicipalityId||'88888888',
                MunicipalityName: registerForm.MunicipalityName||'全部',
                DistrictId: registerForm.DistrictId,
                DistrictName: registerForm.DistrictName,
                TownshipStreetsId: registerForm.TownshipStreetsId,
                TownshipStreetsName: registerForm.TownshipStreetsName,
            }
            console.log(data);
            Register(data).then(res => {
                console.log(res.data);
                if (res.data.code === 200) {
                    handleRegisterSuccess()
                } else {
                    ElMessage.error(res.data.msg)
                }
            }).catch(err => {
                console.log(err)
                ElMessage.error(err.response.data.message)
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}, 1000)  // 设置1秒的防抖延迟

const handleRegisterSuccess = () => {
  ElMessage.success('新增用户成功')
  emit('register-success')
  // 可选：router.push('/login')
}

// 区域数据相关

const CACHE_KEY = {
  PROVINCES: 'area_provinces',
  CITIES: 'area_cities',
  DISTRICTS: 'area_districts'
}
interface AreaCache {
  [key: string]: DistrictItem[]
}

const provinces = ref<DistrictItem[]>([])
const cities = ref<DistrictItem[]>([])
const districts = ref<DistrictItem[]>([])
const streets = ref<DistrictItem[]>([])
const areaCache = reactive<AreaCache>({
    provinces: [],
    cities: [],
    districts: [],
    streets: []
})


// 添加默认选项到列表
const addDefaultOption = (list: DistrictItem[]) => [ ...list]

// 加载缓存数据
const loadCacheData = () => {
    try {
        const cachedProvinces = localStorage.getItem(CACHE_KEY.PROVINCES)
        const cachedCities = localStorage.getItem(CACHE_KEY.CITIES)
        const cachedDistricts = localStorage.getItem(CACHE_KEY.DISTRICTS)

        if (cachedProvinces) {
            areaCache.provinces = JSON.parse(cachedProvinces)
            provinces.value = areaCache.provinces
        }
        if (cachedCities) {
            areaCache.cities = JSON.parse(cachedCities)
        }
        if (cachedDistricts) {
            areaCache.districts = JSON.parse(cachedDistricts)
        }
    } catch (error) {
        console.error('加载缓存数据失败:', error)
    }
}

// 获取省份数据
const getProvinces = async () => {
    try {
        if (areaCache.provinces.length > 0) {
            provinces.value = addDefaultOption(areaCache.provinces)
            return
        }
        const res = await jsonp('https://apis.map.qq.com/ws/district/v1/list', {
            key: 'LXLBZ-HP66Q-PYL5K-B74JY-IFTMK-RYFV2',
            output: 'jsonp'
        })
        if (res.status === 0) {
            areaCache.provinces = res.result[0]
            provinces.value = addDefaultOption(areaCache.provinces)
            saveCacheData()
        }
    } catch (error) {
        console.error('获取省份数据失败:', error)
        ElMessage.error('获取省份数据失败')
    }
}

// 获取下级行政区数据
const getChildren = async (id: string, level: number) => {
    try {
        if (level === 1 && areaCache.cities[id]) {
            cities.value = addDefaultOption(areaCache.cities[id])
            return
        }
        if (level === 2 && areaCache.districts[id]) {
            districts.value = addDefaultOption(areaCache.districts[id])
            return
        }
        if (level === 3 && areaCache.streets[id]) {
            streets.value = addDefaultOption(areaCache.streets[id])
            return
        }

        const res = await jsonp('https://apis.map.qq.com/ws/district/v1/getchildren', {
            key: 'LXLBZ-HP66Q-PYL5K-B74JY-IFTMK-RYFV2',
            id: id,
            output: 'jsonp'
        })

        if (res.status === 0) {
            if (level === 1) {
                areaCache.cities[id] = res.result[0]
                cities.value = addDefaultOption(areaCache.cities[id])
                districts.value = addDefaultOption([])
            } else if (level === 2) {
                areaCache.districts[id] = res.result[0]
                districts.value = addDefaultOption(areaCache.districts[id])
                streets.value = addDefaultOption([])
            } else if (level === 3) {
                areaCache.streets[id] = res.result[0]
                streets.value = addDefaultOption(areaCache.streets[id])
            }
            saveCacheData()
        }
    } catch (error) {
        console.error('获取下级行政区失败:', error)
        ElMessage.error('获取下级行政区失败')
    }
}

// 添加直辖市判断
const MUNICIPALITIES = ['110000', '120000', '310000', '500000'] // 北京、天津、上海、重庆

// 处理省份选择
const handleProvinceChange = async (value: string) => {
    const selectedProvince = provinces.value.find(p => p.id === value);
    registerForm.ProvinceId = value;
    registerForm.ProvinceName = selectedProvince ? selectedProvince.fullname : ''; // 更新省份名称
    registerForm.MunicipalityId = '';
    registerForm.MunicipalityName = '';
    registerForm.DistrictId = '';
    registerForm.DistrictName = '';
    registerForm.TownshipStreetsId = '';
    registerForm.TownshipStreetsName = '';
    if (value) {
        if (MUNICIPALITIES.includes(value)) {
            await getChildren(value, 2); // 直辖市直接加载区县
            cities.value = addDefaultOption([]); // 清空城市选择
        } else {
            await getChildren(value, 1);
        }
    } else {
        cities.value = addDefaultOption([]);
        districts.value = addDefaultOption([]);
        streets.value = addDefaultOption([]);
    }
}

// 处理城市选择
const handleCityChange = async (value: string) => {
    const selectedCity = cities.value.find(c => c.id === value); 
    registerForm.MunicipalityId = value;
    registerForm.MunicipalityName = selectedCity ? selectedCity.fullname : ''; // 更新城市名称
    registerForm.DistrictId = '';
    registerForm.DistrictName = '';
    registerForm.TownshipStreetsId = '';
    registerForm.TownshipStreetsName = '';
    if (value) {
        await getChildren(value, 2);
    } else {
        districts.value = addDefaultOption([]);
        streets.value = addDefaultOption([]);
    }
}

// 处理区县选择
const handleDistrictChange = async (value: string) => {
    const selectedDistrict = districts.value.find(d => d.id === value);
    registerForm.DistrictId = value;
    registerForm.DistrictName = selectedDistrict ? selectedDistrict.fullname : ''; // 更新区县名称
    registerForm.TownshipStreetsId = '';
    registerForm.TownshipStreetsName = '';
    if (value) {
        await getChildren(value, 3);
    } else {
        streets.value = addDefaultOption([]);
    }
}

// 处理街道选择
const handleStreetChange = (value: string) => {
    const selectedStreet = streets.value.find(s => s.id === value);
    registerForm.TownshipStreetsId = value;
    registerForm.TownshipStreetsName = selectedStreet ? selectedStreet.fullname : ''; // 更新街道名称
}

onMounted(async () => {
    getvCode()
    loadCacheData()
    if (!areaCache.provinces.length) {
        await getProvinces()
    }
})
</script>

<template>
  <el-form ref="registerFormRef" :model="registerForm" style="width:100%; padding: 0 30px;" :rules="rules">
    <el-form-item prop="username" style="margin-bottom: 20px">
      <el-input size="large" v-model="registerForm.userName" placeholder="请输入登录使用的账号(只支持英文、数字的组合，至少三个字符)">
        <template #prefix>
          <el-icon><UserFilled /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="username" style="margin-bottom: 20px">
      <el-input size="large" v-model="registerForm.name" placeholder="请输入注册账号的姓名">
        <template #prefix>
          <el-icon><Postcard /></el-icon>
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
    <el-form-item label="工作人员地址">
    </el-form-item>
    <el-form-item label="省份" prop="province">
      <el-select v-model="registerForm.ProvinceId" placeholder="请选择省份" @change="handleProvinceChange">
        <el-option v-for="item in provinces" :key="item.id" :label="item.fullname" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="城市" prop="municipality" v-if="!MUNICIPALITIES.includes(String(registerForm.ProvinceId))">
      <el-select v-model="registerForm.MunicipalityId" placeholder="请选择城市" @change="handleCityChange" :disabled="!registerForm.ProvinceId">
        <el-option v-for="item in cities" :key="item.id" :label="item.fullname" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="区县" prop="district">
      <el-select v-model="registerForm.DistrictId" placeholder="请选择区县" @change="handleDistrictChange" :disabled="!registerForm.ProvinceId || (!MUNICIPALITIES.includes(String(registerForm.ProvinceId)) && !registerForm.MunicipalityId)">
        <el-option v-for="item in districts" :key="item.id" :label="item.fullname" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="街道/乡镇" prop="townshipStreets">
      <el-select v-model="registerForm.TownshipStreetsId" placeholder="请选择街道/乡镇" @change="handleStreetChange" :disabled="!registerForm.DistrictId">
        <el-option v-for="item in streets" :key="item.id" :label="item.fullname" :value="item.id" />
      </el-select>
    </el-form-item>
    
    <el-form-item style="text-align: center; margin:auto">
      <el-button style="width: 100% ;margin: auto;" type="primary" @click="register(registerFormRef)">确认新增</el-button>
    </el-form-item>

  </el-form>
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