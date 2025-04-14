<template>
    <el-form :model="itemInfo" :rules="rules" ref="itemInfoRef" label-position="left" label-width="120px" :disabled="disabled">
        <div class="title">
            <span style="font-size: 20px;
            font-weight: bold;" v-if="itemInfo.relation=='户主'">户主基本信息</span>
            <span style="font-size: 20px;
            font-weight: bold;" v-else>配偶基本信息
            <p style="font-weight: 300;font-size: smaller;">(若无该信息则全部留空)</p></span>
                
        </div>
        <el-col class="form-item">
            <el-form-item label="姓名" prop="name" class="form-item">
                <el-input v-model="itemInfo.name" autocomplete="off" />
            </el-form-item>
        </el-col>
        <!-- <el-col class="form-item">
            <el-form-item label="照片" prop="photo">
                <el-upload >
                </el-upload>
            </el-form-item>
        </el-col> -->
        <el-col class="form-item">
            <el-form-item label="身份证" prop="identifactionNumber">
                <el-input v-model="itemInfo.identificationNumber" autocomplete="off" />
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="户口所在地" prop="householdRegistLocation">
                <el-input v-model="itemInfo.householdRegistLocation" autocomplete="off" />
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="性别" prop="gender">
                <el-radio-group label="性别" v-model="itemInfo.gender">
                    <el-radio label="男" value="男">男</el-radio>
                    <el-radio label="女" value="女">女</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="出生年月" prop="birthDate">
                <el-date-picker v-model="itemInfo.birthDate" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="民族" prop="ethnicity">
                <el-input v-model="itemInfo.ethnicity" placeholder="请输入民族" autocomplete="off" />
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="地域" prop="region">
                <el-radio-group v-model="itemInfo.region">
                    <el-radio label="城市" value="城市">城市</el-radio>
                    <el-radio label="农村" value="农村">农村</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="政治面貌" prop="politicalAffiliation">
                <el-select v-model="itemInfo.politicalAffiliation" placeholder="请选择政治面貌">
                    <el-option label="中共党员" value="中共党员" />
                    <el-option label="民主党派" value="民主党派" />
                    <el-option label="共青团员" value="共青团员" />
                    <el-option label="群众" value="群众" />
                </el-select>
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="婚姻情况" prop="maritalStatus">
                <el-select v-model="itemInfo.maritalStatus" placeholder="请选择婚姻情况">
                    <el-option label="已婚" value="已婚" />
                    <el-option label="未婚" value="未婚" />
                    <el-option label="离异" value="离异" />
                    <el-option label="丧偶" value="丧偶" />
                    <el-option label="再婚" value="再婚" />
                    <el-option label="其他" value="其他" />
                </el-select>
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="文化程度" prop="educationLevel">
                <el-select v-model="itemInfo.educationLevel" placeholder="请选择文化程度">
                    <el-option label="文盲或半文盲" value="文盲或半文盲" />
                    <el-option label="小学" value="小学" />
                    <el-option label="初中" value="初中" />
                    <el-option label="高中" value="高中" />
                    <el-option label="专科" value="专科" />
                    <el-option label="本科" value="本科" />
                    <el-option label="硕士" value="硕士" />
                    <el-option label="博士" value="博士" />
                    <el-option label="其他" value="其他" />
                </el-select>
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="电话" prop="phoneNumber">
                <el-input v-model="itemInfo.phoneNumber" autocomplete="off" />
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="行政区划" prop="administrativeDivision">
                <el-input v-model="itemInfo.administrativeDivision" autocomplete="off" />
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="备注" prop="remark">
                <el-input v-model="itemInfo.remark" autocomplete="off" />
            </el-form-item>
        </el-col>
        
        <div class="title">
            工作状况
        </div>
        <el-col class="form-item">
            <el-form-item label="单位学校" prop="employSchool">
                <el-input v-model="itemInfo.employerSchool" autocomplete="off" />
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="工作情况" prop="employmentStatus">
                <el-select v-model="itemInfo.employmentStatus" placeholder="请选择工作情况">
                    <el-option label="务工" value="务工" />
                    <el-option label="单位职工" value="单位职工" />
                    <el-option label="零工" value="零工" />
                    <el-option label="已退休" value="已退休" />
                    <el-option label="无劳动力" value="无劳动力" />
                </el-select>
            </el-form-item>
        </el-col>
        
        <div class="title">
            健康状况
        </div>
        <el-col class="form-item">
            <el-form-item label="血型" prop="bloodType">
                <el-select v-model="itemInfo.healthInformationRequest.bloodType" placeholder="请选择血型">
                    <el-option label="A型" value="A型" />
                    <el-option label="B型" value="B型" />
                    <el-option label="AB型" value="AB型" />
                    <el-option label="O型" value="O型" />
                    <el-option label="RH阴性" value="RH阴性" />
                    <el-option label="RH阳性" value="RH阳性" />
                </el-select>
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="四肢活动" prop="limbMobility">
                <el-radio-group v-model="itemInfo.healthInformationRequest.limbMobility">
                    <el-radio label="自如" value="自如">自如</el-radio>
                    <el-radio label="不便" value="不便">不便</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="既往病史" prop="medicalHistory">
                <el-input placeholder="请填写既往病史" v-model="itemInfo.healthInformationRequest.medicalHistory" autocomplete="off" />
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="建档时疾病" prop="bloodType">
                <el-input v-model="itemInfo.healthInformationRequest.recordDisease" autocomplete="off" />
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="是否长期用药" prop="isLongTermMedication">
                <el-radio-group v-model="itemInfo.healthInformationRequest.isLongTermMedication">
                    <el-radio label="是" value="是">是</el-radio>
                    <el-radio label="否" value="否">否</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="重大疾病" prop="majorDisease">
                <el-input placeholder="请填写建档时重大疾病" v-model="itemInfo.healthInformationRequest.majorDiseases" autocomplete="off" />
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="健康状况" prop="healthStatus">
                <el-select v-model="itemInfo.healthInformationRequest.healthStatus" placeholder="请选择健康状况">
                    <el-option label="良好" value="良好" />
                    <el-option label="高龄 (大于等于80周岁)" value="高龄" />
                    <el-option label="慢性病 (高血压/糖尿病/心脏病等需长期服药疾病)" value="慢性病" />
                    <el-option label="失能" value="失能" />
                </el-select>
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="伤残类别" prop="disabilityType">
                <el-select v-model="itemInfo.healthInformationRequest.disabilityType" placeholder="请选择伤残类别">
                    <el-option label="无" value="无" />
                    <el-option label="肢体" value="肢体" />
                    <el-option label="视力" value="视力" />
                    <el-option label="听力" value="听力" />
                    <el-option label="精神" value="精神" />
                </el-select>
            </el-form-item>
        </el-col>
        <el-col class="form-item" v-if="itemInfo.healthInformationRequest.disabilityType == '肢体'|| itemInfo.healthInformationRequest.disabilityType == '精神'">
            <el-form-item label="伤残级别" prop="disabilityLevel">
                <el-select v-model="itemInfo.healthInformationRequest.disabilityLevel" placeholder="请选择伤残级别">
                    <el-option label="无" value="无" />
                    <el-option v-if="itemInfo.healthInformationRequest.disabilityType=='肢体'" label="一级 (四肢瘫/截瘫/偏瘫等，完全丧失活动能力)" value="一级" />
                    <el-option v-if="itemInfo.healthInformationRequest.disabilityType=='肢体'" label="二级 (保留部分功能，无法独立行走)" value="二级" />
                    <el-option v-if="itemInfo.healthInformationRequest.disabilityType=='肢体'" label="三级 (部分功能保留，需辅助器具)" value="三级" />
                    <el-option v-if="itemInfo.healthInformationRequest.disabilityType=='肢体'" label="四级 (轻度功能障碍，如脊柱测凸<45°)" value="四级" />
                    <el-option v-if="itemInfo.healthInformationRequest.disabilityType=='精神'" label="一级 (完全无法参与社会活动)" value="一级" />
                    <el-option v-if="itemInfo.healthInformationRequest.disabilityType=='精神'" label="二级 (严重受限，需全天监护)" value="二级" />
                    <el-option v-if="itemInfo.healthInformationRequest.disabilityType=='精神'" label="三级 (部分受限，需间歇支持)" value="三级" />
                </el-select>
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="等级划分" prop="grading">
                <el-select v-model="itemInfo.grading" disabled placeholder="请进行评级判定">
                    <el-option label="红" value="红" />
                    <el-option label="橙" value="橙" />
                    <el-option label="黄" value="黄" />
                    <el-option label="绿" value="绿" />
                </el-select>
                <el-button type="success" style="margin-top: 5px;" @click="openGradeDialog">进行评级判断</el-button>
            </el-form-item>
        </el-col>
        <el-dialog v-model="isGradeDialogVisible" width="50%" :destroy-on-close="true">
            <GradeJudge @gradeEvaluated="updateGrading" />
        </el-dialog>
        
        <el-col class="form-item">
            <el-form-item label="备注" prop="healthRemark">
                <el-input v-model="itemInfo.healthInformationRequest.remark" autocomplete="off" />
            </el-form-item>
        </el-col>

        <div class="title">
            社会保障
        </div>
        <el-col class="form-item">
            <el-form-item label="医疗" prop="medicalInsurance">
                <el-input placeholder="填写医疗" v-model="itemInfo.socialSecurityRequest.medicalInsurance" autocomplete="off" />
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="养老" prop="pensionInsurance">
                <el-input placeholder="填写养老" v-model="itemInfo.socialSecurityRequest.pensionInsurance" autocomplete="off" />
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="住房" prop="housingFund">
                <el-input placeholder="填写住房" v-model="itemInfo.socialSecurityRequest.housingFund" autocomplete="off" />
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="低保" prop="lowIncomeSupport">
                <el-input placeholder="填写低保" v-model="itemInfo.socialSecurityRequest.lowIncomeSupport" autocomplete="off" />
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="保险" prop="insurance">
                <el-input placeholder="填写保险" v-model="itemInfo.socialSecurityRequest.insurance" autocomplete="off" />
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="五保" prop="fiveGuaranteesSupport">
                <el-input placeholder="填写五保" v-model="itemInfo.socialSecurityRequest.fiveGuaranteesSupport" autocomplete="off" />
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="其他保障" prop="otherBenefits">
                <el-input placeholder="填写其他保障" v-model="itemInfo.socialSecurityRequest.otherBenefits" autocomplete="off" />
            </el-form-item>
        </el-col>
        <el-col class="form-item">
            <el-form-item label="就业扶持" prop="employmentSupport">
                <el-input placeholder="填写就业扶持" v-model="itemInfo.socialSecurityRequest.employmentSupport" autocomplete="off" />
            </el-form-item>
        </el-col>

        <!--
        <div v-for="(spouse, index) in itemInfo.ListEnrollHouseHoldSpouseRequest" :key="index">
            <h3>配偶信息 {{index + 1}}</h3>
            <el-col class="form-item">
                <el-form-item :label="'姓名'" :prop="'ListEnrollHouseHoldSpouseRequest.' + index + '.name'">
                    <el-input v-model="spouse.name" autocomplete="off" />
                </el-form-item>
            </el-col>
            <el-col class="form-item">
                <el-form-item :label="'关系'" :prop="'ListEnrollHouseHoldSpouseRequest.' + index + '.relation'">
                    <el-input v-model="spouse.relation" autocomplete="off" />
                </el-form-item>
            </el-col>
        </div>

        <div v-for="(child, index) in itemInfo.ListEnrollChildGrandRequests" :key="index">
            <h3>子孙信息 {{index + 1}}</h3>
            <el-col class="form-item">
                <el-form-item :label="'姓名'" :prop="'ListEnrollChildGrandRequests.' + index + '.name'">
                    <el-input v-model="child.name" autocomplete="off" />
                </el-form-item>
            </el-col>
            <el-col class="form-item">
                <el-form-item :label="'关系'" :prop="'ListEnrollChildGrandRequests.' + index + '.relation'">
                    <el-input v-model="child.relation" autocomplete="off" />
                </el-form-item>
            </el-col>
        </div> -->
    </el-form>
