<template>
  <div>
    <h1>志愿者活动表</h1>
  </div>
  <!-- 增加、搜索、导出活动信息 -->
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
      <!-- <el-button size="large" type="primary" @click="exportActivity">导出</el-button> -->
    </div>
  </div>
  <!-- 表格信息 -->
  <div style="display:flex; flex-direction: column;">
    <el-table :data="activityData" size="large" stripe style="width: 100%;">
      <el-table-column prop="theme" label="主题" show-overflow-tooltip />
      <el-table-column prop="responsiblePerson" label="负责人" show-overflow-tooltip />
      <el-table-column label="开始时间" show-overflow-tooltip >
        <template #default="{ row }">
          <span>{{ row.activityStartTime.toString().replace('T',' ') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" show-overflow-tooltip >
        <template #default="{ row }">
          <span>{{ row.activityEndTime.toString().replace('T',' ') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="activityAddress" label="活动地点" show-overflow-tooltip />
      <el-table-column prop="discription" label="活动描述" show-overflow-tooltip />
      <el-table-column prop="participants" label="参与人员" show-overflow-tooltip />
      <el-table-column prop="situation" label="活动情况" show-overflow-tooltip />
      <el-table-column label="操作" fixed="right" width="120">
        <template #default="{ row }">
          <div style="display: flex; width:100%;">
            <el-button style="margin: auto; margin-left:5px; margin-right:5px" type="primary" circle size="middle" @click="openEditDialog(row)">
              <el-icon><Edit /></el-icon>
            </el-button>
            <el-button @click="deleteActivity(row.uid)" style="margin: auto;" circle type="danger" size="middle">
              <el-icon><DeleteFilled /></el-icon>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 编辑对话框 -->
  <el-dialog v-model="dialogEditVisible" title="编辑活动信息" width="700">
    <el-form :model="activityForm" ref="activityFormRef" :rules="rules">
      <el-form-item label="主题" prop="theme" :label-width="formLabelWidth" label-position="left">
        <el-input v-model="activityForm.theme" autocomplete="off" />
      </el-form-item>
      <el-form-item label="负责人" prop="responsiblePerson" :label-width="formLabelWidth" label-position="left">
        <el-input v-model="activityForm.responsiblePerson" autocomplete="off" />
      </el-form-item>
      <el-form-item label="开始时间" prop="activityStartTime" :label-width="formLabelWidth" label-position="left">
        <el-date-picker v-model="activityForm.activityStartTime" type="datetime" placeholder="选择开始时间" style="width: 100%" />
      </el-form-item>
      <el-form-item label="结束时间" prop="activityEndTime" :label-width="formLabelWidth" label-position="left">
        <el-date-picker v-model="activityForm.activityEndTime" type="datetime" placeholder="选择结束时间" style="width: 100%" />
      </el-form-item>
      <el-form-item label="活动地点" prop="activityAddress" :label-width="formLabelWidth" label-position="left">
        <el-input v-model="activityForm.activityAddress" autocomplete="off" />
      </el-form-item>
      <el-form-item label="活动描述" prop="discription" :label-width="formLabelWidth" label-position="left">
        <el-input type="textarea" v-model="activityForm.discription" autocomplete="off" />
      </el-form-item>
      <el-form-item label="参与人员" prop="participants" :label-width="formLabelWidth" label-position="left">
        <el-input type="textarea" v-model="activityForm.participants" autocomplete="off" />
      </el-form-item>
      <el-form-item label="活动情况" prop="situation" :label-width="formLabelWidth" label-position="left">
        <el-input type="textarea" v-model="activityForm.situation" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取消</el-button>
        <el-button type="primary" @click="edit(activityFormRef)">确定</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 添加对话框 -->
  <el-dialog v-model="dialogAddVisible" title="添加活动信息" width="700">
    <el-form :model="activityForm" ref="activityFormRef" :rules="rules">
      <el-form-item label="主题" prop="theme" :label-width="formLabelWidth" label-position="left">
        <el-input v-model="activityForm.theme" autocomplete="off" />
      </el-form-item>
      <el-form-item label="负责人" prop="responsiblePerson" :label-width="formLabelWidth" label-position="left">
        <el-input v-model="activityForm.responsiblePerson" autocomplete="off" />
      </el-form-item>
      <el-form-item label="开始时间" prop="activityStartTime" :label-width="formLabelWidth" label-position="left">
        <el-date-picker v-model="activityForm.activityStartTime" type="datetime" placeholder="选择开始时间" style="width: 100%" />
      </el-form-item>
      <el-form-item label="结束时间" prop="activityEndTime" :label-width="formLabelWidth" label-position="left">
        <el-date-picker v-model="activityForm.activityEndTime" type="datetime" placeholder="选择结束时间" style="width: 100%" />
      </el-form-item>
      <el-form-item label="活动地点" prop="activityAddress" :label-width="formLabelWidth" label-position="left">
        <el-input v-model="activityForm.activityAddress" autocomplete="off" />
      </el-form-item>
      <el-form-item label="活动描述" prop="discription" :label-width="formLabelWidth" label-position="left">
        <el-input type="textarea" v-model="activityForm.discription" autocomplete="off" />
      </el-form-item>
      <el-form-item label="参与人员" prop="participants" :label-width="formLabelWidth" label-position="left">
        <el-input type="textarea" v-model="activityForm.participants" autocomplete="off" />
      </el-form-item>
      <el-form-item label="活动情况" prop="situation" :label-width="formLabelWidth" label-position="left">
        <el-input type="textarea" v-model="activityForm.situation" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取消</el-button>
        <el-button type="primary" @click="add(activityFormRef)">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus';
import { Edit, DeleteFilled } from '@element-plus/icons-vue';
import { AddActivity, DeleteActivity, GetActivityList, UpdateActivity } from '@/api';

// 定义活动表单接口
interface ActivityForm {
  uid: string;
  theme: string;
  responsiblePerson: string;
  activityStartTime: string;
  activityEndTime: string;
  activityAddress: string;
  discription: string;
  participants: string;
  situation: string;
}

// 活动数据列表（示例数据）
const activityData = reactive([
]);

let dialogEditVisible = ref(false);
let dialogAddVisible = ref(false);

// 定义活动表单数据，初始为空
let activityForm = reactive<ActivityForm>({
  uid: '',
  theme: '',
  responsiblePerson: '',
  activityStartTime: '',
  activityEndTime: '',
  activityAddress: '',
  discription: '',
  participants: '',
  situation: ''
});

const activityFormRef = ref<FormInstance>();

// 表单验证规则（必填字段带 *）
const rules = reactive<FormRules<ActivityForm>>({
  theme: [{ required: true, message: '请输入活动主题', trigger: 'blur' }],
  responsiblePerson: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
  activityStartTime: [{ required: true, message: '请选择活动开始时间', trigger: 'blur' }],
  activityEndTime: [{ required: true, message: '请选择活动结束时间', trigger: 'blur' }],
  activityAddress: [{ required: true, message: '请输入活动地点', trigger: 'blur' }],
  discription: [{ required: true, message: '请输入活动描述', trigger: 'blur' }],
  participants: [{ required: true, message: '请输入参与人员', trigger: 'blur' }],
  situation: [{ required: false }]
});

const searchValue = ref('');
const formLabelWidth = ref('120px');

const searchLabelList = ref([
  { label: '主题' },
  { label: '负责人' },
  { label: '开始时间' },
  { label: '活动描述' }
]);

let searchLabel = ref(searchLabelList.value[0].label);

// 打开编辑对话框
const openEditDialog = (row: any) => {
  activityForm = reactive({ ...row });
  dialogEditVisible.value = true;
};

// 编辑操作（示例中仅关闭对话框，可在此扩展更新逻辑）
const edit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('编辑活动：', activityForm);
      UpdateActivity(activityForm).then((res) => {
        if (res.status == 200) {
          ElMessage.success('编辑成功');
          getActivityList();
        }
      });
      dialogEditVisible.value = false;
    } else {
      console.log('error submit!', fields);
    }
  });
};

// 打开添加对话框
const openAddDialog = () => {
  activityForm = reactive<ActivityForm>({
    uid: '',
    theme: '',
    responsiblePerson: '',
    activityStartTime: '',
    activityEndTime: '',
    activityAddress: '',
    discription: '',
    participants: '',
    situation: ''
  });
  dialogAddVisible.value = true;
};

const getActivityList = () => {
  GetActivityList().then(res => {
    if (res.status == 200) {
      activityData.length = 0;
      activityData.push(...res.data);
    }
  });
};

onMounted(() => {
  getActivityList();
});

// 删除活动操作
const deleteActivity = (uid: string) => {
  ElMessageBox.confirm(
    '确认删除该活动信息?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    DeleteActivity(uid).then(res => {
      if (res.status == 200) {
        ElMessage.success('删除成功');
        getActivityList();
      }
    });
  });
};

// 添加操作
const add = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      AddActivity(activityForm).then((res) => {
        if (res.status == 200) {
          ElMessage.success('添加成功');
        }
      });
      console.log('添加活动：', activityForm);
      dialogAddVisible.value = false;
    } else {
      console.log('error submit!', fields);
    }
  });
};

const exportActivity = () => {
  console.log('导出活动数据');
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>