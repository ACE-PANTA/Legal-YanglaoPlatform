<template>
    <div>
        <el-form :model="taskForm" ref="taskFormRef" :rules="rules">
            <el-form-item label="任务名称" prop="TaskName">
                <el-input v-model="taskForm.TaskName" placeholder="请输入任务名称" />
            </el-form-item>
            <el-form-item label="任务描述" prop="TaskDescription">
                <el-input
                    v-model="taskForm.TaskDescription"
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 8 }"
                    placeholder="请输入任务描述"
                />
            </el-form-item>
            <el-form-item label="开始时间" prop="StarTime">
                <el-date-picker v-model="taskForm.StarTime" type="datetime" placeholder="请选择开始时间" />
            </el-form-item>
            <el-form-item label="结束时间" prop="EndTime">
                <el-date-picker v-model="taskForm.EndTime" type="datetime" placeholder="请选择结束时间" />
            </el-form-item>
            <div class="dialog-footer">
                <el-button @click="handlePrev">上一步</el-button>
                <el-button type="primary" @click="submitTask">提交</el-button>
            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import type { FormInstance } from 'element-plus';

const props = defineProps({
  taskDetailForm: {
    type: Object,
    default: () => ({
      TaskName: '',
      TaskDescription: '',
      StarTime: '',
      EndTime: ''
    })
  }
});
const emit = defineEmits(['update:taskDetailForm', 'submit', 'prev']);

const taskForm = ref({ ...props.taskDetailForm });
watch(() => props.taskDetailForm, (val) => {
  Object.assign(taskForm.value, val);
}, { immediate: true });

const taskFormRef = ref<FormInstance>();

const rules = {
  TaskName: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
  TaskDescription: [{ required: true, message: '请输入任务描述', trigger: 'blur' }],
  StarTime: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
  EndTime: [{ required: true, message: '请选择结束时间', trigger: 'change' }]
};

const submitTask = () => {
  taskFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      emit('update:taskDetailForm', taskForm.value);
      emit('submit');
    }
  });
};

const handlePrev = () => {
  taskFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      emit('update:taskDetailForm', taskForm.value);
      emit('prev');
    }
  });
};
</script>
