<template>
  <div>
    <div  class="area-selector-block">
      <div class="area-selector-label">地区筛选：</div>
      <AreaSelector @update:area="val => $emit('update:area', val)" />
    </div>
    <div class="condition-section">
      <div
        v-for="(group, groupIdx) in conditions"
        :key="groupIdx"
        class="condition-group"
      >
        <div
          v-for="(cond, condIdx) in group"
          :key="condIdx"
          class="condition-row"
        >
          <el-select
            v-model="cond.field"
            placeholder="选择字段"
            class="condition-field"
            @change="onFieldChange(cond)"
            :filterable="true"
          >
            <el-option
              v-for="item in fieldOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="isFieldUsed(group, item.value) && cond.field !== item.value"
            />
          </el-select>
          <el-select v-model="cond.operator" placeholder="选择关系" class="condition-operator">
            <el-option v-for="op in getOperatorOptions(cond.field)" :key="op.value" :label="op.label" :value="op.value" />
          </el-select>
          <el-select
            v-if="showEnumSelect(cond.field)"
            v-model="cond.value"
            placeholder="请选择"
            class="condition-value"
            clearable
          >
            <el-option v-for="opt in getFieldEnumOptions(cond.field)" :key="opt.value" :label="opt.label" :value="opt.value" />
          </el-select>
          <el-input
            v-else
            v-model="cond.value"
            :placeholder="getPlaceholder(cond.field)"
            class="condition-value"
          />
          <el-button
            type="danger"
            size="small"
            @click="removeCondition(groupIdx, condIdx)"
            v-if="group.length > 1"
            class="condition-remove-btn"
          >
            <span class="minus-icon">
              <svg viewBox="0 0 1024 1024" width="14" height="14"><path d="M192 474.666667h640v74.666666H192z" fill="currentColor"></path></svg>
            </span>
          </el-button>
        </div>
        <div class="condition-group-actions">
          <el-button icon="el-icon-plus" size="small" @click="addCondition(groupIdx)" class="condition-add-btn">添加条件</el-button>
          <el-button icon="el-icon-delete" size="small" type="danger" @click="removeGroup(groupIdx)" v-if="conditions.length > 1" class="condition-delgroup-btn">删除条件组</el-button>
        </div>
        <div v-if="groupIdx < conditions.length - 1" class="or-divider">或</div>
      </div>
      <el-button icon="el-icon-plus" type="primary" @click="addGroup" class="condition-addgroup-btn">添加条件组(或)</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, toRefs } from 'vue'
import AreaSelector from '@/components/Common/AreaSelector.vue'

const props = defineProps({
  area: Object,
  conditions: Array,
  fieldOptions: Array,
  enumOptions: Object,
  operatorOptions: Object,
  showArea: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['update:area', 'update:conditions'])

const conditions = ref(props.conditions || [[{ field: '', operator: '', value: '', values: [] }]])
watch(() => props.conditions, v => { if (v) conditions.value = v }, { deep: true })
watch(conditions, v => emit('update:conditions', v), { deep: true })

function addCondition(groupIdx: number) {
  conditions.value[groupIdx].push({ field: '', operator: '', value: '', values: [] });
}
function removeCondition(groupIdx: number, condIdx: number) {
  conditions.value[groupIdx].splice(condIdx, 1);
}
function addGroup() {
  conditions.value.push([{ field: '', operator: '', value: '', values: [] }]);
}
function removeGroup(groupIdx: number) {
  conditions.value.splice(groupIdx, 1);
}
function onFieldChange(cond) {
  cond.operator = '';
  cond.value = '';
  cond.values = [];
}

function getOperatorOptions(field: string) {
  if (!props.operatorOptions) return [];
  if (props.operatorOptions[field]) return props.operatorOptions[field];
  if (props.operatorOptions.default) return props.operatorOptions.default;
  return [];
}
function getFieldEnumOptions(field: string) {
  return props.enumOptions && props.enumOptions[field] ? props.enumOptions[field] : [];
}
function showEnumSelect(field: string) {
  return props.enumOptions && Array.isArray(props.enumOptions[field]) && props.enumOptions[field].length > 0;
}
function getPlaceholder(field: string) {
  if (field === 'age') return '请输入年龄';
  if (field === 'annualIncome') return '请输入年收入';
  if (field === 'annualExpenditure') return '请输入年支出';
  if (field === 'birthDate') return '请输入出生日期';
  return '请选择/输入';
}
function isFieldUsed(group, field) {
  return group.some(c => c.field === field);
}
</script>

<style scoped>
.area-selector-block {
  display: flex;
  align-items: center;
  background: #f7f9fa;
  border-radius: 6px;
  padding: 10px 12px;
  margin-bottom: 18px;
  gap: 10px;
}
.area-selector-label {
  font-weight: 500;
  color: #409eff;
  margin-right: 8px;
  font-size: 15px;
  min-width: 80px;
}
.condition-section {
  margin-bottom: 10px;
}
.condition-group {
  margin-bottom: 18px;
  border-bottom: 1px dashed #eee;
  padding-bottom: 8px;
}
.condition-row {
  display: flex;
  align-items: center;
  gap: 2%;
  margin-bottom: 8px;
}
.condition-field {
  width: 22%;
}
.condition-operator {
  width: 18%;
}
.condition-value {
  width: 22%;
}
.condition-remove-btn {
  width: 8%;
  min-width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.minus-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.condition-group-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 6px;
}
.condition-add-btn,
.condition-delgroup-btn {
  width: 18%;
  min-width: 70px;
}
.condition-addgroup-btn {
  width: 22%;
  min-width: 120px;
  margin-top: 8px;
}
.or-divider {
  color: #999;
  text-align: center;
  margin: 8px 0;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 2px;
}
</style>
