<template>
  <el-dialog v-model="visible" title="导出筛选条件" width="800px" :close-on-click-modal="false">
    <el-tabs v-model="activeTab" stretch>
      <!-- <el-tab-pane label="家庭基本信息" name="family">
        <ExportTabContent
          :area="familyArea"
          :conditions="familyConditions"
          :field-options="familyFieldOptions"
          :enum-options="enumOptions"
          :operator-options="familyOperatorOptions"
          :show-area="true"
          @update:area="val => familyArea = val"
          @update:conditions="val => familyConditions = val"
        /> 
      </el-tab-pane> -->
      <el-tab-pane label="人员基本信息" name="adult">
        <ExportTabContent
          :area="adultArea"
          :conditions="adultConditions"
          :field-options="adultFieldOptions"
          :enum-options="enumOptions"
          :operator-options="defaultOperatorOptions"
          :show-area="true"
          @update:area="val => adultArea = val"
          @update:conditions="val => adultConditions = val"
        />
      </el-tab-pane>
      <el-tab-pane label="子女基本信息" name="child">
        <ExportTabContent
          :area="childArea"
          :conditions="childConditions"
          :field-options="childFieldOptions"
          :enum-options="childEnumOptions"
          :operator-options="defaultOperatorOptions"
          :show-area="false"
          @update:area="val => childArea = val"
          @update:conditions="val => childConditions = val"
        />
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <el-button @click="visible = false" :disabled="loading">取消</el-button>
      <el-button type="primary" :loading="loading" :disabled="loading" @click="handleSubmit">确定</el-button>
    </template>
    <el-dialog v-model="showHelp" title="导出筛选条件使用说明" width="500px" append-to-body>
      <div style="font-size: 15px; line-height: 1.8;">
        <ul style="padding-left: 18px;">
          <li>只有需要被指定的条件才需要进行选择，其他未被指定的条件在导出时将不被限制。</li>
          <li>每一组条件为“且(AND)”关系，组与组之间为“或(OR)”关系。</li>
          <li>同一组内不能选择重复的字段，否则会导致查询不到结果。</li>
          <li>字段支持“等于”“不等于”等关系，部分字段支持“大于等于”“小于等于”。</li>
          <li>有下拉选项的字段请选择下拉内容，无下拉的请手动输入。</li>
          <li>可通过“添加条件”增加组内条件，通过“添加条件组(或)”增加“或”分组。</li>
          <li>设置好后点击“确定”即可导出符合条件的数据。</li>
        </ul>
      </div>
      <template #footer>
        <el-button type="primary" @click="showHelp = false">我知道了</el-button>
      </template>
    </el-dialog>
    <el-button class="help-btn" type="info" size="small" icon="el-icon-question" @click="showHelp = true">
      使用说明
    </el-button>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import ExportTabContent from './ExportTabContent.vue'

// 公共枚举选项
const enumOptions = {
  gender: [
    { label: '男', value: '男' },
    { label: '女', value: '女' }
  ],
  maritalStatus: [
    { label: '已婚', value: '已婚' },
    { label: '未婚', value: '未婚' },
    { label: '离异', value: '离异' },
    { label: '丧偶', value: '丧偶' },
    { label: '再婚', value: '再婚' },
    { label: '其他', value: '其他' }
  ],
  educationLevel: [
    { label: '文盲或半文盲', value: '文盲或半文盲' },
    { label: '小学', value: '小学' },
    { label: '初中', value: '初中' },
    { label: '高中', value: '高中' },
    { label: '专科', value: '专科' },
    { label: '本科', value: '本科' },
    { label: '硕士', value: '硕士' },
    { label: '博士', value: '博士' },
    { label: '其他', value: '其他' }
  ],
  region: [
    { label: '城市', value: '城市' },
    { label: '农村', value: '农村' }
  ],
  politicalAffiliation: [
    { label: '中共党员', value: '中共党员' },
    { label: '民主党派', value: '民主党派' },
    { label: '共青团员', value: '共青团员' },
    { label: '群众', value: '群众' }
  ],
  grading: [
    { label: '红', value: '红' },
    { label: '橙', value: '橙' },
    { label: '黄', value: '黄' },
    { label: '绿', value: '绿' }
  ],
  healthStatus: [
    { label: '良好', value: '良好' },
    { label: '高龄 (大于等于80周岁)', value: '高龄' },
    { label: '慢性病 (高血压/糖尿病/心脏病等需长期服药疾病)', value: '慢性病' },
    { label: '失能', value: '失能' },
    { label: '逝世', value: '逝世' }
  ],
  disabilityType: [
    { label: '无', value: '无' },
    { label: '肢体残疾', value: '肢体残疾' },
    { label: '视力残疾', value: '视力残疾' },
    { label: '听力残疾', value: '听力残疾' },
    { label: '精神残疾', value: '精神残疾' }
  ],
  disabilityLevel: [
    { label: '无', value: '无' },
    { label: '一级', value: '一级' },
    { label: '二级', value: '二级' },
    { label: '三级', value: '三级' },
    { label: '四级', value: '四级' }
  ],
  isLongTermMedication: [
    { label: '是', value: '是' },
    { label: '否', value: '否' }
  ],
  limbMobility: [
    { label: '自如', value: '自如' },
    { label: '不便', value: '不便' }
  ],
  bloodType: [
    { label: 'A型', value: 'A型' },
    { label: 'B型', value: 'B型' },
    { label: 'AB型', value: 'AB型' },
    { label: 'O型', value: 'O型' },
    { label: 'RH阴性', value: 'RH阴性' },
    { label: 'RH阳性', value: 'RH阳性' }
  ],
  employmentStatus: [
    { label: '务工', value: '务工' },
    { label: '单位职工', value: '单位职工' },
    { label: '零工', value: '零工' },
    { label: '已退休', value: '已退休' },
    { label: '无劳动力', value: '无劳动力' }
  ]
}

