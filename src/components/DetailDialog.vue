<template>
  <el-dialog v-model="visible" title="详细信息" width="80%">
    <div style="padding:10px;">
      <!-- 基本信息 -->
      <h2>基本信息</h2>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="姓名">{{ data?.name }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="照片">
            <img :src="data?.photo" alt="照片" style="width:100px; height:100px; object-fit: cover; border-radius: 4px;" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- ...existing code for other fields... -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="电话">{{ data?.phoneNumber }}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="行政区划">{{ data?.administrativeDivision }}</el-form-item>

      <!-- 居住情况 -->
      <h3>居住情况</h3>
      <el-table :data="getResidenceData(data)" border size="small" style="margin-bottom: 10px;">
        <el-table-column prop="key" label="项目" width="120" />
        <el-table-column prop="value" label="内容" />
      </el-table>
      <!-- ...existing code for other sections... -->
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

const getResidenceData = (row) => {
  return [
    { key: '详细地址', value: row?.detailedAddress },
    { key: '居住方式', value: row?.livingArrangement },
    { key: '同住亲戚', value: row?.coLivingRelatives },
    { key: '养老机构', value: row?.nursingInstitution },
    { key: '住房类型', value: row?.housingType },
    { key: '是否危房', value: row?.isDangerousHouse },
    { key: '住房面积', value: row?.housingArea },
  ];
};
</script>
