<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import axios from 'axios'
import { GetStaffList, SearchStaff } from '@/api'
import {jsonp} from 'vue-jsonp'
import { setStaffRegion, getStaffRegionList, deleteStaffRegion } from '@/api/region'
import {checkGivePermissionEnabled} from '@/api/permission'

// 区域数据接口
interface DistrictItem {
  id: string
  fullname: string
  name: string
  type?: number
  children?: DistrictItem[]
}

// 添加工作人员数据接口
interface StaffItem {
  uid: string
  name: string
  role: number
  managedAreas?: Array<{
    provinceCode: string
    provinceName: string
    cityCode: string
    cityName: string
    districtCode: string
    districtName: string
    streetCode?: string
    streetName?: string
  }>
}

// 添加数据缓存接口
interface AreaCache {
  [key: string]: DistrictItem[]
}

// 添加角色枚举
enum E_Role {
  Manager = 0,      // 高管
  Staff = 1,        // 员工
  Volunteer = 2,    // 志愿者
  SuperAdmin = 88   // 超级管理员
}

// 添加角色名称映射
const roleNameMap = {
  [E_Role.Manager]: '高管',
  [E_Role.Staff]: '员工',
  [E_Role.Volunteer]: '志愿者',
  [E_Role.SuperAdmin]: '超级管理员'
}

// 添加获取角色名称的方法
const getRoleName = (role: number) => roleNameMap[role as E_Role] || '未知角色'

// 表单数据
const formData = reactive({
  staffId: '',
  staffName: '',
  provinceCode: '',
  provinceName: '',
  cityCode: '',
  cityName: '',
  districtCode: '',
  districtName: '',
  streetCode: '',
  streetName: '',
  fullAddress: '',
  communityCode: ''
})

const formRef = ref<FormInstance>()
const loading = ref(false)

// 区域数据
const provinces = ref<DistrictItem[]>([])
const cities = ref<DistrictItem[]>([])
const districts = ref<DistrictItem[]>([])
const streets = ref<DistrictItem[]>([])
const communitys = ref<DistrictItem[]>([])

// 添加数据缓存
const areaCache = reactive<AreaCache>({
  provinces: [],
  cities: [],
  districts: [],
  streets: []
})

// 搜索工作人员相关
const staffSearchKeyword = ref('')
const staffList = ref<StaffItem[]>([])
const selectedStaff = ref<StaffItem | null>(null)

// 添加弹窗可见性控制
const dialogVisible = ref(false)

// 添加详情对话框相关数据
const detailDialogVisible = ref(false)
const currentStaffRegions = ref<any[]>([])
const currentStaffName = ref('')

// 添加缓存键常量
const CACHE_KEY = {
  PROVINCES: 'area_provinces',
  CITIES: 'area_cities',
  DISTRICTS: 'area_districts'
}

// 添加直辖市判断
const MUNICIPALITIES = ['110000', '120000', '310000', '500000']  // 北京、天津、上海、重庆

// 添加常量
const ALL_OPTION = {
  id: '88888888',
  fullname: '全部'
}

// 添加缓存操作方法
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

const saveCacheData = () => {
  try {
    localStorage.setItem(CACHE_KEY.PROVINCES, JSON.stringify(areaCache.provinces))
    localStorage.setItem(CACHE_KEY.CITIES, JSON.stringify(areaCache.cities))
    localStorage.setItem(CACHE_KEY.DISTRICTS, JSON.stringify(areaCache.districts))
  } catch (error) {
    console.error('保存缓存数据失败:', error)
  }
}

const addDefaultOption = (list: DistrictItem[]) => [{ id: '88888888', fullname: '全部' }, ...list];

const getProvinces = async () => {
  try {
    if (areaCache.provinces.length > 0) {
      provinces.value = addDefaultOption(areaCache.provinces);
      return;
    }
    const res = await jsonp('https://apis.map.qq.com/ws/district/v1/list', {
      key: 'LXLBZ-HP66Q-PYL5K-B74JY-IFTMK-RYFV2',
      output: 'jsonp'
    });
    if (res.status === 0) {
      areaCache.provinces = res.result[0];
      provinces.value = addDefaultOption(areaCache.provinces);
      saveCacheData();
    }
  } catch (error) {
    ElMessage.error('获取省份数据失败');
  }
};

