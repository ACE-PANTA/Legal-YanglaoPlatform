<template>
  <div>
    <h1>志愿者列表</h1>
  </div>
  <!-- 增加、搜索、导出志愿者信息 -->
  <div style="width: 100%;">
    <div style="display: flex; padding-right:25px; padding-bottom: 10px; width:100%; justify-content: flex-end">
      <div style="padding-right:15px">
        <el-input size="large" v-model="searchValue" placeholder="请输入姓名/身份证等信息" style="max-width:250px;"></el-input>
      </div>
      <el-button size="large" type="primary" style="margin-right:10px" @click="searchVolunteer">搜索</el-button>
      <el-button size="large" type="primary" style="margin-right:10px" @click="openAddDialog">添加</el-button>
      <!-- <el-button size="large" type="primary" @click="exportVolunteer">导出</el-button> -->
    </div>
  </div>
  <!-- 表格信息 -->
  <div style="display:flex; flex-direction: column;">
    <el-table :data="volunteerData" size="large" stripe style="width: 100%;">
      <el-table-column show-overflow-tooltip v-for="volunteer in volunteerLabelList" :key="volunteer.value" :prop="volunteer.value" :label="volunteer.label" />
      <el-table-column label="操作" fixed="right" width="120">
        <template #default="{ row }">
          <div style="display: flex; width:100%;">
            <el-button style="margin: auto; margin-left:5px; margin-right:5px" type="primary" circle size="middle" @click="openEditDialog(row)">
              <el-icon><Edit /></el-icon>
            </el-button>
            <el-button @click="deleteVolunteer(row.uid)" style="margin: auto;" circle type="danger" size="middle">
              <el-icon><DeleteFilled /></el-icon>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 编辑对话框 -->
  <el-dialog v-model="dialogEditVisible" title="编辑志愿者信息" width="700">
    <el-form :model="itemInfo" ref="itemInfoRef" :rules="rules">
      <el-form-item label="姓名" prop="name" :label-width="formLabelWidth" label-position="left">
        <el-input v-model="itemInfo.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="电话号码" prop="phone" :label-width="formLabelWidth" label-position="left">
        <el-input v-model="itemInfo.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="身份证号" prop="identificationNumber" :label-width="formLabelWidth" label-position="left">
        <el-input v-model="itemInfo.identificationNumber" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" prop="gender" :label-width="formLabelWidth" label-position="left">
        <el-radio-group v-model="itemInfo.gender">
          <el-radio value="男" size="large">男</el-radio>
          <el-radio value="女" size="large">女</el-radio>
          <el-radio value="未知" size="large">未知</el-radio> <!-- 新增未知选项 -->
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthDate" :label-width="formLabelWidth" label-position="left">
        <el-date-picker v-model="itemInfo.birthDate" type="date" placeholder="选择出生日期" style="width: 100%" />
      </el-form-item>
      <el-form-item label="家庭住址" prop="address" :label-width="formLabelWidth" label-position="left">
        <el-input v-model="itemInfo.address" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备用邮箱" prop="standby" :label-width="formLabelWidth" label-position="left">
        <el-input v-model="itemInfo.standby" autocomplete="off" />
      </el-form-item>
      <el-form-item label="技能特长" prop="skill" :label-width="formLabelWidth" label-position="left">
        <el-input v-model="itemInfo.skill" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取消</el-button>
        <el-button type="primary" @click="edit(itemInfoRef)">确定</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 添加对话框 -->
  <el-dialog v-model="dialogAddVisible" title="添加志愿者信息" width="700">
    <el-form :model="itemInfo" ref="itemInfoRef" :rules="rules">
      <el-form-item label="姓名" prop="name" :label-width="formLabelWidth" label-position="left">
        <el-input v-model="itemInfo.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="电话号码" prop="phone" :label-width="formLabelWidth" label-position="left">
        <el-input v-model="itemInfo.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="身份证号" prop="identificationNumber" :label-width="formLabelWidth" label-position="left">
        <el-input v-model="itemInfo.identificationNumber" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" prop="gender" :label-width="formLabelWidth" label-position="left">
        <el-radio-group v-model="itemInfo.gender">
          <el-radio value="男" size="large">男</el-radio>
          <el-radio value="女" size="large">女</el-radio>
          <el-radio value="未知" size="large">未知</el-radio> <!-- 新增未知选项 -->
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthDate" :label-width="formLabelWidth" label-position="left">
        <el-date-picker v-model="itemInfo.birthDate" type="date" placeholder="选择出生日期" style="width: 100%" />
      </el-form-item>
      <el-form-item label="家庭住址" prop="address" :label-width="formLabelWidth" label-position="left">
        <el-input v-model="itemInfo.address" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备用邮箱" prop="standby" :label-width="formLabelWidth" label-position="left">
        <el-input v-model="itemInfo.standby" autocomplete="off" />
      </el-form-item>
      <el-form-item label="技能特长" prop="skill" :label-width="formLabelWidth" label-position="left">
        <el-input v-model="itemInfo.skill" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取消</el-button>
        <el-button type="primary" @click="add(itemInfoRef)">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { Edit, DeleteFilled } from '@element-plus/icons-vue';
import { AddVolunteer, DeleteVolunteer, GetVolunteerList, SearchVolunteer, UpdateVolunteer } from '@/api'
import { ElMessage, ElMessageBox } from 'element-plus'

