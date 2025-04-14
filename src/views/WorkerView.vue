<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { ElMessage, ElDialog, ElButton, ElInput, ElMessageBox } from 'element-plus'
import { GetStaffList} from '@/api'
import {jsonp} from 'vue-jsonp'
import { useMainStore } from '@/store'
import { DeleteStaff,UpdateStaff } from '@/api/staff'


const role=ref('');

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
  phone?: string
  gender?: string
  address?: string
  standby?: string
  skill?: string
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


const localPermission=ref(0)

// 区域数据
const provinces = ref<DistrictItem[]>([])
const cities = ref<DistrictItem[]>([])
const districts = ref<DistrictItem[]>([])
const streets = ref<DistrictItem[]>([])

// 添加数据缓存
const areaCache = reactive<AreaCache>({
  provinces: [],
  cities: [],
  districts: [],
  streets: []
})

const staffList = ref<StaffItem[]>([])


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
  searchCriteria.MunicipalityId=''
  searchCriteria.DistrictId=''
  searchCriteria.TownshipStreetsId=''
  
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
  searchCriteria.DistrictId=''
  searchCriteria.TownshipStreetsId=''
  if (value && value !== '88888888') await getChildren(value, 2)
}

const handleDistrictChange = async (value: string) => {
  formData.districtCode = value
  formData.districtName = value === '88888888' ? '全部' : (districts.value.find(d => d.id === value)?.fullname || '')
  formData.streetCode = ''
  searchCriteria.TownshipStreetsId=''
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

// 搜索条件
const searchCriteria = reactive({
  ProvinceId: '88888888',
  MunicipalityId: '88888888',
  DistrictId: '88888888',
  TownshipStreetsId: '88888888',
  StaffName: '',
  IdentificationNumber: '',
  PageIndex: 1,
  PageSize: 10
});

// 修改搜索方法
const searchStaff = async () => {
  try {
    const query = {
      ProvinceId: searchCriteria.ProvinceId,
      MunicipalityId: searchCriteria.MunicipalityId,
      DistrictId: searchCriteria.DistrictId,
      TownshipStreetsId: searchCriteria.TownshipStreetsId,
      StaffName: searchCriteria.StaffName,
      IdentificationNumber: searchCriteria.IdentificationNumber,
      PageIndex: searchCriteria.PageIndex,
      PageSize: searchCriteria.PageSize
    };
    const res = await GetStaffList(query);
    if (res.status === 200) {
      staffList.value = res.data.staffDetails;
    }
  } catch (error) {
    ElMessage.error('搜索工作人员失败');
  }
};

// 修改onMounted
onMounted(async () => {
  // 首先加载缓存数据
  loadCacheData()
  
  // 获取工作人员列表
  GetStaffList(searchCriteria).then(res => {
    if (res.status === 200) {
      staffList.value = res.data.staffDetails
    }
  })
  
  // 如果没有省份数据，则获取
  if (!areaCache.provinces.length) {
    await getProvinces()
  }

  localPermission.value=Number(useMainStore().userInfo.havePermissionLevel);
  role.value=localStorage.getItem('UserRole')
  searchStaff(); // 初次加载时调用搜索
})

// 拼接行政区划
const getFullRegion = (row: any) => {
  const parts = [
    row.provinceName || '',
    MUNICIPALITIES.includes(row.provinceId?.toString() || '') ? '' : row.municipalityName || '',
    row.districtName || '',
    row.townshipStreetsName || ''
  ];
  return parts.filter(Boolean).join(' ');
};

const currentUserId = localStorage.getItem('Uid'); // 获取当前用户ID

// 员工详情对话框相关数据
const dialogVisible = ref(false);
const isEditMode = ref(false);
const selectedStaff = reactive<StaffItem>({
  uid: '',
  name: '',
  role: 0,
  managedAreas: [],
  phone: '',
  gender: '',
  address: '',
  standby: '',
  skill: ''
});

// 打开详情对话框
const showDetails = (staff: StaffItem) => {
  Object.assign(selectedStaff, staff);
  isEditMode.value = false;
  dialogVisible.value = true;
};

// 切换编辑模式
const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value;
};

