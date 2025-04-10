<template>
    <el-form :model="itemInfo" :rules="rules" label-position="left" label-width="80px" :disabled="disabled">
        <el-col class="form-item">
            <el-form-item label="医疗" prop="medicalInsurance">
              <el-input v-model="itemInfo.houseHold.socialSecurityRequest.medicalInsurance" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col class="form-item">
            <el-form-item label="养老" prop="pensionInsurance">
              <el-input v-model="itemInfo.houseHold.socialSecurityRequest.pensionInsurance" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col class="form-item">
            <el-form-item label="住房" prop="housingFund">
              <el-input v-model="itemInfo.houseHold.socialSecurityRequest.housingFund" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col class="form-item">
            <el-form-item label="低保">
              <el-radio-group v-model="itemInfo.houseHold.socialSecurityRequest.isLowIncomeSupport">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col class="form-item">
            <el-form-item label="保险" prop="insurance">
              <el-input v-model="itemInfo.houseHold.socialSecurityRequest.insurance" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col class="form-item">
            <el-form-item label="五保">
              <el-radio-group v-model="itemInfo.houseHold.socialSecurityRequest.isFiveGuaranteesSupport">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-form-item class="form-item" label="备注" prop="remarks">
              <el-input v-model="itemInfo.houseHold.socialSecurityRequest.remarks" autocomplete="off" type="textarea" />
          </el-form-item>
    </el-form>

</template>

<script setup lang="ts">
import { reactive } from 'vue';
import ChinaAeraSelect from './ChinaAeraSelect.vue';
import { FormRules } from 'element-plus';

defineProps({
    itemInfo: {
        type: Object,
        required: true
    },
    rules: {
        type: Object,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['update:itemInfo']);
</script>

<style scoped>
.form-item {
    width:300px;
}

</style>