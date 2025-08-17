<template>
  <div class="region-manage-container" v-loading="loading"
      element-loading-background="rgba(122, 122, 122, 0.8)"
      element-loading-text="加载区划树中，请稍等...">
    <div class="header-row">
      <h1>区划管理</h1>
      <el-button type="primary" @click="openAddProvinceDialog">添加根节点</el-button>
    </div>
    <RegionTree
      :treeData="treeData"
      @edit="openEditDialog"
      @add="openAddDialog"
      @delete="handleDelete"
      @refresh="fetchTree"
      @load-children="loadChildren"
    />
    <!-- 内联省份添加对话框逻辑 -->
    <el-dialog
      v-model="addProvinceDialogVisible"
      title="添加根节点"
      width="30%"
    >
      <el-form :model="newProvince" label-width="80px">
        <el-form-item label="区划号">
          <el-input v-model="newProvince.regionCode" type="number" />
        </el-form-item>
        <el-form-item label="省份名称">
          <el-input v-model="newProvince.regionName" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addProvinceDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAddProvince">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import RegionTree from '@/components/RegionManage/RegionTree.vue'
import { enrollRegion, deleteRegion, getRegionsByFatherId } from '@/api/region'
import { ElMessage } from 'element-plus'

const treeData = ref([])
const addProvinceDialogVisible = ref(false)
const newProvince = ref({
  regionCode: 0,
  regionName: '',
  fatherId: 0,
  level: 1
})

const loading = ref(true)

// 本地缓存
const regionCache = ref({})

const ROOT_UID = 5099263649039605

const fetchTree = async () => {
  loading.value = true
  try {
    // 只获取根节点的子节点（省份）
    const res = await getRegionsByFatherId(ROOT_UID)
    if (res.status === 200) {
      treeData.value = res.data.data.map(node => ({
        ...node,
        expanded: false,
        children: []
      }))
      regionCache.value[ROOT_UID] = treeData.value
    } else {
      ElMessage.error('获取区划失败，请稍后重试！')
    }
  } catch (e) {
    ElMessage.error('获取区划失败，请稍后重试！')
  }
  loading.value = false
}

// 动态加载子节点
const loadChildren = async (fatherId, cb) => {
  // 增加类型检查，避免 cb 不是函数时报错
  if (typeof cb !== 'function') {
    console.error('loadChildren: cb is not a function', cb)
    return
  }
  if (regionCache.value[fatherId]) {
    cb(regionCache.value[fatherId])
    return
  }
  try {
    const res = await getRegionsByFatherId(fatherId)
    if (res.status === 200) {
      const children = res.data.data.map(node => ({
        ...node,
        expanded: false,
        children: []
      }))
      regionCache.value[fatherId] = children
      cb(children)
    } else {
      ElMessage.error('获取下级区划失败')
      cb([])
    }
  } catch (e) {
    ElMessage.error('获取下级区划失败')
    cb([])
  }
}

const openAddProvinceDialog = () => {
  newProvince.value = {
    regionCode: 0,
    regionName: '',
    fatherId: 0,
    level: 1
  }
  addProvinceDialogVisible.value = true
}

const handleAddProvince = async () => {
  try {
    await enrollRegion(newProvince.value)
    addProvinceDialogVisible.value = false
    fetchTree()
  } catch (error) {
    console.error('添加省份失败:', error)
  }
}

const openEditDialog = (region) => {
  // 编辑逻辑保持不变
}

const openAddDialog = (parentRegion, level) => {
  // 添加下级逻辑保持不变
}

const handleSubmit = async (region) => {
  // 提交逻辑保持不变
}

const handleDelete = async (region) => {
  try {
    await deleteRegion(region.regionCode)
    fetchTree()
  } catch (error) {
    console.error('删除失败:', error)
  }
}

onMounted(fetchTree)
</script>

<style scoped>
.region-manage-container {
  padding: 32px;
  background: #f7f8fa;
  min-height: 90vh;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
h1 {
  font-size: 2rem;
  color: #3382f1;
  margin-bottom: 24px;
  font-weight: 700;
  text-align: center;
}
</style>