const getChildren = async (id: string, level: number) => {
  try {
    if (level === 1 && areaCache.cities[id]) {
      cities.value = addDefaultOption(areaCache.cities[id]);
      return;
    }
    if (level === 2 && areaCache.districts[id]) {
      districts.value = addDefaultOption(areaCache.districts[id]);
      return;
    }
    if (level === 3 && areaCache.streets && areaCache.streets[id]) {
      streets.value = addDefaultOption(areaCache.streets[id]);
      return;
    }

    const res = await jsonp('https://apis.map.qq.com/ws/district/v1/getchildren', {
      key: 'LXLBZ-HP66Q-PYL5K-B74JY-IFTMK-RYFV2',
      id: id,
      output: 'jsonp'
    });

    if (res.status === 0) {
      if (level === 1) {
        if (MUNICIPALITIES.includes(id)) {
          areaCache.districts[id] = res.result[0];
          districts.value = addDefaultOption(areaCache.districts[id]);
          cities.value = [];
        } else {
          areaCache.cities[id] = res.result[0];
          cities.value = addDefaultOption(areaCache.cities[id]);
          districts.value = [];
        }
        streets.value = [];
      } else if (level === 2) {
        areaCache.districts[id] = res.result[0];
        districts.value = addDefaultOption(areaCache.districts[id]);
        streets.value = [];
      } else if (level === 3) {
        if (!areaCache.streets) areaCache.streets = [];
        areaCache.streets[id] = res.result[0];
        streets.value = addDefaultOption(areaCache.streets[id]);
      }
      saveCacheData();
    }
  } catch (error) {
    ElMessage.error('获取下级行政区失败');
  }
};

// 修改选择处理方法
const handleProvinceChange = async (value: string) => {
  formData.provinceCode = value
  formData.provinceName = value === '88888888' ? '全部' : (provinces.value.find(p => p.id === value)?.fullname || '')
  formData.cityCode = ''
  formData.districtCode = ''
  formData.streetCode = ''
  
  if (value && value !== '88888888') {
    if (MUNICIPALITIES.includes(value)) {
      await getChildren(value, 1)
    } else {
      await getChildren(value, 1)
    }
  }
}

const handleCityChange = async (value: string) => {
  formData.cityCode = value
  formData.cityName = value === '88888888' ? '全部' : (cities.value.find(c => c.id === value)?.fullname || '')
  formData.districtCode = ''
  formData.streetCode = ''
  if (value && value !== '88888888') await getChildren(value, 2)
}

const handleDistrictChange = async (value: string) => {
  formData.districtCode = value
  formData.districtName = value === '88888888' ? '全部' : (districts.value.find(d => d.id === value)?.fullname || '')
  formData.streetCode = ''
  if (value && value !== '88888888') await getChildren(value, 3)
}

const handleStreetChange = (value: string) => {
  formData.streetCode = value
  formData.streetName = value === '88888888' ? '全部' : (streets.value.find(s => s.id === value)?.fullname || '')
  updateFullAddress()
}

// 更新完整地址
const updateFullAddress = () => {
  const parts = []
  if (formData.provinceCode) {
    parts.push(formData.provinceCode === '88888888' ? '全部' : 
      provinces.value.find(p => p.id === formData.provinceCode)?.fullname)
  }
  if (!MUNICIPALITIES.includes(formData.provinceCode) && formData.cityCode) {
    parts.push(formData.cityCode === '88888888' ? '全部' : 
      cities.value.find(c => c.id === formData.cityCode)?.fullname)
  }
  if (formData.districtCode) {
    parts.push(formData.districtCode === '88888888' ? '全部' : 
      districts.value.find(d => d.id === formData.districtCode)?.fullname)
  }
  if (formData.streetCode) {
    parts.push(formData.streetCode === '88888888' ? '全部' : 
      streets.value.find(s => s.id === formData.streetCode)?.fullname)
  }
  formData.fullAddress = parts.filter(Boolean).join(' ')
}

// 搜索工作人员
const searchStaff = async () => {
  try {
    const res = await SearchStaff({ SearchKey: staffSearchKeyword.value })
    if (res.status === 200) {
      staffList.value = res.data
    }
  } catch (error) {
    ElMessage.error('搜索工作人员失败')
  }
}

// 修改选择工作人员的方法
const handleStaffSelect = (staff: StaffItem) => {
  selectedStaff.value = staff
  formData.staffId = staff.uid
  formData.staffName = staff.name
  dialogVisible.value = true
}

