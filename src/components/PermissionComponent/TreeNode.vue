<script setup>
import { ref, reactive, computed } from 'vue';
import { ElMessage, ElDialog, ElButton, ElTable, ElTableColumn, ElInput, ElPagination, ElSelect, ElOption, ElMessageBox } from 'element-plus';
import { getCollaborators, addCollaborator, removeCollaborator } from '@/api/permission';
import { GetStaffList } from '@/api';
import request from '@/utils/request'; // 新增
import TreeNode from './TreeNode.vue';

const props = defineProps({
  node: Object,
});

const emit = defineEmits(['toggle']);

// 协作者对话框相关
const collaboratorDialogVisible = ref(false);
const addDialogVisible = ref(false);
const collaborators = ref([]);
const loadingCollaborators = ref(false);
const addLoading = ref(false);

// 搜索用户相关
const userSearch = reactive({
  StaffName: '',
  IdentificationNumber: '',
  PageIndex: 1,
  PageSize: 8
});
const userList = ref([]);
const userTotal = ref(0);
const selectedUser = ref(null);

// 当前操作节点
const currentNode = ref(null);

// 解析 path，返回四级区划
function parsePath(path) {
  // path: "/130000/130200/130225/130225203/"
  const arr = path.split('/').filter(Boolean);
  return {
    ProvinceId: arr[0] ? Number(arr[0]) : 0,
    MunicipalityId: arr.length === 4 ? Number(arr[1]) : 0,
    DistrictId: arr.length === 4 ? Number(arr[2]) : (arr[1] ? Number(arr[1]) : 0),
    TownshipStreetsId: arr[arr.length - 1] ? Number(arr[arr.length - 1]) : 0
  };
}

// 打开协作者管理对话框
const showCollaboratorDialog = async (node) => {
  currentNode.value = node;
  collaboratorDialogVisible.value = true;
  await loadCollaborators();
};

// 加载协作者列表
const loadCollaborators = async () => {
  loadingCollaborators.value = true;
  try {
    const params = parsePath(currentNode.value.path);
    console.log(params);
    
    const res = await getCollaborators(params);
    if (res.status === 200) {
      // 兼容新接口结构，提取staffInfo
      if (Array.isArray(res.data.data)) {
        collaborators.value = res.data.data.map(item => ({
          name: item.staffInfo?.name || '',
          gender: item.staffInfo?.gender || '',
          phone: item.staffInfo?.phone || '',
          uid: item.collaboratorId // 用于删除
        }));
      } else {
        collaborators.value = [];
      }
    } else if (res.code === 404) {
      collaborators.value = [];
    }
  } catch (e) {
    if (!(e.response?.data?.message && e.response.data.message == "没有找到协作者")) {
      ElMessage.error('获取协作者失败');
    } else {
      collaborators.value = [];
    }
  }
  loadingCollaborators.value = false;
};

// 删除协作者
// const handleRemoveCollaborator = async (row) => {
//   ElMessageBox.confirm(
//     `确定要删除协作者 ${row.name || row.userName || ''} 吗？`,
//     '提示',
//     {
//       confirmButtonText: '确定',
//       cancelButtonText: '取消',
//       type: 'warning'
//     }
//   ).then(async () => {
//     try {
//       let res=await removeCollaborator(row.uid);
//       if(res.status==200)
//         ElMessage.success('删除成功');
//       await loadCollaborators();
//     } catch (e) {
//       ElMessage.error('删除失败');
//     }
//   }).catch(() => {
//     // 用户取消，无需处理
//   });
// };

// // 打开添加协作者对话框
// const openAddDialog = () => {
//   addDialogVisible.value = true;
//   userSearch.StaffName = '';
//   userSearch.IdentificationNumber = '';
//   userSearch.PageIndex = 1;
//   fetchUserList();
//   selectedUser.value = null;
// };

// 搜索用户
const fetchUserList = async () => {
  addLoading.value = true;
  try {
    const res = await GetStaffList({
      StaffName: userSearch.StaffName,
      IdentificationNumber: userSearch.IdentificationNumber,
      PageIndex: userSearch.PageIndex,
      PageSize: userSearch.PageSize
    });
    if (res.status === 200) {
      userList.value = res.data.staffDetails || [];
      userTotal.value = res.data.totalCount || 0;
    }
  } catch (e) {
    ElMessage.error('获取用户失败');
  }
  addLoading.value = false;
};

