<template>
  <el-form :model="itemInfo" :rules="rules" label-position="left" label-width="80px" :disabled="disabled">
    <el-col class="form-item">
      <el-form-item label="身高" prop="healthInformationRequest.height">
        <el-input v-model.number="itemInfo.houseHold.healthInformationRequest.height" autocomplete="off" />
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="体重" prop="HealthInformationRequest.weight">
        <el-input v-model.number="itemInfo.houseHold.healthInformationRequest.weight" autocomplete="off" />
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="血型" prop="HealthInformationRequest.bloodType">
        <el-select v-model="itemInfo.houseHold.healthInformationRequest.bloodType" placeholder="请选择">
          <el-option label="A型" value="A型"></el-option>
          <el-option label="B型" value="B型"></el-option>
          <el-option label="O型" value="O型"></el-option>
          <el-option label="AB型" value="AB型"></el-option>
          <el-option label="RH阳性型" value="RH阳性型"></el-option>
          <el-option label="RH阴性型" value="RH阴性型"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="血压" prop="HealthInformationRequest.bloodPressure">
        <el-input v-model="itemInfo.houseHold.healthInformationRequest.bloodPressure" autocomplete="off" />
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="四肢活动" prop="HealthInformationRequest.limbMobility">
        <el-radio-group v-model="itemInfo.houseHold.healthInformationRequest.limbMobility">
          <el-radio label="不便">不便</el-radio>
          <el-radio label="自如">自如</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="建档时疾病" prop="HealthInformationRequest.RecordDisease">
        <el-input v-model="itemInfo.houseHold.healthInformationRequest.recordDisease" autocomplete="off" />
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="长期用药" prop="HealthInformationRequest.isLongTermMedication">
        <el-radio-group v-model="itemInfo.houseHold.healthInformationRequest.isLongTermMedication">
          <el-radio label="是">是</el-radio>
          <el-radio label="否">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="重大疾病" prop="HealthInformationRequest.majorDiseases">
        <el-input v-model="itemInfo.houseHold.healthInformationRequest.majorDiseases" autocomplete="off" />
      </el-form-item>
    </el-col>
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
  width: 300px;
}
</style>