// 家庭Tab字段
const familyFieldOptions = [
  { value: 'grading', label: '等级划分' },
  { value: 'annualIncome', label: '家庭年收入(元)' },
  { value: 'annualExpenditure', label: '家庭年支出(元)' }
]
// 家庭Tab操作符
const familyOperatorOptions = {
  default: [
    { label: '等于', value: '=' },
    { label: '不等于', value: '!=' }
  ],
  annualIncome: [
    { label: '等于', value: '=' },
    { label: '大于等于', value: '>=' },
    { label: '小于等于', value: '<=' }
  ],
  annualExpenditure: [
    { label: '等于', value: '=' },
    { label: '大于等于', value: '>=' },
    { label: '小于等于', value: '<=' }
  ]
}

// 成人Tab字段
const adultFieldOptions = [
  { value: 'gender', label: '性别' },
  { value: 'maritalStatus', label: '婚姻状况' },
  { value: 'educationLevel', label: '文化程度' },
  { value: 'region', label: '地域' },
  { value: 'politicalAffiliation', label: '政治面貌' },
  { value: 'grading', label: '等级划分' },
  { value: 'healthStatus', label: '健康状况' },
  { value: 'disabilityType', label: '伤残类别' },
  { value: 'disabilityLevel', label: '伤残级别' },
  { value: 'isLongTermMedication', label: '是否长期用药' },
  { value: 'limbMobility', label: '四肢活动' },
  { value: 'bloodType', label: '血型' },
  { value: 'employmentStatus', label: '工作情况' },
  { value: 'age', label: '年龄' }
]

// 儿童Tab字段及枚举
const childFieldOptions = [
  { value: 'gender', label: '性别' },
  { value: 'relation', label: '与户主关系' },
  { value: 'ifAdopt', label: '是否收养' },
  { value: 'birthDate', label: '出生日期' },
  { value: 'healthStatus', label: '健康状况' },
  { value: 'takecareLifeAbility', label: '生活自理能力' },
  { value: 'ifLivingAlone', label: '是否独居' },
  { value: 'disabilityType', label: '伤残类别' },
  { value: 'disabilityLevel', label: '伤残级别' },
  { value: 'medicalDependence', label: '医疗依赖' },
  { value: 'ifChronicDisease', label: '是否有慢性病' },
  { value: 'chronicDiseaseName', label: '慢性病名称' },
  { value: 'grading', label: '等级划分' }
]
const childEnumOptions = {
  gender: enumOptions.gender,
  relation: [
    { label: '子女', value: '子女' },
    { label: '孙子女', value: '孙子女' }
  ],
  ifAdopt: [
    { label: '是', value: '是' },
    { label: '否', value: '否' }
  ],
  healthStatus: enumOptions.healthStatus,
  takecareLifeAbility: [
    { label: '完全自理', value: '完全自理' },
    { label: '半自理', value: '半自理' },
    { label: '不能自理', value: '不能自理' }
  ],
  ifLivingAlone: [
    { label: '是', value: '是' },
    { label: '否', value: '否' }
  ],
  disabilityType: enumOptions.disabilityType,
  disabilityLevel: enumOptions.disabilityLevel,
  medicalDependence: [
    { label: '完全依赖护理', value: '完全依赖护理' },
    { label: '重度依赖', value: '重度依赖' },
    { label: '轻度依赖', value: '轻度依赖' },
    { label: '完全自理', value: '完全自理' }
  ],
  ifChronicDisease: [
    { label: '是', value: '是' },
    { label: '否', value: '否' }
  ],
  grading: enumOptions.grading
}

