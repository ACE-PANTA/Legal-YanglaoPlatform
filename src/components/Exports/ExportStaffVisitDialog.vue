<template>
  <div style="font-weight: bold; font-size: 18px; margin-bottom: 12px;">
    员工：{{ staffName }}
  </div>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="80px" style="margin-top: 20px;">
    <el-form-item label="开始时间" prop="Begin">
      <el-date-picker v-model="form.Begin" type="date" placeholder="请选择开始时间" style="width: 100%;" />
    </el-form-item>
    <el-form-item label="结束时间" prop="End">
      <el-date-picker v-model="form.End" type="date" placeholder="请选择结束时间" style="width: 100%;" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="exporting" @click="handleExport">导出</el-button>
      <el-button @click="$emit('close')" :disabled="exporting">取消</el-button>
    </el-form-item>
  </el-form>
  <div v-if="exporting" style="text-align:center;margin-top:20px;">
    <el-icon class="is-loading" style="font-size:32px;"><Loading /></el-icon>
    <div style="color:#888;margin-top:8px;">正在导出，请稍候...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
import { exportStaffVisitRecord } from '@/api/visit'
import request from '@/utils/request'

const props = defineProps<{ staffUid: string, staffName?: string }>()
const staffName = props.staffName || ''

const form = ref({
  Begin: '',
  End: new Date().toISOString().slice(0, 10)
})
const rules = {
  Begin: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
  End: [{ required: true, message: '请选择结束时间', trigger: 'change' }]
}
const formRef = ref()
const exporting = ref(false)

// 格式化日期为 yyyyMMdd
function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}${m}${day}`
}

// 监听员工uid变化，重置表单
watch(() => props.staffUid, () => {
  form.value.Begin = ''
  form.value.End = new Date().toISOString().slice(0, 10)
})

const handleExport = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (!valid) return
    exporting.value = true
    try {
      const params = {
        staffuid: props.staffUid,
        Begin: form.value.Begin,
        End: form.value.End
      }
      const res = await exportStaffVisitRecord(params)
      const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const beginStr = formatDate(form.value.Begin)
      const endStr = formatDate(form.value.End)
      // 文件名：员工名_工作记录_起止时间.xlsx
      const fileName = `${staffName || '员工'}_工作记录_${beginStr}_${endStr}.xlsx`
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      ElMessage.success('导出成功')
      setTimeout(() => {
        exporting.value = false
        // @ts-ignore
        if (typeof $emit === 'function') $emit('close')
      }, 500)
    } catch (e) {
      ElMessage.error('导出失败')
      exporting.value = false
    }
  })
}
</script>