// 添加查看详情方法
const handleViewDetail = async (staff: StaffItem) => {
  currentStaffName.value = staff.name
  try {
    const res = await getStaffRegionList(staff.uid)
    if (res.status === 200) {
      currentStaffRegions.value = res.data
      detailDialogVisible.value = true
    }
  } catch (error) {
    ElMessage.error('获取管理区域失败')
  }
}

// 添加删除方法
const handleDelete = async (row: any) => {
  try {
    const res = await deleteStaffRegion(row.uid)
    if (res.status === 200) {
      ElMessage.success('删除成功')
      // 重新加载数据
      const newRes = await getStaffRegionList(row.staffUid)
      if (newRes.status === 200) {
        currentStaffRegions.value = newRes.data
      }
    } else {
      ElMessage.error('删除失败')
    }
  } catch (error) {
    console.error('删除失败:', error)
    ElMessage.error('删除失败')
  }
}

// 修改弹窗关闭时的处理
const handleDialogClose = () => {
  // 清空表单数据
  formData.provinceCode = ''
  formData.cityCode = ''
  formData.districtCode = ''
  formData.streetCode = ''
  formData.streetName = ''
  // 清空区域数据
  cities.value = []
  districts.value = []
  streets.value = []
}

// 保存区域权限
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      const areaData = {
        StaffUid: formData.staffId,
        ProvinceId: formData.provinceCode || '88888888',
        ProvinceName: formData.provinceName,
        MunicipalityId: formData.cityCode || '88888888',
        MunicipalityName: formData.cityName,
        DistrictId: formData.districtCode || '88888888',
        DistrictName: formData.districtName,
        TownshipStreetsId: formData.streetCode || '88888888',
        TownshipStreetsName: formData.streetName,
      }

      const checkData=
        {
          ProvinceId: formData.provinceCode || '88888888',
          MunicipalityId: formData.cityCode || '88888888',
          DistrictId: formData.districtCode || '88888888',
          TownshipStreetsId: formData.streetCode || '88888888'
        }

      if(localStorage.getItem('UserRole')!='SuperAdmin')
      {
        checkGivePermissionEnabled(checkData).then(res => {
        if (res.status === 200) {
          setStaffRegion(areaData).then(res => {
            if (res.status === 200) {
              ElMessage.success('保存成功')
              dialogVisible.value = false
              // 清空表单数据
              formData.staffId = ''
              formData.staffName = ''
              formData.provinceCode = ''
              formData.cityCode = ''
              formData.districtCode = ''
              formData.streetCode = ''
              formData.streetName = ''
              formData.fullAddress = ''
            } else {
              ElMessage.error('保存失败')
            }
          })
          .catch(error => {
            console.error('保存区域权限失败:', error)
            ElMessage.error('保存区域权限失败')
          })
          } else {
            ElMessage.error('区域权限分配失败，请检查区域权限')
          }
      }).catch(error => {
        console.error('检查区域权限失败:', error)
        ElMessage.error('区域权限不足')
      })
      }
      else
      {
        setStaffRegion(areaData).then(res => {
            if (res.status === 200) {
              ElMessage.success('保存成功')
              dialogVisible.value = false
              // 清空表单数据
              formData.staffId = ''
              formData.staffName = ''
              formData.provinceCode = ''
              formData.cityCode = ''
              formData.districtCode = ''
              formData.streetCode = ''
              formData.streetName = ''
              formData.fullAddress = ''
            } else {
              ElMessage.error('保存失败')
            }
          })
          .catch(error => {
            console.error('保存区域权限失败:', error)
            ElMessage.error('保存区域权限失败')
          })
      }

      
     
      
    }
  })
}

// 修改onMounted
onMounted(async () => {
  // 首先加载缓存数据
  loadCacheData()
  
  // 获取工作人员列表
  GetStaffList().then(res => {
    if (res.status === 200) {
      staffList.value = res.data
    }
  })
  
  // 如果没有省份数据，则获取
  if (!areaCache.provinces.length) {
    await getProvinces()
  }
})
</script>

