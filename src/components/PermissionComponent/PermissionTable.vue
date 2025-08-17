<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import axios from 'axios'
import { GetStaffList, SearchStaff } from '@/api'
import {jsonp} from 'vue-jsonp'
import { setStaffRegion, getStaffRegionList,
   setStaffRegionByManager,
   setStaffRegionByStaff,
   superadminDeleteRegion,
   managerDeleteStreetsRegion,
   staffTryToDeleteStreetRegion } from '@/api/region'
import { useMainStore } from '@/store'
import AreaSelector from '@/components/Common/AreaSelector.vue'


const role=ref('');
const deleteReason=ref('')

const regionForm = ref({
  provinceId: "88888888",
  provinceName: "全部",
  cityId: "88888888",
  cityName: "全部",
  districtId: "88888888",
  districtName: "全部",
  streetId: "88888888",
  streetName: "全部"
});

const confirmDeleteVisible=ref(false);

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
  provinceId: '88888888',
  provinceName: '全部',
  cityId: '88888888',
  cityName: '全部',
  districtId: '88888888',
  districtName: '全部',
  streetId: '88888888',
  streetName: '全部',
  fullAddress: '',
  communityCode: ''
})

const setReason=ref('')

const formRef = ref<FormInstance>()
const loading = ref(false)

const localPermission=ref(0)

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


// 添加直辖市判断
const MUNICIPALITIES = ['110000', '120000', '310000', '500000']  // 北京、天津、上海、重庆

const searchRegion = ref({
  provinceId: '88888888',
  provinceName: '全部',
  cityId: '88888888',
  cityName: '全部',
  districtId: '88888888',
  districtName: '全部',
  streetId: '88888888',
  streetName: '全部'
})

// 搜索条件
const searchCriteria = reactive({
  provinceId: '88888888',
  provinceName: '全部',
  cityId: '88888888',
  cityName: '全部',
  districtId: '88888888',
  districtName: '全部',
  streetId: '88888888',
  streetName: '全部',
  StaffName: '',
  IdentificationNumber: '',
  PageIndex: 1,
  PageSize: 10
});

// 新增总条数
const totalCount = ref(0);

// 修改搜索方法
const searchStaff = async () => {
  try {
    // 字段转换，接口参数名与AreaSelector组件字段对应关系
    const query = {
      ProvinceId: searchRegion.value.provinceId,
      ProvinceName: searchRegion.value.provinceName,
      MunicipalityId: searchRegion.value.cityId,
      MunicipalityName: searchRegion.value.cityName,
      DistrictId: searchRegion.value.districtId,
      DistrictName: searchRegion.value.districtName,
      TownshipStreetsId: searchRegion.value.streetId,
      TownshipStreetsName: searchRegion.value.streetName,
      StaffName: searchCriteria.StaffName,
      IdentificationNumber: searchCriteria.IdentificationNumber,
      PageIndex: searchCriteria.PageIndex,
      PageSize: searchCriteria.PageSize
    }
    const res = await GetStaffList(query)
    if (res.status === 200) {
      staffList.value = res.data.staffDetails
      totalCount.value = res.data.totalCount || 0
    }
  } catch (error) {
    ElMessage.error('搜索工作人员失败')
  }
};

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
  detailDialogVisible.value = true
  try {
    getStaffRegionList(staff.uid).then(res=>{
      if (res.status === 200) {
        currentStaffRegions.value = res.data
        
      }
    })
  } catch (error) {
    ElMessage.error('获取管理区域失败')
  }
}


// 添加删除方法
const handleDelete = async () => {
  let refreshCheck=false
  console.log(localPermission.value);

  if(localPermission.value==3&&deleteReason.value=='')
  {
    ElMessage.warning('请填写删除理由')
    return
  }
  else if(localPermission.value==3&&(deleteReason.value.length<5||deleteReason.value.length>500))
  {
    ElMessage.warning('删除理由应当在5-500字')
    return
  }
  
  if(localStorage.getItem('UserRole')=='SuperAdmin')
  {
     await superadminDeleteRegion(selectedRow.value.uid)
     .then(res=>{
        if(res.status==200)
        {
          refreshCheck=true
          ElMessage.success('操作成功')
        }
     })
     .catch(e=>{
      console.error(e);
      refreshCheck=false;
      ElMessage.error('操作权限不正确')
     })
  }
  else if(localStorage.getItem('UserRole')=='Manager'&&localPermission.value==2)
  {
      await managerDeleteStreetsRegion(selectedRow.value.uid)
      .then(res=>{
        if(res.status==200)
        {
          refreshCheck=true
          ElMessage.success('操作成功')
        }
      })
      .catch(e=>{
        console.error(e);
        refreshCheck=false;
        ElMessage.error('操作权限不正确')
      })
  }
  else if(localPermission.value==3)
  {
    const form={
      PermissionId:selectedRow.value.uid,
      Reason:deleteReason.value
    }
    await staffTryToDeleteStreetRegion(form)
      .then(res=>{
        if(res.status==200)
        {
          refreshCheck=true
          ElMessage.success('已递交删除申请，请等待审批通过')
        }
      })
      .catch(e=>{
        console.error(e);
        refreshCheck=false;
        ElMessage.error('操作权限不正确')
      })
  }

  if(refreshCheck)
  {
    const newRes = await getStaffRegionList(selectedRow.value.staffUid)
    if (newRes.status == 200) {
      currentStaffRegions.value = newRes.data
      confirmDeleteVisible.value=false;
      GetStaffList(searchCriteria).then(res => {
        if (res.status === 200) {
          staffList.value = res.data.staffDetails
        }
      })
    }
  }
  
}

