<template>
    <div class="spouse-info">
        <div style="display: flex;flex-direction: row;">
            <el-button type="info" style="width: 15%;" @click="$emit('goBack')">返回</el-button>
            <h2 style="width: 70%;text-align: center;font-weight: 700;">配偶信息</h2>
        </div>
        <el-form :model="data" label-width="120px" label-position="left">
            <div class="title">
                基本信息
            </div>
            <el-form-item label="姓名">{{ data.name }}</el-form-item>
            <el-form-item label="身份证号">{{ data.identificationNumber }}</el-form-item>
            <el-form-item label="性别">{{ data.gender }}</el-form-item>
            <el-form-item label="户口所在地">{{ data.householdRegistLocation }}</el-form-item>
            <el-form-item label="出生日期">{{ data.birthDate }}</el-form-item>
            <el-form-item label="民族">{{ data.ethnicity }}</el-form-item>
            <el-form-item label="地域">{{ data.region }}</el-form-item>
            <el-form-item label="电话">{{ data.phoneNumber }}</el-form-item>
            <el-form-item label="政治面貌">{{ data.politicalAffiliation }}</el-form-item>
            <el-form-item label="婚姻状况">{{ data.maritalStatus }}</el-form-item>
            <el-form-item label="文化程度">{{ data.educationLevel }}</el-form-item>
            <el-form-item label="行政区划">{{ data.administrativeDivision }}</el-form-item>
            <el-form-item label="单位学校">{{ data.employerSchool }}</el-form-item>
            <el-form-item label="工作情况">{{ data.employmentStatus }}</el-form-item>
            <el-form-item label="等级划分">{{ data.grading }}</el-form-item>
            <el-form-item label="备注">{{ data.remark }}</el-form-item>
            
            <div class="title">健康状况</div>
            <el-form-item label="血型">{{ data.healthInformation.bloodType }}</el-form-item>
            <el-form-item label="四肢活动">{{ data.healthInformation.limbMobility }}</el-form-item>
            <el-form-item label="既往病史">{{ data.healthInformation.medicalHistory }}</el-form-item>
            <el-form-item label="建档时疾病">{{ data.healthInformation.recordDisease }}</el-form-item>
            <el-form-item label="是否长期用药">{{ data.healthInformation.isLongTermMedication }}</el-form-item>
            <el-form-item label="重大疾病">{{ data.healthInformation.majorDiseases }}</el-form-item>
            <el-form-item label="健康状况">{{ data.healthInformation.healthStatus }}</el-form-item>
            <el-form-item label="伤残级别">{{ data.healthInformation.disabilityLevel }}</el-form-item>
            <el-form-item label="伤残类别">{{ data.healthInformation.disabilityType }}</el-form-item>
            <el-form-item label="备注">{{ data.healthInformation.remark }}</el-form-item>
            
            
            <div class="title">
                社会保障
            </div>
            <el-form-item label="医疗">{{ data.socialSecurityInformation.medicalInsurance }}</el-form-item>
            <el-form-item label="养老">{{ data.socialSecurityInformation.pensionInsurance }}</el-form-item>
            <el-form-item label="住房">{{ data.socialSecurityInformation.housingFund }}</el-form-item>
            <el-form-item label="低保">{{ data.socialSecurityInformation.lowIncomeSupport }}</el-form-item>
            <el-form-item label="保险">{{ data.socialSecurityInformation.insurance }}</el-form-item>
            <el-form-item label="五保">{{ data.socialSecurityInformation.fiveGuaranteesSupport }}</el-form-item>
            <el-form-item label="其他保障">{{ data.socialSecurityInformation.otherBenefits }}</el-form-item>
            <el-form-item label="就业扶持">{{ data.socialSecurityInformation.employmentSupport }}</el-form-item>
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
.title{
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
    color: #3382f1;
    border-bottom: dashed 1px #c8c8ff;
    padding-bottom: 3px;
}
.spouse-info {
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