<template>
  <div class="permission-container">
    <h1>区域权限分级</h1>
    
    <!-- 搜索区域 -->
    <div style="width:100%; display:flex; justify-content:flex-end; padding:10px 25px;">
      <div style="padding-right:15px">
        <el-input
          v-model="staffSearchKeyword"
          size="large" 
          placeholder="请输入工作人员姓名"
          style="max-width:250px;"
          @keyup.enter="searchStaff"
        />
      </div>
      <el-button size="large" type="primary" style="margin-right:10px" @click="searchStaff">
        搜索
      </el-button>
    </div>

    <!-- 工作人员列表 -->
    <div class="staff-list">
      <el-table :data="staffList" style="width: 100%">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="userName" label="用户名" />
        <el-table-column label="角色">
          <template #default="{ row }">
            {{ getRoleName(row.role) }}
          </template>
        </el-table-column>
        
        <el-table-column label="操作" width="220">
          <template #default="{ row }">
            <el-button 
              type="primary" 
              size="small"
              @click="handleStaffSelect(row)"
            >
              分配区域
            </el-button>
            <el-button 
              type="info" 
              size="small"
              @click="handleViewDetail(row)"
            >
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 区域分配表单 -->
    <el-dialog
      v-model="dialogVisible"
      :title="`为 ${selectedStaff?.name || ''} 分配管理区域`"
      width="50%"
      @close="handleDialogClose"
    >
      <el-form ref="formRef" :model="formData" label-width="120px">
        <el-form-item label="工作人员" prop="staffId">
          <el-select v-model="formData.staffId" placeholder="请选择工作人员">
            <el-option 
              v-for="staff in staffList"
              :key="staff.uid"
              :label="staff.name"
              :value="staff.uid"
            />
          </el-select>
        </el-form-item>
        
        <!-- 三级行政区选择 -->
        <el-form-item label="省份" prop="provinceCode">
          <el-select 
            v-model="formData.provinceCode" 
            placeholder="请选择省份"
            @change="handleProvinceChange"
          >
            <el-option 
              :key="ALL_OPTION.id"
              :label="ALL_OPTION.fullname"
              :value="ALL_OPTION.id"
            />
            <el-option 
              v-for="item in provinces"
              :key="item.id"
              :label="item.fullname"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        
        <el-form-item v-if="!MUNICIPALITIES.includes(formData.provinceCode)" label="城市" prop="cityCode">
          <el-select 
            v-model="formData.cityCode" 
            placeholder="请选择城市"
            @change="handleCityChange"
            :disabled="!formData.provinceCode"
          >
            <el-option 
              :key="ALL_OPTION.id"
              :label="ALL_OPTION.fullname"
              :value="ALL_OPTION.id"
            />
            <el-option 
              v-for="item in cities"
              :key="item.id"
              :label="item.fullname"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        
        <el-form-item label="区县" prop="districtCode">
          <el-select 
            v-model="formData.districtCode" 
            placeholder="请选择区县"
            @change="handleDistrictChange"
            :disabled="!MUNICIPALITIES.includes(formData.provinceCode) && !formData.cityCode"
          >
            <el-option 
              :key="ALL_OPTION.id"
              :label="ALL_OPTION.fullname"
              :value="ALL_OPTION.id"
            />
            <el-option 
              v-for="item in districts"
              :key="item.id"
              :label="item.fullname"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="街道/乡镇" prop="streetCode">
          <el-select 
            v-model="formData.streetCode" 
            placeholder="请选择街道/乡镇"
            @change="handleStreetChange"
            :disabled="!formData.districtCode"
          >
            <el-option 
              :key="ALL_OPTION.id"
              :label="ALL_OPTION.fullname"
              :value="ALL_OPTION.id"
            />
            <el-option 
              v-for="item in streets"
              :key="item.id"
              :label="item.fullname"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="完整地址">
          <el-input v-model="formData.fullAddress" readonly />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">增加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 添加详情对话框 -->
    <el-dialog
      v-model="detailDialogVisible"
      :title="`${currentStaffName}的管理区域详情`"
      width="60%"
    >
      <el-table :data="currentStaffRegions" style="width: 100%">
        <el-table-column prop="provinceName" label="省份" />
        <el-table-column prop="municipalityName" label="城市" />
        <el-table-column prop="districtName" label="区县" />
        <el-table-column prop="townshipStreetsName" label="街道/乡镇" />
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button 
              type="danger" 
              size="small"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<style scoped>
.permission-container {
  padding: 20px;
}

.content-wrapper {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.form-section {
  flex: 1;
  max-width: 500px;
}

.table-section {
  margin-top: 20px;
}

.search-box {
  margin-bottom: 10px;
}

.search-results {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.el-radio-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.area-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.area-item:last-child {
  border-bottom: none;
}

.street-item {
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.street-item:hover {
  background-color: #f5f7fa;
}

.street-item.selected {
  background-color: #ecf5ff;
  color: #409eff;
}

.street-name {
  font-size: 14px;
}

.selected-street {
  margin-top: 10px;
}
</style>