// 修改弹窗关闭时的处理
const handleDialogClose = () => {
  // 清空表单数据
  formData.provinceId = ''
  formData.cityId = ''
  formData.districtId = ''
  formData.streetId = ''
  formData.streetName = ''
}

// 保存区域权限
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      console.log(regionForm.value);
      
      
      let areaData = {
        StaffUid: formData.staffId,
        ProvinceId: regionForm.value.provinceId,
        ProvinceName: regionForm.value.provinceName,
        MunicipalityId: regionForm.value.cityId,
        MunicipalityName: regionForm.value.cityName,
        DistrictId: regionForm.value.districtId,
        DistrictName: regionForm.value.districtName,
        TownshipStreetsId: regionForm.value.streetId,
        TownshipStreetsName: regionForm.value.streetName,
      }

      console.log(areaData);

      let res=null;
      if(localStorage.getItem('UserRole')=='SuperAdmin')
      {
        res = setStaffRegion(areaData);
      }
      else if(localStorage.getItem('UserRole')=='Manager')
      {
        res=setStaffRegionByManager(areaData);
      }
      else if(localStorage.getItem('UserRole')=='Staff')
      {
        areaData['Reason']=setReason.value;
        res=setStaffRegionByStaff(areaData);
      }

      res.then(res => {
          if (res.status === 200) {
            if(res.data.code!=null&&res.data.code!=200)
            {
              ElMessage.error(res.data.msg);
              return;
            }
            
            dialogVisible.value = false
            // 清空表单数据
            formData.staffId = ''
            formData.staffName = ''
            formData.provinceId = ''
            formData.cityId = ''
            formData.districtId = ''
            formData.streetId = ''
            formData.streetName = ''
            formData.fullAddress = ''
            setReason.value=''
            if(localPermission.value==3)
            {
              ElMessage.success('已发送申请，请等待市级管理者审批')
            }
            else
            {
              ElMessage.success('保存成功')
            }
            GetStaffList(searchCriteria).then(res => {
              if (res.status === 200) {
                staffList.value = res.data.staffDetails
                
              }
            })
          } else {
            ElMessage.error('保存失败')
          }
        })
        .catch(error => {
          if(error.response)
          {
            ElMessage.error(error.response.data.message);
          }
          else
          {
            console.error('保存区域权限失败:', error)
            ElMessage.error('保存区域权限失败')
          }
          
        })

    }
  })
}

const selectedRow=ref({
  staffName:'',
  staffUid:'',
  districtId:'',
  districtName:'',
  municipalityId:'',
  municipalityName:'',
  provinceId:'',
  provinceName:'',
  townshipStreetsId:'',
  townshipStreetsName:'',
  uid:''
})
const confirmDelete = (row)=>{
  console.log(row);
  if(row.staffUid==currentUserId)
  {
    ElMessage.warning('不可以删除自己的权限')
    return
  }
  if(localPermission.value==1)
  {
    ElMessage.warning('省级主管无该权限')
    return;
  }
  if(role.value=='Staff'&&(localPermission.value==3||localPermission.value==4)&&(row.districtId=='88888888'&&row.townshipStreetsId=='88888888'))
  {
    ElMessage.warning('无该操作权限')
    return;
  }
  
  selectedRow.value=row
  confirmDeleteVisible.value=true
}

