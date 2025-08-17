<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { ElMessage, ElDialog, ElButton, ElInput, ElMessageBox } from 'element-plus'
import { GetStaffList} from '@/api'
import { useMainStore } from '@/store'
import { DeleteStaff,UpdateStaff, refreshStaffPassword } from '@/api/staff'
import RegisterForm from '@/components/RegisterForm.vue' // 新增：引入注册表单组件
import request from '@/utils/request'
import ExportVisitDialog from "@/components/Exports/ExportVisitDialog.vue";
// 新增：引入单员工导出组件
import ExportStaffVisitDialog from "@/components/Exports/ExportStaffVisitDialog.vue";
import AreaSelector from '@/components/Common/AreaSelector.vue'

const role=ref('');

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




const staffList = ref<StaffItem[]>([])
// 新增：分页相关
const totalCount = ref(0)


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



const searchRegion=ref({
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
const searchCriteria = ref({
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

// 修改搜索方法，获取总条数
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
      StaffName: searchCriteria.value.StaffName,
      IdentificationNumber: searchCriteria.value.IdentificationNumber,
      PageIndex: searchCriteria.value.PageIndex,
      PageSize: searchCriteria.value.PageSize
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

const showExportDialog = ref(false);
// 新增：单员工导出弹窗及当前员工uid
const showStaffExportDialog = ref(false)
const exportStaffUid = ref('')
// 新增：导出员工姓名
const exportStaffName = ref('')

// 修改：打开单员工导出弹窗时带上姓名
const openStaffExportDialog = (uid: string, name: string) => {
  exportStaffUid.value = uid
  exportStaffName.value = name
  showStaffExportDialog.value = true
}

// 修改onMounted
onMounted(async () => {
  
  // 获取工作人员列表
  GetStaffList(searchCriteria).then(res => {
    if (res.status === 200) {
      staffList.value = res.data.staffDetails
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

// 新增：注册弹窗相关
const registerDialogVisible = ref(false)
const handleRegisterSuccess = () => {
  registerDialogVisible.value = false
  searchStaff()
}

// 新增：重置密码方法
const resetPassword = (staff: StaffItem) => {
  ElMessageBox.confirm(
    `确定要重置用户 ${staff.name} 的密码吗？\r\n重置后密码为 12345678`,
    '重置密码',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    try {
      await refreshStaffPassword(staff.uid)
      ElMessage.success('密码重置成功')
    } catch (e) {
      ElMessage.error('密码重置失败')
    }
  }).catch(() => {})
}

// 修改：关闭单员工导出弹窗时清空数据
const closeStaffExportDialog = () => {
  showStaffExportDialog.value = false
  exportStaffUid.value = ''
  exportStaffName.value = ''
}
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
      <!-- 替换为AreaSelector组件 -->
      <AreaSelector
        v-model:area="searchRegion"
        style="flex:1;min-width:600px;"
      />
      <el-button size="large" type="primary" style="margin-left:10px" @click="searchStaff">
        搜索
      </el-button>
      <el-button size="large" v-if="localPermission==88||localPermission==2" type="success" style="margin-left:10px" @click="registerDialogVisible = true">
        新增用户
      </el-button>
      <el-button
      v-if="role==='Manager'||role==='SuperAdmin'"
        size="large"
        type="danger"
        @click="showExportDialog = true"
        >导出全部工作记录</el-button
      >
      <el-dialog v-model="showExportDialog" title="导出数据" width="500">
        <ExportVisitDialog @close="showExportDialog = false" />
      </el-dialog>
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
        
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button type="primary" @click="showDetails(scope.row)">详情</el-button>
            <el-button
              v-if="role==='Manager'||role==='SuperAdmin'"
              type="warning"
              @click="resetPassword(scope.row)"
              style="margin-left: 4px; width: 70px;"
            >重置密码</el-button>
            <!-- <el-button type="danger" @click="deleteStaff(scope.row)">删除</el-button> -->
            <!-- 修改：点击弹出单员工导出弹窗 -->
            <el-button type="danger" style="width: 100px;margin-left: 4px;" @click="openStaffExportDialog(scope.row.uid, scope.row.name)">导出工作记录</el-button>
          </template>
        </el-table-column>
      </el-table>
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

  <!-- 新增：注册弹窗 -->
  <el-dialog v-model="registerDialogVisible" width="600px" title="新增用户" destroy-on-close>
    <RegisterForm @register-success="handleRegisterSuccess" />
  </el-dialog>

  <!-- 新增：单员工导出弹窗，使用v-if销毁组件 -->
  <el-dialog
    v-model="showStaffExportDialog"
    title="导出员工探访记录"
    width="500"
    @close="closeStaffExportDialog"
    destroy-on-close
  >
    <ExportStaffVisitDialog
      v-if="showStaffExportDialog"
      :staff-uid="exportStaffUid"
      :staff-name="exportStaffName"
      @close="closeStaffExportDialog"
    />
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