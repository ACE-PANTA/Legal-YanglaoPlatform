<template>
  <div>
    <h1>工作人员记录表</h1>
  </div>
  <!-- 增加、搜索、导出工作人员信息 -->
  <div style="width: 100%;">
    <div style="display: flex; padding-right:25px; padding-bottom: 10px; width:100%; justify-content: flex-end">
      <div style="padding-right:15px">
        <el-input size="large" v-model="searchValue" placeholder="请输入姓名/身份证等信息"
          style="max-width:250px;"></el-input>
      </div>
      <el-button size="large" type="primary" style="margin-right:10px" @click="searchStaff">搜索</el-button>
      <el-button size="large" type="primary" style="margin-right:10px" @click="openAddDialog">添加</el-button>
      <el-button size="large" type="primary" @click="exportStaff">导出</el-button>
    </div>
  </div>
  <!-- 表格信息 -->
  <div style="display:flex; flex-direction: column;">
    <el-table :data="staffData" size="large" stripe style="width: 100%;">
      <el-table-column v-for="staff in staffLabelList" :key="staff.value" :prop="staff.value" :label="staff.label"
        show-overflow-tooltip>
        <template v-if="staff.value === 'role'" #default="{ row }">
          {{ roleMap(row.role) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120">
        <template #default="{ row }">
          <div style="display: flex; width:100%;">
            <el-button style="margin: auto; margin-left:5px; margin-right:5px" type="primary" circle size="middle"
              @click="openEditDialog(row)">
              <el-icon>
                <Edit />
              </el-icon>
            </el-button>
            <el-button @click="deleteStaff(row.uid)" style="margin: auto;" circle type="danger" size="middle">
              <el-icon>
                <DeleteFilled />
              </el-icon>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 编辑对话框 -->
  <el-dialog v-model="dialogEditVisible" title="编辑工作人员信息" width="700">
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
      <el-form-item label="角色" prop="role" :label-width="formLabelWidth" label-position="left">
        <el-select v-model="itemInfo.role" placeholder="请选择角色" style="width: 100%;">
          <el-option label="高级管理员" :value="0" />
          <el-option label="普通工作人员" :value="1" />
          <el-option label="超级管理员" :value="88" />
        </el-select>
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
  <el-dialog v-model="dialogAddVisible" title="添加工作人员信息" width="700">
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
      <el-form-item label="角色" prop="role" :label-width="formLabelWidth" label-position="left">
        <el-select v-model="itemInfo.role" placeholder="请选择角色" style="width: 100%;">
          <el-option label="高级管理员" :value="0" />
          <el-option label="普通工作人员" :value="1" />
          <el-option label="超级管理员" :value="88" />
        </el-select>
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
import { onMounted, reactive, ref, computed } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import ChinaAeraSelect from '@/components/ChinaAeraSelect.vue';
import { Edit, DeleteFilled } from '@element-plus/icons-vue';
import { AddStaff, DeleteStaff, GetStaffList, SearchStaff, SuperUpdateStaff, UpdateStaff } from '@/api'
import { ElMessage, ElMessageBox } from 'element-plus'

// 更新后的工作人员属性列表，只保留必要字段
let staffLabelList = ref([
  { value: 'name', label: '姓名' },
  { value: 'phone', label: '电话号码' },
  { value: 'identificationNumber', label: '身份证号' },
  { value: 'gender', label: '性别' },
  { value: 'birthDate', label: '出生日期' },
  { value: 'address', label: '家庭住址' },
  { value: 'standby', label: '备用邮箱' },
  { value: 'skill', label: '技能特长' },
  { value: 'role', label: '角色' }
]);

let staffData = reactive([]);

let dialogEditVisible = ref(false);
let dialogAddVisible = ref(false);

// 定义表单接口，只保留必要字段
interface StaffForm {
  name: string;
  phone: string;
  identificationNumber: string;
  gender: string;
  birthDate: string;
  address: string;
  standby: string;
  skill: string;
  role: number;
}

// 表单信息
let itemInfo = reactive<StaffForm>({
  name: '',
  phone: '',
  identificationNumber: '',
  gender: '',
  birthDate: '',
  address: '',
  standby: '',
  skill: '',
  role: 1 // 默认值为普通工作人员
});

const itemInfoRef = ref<FormInstance>();

// 表单验证规则，只保留必要字段且必填
const rules = reactive<FormRules<StaffForm>>({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
  identificationNumber: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  birthDate: [{ required: true, message: '请选择出生日期', trigger: 'blur' }],
  address: [{ required: true, message: '请输入家庭住址', trigger: 'blur' }],
  standby: [{ required: true, message: '请输入备用邮箱', trigger: 'blur' }],
  skill: [{ required: true, message: '请输入技能特长', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'blur' }]
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

// 角色映射
const roleMap = computed(() => {
  return (role: number) => {
    switch (role) {
      case 0: return '高级管理员';
      case 1: return '普通工作人员';
      case 88: return '超级管理员';
      default: return '未知角色';
    }
  };
});

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
      let currentRole = localStorage.getItem('UserRole');
      if (currentRole == 'SuperAdmin') {
        SuperUpdateStaff(itemInfo).then(res => {
          if (res.status == 200) {
            ElMessage.success('更新成功');
            getStaffList();
          }
        })
      }
      else {
        UpdateStaff(itemInfo).then(res => {
          if (res.status == 200) {
            ElMessage.success('更新成功');
            getStaffList();
          }
          else {
            ElMessage.error(res.data.msg);
          }
        }).then(err => {
          console.log(err);
        })
        console.log(formEl);
        dialogEditVisible.value = false;
      }
    }
  });

};

// 打开添加对话框
const openAddDialog = () => {
  itemInfo = reactive<StaffForm>({
    name: '',
    phone: '',
    identificationNumber: '',
    gender: '',
    birthDate: '',
    address: '',
    standby: '',
    skill: '',
    role: 1 // 默认值为普通工作人员
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
      AddStaff(data).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          ElMessage.success('添加成功');
          getStaffList();
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

//删除工作人员
const deleteStaff = (uid: string) => {
  ElMessageBox.confirm(
    '确认删除该工作人员信息?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    DeleteStaff(uid).then((res) => {
      console.log(res.data);
      if (res.data.code === 200) {
        ElMessage.success('删除成功');
        getStaffList();
      } else {
        ElMessage.error(res.data.msg);
      }
    });
  });
}

const getStaffList = () => {
  GetStaffList().then((res) => {
    if (res.status === 200) {
      staffData.length = 0;
      staffData.push(...res.data);
      console.log(staffData);
    } else {
      ElMessage.error(res.data.msg);
    }
  });
}

//挂载时自动获取工作人员列表
onMounted(() => {
  getStaffList();
});

const exportStaff = () => {
  // 导出逻辑实现
};

const searchStaff = () => {
  if (searchValue.value) {
    const data = {
      SearchKey: searchValue.value
    }
    SearchStaff(data).then((res) => {
      if (res.status === 200) {
        staffData.length = 0;
        staffData.push(...res.data);
      } else {
        ElMessage.error(res.data.msg);
      }
    }); 
  }
  else {
    getStaffList();
  }
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