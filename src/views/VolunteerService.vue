<template>
    <div>
        <h1>志愿者服务记录表</h1>
    </div>
    <!--增加、搜索、导出服务记录信息-->
    <div style="width: 100%;">
        <div style="display: flex; padding-right:25px; padding-bottom: 10px; width:100%; justify-content: flex-end">
            <el-select size="large" v-model="searchLabel" placeholder="请选择搜索类型" style="width:110px; margin-right: 10px;">
                <el-option v-for="label in searchLabelList" :key="label.label" :label="label.label"
                        :value="label.label" />
            </el-select>
            <div style="padding-right:15px">
                <el-input size="large" v-model="searchValue" :placeholder="'请输入'+searchLabel" style="max-width:250px;"></el-input>
            </div>
            <el-button size="large" type="primary" style="margin-right:10px">搜索</el-button>
            <el-button size="large" type="primary" style="margin-right:10px" @click="openAddDialog">添加</el-button>
            <el-button size="large" type="primary" @click="exportServiceRecord">导出</el-button>
        </div>
    </div>
    <!--表格信息-->
    <div style="display:flex; flex-direction: column;">
        <el-table :data="serviceRecordData" size="large" stripe style="width: 100%;">
            <el-table-column show-overflow-tooltip v-for="serviceRecord in serviceRecordLabelList" :prop="serviceRecord.value"
                :label="serviceRecord.label" />
            <el-table-column label="操作" fixed="right" width="120">
                <template #default="{ row }">
                    <div style="display: flex; width:100%;">
                        <el-button style="margin: auto; margin-left:5px; margin-right:5px" type="primary" circle size="middle" @click="openEditDialog(row)">
                                <el-icon><Edit /></el-icon>
                        </el-button>
                        <el-button style="margin: auto;" circle  type="danger" size="middle">
                            <el-icon><DeleteFilled /></el-icon>
                        </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <!--编辑-对话框-->
    <el-dialog v-model="dialogEditVisible" title="编辑服务记录信息" width="700">
        <el-form :model="itemInfo" ref="itemInfoRef" :rules="rules">
            <el-form-item label="服务编号" prop="ServiceNumber" :label-width="formLabelWidth" label-position="left">
                <el-input v-model="itemInfo.ServiceNumber" autocomplete="off" />
            </el-form-item>
            <el-form-item label="服务日期" prop="ServiceDate" :label-width="formLabelWidth" label-position="left">
                <el-date-picker
                    v-model="itemInfo.ServiceDate"
                    type="date"
                    placeholder="选择服务日期"
                    style="width: 100%"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="服务时间(min)" prop="ServiceTime" :label-width="formLabelWidth" label-position="left">
                <el-input v-model="itemInfo.ServiceTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="服务内容" prop="ServiceContent" :label-width="formLabelWidth" label-position="left">
                <el-input v-model="itemInfo.ServiceContent" autocomplete="off" />
            </el-form-item>
            <el-form-item label="服务评价" prop="ServiceEvaluation" :label-width="formLabelWidth" label-position="left">
                <el-input v-model="itemInfo.ServiceEvaluation" autocomplete="off" />
            </el-form-item>
            <el-form-item label="服务反馈" prop="Feedback" :label-width="formLabelWidth" label-position="left">
                <el-input v-model="itemInfo.Feedback" autocomplete="off" />
            </el-form-item>
            <el-form-item label="志愿者经历" prop="VolunteerExperience" :label-width="formLabelWidth" label-position="left">
                <el-input v-model="itemInfo.VolunteerExperience" autocomplete="off" />
            </el-form-item>
            <el-form-item label="匹配编号" prop="MatchingNumber" :label-width="formLabelWidth" label-position="left">
                <el-input v-model="itemInfo.MatchingNumber" autocomplete="off" />
            </el-form-item>
            <el-form-item label="匹配ID" prop="MatchingUid" :label-width="formLabelWidth" label-position="left">
                <el-input v-model="itemInfo.MatchingUid" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogEditVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogEditVisible = false">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>

    <!--添加-对话框-->
    <el-dialog v-model="dialogAddVisible" title="添加服务记录信息" width="700">
        <el-form :model="itemInfo" ref="itemInfoRef" :rules="rules">
            <el-form-item label="服务编号" prop="ServiceNumber" :label-width="formLabelWidth" label-position="left">
                <el-input v-model="itemInfo.ServiceNumber" autocomplete="off" />
            </el-form-item>
            <el-form-item label="服务日期" prop="ServiceDate" :label-width="formLabelWidth" label-position="left">
                <el-date-picker
                    v-model="itemInfo.ServiceDate"
                    type="date"
                    placeholder="选择服务日期"
                    style="width: 100%"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="服务时间(min)" prop="ServiceTime" :label-width="formLabelWidth" label-position="left">
                <el-input v-model="itemInfo.ServiceTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="服务内容" prop="ServiceContent" :label-width="formLabelWidth" label-position="left">
                <el-input v-model="itemInfo.ServiceContent" autocomplete="off" />
            </el-form-item>
            <el-form-item label="服务评价" prop="ServiceEvaluation" :label-width="formLabelWidth" label-position="left">
                <el-input v-model="itemInfo.ServiceEvaluation" autocomplete="off" />
            </el-form-item>
            <el-form-item label="服务反馈" prop="Feedback" :label-width="formLabelWidth" label-position="left">
                <el-input v-model="itemInfo.Feedback" autocomplete="off" />
            </el-form-item>
            <el-form-item label="志愿者经历" prop="VolunteerExperience" :label-width="formLabelWidth" label-position="left">
                <el-input v-model="itemInfo.VolunteerExperience" autocomplete="off" />
            </el-form-item>
            <el-form-item label="匹配编号" prop="MatchingNumber" :label-width="formLabelWidth" label-position="left">
                <el-input v-model="itemInfo.MatchingNumber" autocomplete="off" />
            </el-form-item>
            <el-form-item label="匹配ID" prop="MatchingUid" :label-width="formLabelWidth" label-position="left">
                <el-input v-model="itemInfo.MatchingUid" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogAddVisible = false">取消</el-button>
                <el-button type="primary" @click="add(itemInfoRef)">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>

