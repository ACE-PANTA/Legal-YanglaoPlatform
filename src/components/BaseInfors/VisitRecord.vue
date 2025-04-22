<template>
  <div>
    <h2 style="font-weight: 600;">探访记录</h2>
    <el-table
      v-if="visitList.length>0"
      :data="visitList"
      style="width: 100%; margin-top: 16px; font-size: 16px;"
      border
      size="large"
    >
      <el-table-column prop="beginTime" label="开始时间" width="180">
        <template #default="{ row }">
          {{ formatDate(row.beginTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间" width="180">
        <template #default="{ row }">
          {{ formatDate(row.endTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="method" label="探访方式"  />
      <el-table-column prop="visitor" label="探访人"  />
      <el-table-column prop="serviceName1" label="服务对象1" />
      <el-table-column prop="serviceName2" label="服务对象2"  />
    </el-table>
    <div v-else style="margin: 16px 0;">暂无探访记录</div>
    <el-pagination
      v-if="total > 0"
      style="margin-top: 16px; text-align: right;"
      background
      layout="prev, pager, next, jumper, ->, total"
      :current-page="pageIndex"
      :page-size="pageSize"
      :total="total"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script lang="ts">
export default {
    name: 'VisitRecord'
}
</script>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFamilyVisitRecord } from '@/api/visit'
import dayjs from 'dayjs'

const props = defineProps({
    record: {
        type: Object as any,
        required: true
    }
})

const visitList = ref([])
const total = ref(0)
const pageIndex = ref(1)
const pageSize = ref(10)

const checkFamilyForm = ref({
  Year: 0,
  Month: 0,
  Day: 0,
  FamilyUid: props.record,
  PageIndex: pageIndex.value,
  PageSize: pageSize.value
})

function fetchVisitList() {
  checkFamilyForm.value.PageIndex = pageIndex.value
  checkFamilyForm.value.PageSize = pageSize.value
  getFamilyVisitRecord(checkFamilyForm.value)
    .then(res => {
      visitList.value = res.data.data || []
      total.value = res.data.total || 0
    })
}

function handlePageChange(val: number) {
  pageIndex.value = val
  fetchVisitList()
}

function formatDate(dateStr: string) {
  return dateStr ? dayjs(dateStr).format('YYYY-MM-DD HH:mm:ss') : ''
}

onMounted(() => {
  fetchVisitList()
})
</script>

<style scoped>
/* 表格字体加大，宽度100% */
.el-table {
  font-size: 16px;
  width: 100%;
}
/* 表头字体加粗 */
.el-table th {
  font-weight: 600;
}
/* 分页字体加大 */
.el-pagination {
  font-size: 16px;
}
</style>