<template>
  <div>
    <h1>任务管理表</h1>
  </div>
  <!-- 增加、搜索、导出任务信息 -->
  <div style="width: 100%;">
    <div style="display: flex; padding-right:25px; padding-bottom: 10px; width:100%; justify-content: flex-end">
      <el-select size="large" v-model="searchLabel" placeholder="请选择搜索类型" style="width:110px; margin-right: 10px;">
        <el-option v-for="label in searchLabelList" :key="label.label" :label="label.label" :value="label.label" />
      </el-select>
      <div style="padding-right:15px">
        <el-input size="large" v-model="searchValue" :placeholder="'请输入'+searchLabel" style="max-width:250px;"></el-input>
      </div>
      <el-button size="large" type="primary" style="margin-right:10px">搜索</el-button>
      <el-button size="large" type="primary" style="margin-right:10px" @click="openAddDialog">添加</el-button>
      <el-button size="large" type="primary" @click="exportTask">导出</el-button>
    </div>
  </div>
  <!-- 表格信息 -->
  <div style="display:flex; flex-direction: column;">
    <el-table :data="taskData" size="large" stripe style="width: 100%;">
      <el-table-column label="任务名称" prop="taskName" show-overflow-tooltip />
      <el-table-column label="任务详情" prop="taskDescription" show-overflow-tooltip />
      <el-table-column label="是否过期" prop="ifCompuete" show-overflow-tooltip>
        <template #default="scope">
          <span v-if="scope.row.ifCompuete" style="color: red;">已过期</span>
          <span v-else style="color: green;">未过期</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120">
        <template #default="{ row }">
          <div style="display: flex; width:100%;">
            <el-button style="margin: auto;" circle type="danger" size="middle" @click="deleteTask(row)">
              <el-icon><DeleteFilled /></el-icon>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 编辑对话框
  <el-dialog v-model="dialogEditVisible" title="编辑任务信息" width="700">
    <el-form :model="taskForm" ref="taskFormRef" :rules="rules">
      <el-form-item label="任务名称" prop="taskName" :label-width="formLabelWidth" label-position="left">
        <el-input v-model="taskForm.taskName" placeholder="请输入关键任务" type="textarea"></el-input>
      </el-form-item>

      <el-form-item label="开始时间" prop="starTime" :label-width="formLabelWidth" label-position="left">
        <el-date-picker v-model="taskForm.starTime" type="datetime" placeholder="请选择开始时间" style="width: 100%" />
      </el-form-item>

      <el-form-item label="结束时间" prop="endTime" :label-width="formLabelWidth" label-position="left">
        <el-date-picker v-model="taskForm.endTime" type="datetime" placeholder="请选择结束时间" style="width: 100%" />
      </el-form-item>

      <el-form-item label="KPI" prop="kpi" :label-width="formLabelWidth" label-position="left">
        <el-input v-model="taskForm.kpi" placeholder="请输入KPI" type="textarea"></el-input>
      </el-form-item>

      <el-form-item label="负责人" prop="responsiblePerson" :label-width="formLabelWidth" label-position="left">
        <el-input v-model="taskForm.responsiblePerson" placeholder="请输入负责人姓名" style="width: 200px;"></el-input>
      </el-form-item>

      <el-form-item label="是否过期" prop="isOverdue" :label-width="formLabelWidth" label-position="left">
        <el-tag v-if="taskForm.ifCompuete" type="danger">已完成</el-tag>
        <el-tag v-else type="success">未完成</el-tag>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取消</el-button>
        <el-button type="primary" @click="updateTask">确定</el-button>
      </div>
    </template>
  </el-dialog>
 -->
  
  <!-- 添加对话框 -->
  <el-dialog v-model="dialogAddVisible" title="添加任务信息" width="800">
    <el-steps :active="activeStep" align-center finish-status="success" style="margin-bottom: 20px;">
      <el-step title="选择工作人员"></el-step>
      <el-step title="指定探访家庭"></el-step>
      <el-step title="填写任务信息"></el-step>
    </el-steps>
    <div v-if="activeStep === 0">
      <SelectStaff
        :selectedStaff="selectedStaff"
        @update:selectedStaff="val => selectedStaff = val"
        @next="goToNextStep"
      />
    </div>
    <div v-else-if="activeStep === 1">
      <SelectFamilies
        :selectedFamilies="selectedFamilies"
        @update:selectedFamilies="val => selectedFamilies = val"
        @next="goToNextStep"
        @prev="goToPreviousStep"
      />
    </div>
    <div v-else-if="activeStep === 2">
      <TaskDetails
        :taskDetailForm="taskDetailForm"
        @update:taskDetailForm="val => taskDetailForm = val"
        @submit="addTask"
        @prev="goToPreviousStep"
      />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import { DeleteTask, GetTaskList, UpdateTask } from '@/api';
import SelectStaff from '@/components/Task/SelectStaff.vue';
import SelectFamilies from '@/components/Task/SelectFamilies.vue';
import TaskDetails from '@/components/Task/TaskDetails.vue';
import { addNewTask } from '@/api/task';

