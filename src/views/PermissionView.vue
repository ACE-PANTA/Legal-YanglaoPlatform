<script setup lang="ts">
import { ref } from 'vue'
import PermissionTable from '@/components/PermissionComponent/PermissionTable.vue'
import PermissionTree from '@/components/PermissionComponent/PermissionTree.vue'
import { useMainStore } from '@/store'
import AllowDelete from '@/components/PermissionComponent/AllowDelete.vue'

const currentView = ref<'table' | 'tree'>('table')

const toggleView = () => {
  currentView.value = currentView.value === 'table' ? 'tree' : 'table'
}

const checkVisible=ref(false)

const role=localStorage.getItem('UserRole')
const permissionLevel=useMainStore().userInfo.havePermissionLevel
</script>

<template>
  <div class="permission-container">
    <h1 style="display: flex;flex-direction: row;">
      区域权限分级
      <div style="margin-bottom: 20px;">
      <el-button type="primary" @click="toggleView" style="margin-left: 4vw;">
        切换到{{ currentView === 'table' ? '树状视图' : '表格视图' }}
      </el-button>
      <el-button v-if="permissionLevel==2" type="danger" @click="checkVisible=true" style="margin-left: 4vw;">
        查看审批消息
      </el-button>
    </div>
    </h1>
    
    <div v-if="currentView === 'table'">
      <PermissionTable />
    </div>
    <div v-else>
      <PermissionTree />
    </div>

    <el-dialog v-model="checkVisible" destroy-on-close>
      <template #default>
        <AllowDelete v-if="checkVisible"></AllowDelete>
      </template>
      <template #footer>
        <el-button type="danger" @click="checkVisible=false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.permission-container {
  padding: 20px;
}
</style>