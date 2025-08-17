<template>
  <div class="region-node-card">
    <div class="node-header">
      <div class="node-title-row">
        <!-- 展开按钮逻辑调整：只要不是最后一级都显示 -->
        <el-button
          size="small"
          type="text"
          @click="toggle"
          v-if="node.level !== 4"
          style="margin-right: 8px;"
        >
          <el-icon>
            <ArrowRight v-if="!node.expanded" />
            <ArrowDown v-else />
          </el-icon>
        </el-button>
        <span class="node-title">{{ node.regionName }}</span>
        <span class="node-code">({{ node.regionCode }})</span>
      </div>
      <div class="node-actions" v-if="role == 'SuperAdmin'">
        <el-button size="small" type="primary" plain @click="openEditDialog(node)">编辑</el-button>
        <el-button size="small" type="success" plain @click="openAddDialog(node, Number(node.level) + 1)">添加下级</el-button>
        <el-button size="small" type="danger" plain @click="confirmDelete(node)" v-if="!hasChildren">删除</el-button>
      </div>
    </div>
    <div class="node-children" v-show="node.expanded">
      <div v-if="loadingChildren" class="loading-row">
        <el-icon class="loading-icon" style="margin-right:6px;"><Loading /></el-icon>
        <span>加载中...</span>
      </div>
      <!-- 事件透传修正：用 v-on 语法完整透传所有参数 -->
      <RegionNode
        v-for="child in node.children"
        :key="child.uid"
        :node="child"
        @refresh="$emit('refresh')"
        @load-children="(...args) => $emit('load-children', ...args)"
      />
      <!-- 如果 children 为空且不是最后一级，显示“暂无数据”提示 -->
      <div v-if="!loadingChildren && node.children && node.children.length === 0 && node.level !== 4" class="empty-row">
        <span style="color:#bbb;">暂无下级数据</span>
      </div>
    </div>
    <!-- 编辑/添加对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isAdd ? '添加地区' : '编辑地区'"
      width="30%"
    >
      <el-form :model="editingRegion" label-width="80px">
        <el-form-item label="区划号">
          <el-input v-model="editingRegion.regionCode" type="number" />
        </el-form-item>
        <el-form-item label="地区名称">
          <el-input v-model="editingRegion.regionName" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
    <!-- 删除敏感操作确认对话框 -->
    <el-dialog
      v-model="deleteDialogVisible"
      title="敏感操作提示"
      width="400px"
    >
      <div>
        <p>
          删除区域是敏感操作，会直接影响系统整体区域结构。若该区域相关信息未完成迁移，可能造成严重后果。请谨慎操作并确认所有相关数据已妥善处理！
        </p>
      </div>
      <template #footer>
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="handleDeleteConfirmed">确认删除</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import RegionNode from './RegionNode.vue'
import { ArrowRight, ArrowDown, Loading } from '@element-plus/icons-vue'
import { enrollRegion, deleteRegion, updateForRegion } from '@/api/region'
import { ElMessage } from 'element-plus'

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['refresh', 'load-children'])

const hasChildren = props.node.children && props.node.children.length > 0
const dialogVisible = ref(false)
const isAdd = ref(false)
const editingRegion = ref({
  regionCode: 0,
  regionName: '',
  fatherId: 0,
  level: 1
})

const role=ref("")

// 删除确认对话框
const deleteDialogVisible = ref(false)
const deleteTarget = ref(null)

const openEditDialog = (node) => {
  // 编辑时带上uid
  editingRegion.value = {
    uid: node.uid,
    regionCode: node.regionCode,
    regionName: node.regionName,
    fatherId: node.fatherId,
    level: node.level
  }
  isAdd.value = false
  dialogVisible.value = true
}

const openAddDialog = (node, level) => {
  editingRegion.value = {
    regionCode: 0,
    regionName: '',
    fatherId: node.uid,
    level: level
  }
  isAdd.value = true
  dialogVisible.value = true
}

const handleSubmit = async () => {
  try {
    if (isAdd.value) {
      await enrollRegion(editingRegion.value)
      ElMessage.success('添加成功')
    } else {
      // 编辑时调用 updateForRegion
      await updateForRegion(editingRegion.value)
      ElMessage.success('编辑成功')
    }
    dialogVisible.value = false
    setTimeout(() => {
      location.reload()
    }, 400)
  } catch (error) {
    console.error('操作失败:', error)
    ElMessage.error('操作失败')
  }
}

// 删除敏感操作弹窗
const confirmDelete = (node) => {
  deleteTarget.value = node
  deleteDialogVisible.value = true
}

const handleDeleteConfirmed = async () => {
  try {
    await deleteRegion(deleteTarget.value.uid)
    ElMessage.success('删除成功')
    deleteDialogVisible.value = false
    setTimeout(() => {
      location.reload()
    }, 400)
  } catch (error) {
    console.error('删除失败:', error)
    ElMessage.error('删除失败')
  }
}

// 通知父组件刷新
const emitRefresh = () => {
  // $emit 兼容 setup
  // eslint-disable-next-line vue/no-setup-props-destructure
  // @ts-ignore
  if (typeof defineEmits === 'function') {
    const emit = defineEmits(['refresh'])
    emit('refresh')
  } else {
    // fallback
    // @ts-ignore
    this.$emit && this.$emit('refresh')
  }
}

const loadingChildren = ref(false)

const toggle = async () => {
  // 立即展开
  props.node.expanded = !props.node.expanded
  // 展开后且未加载过子节点时，显示加载动画并请求数据
  if (props.node.expanded && (!props.node.children || props.node.children.length === 0)) {
    loadingChildren.value = true
    emit('load-children', props.node.uid, (children) => {
      // 确保 children 是响应式数组
      props.node.children = children
      loadingChildren.value = false
    })
  }
}

onMounted(() => {
  role.value = localStorage.getItem('UserRole')

})
</script>

<style scoped>
.region-node-card {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  margin-bottom: 12px;
  background: #fff;
  padding: 14px 18px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.03);
}
.node-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.node-title-row {
  display: flex;
  align-items: center;
}
.node-title {
  font-weight: 600;
  color: #222;
  font-size: 1.08rem;
}
.node-code {
  color: #888;
  font-size: 0.95rem;
  margin-left: 8px;
}
.node-actions el-button {
  margin-left: 8px;
}
.node-children {
  margin-left: 32px;
  margin-top: 8px;
}
.loading-row {
  display: flex;
  align-items: center;
  color: #3382f1;
  font-size: 1rem;
  margin-bottom: 8px;
}
.loading-icon {
  animation: spin 1s linear infinite;
}
.empty-row {
  margin-left: 10px;
  margin-top: 4px;
  font-size: 0.95rem;
}
@keyframes spin {
  100% { transform: rotate(360deg);}
}
</style>