</template>

<script lang="ts">
export default {
    name: 'BaseInfoEditDialog'
}
</script>

<script setup lang="ts">

import { PropType,  ref, watch } from 'vue';
import { EnrollHouseHoldSpouseRequests } from '@/models';
import { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import GradeJudge from '@/components/BaseInfors/GradeJudge.vue';

const props = defineProps({
    itemInfo: {
        type: Object as PropType<EnrollHouseHoldSpouseRequests>,
        required: true
    },
    rules: {
        type: Object,
        required: true
    },
    state: {
        type: Object as PropType<Boolean>,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

//当前组件的值发生变化时，校验表单并更新父组件的值
watch(() => props.itemInfo, (newVal) => {
    validateForm();
    emit('update:itemInfo', newVal);
}, { deep: true });

//表单校验函数
const validateForm = async () => {
    const form = itemInfoRef.value as FormInstance;
    form.validate((valid) => {
        if (valid) {
            console.log('表单校验成功');
            emit('update:state', true);
        } else {
            emit('update:state', false);
            console.log('表单校验失败');
        }
    });
}

// 照片上传前的校验
const beforePhotoUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isImage) {
        ElMessage.error('上传的文件必须是图片!');
    }
    if (!isLt2M) {
        ElMessage.error('上传的图片大小不能超过 2MB!');
    }
    return isImage && isLt2M;
};

const itemInfoRef = ref<FormInstance>();
const emit = defineEmits(['update:itemInfo', 'update:state']);

const isGradeDialogVisible = ref(false);

const openGradeDialog = () => {
    isGradeDialogVisible.value = true;
};

const updateGrading = (grade: string) => {
    props.itemInfo.grading = grade;
    setTimeout(()=>{isGradeDialogVisible.value = false;},1000)
    
};

</script>

<style scoped>
:deep(.el-select) {
    width: 25vw !important;  /* 让输入框占满表单项宽度 */
}
:deep(.el-dialog){
    margin-top: -50% !important;
    width: 80vh !important;
}
.title{
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
    color: #3382f1;
    border-bottom: dashed 1px #c8c8ff;
    padding-bottom: 3px;
}
:deep(.el-col) {
  width: 75%;  /* 让输入框占满表单项宽度 */
  margin-left: 12.5%;
  margin-right: 12.5%;
}
/* 修改输入框样式 */
:deep(.el-input) {
  width: 25vw !important;  /* 让输入框占满表单项宽度 */
}

/* 保持标签文字加粗 */
:deep(.el-form-item__label) {
  font-weight: 600 !important;
  min-width: 120px;  /* 确保标签有固定宽度 */
}

/* 调整日期选择器宽度 */
:deep(.el-date-picker) {
  width: 100% !important;
}

/* 调整单选框组样式 */
:deep(.el-radio-group) {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
:deep(.el-form-item__label) {
  font-weight: bold !important;
}

/* 如果需要调整具体粗细度，可以使用具体数值 */
:deep(.el-form-item__label) {
  font-weight: 600 !important;
}

.form-item {
    width:300px;
    display: flex;
    flex-direction: row;
    font-weight: 600;
    text-align: center;
}

.avatar-uploader {
    display: inline-block;
    width: 100px;
    height: 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
}
.avatar-uploader-icon {
    width:100px;
    height:100px;
    font-size: 28px;
    color: #8c939d;
    line-height: 100px;
    text-align: center;
}
.avatar {
    width: 100%;
    height: 100%;
    display: block;
}
:deep(.el-dialog) {
    margin-top: 15vh !important; /* 确保弹窗居中显示 */
}
</style>