// 保存修改
const saveChanges = async () => {
  try {
    // 调用保存修改的API
    await UpdateStaff(selectedStaff).then(
      res=>{
        if(res.status==200)
        {
          ElMessage.success('修改成功');
          searchStaff();
          isEditMode.value=false
        }
      }
    );
    
  } catch (error) {
    ElMessage.error('保存修改失败');
  }
};

// 取消修改
const cancelEdit = () => {
  isEditMode.value = false;
};

// 删除员工
const deleteStaff = (staff: StaffItem) => {
  ElMessageBox.confirm(
    `确认删除员工 ${staff.name} 吗？`,
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    try {
      // 调用删除员工的API
      await DeleteStaff(staff.uid);
      ElMessage.success('删除成功');
      searchStaff(); // 重新加载员工列表
    } catch (error) {
      ElMessage.error('删除失败');
    }
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};
</script>

<template>
  <div>
    <h1>工作人员记录表</h1>
  </div>
  <div>
    <!-- 搜索区域 -->
    <div style="width:100%; display:flex; justify-content:flex-start;align-items: center; padding:10px 25px;">
      <div style="padding-right:15px">
        <el-input
          v-model="searchCriteria.StaffName"
          size="large" 
          placeholder="请输入工作人员姓名"
          style="max-width:250px;"
        />
      </div>
      <div style="padding-right:15px">
        <el-input
          v-model="searchCriteria.IdentificationNumber"
          size="large" 
          placeholder="请输入身份证号"
          style="max-width:250px;"
        />
      </div>
      <div style="color: black;margin-right: 4px;">行政区划</div>
      <el-select v-model="searchCriteria.ProvinceId" placeholder="请选择省份" @change="handleProvinceChange" style="max-width:150px;">
        <el-option :key="ALL_OPTION.id" :label="ALL_OPTION.fullname" :value="ALL_OPTION.id" />
        <el-option v-for="item in provinces" :key="item.id" :label="item.fullname" :value="item.id" />
      </el-select>
      <el-select v-model="searchCriteria.MunicipalityId" placeholder="请选择城市" @change="handleCityChange" :disabled="!searchCriteria.ProvinceId || MUNICIPALITIES.includes(searchCriteria.ProvinceId)" style="max-width:150px;">
        <el-option :key="ALL_OPTION.id" :label="ALL_OPTION.fullname" :value="ALL_OPTION.id" />
        <el-option v-for="item in cities" :key="item.id" :label="item.fullname" :value="item.id" />
      </el-select>
      <el-select v-model="searchCriteria.DistrictId" placeholder="请选择区县" @change="handleDistrictChange" :disabled="!searchCriteria.MunicipalityId && !MUNICIPALITIES.includes(searchCriteria.ProvinceId)" style="max-width:150px;">
        <el-option :key="ALL_OPTION.id" :label="ALL_OPTION.fullname" :value="ALL_OPTION.id" />
        <el-option v-for="item in districts" :key="item.id" :label="item.fullname" :value="item.id" />
      </el-select>
      <el-select v-model="searchCriteria.TownshipStreetsId" placeholder="请选择街道/乡镇" @change="handleStreetChange" :disabled="!searchCriteria.DistrictId" style="max-width:150px;">
        <el-option :key="ALL_OPTION.id" :label="ALL_OPTION.fullname" :value="ALL_OPTION.id" />
        <el-option v-for="item in streets" :key="item.id" :label="item.fullname" :value="item.id" />
      </el-select>
      <el-button size="large" type="primary" style="margin-left:10px" @click="searchStaff">
        搜索
      </el-button>
    </div>

    <!-- 工作人员列表 -->
    <div class="staff-list">
      <el-table 
        :data="(staffList || []).filter(item => item.role !== E_Role.SuperAdmin)" 
        style="width: 100%"
        :row-class-name="({ row }) => row.uid === currentUserId ? 'current-user-row' : ''"
      >
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="userName" label="用户名" />
        <el-table-column prop="identificationNumber" show-overflow-tooltip label="身份证号" />
        <el-table-column prop="phone" width="135" show-overflow-tooltip label="电话号" />
        <el-table-column prop="gender" label="性别" width="100" show-overflow-tooltip />
        <el-table-column prop="address" label="家庭住址" show-overflow-tooltip />
        <el-table-column prop="standby" label="备用邮箱" show-overflow-tooltip />
        <el-table-column prop="skill" label="技能" show-overflow-tooltip />
        
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button type="primary" @click="showDetails(scope.row)">详情</el-button>
            <!-- <el-button type="danger" @click="deleteStaff(scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <!-- 员工详情对话框 -->
  <el-dialog v-model="dialogVisible" width="50%">
    <div class="staffTitle">
      <span v-if="!isEditMode">员工详情</span>
      <span v-else>修改员工信息</span>
      
    </div>
    <div v-if="!isEditMode">
      <p><strong>姓名：</strong>{{ selectedStaff.name }}</p>
      <p><strong>角色：</strong>{{ getRoleName(selectedStaff.role) }}</p>
      <p><strong>电话：</strong>{{ selectedStaff.phone }}</p>
      <p><strong>性别：</strong>{{ selectedStaff.gender }}</p>
      <p><strong>家庭住址：</strong>{{ selectedStaff.address }}</p>
      <p><strong>备用邮箱：</strong>{{ selectedStaff.standby }}</p>
      <p><strong>技能：</strong>{{ selectedStaff.skill }}</p>
    </div>
    <div v-else>
      <div style="display: flex;flex-direction: row;margin-top: 1vh;margin-left: 2vw;">
        <div class="wordTitle">姓名</div> <el-input v-model="selectedStaff.name" placeholder="请输入姓名" />
      </div>
      <div style="display: flex;flex-direction: row;margin-top: 1vh;margin-left: 2vw;">
        <div class="wordTitle">电话</div><el-input v-model="selectedStaff.phone" placeholder="请输入电话" />
      </div>
      <div style="display: flex;flex-direction: row;margin-top: 1vh;margin-left: 2vw;">
        <div class="wordTitle">性别</div><el-select v-model="selectedStaff.gender" placeholder="">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </div>
      <div style="display: flex;flex-direction: row;margin-top: 1vh;margin-left: 2vw;">
        <div class="wordTitle">家庭住址</div><el-input v-model="selectedStaff.address" placeholder="请输入家庭住址" />
      </div>
      <div style="display: flex;flex-direction: row;margin-top: 1vh;margin-left: 2vw;">
        <div class="wordTitle">备用邮箱</div><el-input v-model="selectedStaff.standby" placeholder="请输入备用邮箱" />
      </div>
      <div style="display: flex;flex-direction: row;margin-top: 1vh;margin-left: 2vw;">
        <div class="wordTitle">技能</div><el-input v-model="selectedStaff.skill" placeholder="请输入技能" />
      </div>
    </div>
    <template #footer>
      <el-button v-if="!isEditMode" type="primary" @click="toggleEditMode">修改</el-button>
      <el-button @click="cancelEdit" v-if="isEditMode">取消</el-button>
      <el-button v-if="isEditMode" type="success" @click="saveChanges">保存</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.wordTitle{
  display: flex;
  width: 6.2vw;
  text-align: center;
  justify-content: center;
  align-content: center;
  color: black;
  font-size: 1.2vw;
  border-left: #571be2 2px solid;
}
p{
  border-left: #238af0 2px solid;
  margin-top: 1vh;
  margin-left: 3vw;
  font-size: medium;
}
strong{
  color: black;
  margin-left: 3px;
}
.staffTitle{
  color: #238af0;
  font-weight: 600;
  font-size: large;
  border-bottom: #409eff dashed 1px;
}
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

/* 当前用户行的样式 */
.current-user-row {
  background-color: #f5f7fa !important;
  color: #909399;
}
</style>