// // 确认添加协作者
// const confirmAddCollaborator = async () => {
//   if (!selectedUser.value) {
//     ElMessage.warning('请选择用户');
//     return;
//   }
//   const params = parsePath(currentNode.value.path);
//   params.StaffUid = selectedUser.value.uid;
//   try {
//     await addCollaborator(params);
//     ElMessage.success('添加成功');
//     addDialogVisible.value = false;
//     await loadCollaborators();
//   } catch (e) {
//     ElMessage.error('添加失败');
//   }
// };

</script>

<template>
  <li class="tree-node">
    <div class="node-content">
      <button v-if="node.children.length" @click="emit('toggle', node)">
        {{ node.expanded ? '-' : '+' }}
      </button>
      <div class="node-info" style="width: 22vw;">
        <h3>{{ node.displayName }}</h3>
        <p>区域主管: {{ node.authorizedToName }}</p>
      </div>
      <div class="node-info" style="width: 12vw;">
        <h3>&nbsp; </h3> 
        <p>授权者: {{ node.authorizerName }}</p>
      </div>
      <div class="node-info" style="width: 17vw;" v-if="node.createdAt">
        <h3>&nbsp; </h3>
        <p>授权时间: {{ node.createdAt? node.createdAt.replace('T',' ').split('.')[0]:'' }}</p>
      </div>
      <div class="node-info" style="width: 15vw;">
        <h3>&nbsp; </h3>
        <p>行政区划编码: {{ node.regionId }}</p>
      </div>

    </div>
    <ul v-if="node.expanded" class="children">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        @toggle="$emit('toggle', $event)"
      />
    </ul>
    <!-- 协作者管理对话框 -->
    <el-dialog v-model="collaboratorDialogVisible" width="600px" title="协作者管理" destroy-on-close>
      <div style="margin-bottom: 10px;">
        <el-button type="success" @click="openAddDialog">添加协作者</el-button>
      </div>
      <el-table :data="collaborators" v-loading="loadingCollaborators" style="width:100%">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="gender" label="性别" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button type="danger" size="small" @click="handleRemoveCollaborator(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 添加协作者对话框 -->
    <el-dialog v-model="addDialogVisible" width="700px" title="选择协作者" destroy-on-close>
      <div style="display: flex; gap: 10px; margin-bottom: 10px; align-items: center;">
        <el-input v-model="userSearch.StaffName" placeholder="姓名" style="width: 160px;" @keyup.enter="fetchUserList" />
        <el-input v-model="userSearch.IdentificationNumber" placeholder="身份证号" style="width: 180px;" @keyup.enter="fetchUserList" />
        <el-button type="primary" @click="fetchUserList">搜索</el-button>
        <!-- 新增：显示已选中用户 -->
        <span v-if="selectedUser" style="margin-left: 16px; color: #409eff;">
          已选：{{ selectedUser.name }}
        </span>
      </div>
      <el-table
        :data="userList"
        v-loading="addLoading"
        style="width:100%"
        @row-click="row => selectedUser = row"
        :row-class-name="row => selectedUser && row.uid === selectedUser.uid ? 'selected-row' : ''"
        highlight-current-row
      >
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="userName" label="用户名" />
        <el-table-column prop="phone" label="电话" />
      </el-table>
      <div style="margin: 10px 0; text-align: right;">
        <el-pagination
          background
          layout="prev, pager, next, jumper, total"
          :total="userTotal"
          :page-size="userSearch.PageSize"
          :current-page="userSearch.PageIndex"
          @current-change="page => { userSearch.PageIndex = page; fetchUserList(); }"
        />
      </div>
      <template #footer>
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAddCollaborator">确定</el-button>
      </template>
    </el-dialog>
  </li>
</template>

<style scoped>
h3{
  color: #3b3b3b;
}
.tree-node {
  position: relative;
  margin: 10px 0;
}

.node-content {
  display: flex;
  align-items: center;
  background: #fcfcfc;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.node-content button {
  margin-right: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  padding: 5px 10px;
}

.node-content button:hover {
  background: #0056b3;
}

.node-info h3 {
  margin: 0;
  font-size: 16px;
}

.node-info p {
  margin: 5px 0 0;
  font-size: 14px;
  color: #666;
}

.children {
  list-style: none;
  padding-left: 0.7vw;
  margin: 0;
  margin-left: 1.2vw;
  border-left: 2px solid #ccc;
}

.selected-row {
  background: #ecf5ff !important;
}
</style>