// 定义任务表单接口
interface TaskForm {
  uid: string;
  month: string;
  keyTask: string;
  starTime: string | Date;
  endTime: string | Date;
  kpi: string;
  responsiblePerson: string;
  ifCompuete: boolean;
}

// 任务数据列表
const taskData = reactive([]);

// 表单验证规则
const rules = reactive<FormRules>({
  month: [{ required: true, message: '请选择月份', trigger: 'blur' }],
  keyTask: [{ required: true, message: '请输入关键任务', trigger: 'blur' }],
  startTime: [{ required: true, message: '请选择开始时间', trigger: 'blur' }],
  endTime: [{ required: true, message: '请选择结束时间', trigger: 'blur' }],
  kpi: [{ required: true, message: '请输入KPI', trigger: 'blur' }],
  responsiblePerson: [{ required: true, message: '请输入负责人', trigger: 'blur' }]
});

// 月份选项
const months = ref([
  { label: '一月', value: '1' },
  { label: '二月', value: '2' },
  { label: '三月', value: '3' },
  { label: '四月', value: '4' },
  { label: '五月', value: '5' },
  { label: '六月', value: '6' },
  { label: '七月', value: '7' },
  { label: '八月', value: '8' },
  { label: '九月', value: '9' },
  { label: '十月', value: '10' },
  { label: '十一月', value: '11' },
  { label: '十二月', value: '12' },
]);

// 搜索结果相关
const searchValue = ref('');
const formLabelWidth = ref('120px');
const searchLabelList = ref([
  { label: '月份' },
  { label: '关键任务' },
  { label: '负责人' }
]);
let searchLabel = ref(searchLabelList.value[0].label);

// 对话框相关
let dialogEditVisible = ref(false);
let dialogAddVisible = ref(false);
const activeStep = ref(0);

// 当前编辑或添加的任务表单数据
const taskForm = reactive<TaskForm>({
  uid: '',
  month: '',
  keyTask: '',
  starTime: '',
  endTime: '',
  kpi: '',
  responsiblePerson: '',
  ifCompuete: false
});

const taskFormRef = ref<FormInstance>();

// 任务标签列表，用于表格列渲染
const taskLabelList = ref([
  { value: 'month', label: '月份' },
  { value: 'keyTask', label: '关键任务' },
  { value: 'startTime', label: '开始时间' },
  { value: 'endTime', label: '结束时间' },
  { value: 'kpi', label: 'KPI' },
  { value: 'responsiblePerson', label: '负责人' }
]);

// 新增：多步表单数据
const selectedStaff = ref(null);
const selectedFamilies = ref([]);
const taskDetailForm = ref({
  TaskName: '',
  TaskDescription: '',
  StarTime: '',
  EndTime: ''
});

// 打开编辑对话框
const openEditDialog = (row: any) => {
  Object.assign(taskForm, row);
  dialogEditVisible.value = true;
};

// 更新任务
const updateTask = () => {
  UpdateTask(taskForm).then(res => {
    if (res.status === 200) {
      ElMessage.success('任务更新成功');
      getTaskList();
    }
  })
  dialogEditVisible.value = false;
};

// 删除任务
const deleteTask = (row: any) => {
  ElMessageBox.confirm(
    '确认删除该任务?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    DeleteTask(row.uid).then(res => {
      if (res.status === 200) {
        ElMessage.success('任务删除成功');
        getTaskList();
      }
    })
  });
};

// 打开添加对话框
const openAddDialog = () => {
  Object.assign(taskForm, {
    month: '',
    keyTask: '',
    startTime: '',
    endTime: '',
    kpi: '',
    responsiblePerson: '',
    isOverdue: false
  });
  selectedStaff.value = null;
  selectedFamilies.value = [];
  taskDetailForm.value = {
    TaskName: '',
    TaskDescription: '',
    StarTime: '',
    EndTime: ''
  };
  dialogAddVisible.value = true;
  activeStep.value = 0;
};

// 添加任务
const addTask = () => {
  const payload = {
    TaskName: taskDetailForm.value.TaskName,
    TaskDescription: taskDetailForm.value.TaskDescription,
    ExecutorId: selectedStaff.value ? selectedStaff.value.uid : 0,
    ListFamilyId: selectedFamilies.value.map((f: any) => f.uid),
    StarTime: taskDetailForm.value.StarTime,
    EndTime: taskDetailForm.value.EndTime
  };
  addNewTask(payload)
  .then(res=>{

    console.log(res);
    
    if(res.status==200)
    {
      dialogAddVisible.value = false;
    }
  })
  
};

// 导出任务
const exportTask = () => {
  console.log('导出任务数据');
};

// 获取任务列表（模拟数据）
const getTaskList = () => {
  GetTaskList().then(res => {
    console.log(res);
    if (res.status === 200) {
      taskData.length = 0;
      taskData.push(...res.data);
    }
  })
};

// 页面挂载时获取任务列表
onMounted(() => {
  getTaskList();
});

const goToNextStep = () => {
  activeStep.value++;
};

const goToPreviousStep = () => {
  activeStep.value--;
};
</script>

<style scoped>
.container {
  padding: 20px;
}
.dialog-footer {
  text-align: right;
}
</style>