// 更新后的志愿者属性列表，只保留必要字段
let volunteerLabelList = ref([
  { value: 'name', label: '姓名' },
  { value: 'phone', label: '电话号码' },
  { value: 'identificationNumber', label: '身份证号' },
  { value: 'gender', label: '性别' },
  { value: 'birthDate', label: '出生日期' },
  { value: 'address', label: '家庭住址' },
  { value: 'standby', label: '备用邮箱' },
  { value: 'skill', label: '技能特长' },
]);

let volunteerData = reactive([]);

let dialogEditVisible = ref(false);
let dialogAddVisible = ref(false);

// 定义表单接口，只保留必要字段
interface VolunteerForm {
  name: string;
  phone: string;
  identificationNumber: string;
  gender: string;
  birthDate: string;
  address: string;
  standby: string;
  skill: string;
}

// 表单信息
let itemInfo = reactive<VolunteerForm>({
  name: '',
  phone: '',
  identificationNumber: '',
  gender: '',
  birthDate: '',
  address: '',
  standby: '',
  skill: '',
});

const itemInfoRef = ref<FormInstance>();

// 表单验证规则，只保留必要字段且必填
const rules = reactive<FormRules<VolunteerForm>>({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
  identificationNumber: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  birthDate: [{ required: true, message: '请选择出生日期', trigger: 'blur' }],
  address: [{ required: true, message: '请输入家庭住址', trigger: 'blur' }],
  standby: [{ required: true, message: '请输入备用邮箱', trigger: 'blur' }],
  skill: [{ required: true, message: '请输入技能特长', trigger: 'blur' }],
});

const searchValue = ref('');
const formLabelWidth = ref('120px');

const searchLabelList = ref([
  { label: '姓名' },
  { label: '电话号码' },
  { label: '家庭住址' },
  { label: '行政区划' }
]);

let searchLabel = ref(searchLabelList.value[0].label);

// 打开编辑对话框
const openEditDialog = (row: any) => {
  // 使用浅拷贝创建新的响应式对象，避免直接引用列表数据
  itemInfo = reactive({ ...row });
  dialogEditVisible.value = true;
};

// 编辑
const edit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (itemInfo.birthDate) {
        const birthDate = new Date(itemInfo.birthDate);
        const year = birthDate.getFullYear();
        const month = String(birthDate.getMonth() + 1).padStart(2, '0');
        const day = String(birthDate.getDate()).padStart(2, '0');
        itemInfo.birthDate = `${year}-${month}-${day}`;
      }
      UpdateVolunteer(itemInfo).then(res => {
        if (res.status == 200) {
          ElMessage.success('更新成功');
          getVolunteerList();
        }
        else {
          ElMessage.error(res.data.msg);
        }
      }).then(err => {
        console.log(err);
      })
      console.log(formEl);
      dialogEditVisible.value = false;
    } else {
      console.log('error submit!', fields);
    }
  });
};

// 打开添加对话框
const openAddDialog = () => {
  itemInfo = reactive<VolunteerForm>({
    name: '',
    phone: '',
    identificationNumber: '',
    gender: '',
    birthDate: '',
    address: '',
    standby: '',
    skill: '',
  });
  dialogAddVisible.value = true;
};

// 添加
const add = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (itemInfo.birthDate != null) {
        const birthDate = new Date(itemInfo.birthDate);
        const year = birthDate.getFullYear();
        const month = String(birthDate.getMonth() + 1).padStart(2, '0');
        const day = String(birthDate.getDate()).padStart(2, '0');
        itemInfo.birthDate = `${year}-${month}-${day}`;
        console.log(itemInfo.birthDate);
      }
      console.log(itemInfo);
      let data = itemInfo;
      dialogAddVisible.value = false;
      AddVolunteer(data).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          ElMessage.success('添加成功');
          getVolunteerList();
          console.log(res.data);
        } else {
          ElMessage.error(res.data.msg);
        }
      });
    } else {
      console.log('error submit!', fields);
    }
  });
};

//删除志愿者
const deleteVolunteer = (uid: string) => {
  ElMessageBox.confirm(
    '确认删除该志愿者信息?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    DeleteVolunteer(uid).then((res) => {
      console.log(res.data);
      if (res.data.code === 200) {
        ElMessage.success('删除成功');
        getVolunteerList();
      } else {
        ElMessage.error(res.data.msg);
      }
    });
  });
}

const getVolunteerList = () => {
  GetVolunteerList().then((res) => {
    // console.log(res.data);
    if (res.status === 200) {
      volunteerData.length = 0;
      volunteerData.push(...res.data);
      console.log(volunteerData);
    } else {
      ElMessage.error(res.data.msg);
    }
  });
}

//挂载时自动获取志愿者列表
onMounted(() => {
  getVolunteerList();
});

//搜索
const searchVolunteer = () => {
  if (searchValue.value) {
    const data = {
      SearchKey: searchValue.value
    }
    SearchVolunteer(data).then((res) => {
      if (res.status === 200) {
        volunteerData.length = 0;
        volunteerData.push(...res.data);
      } else {
        ElMessage.error(res.data.msg);
      }
    });
  }
  else {
    getVolunteerList();
  }
}

const exportVolunteer = () => {
  // 导出逻辑实现
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