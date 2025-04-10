<template>
    <div class="family-info">
        <div style="display: flex;flex-direction: row;">
            <el-button type="info" style="width: 15%;" @click="$emit('goBack')">返回</el-button>
            <h2 style="width: 70%;text-align: center;font-weight: 700;">家庭情况</h2>
        </div>
        <el-form :model="data" label-width="120px" label-position="left">
            <el-form-item label="家庭年收入">{{ data.annualIncome }}</el-form-item>
            <el-form-item label="家庭年支出">{{ data.annualExpenditure }}</el-form-item>
            <el-form-item label="等级划分">{{ data.grading }}</el-form-item>
            <el-form-item label="省">{{ data.provinceName }}</el-form-item>
            <el-form-item label="市">{{ data.municipalityName }}</el-form-item>
            <el-form-item label="区县">{{ data.districtName }}</el-form-item>
            <el-form-item label="街道/乡镇">{{ data.townshipStreetsName }}</el-form-item>
            <el-form-item label="备注">{{ data.remark }}</el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    data: {
        type: Object,
        required: true
    }
});
</script>

<style scoped>
.family-info {
    padding: 20px;
    max-height: 70vh; /* 最大高度限制为视口高度的 80% */
    overflow-y: auto; /* 启用垂直滚动条 */
    box-sizing: border-box;
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