// 操作符（成人/儿童通用）
const defaultOperatorOptions = {
  default: [
    { label: '等于', value: 'like' },
    { label: '不等于', value: '!=' }
  ],
  age: [
    { label: '等于', value: '=' },
    { label: '大于等于', value: '>=' },
    { label: '小于等于', value: '<=' }
  ],
  disabilityType: [
    { label: '等于', value: 'like' },
    { label: '不等于', value: 'not like' }
  ],
  disabilityLevel: [
    { label: '等于', value: 'like' },
    { label: '不等于', value: 'not like' }
  ],
}

const props = defineProps({
  modelValue: Boolean
});
const emit = defineEmits(['update:modelValue', 'submitFamily', 'submitAdult', 'submitChild']);

const visible = ref(props.modelValue);
watch(() => props.modelValue, v => visible.value = v);
watch(visible, v => emit('update:modelValue', v));

const showHelp = ref(false);
const loading = ref(false);
const activeTab = ref('adult');

// 各Tab条件与地区
const familyArea = ref({
  provinceId: '',
  provinceName: '',
  cityId: '',
  cityName: '',
  districtId: '',
  districtName: '',
  streetId: '',
  streetName: ''
});
const familyConditions = ref([[{ field: '', operator: '', value: '', values: [] }]]);
const adultArea = ref({
  provinceId: '',
  provinceName: '',
  cityId: '',
  cityName: '',
  districtId: '',
  districtName: '',
  streetId: '',
  streetName: ''
});
const adultConditions = ref([[{ field: '', operator: '', value: '', values: [] }]]);
const childArea = ref({
  provinceId: '',
  provinceName: '',
  cityId: '',
  cityName: '',
  districtId: '',
  districtName: '',
  streetId: '',
  streetName: ''
});
const childConditions = ref([[{ field: '', operator: '', value: '', values: [] }]]);

function handleSubmit() {
  loading.value = true;
  let payload, area, event;
  if (activeTab.value === 'family') {
    area = familyArea.value;
    payload = buildPayload(area, familyConditions.value, familyFieldOptions, familyOperatorOptions);
    event = 'submitFamily';
  } else if (activeTab.value === 'adult') {
    area = adultArea.value;
    payload = buildPayload(area, adultConditions.value, adultFieldOptions, defaultOperatorOptions);
    event = 'submitAdult';
  } else {
    area = childArea.value;
    payload = buildPayload(area, childConditions.value, childFieldOptions, defaultOperatorOptions);
    event = 'submitChild';
  }
  emit(event, payload, () => { loading.value = false; visible.value = false; });
}

function buildPayload(area, conditions, fieldOptions, operatorOptions) {
  // 地区条件组拼接（只用Name字段，且只拼接有值的）
  const areaConds = [];
  if (area.provinceName) areaConds.push({ Field: 'provinceName', Operator: 'like', Value: area.provinceName });
  if (area.cityName) areaConds.push({ Field: 'municipalityName', Operator: 'like', Value: area.cityName });
  if (area.districtName) areaConds.push({ Field: 'districtName', Operator: 'like', Value: area.districtName });
  if (area.streetName) areaConds.push({ Field: 'townshipstreetName', Operator: 'like', Value: area.streetName });

  // 其他条件组
  const payload = conditions.map(group =>
    group
      .filter(c => c.field && c.operator && (c.value !== '' || (c.values && c.values.length)))
      .map(c => {
        return { Field: c.field, Operator: c.operator, Value: c.value };
      })
  ).filter(g => g.length > 0);

  if (areaConds.length) payload.unshift(areaConds);
  return payload;
}
</script>

<style scoped>
.help-btn {
  position: absolute;
  top: 30px;
  right: 18px;
  z-index: 10;
  border-radius: 6px;
  padding: 10px 12px;
  margin-bottom: 18px;
  gap: 10px;
  text-align: center;
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
