<template>
  <el-form :model="memberInfo" label-width="120px" :disabled="disabled" style="display: flex;flex-direction: column;">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="memberInfo.name" />
    </el-form-item>
    <el-form-item label="关系" prop="relation">
      <el-select v-model="memberInfo.relation" placeholder="请选择与户主的关系">
        <el-option label="子女" value="子女" />
        <el-option label="孙子女" value="孙子女" />
      </el-select>
    </el-form-item>
    <el-form-item label="是否收养" prop="ifAdopt">
      <el-radio-group v-model="memberInfo.ifAdopt">
        <el-radio label="是" />
        <el-radio label="否" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="memberInfo.gender">
        <el-radio label="男" />
        <el-radio label="女" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="出生日期" prop="birthDate">
      <el-date-picker v-model="memberInfo.birthDate" type="date" />
    </el-form-item>
    <el-form-item label="健康状况" prop="healthStatus">
      <el-select v-model="memberInfo.healthStatus" placeholder="请选择健康状况">
        <el-option label="良好" value="良好" />
        <el-option label="高龄 (大于等于80周岁)" value="高龄" />
        <el-option label="慢性病 (高血压/糖尿病/心脏病等需长期服药疾病)" value="慢性病" />
        <el-option label="失能 (依据巴氏指数评估法，进餐/穿衣/如厕等五项活动能力)" value="失能" />
      </el-select>
    </el-form-item>
    <el-form-item label="生活自理能力" prop="takecareLifeAbility">
      <el-select v-model="memberInfo.takecareLifeAbility" placeholder="请选择生活自理能力">
        <el-option label="完全自理" value="完全自理" />
        <el-option label="半自理" value="半自理" />
        <el-option label="不能自理" value="不能自理" />
      </el-select>
    </el-form-item>
    <el-form-item label="是否独居" prop="ifLivingAlone">
      <el-radio-group v-model="memberInfo.ifLivingAlone">
        <el-radio label="是" />
        <el-radio label="否" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="伤残类别" prop="disabilityType">
      <el-select v-model="memberInfo.disabilityType" placeholder="请选择伤残类别">
        <el-option label="无" value="无" />
        <el-option label="肢体" value="肢体" />
        <el-option label="视力" value="视力" />
        <el-option label="听力" value="听力" />
        <el-option label="精神" value="精神" />
      </el-select>
    </el-form-item>
    <el-form-item label="伤残级别" prop="disabilityLevel" v-if="memberInfo.disabilityType =='肢体'|| memberInfo.disabilityType =='精神'">
      <el-select v-model="memberInfo.disabilityLevel" >
        <el-option label="无" value="无" />
                    <el-option v-if="memberInfo.disabilityType=='肢体'" label="一级 (四肢瘫/截瘫/偏瘫等，完全丧失活动能力)" value="一级" />
                    <el-option v-if="memberInfo.disabilityType=='肢体'" label="二级 (保留部分功能，无法独立行走)" value="二级" />
                    <el-option v-if="memberInfo.disabilityType=='肢体'" label="三级 (部分功能保留，需辅助器具)" value="三级" />
                    <el-option v-if="memberInfo.disabilityType=='肢体'" label="四级 (轻度功能障碍，如脊柱测凸<45°)" value="四级" />
                    <el-option v-if="memberInfo.disabilityType=='精神'" label="一级 (完全无法参与社会活动)" value="一级" />
                    <el-option v-if="memberInfo.disabilityType=='精神'" label="二级 (严重受限，需全天监护)" value="二级" />
                    <el-option v-if="memberInfo.disabilityType=='精神'" label="三级 (部分受限，需间歇支持)" value="三级" />
      </el-select>
    </el-form-item>
    <el-form-item label="医疗依赖" prop="medicalDependence">
      <el-select placeholder="请选择医疗依赖类型" v-model="memberInfo.medicalDependence">
        <el-option label="完全依赖护理 (需全天候照护)" value="完全依赖护理" />
        <el-option label="重度依赖 (需部分协助)" value="重度依赖" />
        <el-option label="轻度依赖 (需少量帮助)" value="轻度依赖" />
        <el-option label="完全自理 (仅需监护)" value="完全自理" />
      </el-select>
    </el-form-item>
    <el-form-item label="是否有慢性病" prop="ifChronicDisease">
      <el-radio-group v-model="memberInfo.ifChronicDisease">
        <el-radio label="是" />
        <el-radio label="否" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="慢性病名称" prop="chronicDiseaseName">
      <el-input v-model="memberInfo.chronicDiseaseName" />
    </el-form-item>
    <el-form-item label="常用药物" prop="commonlyMedications">
      <el-input v-model="memberInfo.commonlyMedications" />
    </el-form-item>
    <el-form-item label="等级划分" prop="grading">
      <el-select v-model="memberInfo.grading" placeholder="请选择等级">
        <el-option label="红" value="红" />
        <el-option label="橙" value="橙" />
        <el-option label="黄" value="黄" />
        <el-option label="绿" value="绿" />
      </el-select>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="memberInfo.remark" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
export default {
    name: 'ChildGrandInfoDialog',
}
</script>

<script setup lang="ts">
import { ref, defineProps, PropType } from 'vue';
import type { EnrollChildGrandRequests } from '@/models';

const props = defineProps({
  memberInfo: {
    type: Object as PropType<EnrollChildGrandRequests>,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

// ...验证规则和其他逻辑
</script>
