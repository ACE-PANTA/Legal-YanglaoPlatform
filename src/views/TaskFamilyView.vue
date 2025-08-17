<template>
  <div>
    <h1>家庭探访任务</h1>
  </div>
  <!-- 增加、搜索、导出活动信息 -->
  <div style="width: 100%;">
    <div style="display: flex; padding-right:25px; padding-bottom: 10px; width:100%; justify-content: flex-end">
      <el-input size="large" v-model="searchTaskName" placeholder="请输入任务名称" style="max-width:250px; margin-right:10px;" />
      <el-button size="large" type="primary" style="margin-right:10px" @click="getTaskList">搜索</el-button>
      <el-button size="large" type="primary" style="margin-right:10px" @click="openAddDialog">添加任务</el-button>
      <!-- <el-button size="large" type="primary" @click="exportTask">导出</el-button> -->
    </div>
  </div>
  <!-- 任务表格信息 -->
  <div style="display:flex; flex-direction: column;">
    <el-table :data="taskList" size="large" stripe style="width: 100%;">
      <el-table-column prop="taskName" label="任务名称" show-overflow-tooltip />
      <el-table-column prop="starTime" label="开始时间" show-overflow-tooltip />
      <el-table-column prop="endTime" label="结束时间" show-overflow-tooltip />
      <el-table-column prop="taskDescription" label="任务描述" show-overflow-tooltip />
      <!-- <el-table-column label="操作" fixed="right" width="120">
        <template #default="{ row }">

        </template>
      </el-table-column> -->
    </el-table>
  </div>

  <!-- 添加任务对话框 -->
  <el-dialog v-model="dialogAddVisible" title="添加家庭探访任务" width="700">
    <el-steps :active="addStep" finish-status="success" align-center style="margin-bottom: 20px;">
      <el-step title="选择执行人" />
      <el-step title="选择家庭" />
      <el-step title="填写任务信息" />
    </el-steps>
    <div v-show="addStep === 0">
      <el-input v-model="workerSearch" placeholder="搜索姓名/用户名" style="width: 220px; margin-bottom: 10px;" @keyup.enter="fetchWorkerList" />
      <el-button type="primary" @click="fetchWorkerList" size="small" style="margin-left: 8px;">搜索</el-button>
      <el-table :data="workerList" style="width:100%;margin-top:10px;" highlight-current-row @row-click="selectWorker">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="userName" label="用户名" />
        <el-table-column prop="phone" label="电话" />
      </el-table>
      <!-- 分页组件：选择执行人 -->
      <div style="margin: 10px 0; text-align: right;">
        <el-pagination
          background
          layout="prev, pager, next, jumper, total"
          :total="workerTotal"
          :page-size="workerPageSize"
          :current-page="workerPageIndex"
          @current-change="onWorkerPageChange"
        />
      </div>
      <div v-if="selectedWorker" style="margin-top: 10px; color: #409eff;">
        已选执行人：{{ selectedWorker.name }}
      </div>
      <div style="margin-top: 20px; text-align: right;">
        <el-button type="primary" :disabled="!selectedWorker" @click="addStep = 1">下一步</el-button>
      </div>
    </div>
    <div v-show="addStep === 1">
      <el-input v-model="familySearch" placeholder="搜索户主姓名/身份证" style="width: 220px; margin-bottom: 10px;" @keyup.enter="fetchFamilyList" />
      <el-button type="primary" @click="fetchFamilyList" size="small" style="margin-left: 8px;">搜索</el-button>
      <el-table :data="familyList" style="width:100%;margin-top:10px;" @selection-change="handleFamilySelect" ref="familyTableRef">
        <el-table-column type="selection" width="50" />
        <el-table-column prop="listHouseHoldSpouse[0].name" label="户主姓名" />
        <el-table-column prop="listHouseHoldSpouse[0].identificationNumber" show-overflow-tooltip label="身份证号" />
        <el-table-column label="家庭所在地" width="230" show-overflow-tooltip>
            <template #default="{row}">
            {{ row.provinceName }}{{ row.municipalityName }}{{ row.districtName }}{{ row.townshipStreetsName }}
            </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件：选择家庭 -->
      <div style="margin: 10px 0; text-align: right;">
        <el-pagination
          background
          layout="prev, pager, next, jumper, total"
          :total="familyTotal"
          :page-size="familyPageSize"
          :current-page="familyPageIndex"
          @current-change="onFamilyPageChange"
        />
      </div>
      <div style="margin-top: 10px;">
        <el-button type="primary" @click="showSelectedFamilies = true" :disabled="selectedFamilyIds.length === 0">查看已选家庭</el-button>
      </div>
      <div style="margin-top: 20px; text-align: right;">
        <el-button @click="addStep = 0">上一步</el-button>
        <el-button type="primary" :disabled="selectedFamilyIds.length === 0" @click="addStep = 2">下一步</el-button>
      </div>
      <!-- 已选家庭弹窗 -->
      <el-dialog v-model="showSelectedFamilies" title="已选家庭" width="700">
        <el-table :data="selectedFamilies" style="width:100%;">
          <el-table-column prop="listHouseHoldSpouse[0].name" label="户主姓名" />
          <el-table-column prop="listHouseHoldSpouse[0].identificationNumber" label="身份证号" />
          <el-table-column label="家庭所在地" width="230" show-overflow-tooltip>
            <template #default="{row}">
            {{ row.provinceName }}{{ row.municipalityName }}{{ row.districtName }}{{ row.townshipStreetsName }}
            </template>
        </el-table-column>
        </el-table>
        <template #footer>
          <el-button @click="showSelectedFamilies = false">关闭</el-button>
        </template>
      </el-dialog>
    </div>
    <div v-show="addStep === 2">
      <el-form :model="addTaskForm" ref="addTaskFormRef" label-width="100px">
        <el-form-item label="任务名称" prop="TaskName" required>
          <el-input v-model="addTaskForm.TaskName" />
        </el-form-item>
        <el-form-item label="任务描述" prop="TaskDescription">
          <el-input v-model="addTaskForm.TaskDescription" type="textarea" />
        </el-form-item>
        <el-form-item label="开始时间" prop="StarTime" required>
          <el-date-picker v-model="addTaskForm.StarTime" type="datetime" placeholder="选择开始时间" style="width: 100%" />
        </el-form-item>
        <el-form-item label="结束时间" prop="EndTime" required>
          <el-date-picker v-model="addTaskForm.EndTime" type="datetime" placeholder="选择结束时间" style="width: 100%" />
        </el-form-item>
      </el-form>
      <div style="margin-top: 20px; text-align: right;">
        <el-button @click="addStep = 1">上一步</el-button>
        <el-button type="primary" @click="submitAddTask">提交</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElDialog, ElButton, ElInput, ElMessageBox, ElForm } from 'element-plus';