</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { ComponentSize, FormInstance, FormRules } from 'element-plus';

//志愿者服务记录属性列表
let serviceRecordLabelList = ref([
    { value: 'Uid', label: '唯一标识' },
    { value: 'ServiceNumber', label: '服务编号' },
    { value: 'ServiceDate', label: '服务日期' },
    { value: 'ServiceTime', label: '服务时间' },
    { value: 'ServiceContent', label: '服务内容' },
    { value: 'ServiceEvaluation', label: '服务评价' },
    { value: 'Feedback', label: '服务反馈' },
    { value: 'VolunteerExperience', label: '志愿者经历' },
    { value: 'MatchingNumber', label: '匹配编号' },
    { value: 'MatchingUid', label: '匹配ID' },
]);

const serviceRecordData = reactive([
    {
        Uid: 1001,
        ServiceNumber: 'S2023001',
        ServiceDate: '2023-01-15',
        ServiceTime: 3,
        ServiceContent: '社区志愿服务',
        ServiceEvaluation: 4.5,
        Feedback: '服务很好',
        VolunteerExperience: '第一次参加社区服务',
        MatchingNumber: 'M2023001',
        MatchingUid: 2001,
    },
    {
        Uid: 1002,
        ServiceNumber: 'S2023002',
        ServiceDate: '2023-03-20',
        ServiceTime: 4,
        ServiceContent: '环保志愿服务',
        ServiceEvaluation: 4.8,
        Feedback: '服务很到位',
        VolunteerExperience: '第二次参加环保服务',
        MatchingNumber: 'M2023002',
        MatchingUid: 2002,
    },
    {
        Uid: 1003,
        ServiceNumber: 'S2023003',
        ServiceDate: '2023-05-10',
        ServiceTime: 2,
        ServiceContent: '教育志愿服务',
        ServiceEvaluation: 4.6,
        Feedback: '服务很好',
        VolunteerExperience: '第三次参加教育服务',
        MatchingNumber: 'M2023003',
        MatchingUid: 2003,
    },
    {
        Uid: 1004,
        ServiceNumber: 'S2023004',
        ServiceDate: '2023-07-05',
        ServiceTime: 5,
        ServiceContent: '医疗志愿服务',
        ServiceEvaluation: 4.9,
        Feedback: '服务很专业',
        VolunteerExperience: '第四次参加医疗服务',
        MatchingNumber: 'M2023004',
        MatchingUid: 2004,
    }
]);

let dialogEditVisible = ref(false);
let dialogAddVisible = ref(false);

interface ServiceRecordForm {
    ServiceNumber: string;
    ServiceDate: string;
    ServiceTime: number;
    ServiceContent: string;
    ServiceEvaluation: number;
    Feedback: string;
    VolunteerExperience: string;
    MatchingNumber: string;
    MatchingUid: number;
}

//表单信息
let itemInfo = reactive<ServiceRecordForm>({
    ServiceNumber: '',
    ServiceDate: '',
    ServiceTime: 0,
    ServiceContent: '',
    ServiceEvaluation: 0,
    Feedback: '',
    VolunteerExperience: '',
    MatchingNumber: '',
    MatchingUid: 0,
});

const itemInfoRef = ref<FormInstance>();

//规则
const rules = reactive<FormRules<ServiceRecordForm>>({
    ServiceNumber: [
        { required: true, message: '请输入服务编号', trigger: 'blur' },
    ],
    ServiceDate: [
        { required: true, message: '请输入服务日期', trigger: 'blur' },
    ],
    ServiceTime: [
        { required: true, message: '请输入服务时间', trigger: 'blur' },
    ],
    ServiceContent: [
        { required: true, message: '请输入服务内容', trigger: 'blur' },
    ],
    ServiceEvaluation: [
        { required: true, message: '请输入服务评价', trigger: 'blur' },
    ],
});

const searchValue = ref('');

const formLabelWidth = ref('120px');

const searchLabelList = ref([
    { label: '服务内容' },
    { label: '服务评价' },
    { label: '服务反馈' },
    { label: '志愿者经历' },
]);

let searchLabel = ref(searchLabelList.value[0].label);

//打开编辑对话框
const openEditDialog = (row: any) => {
    itemInfo = row;
    dialogEditVisible.value = true;
}

//编辑
const edit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log(formEl);
            dialogEditVisible.value = false;
        }
        else {
            console.log('error submit!', fields);
        }
    })
}

//打开添加对话框
const openAddDialog = () => {
    itemInfo = reactive({
        ServiceNumber: '',
        ServiceDate: '',
        ServiceTime: 0,
        ServiceContent: '',
        ServiceEvaluation: 0,
        Feedback: '',
        VolunteerExperience: '',
        MatchingNumber: '',
        MatchingUid: 0,
    });
    dialogAddVisible.value = true;
}

//添加
const add = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log(itemInfo);
            dialogAddVisible.value = false;
        }
        else {
            console.log('error submit!', fields);
        }
    })
}

const exportServiceRecord = () => {

}
</script>

<style scoped>
</style>