<template>
    <div class="children-info">
        <div style="display: flex;flex-direction: row;">
            <el-button type="info" style="width: 15%;" @click="$emit('goBack')">返回</el-button>
            <h2 style="width: 70%;text-align: center;font-weight: 700;">子女信息列表</h2>
        </div>
        <el-card v-for="(child, index) in data" :key="index" class="child-card">
            <el-form :model="child" label-width="120px" label-position="left">
                <el-form-item label="姓名">{{ child.name }}</el-form-item>
                <el-form-item label="关系">{{ child.relation }}</el-form-item>
                <el-form-item label="是否为收养">{{ child.ifAdopt }}</el-form-item>
                <el-form-item label="性别">{{ child.gender }}</el-form-item>
                <el-form-item label="出生日期">{{ child.birthDate }}</el-form-item>
                <el-form-item label="健康状况">{{ child.healthStatus }}</el-form-item>
                <el-form-item label="生活自理能力">{{ child.takecareLifeAbility }}</el-form-item>
                <el-form-item label="是否独居">{{ child.ifLivingAlone }}</el-form-item>
                <el-form-item label="伤残类别">{{ child.disabilityType }}</el-form-item>
                <el-form-item label="伤残级别">{{ child.disabilityLevel }}</el-form-item>
                <el-form-item label="医疗依赖">{{ child.medicalDependence }}</el-form-item>
                <el-form-item label="是否有慢性病">{{ child.ifChronicDisease }}</el-form-item>
                <el-form-item label="慢性病名称">{{ child.chronicDiseaseName }}</el-form-item>
                <el-form-item label="常用药物">{{ child.commonlyMedications }}</el-form-item>
                <el-form-item label="等级划分">{{ child.grading }}</el-form-item>
                <el-form-item label="备注">{{ child.remark }}</el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { EnrollChildGrandRequest } from '@/models';
defineProps({
    data: {
        type: Array<EnrollChildGrandRequest>,
        required: true
    }
});
</script>

<style scoped>
.children-info {
    padding: 20px;
    max-height: 70vh; /* 最大高度限制为视口高度的 80% */
    overflow-y: auto; /* 启用垂直滚动条 */
    box-sizing: border-box;
}

.child-card {
    margin-bottom: 20px;
    padding: 15px;
    border-bottom: 1px solid #ddd;
    position: relative;
}

.household-info {
    padding: 20px;
    max-height: 70vh; /* 最大高度限制为视口高度的 80% */
    overflow-y: auto; /* 启用垂直滚动条 */
    box-sizing: border-box;
}

.el-form-item {
    margin-bottom: 10px;
    font-size: 14px;
    color: #333;
    display: flex;
    align-items: flex-start;
    border-left: #007bff 4px solid;
    margin-left: 3%;
    margin-right: 3%;
    padding-left: 5px;
}

:deep(.el-form-item__label){
    font-weight: 600;
    color: #3b3b3b;
    border-right: 1px #d9d9d9 dashed;
    margin-right: 4px;
}

.el-form-item span {
    color: #666;
}
</style>