import { addFamilyTask, getFamilyTask } from '@/api/task';
import { GetBaseInfoList } from '@/api/family';
import { GetStaffList } from '@/api';

const searchTaskName = ref('');
const taskList = ref<any[]>([]);

const getTaskList = async () => {
  const params = searchTaskName.value ? { TaskName: searchTaskName.value } : {};
  const res = await getFamilyTask(params);
  if (res.status === 200) {
    taskList.value = res.data || [];
  }
};

onMounted(() => {
  getTaskList();
});

// 添加任务相关
const dialogAddVisible = ref(false);
const addStep = ref(0);

// 选择员工
const workerList = ref<any[]>([]);
const workerSearch = ref('');
const selectedWorker = ref<any>(null);

// 分页相关（执行人）
const workerPageIndex = ref(1);
const workerPageSize = 10;
const workerTotal = ref(0);

const fetchWorkerList = async () => {
  const res = await GetStaffList({
    StaffName: workerSearch.value,
    PageIndex: workerPageIndex.value,
    PageSize: workerPageSize
  });
  if (res.status === 200) {
    workerList.value = res.data.staffDetails || [];
    workerTotal.value = res.data.totalCount || 0;
  }
};
const selectWorker = (row: any) => {
  selectedWorker.value = row;
};
const onWorkerPageChange = (page: number) => {
  workerPageIndex.value = page;
  fetchWorkerList();
};

// 选择家庭
const familyList = ref<any[]>([]);
const familySearch = ref('');
const selectedFamilyIds = ref<string[]>([]);
const selectedFamilies = ref<any[]>([]);
const showSelectedFamilies = ref(false);
const familyTableRef = ref();

// 分页相关（家庭）
const familyPageIndex = ref(1);
const familyPageSize = 10;
const familyTotal = ref(0);

const fetchFamilyList = async () => {
  const res = await GetBaseInfoList({
    HouseHoldName: familySearch.value,
    PageIndex: familyPageIndex.value,
    PageSize: familyPageSize
  }, localStorage.getItem('UserRole'));
  if (res.status === 200) {
    familyList.value = res.data.data || [];
    familyTotal.value = res.data.total || 0;
  }
};
const handleFamilySelect = (rows: any[]) => {
  selectedFamilies.value = rows;
  selectedFamilyIds.value = rows.map(item => item.uid);
};
const onFamilyPageChange = (page: number) => {
  familyPageIndex.value = page;
  fetchFamilyList();
};

// 添加任务表单
const addTaskForm = reactive({
  TaskName: '',
  TaskDescription: '',
  ExecutorId: '',
  ListFamilyId: [],
  StarTime: '',
  EndTime: ''
});
const addTaskFormRef = ref();

const openAddDialog = () => {
  dialogAddVisible.value = true;
  addStep.value = 0;
  selectedWorker.value = null;
  workerSearch.value = '';
  workerPageIndex.value = 1;
  fetchWorkerList();
  selectedFamilyIds.value = [];
  selectedFamilies.value = [];
  familySearch.value = '';
  familyPageIndex.value = 1;
  fetchFamilyList();
  addTaskForm.TaskName = '';
  addTaskForm.TaskDescription = '';
  addTaskForm.StarTime = '';
  addTaskForm.EndTime = '';
};

const submitAddTask = async () => {
  if (!addTaskForm.TaskName || !addTaskForm.StarTime || !addTaskForm.EndTime) {
    ElMessage.warning('请填写完整任务信息');
    return;
  }
  addTaskForm.ExecutorId = selectedWorker.value?.uid;
  addTaskForm.ListFamilyId = selectedFamilyIds.value;
  try {
    await addFamilyTask({ ...addTaskForm });
    ElMessage.success('添加任务成功');
    dialogAddVisible.value = false;
    getTaskList();
  } catch (e) {
    ElMessage.error('添加任务失败');
  }
};

const exportTask = () => {
  // TODO: 导出功能实现
  ElMessage.info('导出功能开发中');
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>