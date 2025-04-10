<template>
    <el-form :model="itemInfo" :rules="rules" label-position="left" label-width="100px" :disabled="disabled">
        <el-col class="form-item">
            <el-form-item label="是否可再生育" prop="isPlanningToHaveMoreChildren">
              <el-radio-group v-model="itemInfo.familyDetail.isPlanningToHaveMoreChildren">
                <el-radio label="是">是</el-radio>
                <el-radio label="否">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-show="itemInfo.familyDetail.isPlanningToHaveMoreChildren" class="form-item">
            <el-form-item  class="form-item" label="所生性别" prop="childrenGender">
              <el-select v-model="itemInfo.familyDetail.childrenGender" placeholder="请选择所生性别">
                <el-option label="男" value="mle"></el-option>
                <el-option label="女" value="female"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="form-item" label="再生育年月" prop="productionDate">
              <el-date-picker
                v-model="itemInfo.familyDetail.productionDate"
                type="date"
                placeholder="选择日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="form-item">
            <el-form-item class="form-item" label="是否收养" prop="isAdopting">
              <el-radio-group v-model="itemInfo.familyDetail.isAdopting">
                <el-radio label="是">是</el-radio>
                <el-radio label="否">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-show="itemInfo.familyDetail.isAdopting">
            <el-form-item class="form-item" label="收养性别" prop="adoptedChildGender">
              <el-select v-model="itemInfo.familyDetail.adoptingGender" placeholder="请选择收养性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="form-item" label="收养年月" prop="adoptionDate">
              <el-date-picker
                v-model="itemInfo.familyDetail.adoptingDate"
                type="date"
                placeholder="选择日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD">
              </el-date-picker>
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
    width:300px;
}

</style>