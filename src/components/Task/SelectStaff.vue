<template>
  <div>
    <div v-if="selectedStaff" style="margin-bottom: 10px; color: #409EFF;">
      <strong>已选工作人员：</strong> 姓名：{{ selectedStaff.name }}，用户名：{{ selectedStaff.userName }}
    </div>
    <div v-else style="margin-bottom: 10px; color: #409EFF;">
      <strong>点击下方工作人员以进行选择</strong>
    </div>
    <div style="margin-bottom: 10px;">
      <el-input 
        v-model="searchCriteria.StaffName" 
        placeholder="请输入工作人员姓名" 
        clearable 
        @input="fetchStaffList" 
        style="width: 300px;" 
      />
    </div>
    <el-table :data="filteredStaffList" style="width: 100%" @row-click="selectStaff">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="role" label="角色">
        <template #default="scope">
          {{ getRoleName(scope.row.role) }}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话" />
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page="searchCriteria.PageIndex"
      :page-size="searchCriteria.PageSize"
      :total="totalStaff"
      @current-change="handlePageChange"
      style="margin-top: 10px; text-align: right;"
    />
    <div class="dialog-footer" style="margin-top: 10px;">
      <el-button type="primary" @click="handleNext">下一步</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, defineProps, defineEmits, watch } from 'vue';
import { GetStaffList } from '@/api';
import { ElMessage } from 'element-plus';

// 引入角色枚举
enum E_Role {
  Manager = 0,      // 高管
  Staff = 1,        // 员工
  Volunteer = 2,    // 志愿者
  SuperAdmin = 88   // 超级管理员
}

// 角色名称映射
const roleNameMap = {
  [E_Role.Manager]: '高管',
  [E_Role.Staff]: '员工',
  [E_Role.Volunteer]: '志愿者',
  [E_Role.SuperAdmin]: '超级管理员'
};

// 获取角色名称的方法
const getRoleName = (role: number) => roleNameMap[role as E_Role] || '未知角色';

const staffList = ref([]);
const totalStaff = ref(0);

const props = defineProps({
  selectedStaff: {
    type: Object,
    default: null
  }
});
const emit = defineEmits(['update:selectedStaff', 'next']);

// 让 selectedStaff 响应式并和 props.selectedStaff 同步
const selectedStaff = ref(props.selectedStaff);
watch(() => props.selectedStaff, (val) => {
  selectedStaff.value = val;
});

const searchCriteria = reactive({
  ProvinceId: '88888888',
  MunicipalityId: '88888888',
  DistrictId: '88888888',
  TownshipStreetsId: '88888888',
  StaffName: '',
  PageIndex: 1,
  PageSize: 10
});

const fetchStaffList = async () => {
  const res = await GetStaffList(searchCriteria);
  if (res.status === 200) {
    staffList.value = res.data.staffDetails;
    totalStaff.value = res.data.totalCount || 0;
  }
};

const handlePageChange = (page: number) => {
  searchCriteria.PageIndex = page;
  fetchStaffList();
};

const selectStaff = (row: any) => {
  emit('update:selectedStaff', row);
};

const handleNext = () => {
  if (!selectedStaff.value) {
    ElMessage.error('请选择工作人员');
    return;
  }
  emit('next', selectedStaff.value);
};

const filteredStaffList = computed(() => {
  return staffList.value.filter((staff: any) => staff.role === E_Role.Staff);
});

onMounted(() => {
  fetchStaffList();
});
</script>