// 修改onMounted
onMounted(async () => {
  
  // 获取工作人员列表
  GetStaffList(searchCriteria).then(res => {
    if (res.status === 200) {
      staffList.value = res.data.staffDetails
      totalCount.value = res.data.totalCount || 0
    }
  })
  

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
</script>

<template>
  <div>
    <!-- 搜索区域 -->
    <div style="width:100%; display:flex; justify-content:flex-end; padding:10px 25px;">
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
      <!-- 只保留AreaSelector -->
      <AreaSelector
        v-model:area="searchRegion"
        style="flex:1;min-width:600px;"
      />
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
        <el-table-column prop="name" width="130" label="姓名" show-overflow-tooltip />
        <el-table-column prop="userName" width="130" label="用户名" show-overflow-tooltip />
        <el-table-column prop="identificationNumber" label="身份证号" show-overflow-tooltip />
        <el-table-column prop="phone" label="电话号" show-overflow-tooltip />
        <el-table-column label="所在行政区划" show-overflow-tooltip>
          <template #default="{ row }">
            {{ getFullRegion(row) }}
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template #default="{ row }">
            {{ row ? getRoleName(row.role) : '' }}
          </template>
        </el-table-column>
        
        <el-table-column label="操作" width="220">
          <template #default="{ row }">
            <el-button 
              v-if="row.uid !== currentUserId"
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
      <!-- 分页组件 -->
      <div style="margin: 16px 0; text-align: right;">
        <el-pagination
          background
          layout="prev, pager, next, jumper, total"
          :total="totalCount"
          :page-size="searchCriteria.PageSize"
          :current-page="searchCriteria.PageIndex"
          @current-change="(page) => { searchCriteria.PageIndex = page; searchStaff(); }"
        />
      </div>
    </div>

    <!-- 区域分配表单 -->
    <el-dialog
      v-model="dialogVisible"
      :title="`为 ${selectedStaff?.name || ''} 分配管理区域`"
      width="50%"
      @close="handleDialogClose"
    >
      <el-form ref="formRef" :model="formData" label-width="120px">
        <!-- 只保留AreaSelector -->
        <el-form-item label="行政区划">
          <AreaSelector v-model:area="regionForm" />
        </el-form-item>
        <el-form-item label="完整地址" v-if="role!='SuperAdmin'">
          <el-input v-model="formData.fullAddress" readonly />
        </el-form-item>
        <el-form-item label="分配理由" v-if="localPermission==3">
          <el-input v-model="setReason" />
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
      @close="{
        currentStaffName='';
        currentStaffRegions=[]
      }"
    >
      <el-table :data="currentStaffRegions" style="width: 100%">
        <el-table-column prop="provinceName" label="省份" />
        <el-table-column prop="municipalityName" label="城市" />
        <el-table-column prop="districtName" label="区县" />
        <el-table-column prop="townshipStreetsName" label="街道/乡镇" />
        <el-table-column label="操作" width="120" >
          <template #default="{ row }" v-if="localPermission!=4&&localPermission!=1">
            <el-button 
              type="danger"
              @click="confirmDelete(row)"
              v-if="row.permissionStatus==1"
            >
              删除
            </el-button>
            <el-button type="warning" v-else>审批中</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="确认删除操作" v-model="confirmDeleteVisible" @close="selectedRow={
      staffName:'',
      staffUid:'',
      districtId:'',
      districtName:'',
      municipalityId:'',
      municipalityName:'',
      provinceId:'',
      provinceName:'',
      townshipStreetsId:'',
      townshipStreetsName:'',
      uid:''
    }">
      <template #default>
        <div style="font-size: large;display: flex;flex-direction: row;">
          确定要删除 {{ selectedRow.staffName }} 在 &nbsp;
          <div style="color: red;font-weight: 600;">
            <span v-if="selectedRow.provinceId!='88888888'&&selectedRow.provinceId!=''">{{ selectedRow.provinceName }}</span>
            <span v-if="selectedRow.municipalityId!='88888888'&&selectedRow.municipalityId!=''">{{ selectedRow.municipalityName }}</span>
            <span v-if="selectedRow.districtId!='88888888'&&selectedRow.districtId!=''">{{ selectedRow.districtName }}</span>
            <span v-if="selectedRow.townshipStreetsId!='88888888'&&selectedRow.townshipStreetsId!=''">{{ selectedRow.townshipStreetsName }}</span>
          </div>
          &nbsp;的权限吗？
        </div>
        <p v-if="localPermission==3" style="font-weight: 300;">
          &nbsp;需要市级管理者审批通过
            <el-input v-model="deleteReason" placeholder="请输入删除该条权限的理由(5-500字)"></el-input>
        </p>
      </template>
      <template #footer>
        <el-button @click="confirmDeleteVisible=false">取消</el-button>
        <el-button type="danger" @click="handleDelete">确定</el-button>
      </template>
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

/* 当前用户行的样式 */
.current-user-row {
  background-color: #f5f7fa !important;
  color: #909399;
}
</style>