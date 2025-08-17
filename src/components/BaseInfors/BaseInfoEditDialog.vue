<template>
  <el-form
    :model="itemInfo"
    :rules="rules"
    ref="itemInfoRef"
    label-position="left"
    label-width="120px"
    :disabled="disabled"
  >
    <div class="title">
      <span
        style="font-size: 20px; font-weight: bold"
        v-if="itemInfo.relation == '户主'"
        >户主基本信息</span
      >
      <span style="font-size: 20px; font-weight: bold" v-else
        >配偶基本信息</span
      >
    </div>
    <el-col class="form-item">
      <el-form-item
        label="姓名"
        prop="name"
        class="form-item"
        :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]"
      >
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
      <el-form-item
        label="身份证"
        prop="identificationNumber"
        :rules="[
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { validator: validateIdCard, trigger: 'blur' },
        ]"
      >
        <el-input
          v-model="itemInfo.identificationNumber"
          maxlength="18"
          autocomplete="off"
        />
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item
        label="户口所在地"
        prop="householdRegistLocation"
        :rules="[
          { required: true, message: '请选择户口所在地', trigger: 'change' },
        ]"
      >
        <template v-if="showHukouDisplay">
          <div style="display: flex; align-items: center; flex-wrap: nowrap">
            <span
              style="
                font-weight: bold;
                color: #3382f1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 60vw;
                display: inline-block;
              "
            >
              {{ itemInfo.householdRegistLocation }}
            </span>
            <el-button
              type="primary"
              size="small"
              style="margin-left: 16px; flex-shrink: 0"
              @click="hukouEditMode = true"
              >修改</el-button
            >
          </div>
        </template>
        <template v-else>
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 8px;
              flex-wrap: nowrap;
            "
          >
            <el-select
              v-model="hukouProvince"
              placeholder="省"
              style="width: 120px"
              @change="onHukouProvinceChange"
            >
              <el-option
                v-for="item in provinceOptions"
                :key="item.id"
                :label="item.fullname"
                :value="item.fullname"
              />
            </el-select>
            <el-select
              v-model="hukouCity"
              placeholder="市"
              style="width: 120px"
              @change="onHukouCityChange"
            >
              <el-option
                v-for="item in cityOptions"
                :key="item.id"
                :label="item.fullname"
                :value="item.fullname"
              />
            </el-select>
            <el-select
              v-model="hukouDistrict"
              placeholder="区/县"
              style="width: 120px"
              @change="onHukouDistrictChange"
            >
              <el-option
                v-for="item in districtOptions"
                :key="item.id"
                :label="item.fullname"
                :value="item.fullname"
              />
            </el-select>
            <el-select
              v-model="hukouStreet"
              placeholder="街道/乡镇"
              style="width: 120px"
            >
              <el-option
                v-for="item in streetOptions"
                :key="item.id"
                :label="item.fullname"
                :value="item.fullname"
              />
            </el-select>
            <el-input
              v-model="hukouDetail"
              placeholder="详细地址"
              style="width: 160px"
            />
            <template v-if="itemInfo.householdRegistLocation && !isNewHukou">
              <el-button type="primary" size="small" @click="confirmHukouEdit"
                >确定</el-button
              >
              <el-button size="small" @click="cancelHukouEdit">取消</el-button>
            </template>
          </div>
        </template>
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item
        label="现住址"
        prop="currentPlace"
        :rules="[
          { required: true, message: '请选择现住址', trigger: 'change' },
        ]"
      >
        <template v-if="showCurrentDisplay">
          <div style="display: flex; align-items: center; flex-wrap: nowrap">
            <span
              style="
                font-weight: bold;
                color: #3382f1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 60vw;
                display: inline-block;
              "
            >
              {{ itemInfo.currentPlace }}
            </span>
            <el-button
              type="primary"
              size="small"
              style="margin-left: 16px; flex-shrink: 0"
              @click="currentEditMode = true"
              >修改</el-button
            >
          </div>
        </template>
        <template v-else>
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 8px;
              flex-wrap: nowrap;
            "
          >
            <el-select
              v-model="currentProvince"
              placeholder="省"
              style="width: 120px"
              @change="onCurrentProvinceChange"
            >
              <el-option
                v-for="item in provinceOptions"
                :key="item.id"
                :label="item.fullname"
                :value="item.fullname"
              />
            </el-select>
            <el-select
              v-model="currentCity"
              placeholder="市"
              style="width: 120px"
              @change="onCurrentCityChange"
            >
              <el-option
                v-for="item in cityOptions"
                :key="item.id"
                :label="item.fullname"
                :value="item.fullname"
              />
            </el-select>
            <el-select
              v-model="currentDistrict"
              placeholder="区/县"
              style="width: 120px"
              @change="onCurrentDistrictChange"
            >
              <el-option
                v-for="item in districtOptions"
                :key="item.id"
                :label="item.fullname"
                :value="item.fullname"
              />
            </el-select>
            <el-select
              v-model="currentStreet"
              placeholder="街道/乡镇"
              style="width: 120px"
            >
              <el-option
                v-for="item in streetOptions"
                :key="item.id"
                :label="item.fullname"
                :value="item.fullname"
              />
            </el-select>
            <el-input
              v-model="currentDetail"
              placeholder="详细地址"
              style="width: 160px"
            />
            <template v-if="itemInfo.currentPlace && !isNewCurrent">
              <el-button type="primary" size="small" @click="confirmCurrentEdit"
                >确定</el-button
              >
              <el-button size="small" @click="cancelCurrentEdit"
                >取消</el-button
              >
            </template>
          </div>
        </template>
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item
        label="性别"
        prop="gender"
        :rules="[{ required: true, message: '请选择性别', trigger: 'change' }]"
      >
        <el-radio-group v-model="itemInfo.gender">
          <el-radio label="男" value="男">男</el-radio>
          <el-radio label="女" value="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="出生年月" prop="birthDate">
        <el-date-picker
          v-model="itemInfo.birthDate"
          type="date"
          placeholder="选择日期"
          style="width: 100%"
        />
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="民族" prop="ethnicity">
        <el-input
          v-model="itemInfo.ethnicity"
          placeholder="请输入民族"
          autocomplete="off"
        />
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
        <el-select
          v-model="itemInfo.politicalAffiliation"
          placeholder="请选择政治面貌"
        >
          <el-option label="中共党员" value="中共党员" />
          <el-option label="民主党派" value="民主党派" />
          <el-option label="共青团员" value="共青团员" />
          <el-option label="群众" value="群众" />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="婚姻情况" prop="maritalStatus">
        <el-select
          v-model="itemInfo.maritalStatus"
          placeholder="请选择婚姻情况"
        >
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
        <el-select
          v-model="itemInfo.educationLevel"
          placeholder="请选择文化程度"
        >
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
      <el-form-item
        label="电话"
        prop="phoneNumber"
        :rules="[{ required: true, message: '请输入电话', trigger: 'blur' }]"
      >
        <el-input v-model="itemInfo.phoneNumber" autocomplete="off" />
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="行政区划" prop="administrativeDivision">
        <el-input
          v-model="itemInfo.administrativeDivision"
          autocomplete="off"
        />
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="备注" prop="remark">
        <el-input v-model="itemInfo.remark" autocomplete="off" />
      </el-form-item>
    </el-col>

    <div class="title">工作状况</div>
    <el-col class="form-item">
      <el-form-item label="单位学校" prop="employSchool">
        <el-input v-model="itemInfo.employerSchool" autocomplete="off" />
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="工作情况" prop="employmentStatus">
        <el-select
          v-model="itemInfo.employmentStatus"
          placeholder="请选择工作情况"
        >
          <el-option label="务工" value="务工" />
          <el-option label="单位职工" value="单位职工" />
          <el-option label="零工" value="零工" />
          <el-option label="已退休" value="已退休" />
          <el-option label="无劳动力" value="无劳动力" />
        </el-select>
      </el-form-item>
    </el-col>

    <div class="title">健康状况</div>
    <el-col class="form-item">
      <el-form-item label="血型" prop="bloodType">
        <el-select
          v-model="itemInfo.healthInformationRequest.bloodType"
          placeholder="请选择血型"
        >
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
        <el-radio-group
          v-model="itemInfo.healthInformationRequest.limbMobility"
        >
          <el-radio label="自如" value="自如">自如</el-radio>
          <el-radio label="不便" value="不便">不便</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="既往病史" prop="medicalHistory">
        <el-input
          placeholder="请填写既往病史"
          v-model="itemInfo.healthInformationRequest.medicalHistory"
          autocomplete="off"
        />
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="建档时疾病" prop="bloodType">
        <el-input
          v-model="itemInfo.healthInformationRequest.recordDisease"
          autocomplete="off"
        />
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="是否长期用药" prop="isLongTermMedication">
        <el-radio-group
          v-model="itemInfo.healthInformationRequest.isLongTermMedication"
        >
          <el-radio label="是" value="是">是</el-radio>
          <el-radio label="否" value="否">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="重大疾病" prop="majorDisease">
        <el-input
          placeholder="请填写建档时重大疾病"
          v-model="itemInfo.healthInformationRequest.majorDiseases"
          autocomplete="off"
        />
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="健康状况" prop="healthStatus">
        <el-select
          v-model="itemInfo.healthInformationRequest.healthStatus"
          placeholder="请选择健康状况"
        >
          <el-option label="良好" value="良好" />
          <el-option label="高龄 (大于等于80周岁)" value="高龄" />
          <el-option
            label="慢性病 (高血压/糖尿病/心脏病等需长期服药疾病)"
            value="慢性病"
          />
          <el-option label="失能" value="失能" />
          <el-option label="逝世" value="逝世" />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="伤残类别" prop="disabilityType">
        <el-select
          v-model="itemInfo.healthInformationRequest.disabilityType"
          placeholder="请选择伤残类别"
        >
          <el-option label="无" value="无" />
          <el-option label="肢体" value="肢体" />
          <el-option label="视力" value="视力" />
          <el-option label="听力" value="听力" />
          <el-option label="精神" value="精神" />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col
      class="form-item"
      v-if="
        itemInfo.healthInformationRequest.disabilityType == '肢体' ||
        itemInfo.healthInformationRequest.disabilityType == '精神'
      "
    >
      <el-form-item label="伤残级别" prop="disabilityLevel">
        <el-select
          v-model="itemInfo.healthInformationRequest.disabilityLevel"
          placeholder="请选择伤残级别"
        >
          <el-option label="无" value="无" />
          <el-option
            v-if="itemInfo.healthInformationRequest.disabilityType == '肢体'"
            label="一级 (四肢瘫/截瘫/偏瘫等，完全丧失活动能力)"
            value="一级"
          />
          <el-option
            v-if="itemInfo.healthInformationRequest.disabilityType == '肢体'"
            label="二级 (保留部分功能，无法独立行走)"
            value="二级"
          />
          <el-option
            v-if="itemInfo.healthInformationRequest.disabilityType == '肢体'"
            label="三级 (部分功能保留，需辅助器具)"
            value="三级"
          />
          <el-option
            v-if="itemInfo.healthInformationRequest.disabilityType == '肢体'"
            label="四级 (轻度功能障碍，如脊柱测凸<45°)"
            value="四级"
          />
          <el-option
            v-if="itemInfo.healthInformationRequest.disabilityType == '精神'"
            label="一级 (完全无法参与社会活动)"
            value="一级"
          />
          <el-option
            v-if="itemInfo.healthInformationRequest.disabilityType == '精神'"
            label="二级 (严重受限，需全天监护)"
            value="二级"
          />
          <el-option
            v-if="itemInfo.healthInformationRequest.disabilityType == '精神'"
            label="三级 (部分受限，需间歇支持)"
            value="三级"
          />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="等级划分" prop="grading">
        <el-select
          v-model="itemInfo.grading"
          disabled
          placeholder="请进行评级判定"
        >
          <el-option label="红" value="红" />
          <el-option label="橙" value="橙" />
          <el-option label="黄" value="黄" />
          <el-option label="绿" value="绿" />
        </el-select>
        <el-button
          type="success"
          style="margin-top: 5px"
          @click="openGradeDialog"
          >进行评级判断</el-button
        >
      </el-form-item>
    </el-col>
    <el-dialog
      v-model="isGradeDialogVisible"
      width="50%"
      :destroy-on-close="true"
    >
      <GradeJudge @gradeEvaluated="updateGrading" />
    </el-dialog>

    <el-col class="form-item">
      <el-form-item label="备注" prop="healthRemark">
        <el-input
          v-model="itemInfo.healthInformationRequest.remark"
          autocomplete="off"
        />
      </el-form-item>
    </el-col>

    <div class="title">社会保障</div>
    <el-col class="form-item">
      <el-form-item label="医疗" prop="medicalInsurance">
        <el-input
          placeholder="填写医疗"
          v-model="itemInfo.socialSecurityRequest.medicalInsurance"
          autocomplete="off"
        />
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="养老" prop="pensionInsurance">
        <el-input
          placeholder="填写养老"
          v-model="itemInfo.socialSecurityRequest.pensionInsurance"
          autocomplete="off"
        />
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="住房" prop="housingFund">
        <el-input
          placeholder="填写住房"
          v-model="itemInfo.socialSecurityRequest.housingFund"
          autocomplete="off"
        />
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="低保" prop="lowIncomeSupport">
        <el-input
          placeholder="填写低保"
          v-model="itemInfo.socialSecurityRequest.lowIncomeSupport"
          autocomplete="off"
        />
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="保险" prop="insurance">
        <el-input
          placeholder="填写保险"
          v-model="itemInfo.socialSecurityRequest.insurance"
          autocomplete="off"
        />
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="五保" prop="fiveGuaranteesSupport">
        <el-input
          placeholder="填写五保"
          v-model="itemInfo.socialSecurityRequest.fiveGuaranteesSupport"
          autocomplete="off"
        />
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="其他保障" prop="otherBenefits">
        <el-input
          placeholder="填写其他保障"
          v-model="itemInfo.socialSecurityRequest.otherBenefits"
          autocomplete="off"
        />
      </el-form-item>
    </el-col>
    <el-col class="form-item">
      <el-form-item label="就业扶持" prop="employmentSupport">
        <el-input
          placeholder="填写就业扶持"
          v-model="itemInfo.socialSecurityRequest.employmentSupport"
          autocomplete="off"
        />
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
  name: "BaseInfoEditDialog",
};
</script>

<script setup lang="ts">
import { PropType, ref, watch, onMounted, computed } from "vue";
import { EnrollHouseHoldSpouseRequests } from "@/models";
import { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import GradeJudge from "@/components/BaseInfors/GradeJudge.vue";
import { jsonp } from "vue-jsonp";

const props = defineProps({
  itemInfo: {
    type: Object as PropType<EnrollHouseHoldSpouseRequests>,
    required: true,
  },
  rules: {
    type: Object,
    required: true,
  },
  state: {
    type: Object as PropType<Boolean>,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

//当前组件的值发生变化时，校验表单并更新父组件的值
watch(
  () => props.itemInfo,
  (newVal) => {
    validateForm();
    emit("update:itemInfo", newVal);
  },
  { deep: true }
);

//表单校验函数
const validateForm = async () => {
  const form = itemInfoRef.value as FormInstance;
  form.validate((valid) => {
    if (valid) {
      console.log("表单校验成功");
      emit("update:state", true);
    } else {
      emit("update:state", false);
      console.log("表单校验失败");
    }
  });
};

// 照片上传前的校验
const beforePhotoUpload = (file: File) => {
  const isImage = file.type.startsWith("image/");
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isImage) {
    ElMessage.error("上传的文件必须是图片!");
  }
  if (!isLt2M) {
    ElMessage.error("上传的图片大小不能超过 2MB!");
  }
  return isImage && isLt2M;
};

const itemInfoRef = ref<FormInstance>();
const emit = defineEmits(["update:itemInfo", "update:state"]);

const isGradeDialogVisible = ref(false);

const openGradeDialog = () => {
  isGradeDialogVisible.value = true;
};

const updateGrading = (grade: string) => {
  props.itemInfo.grading = grade;
  setTimeout(() => {
    isGradeDialogVisible.value = false;
  }, 1000);
};

// 行政区划选择相关
const provinceOptions = ref<any[]>([]);
const cityOptions = ref<any[]>([]);
const districtOptions = ref<any[]>([]);
const streetOptions = ref<any[]>([]);

// 户口所在地选择
const hukouProvince = ref("");
const hukouCity = ref("");
const hukouDistrict = ref("");
const hukouStreet = ref("");
const hukouDetail = ref("");

// 现住址选择
const currentProvince = ref("");
const currentCity = ref("");
const currentDistrict = ref("");
const currentStreet = ref("");
const currentDetail = ref("");

const MUNICIPALITIES = ["110000", "120000", "310000", "500000"];

const loadProvinces = async () => {
  const cachedProvinces = localStorage.getItem("area_provinces");
  if (cachedProvinces) {
    provinceOptions.value = JSON.parse(cachedProvinces);
  } else {
    // 使用 jsonp 获取省份数据
    const res = await jsonp("https://apis.map.qq.com/ws/district/v1/list", {
      key: "LXLBZ-HP66Q-PYL5K-B74JY-IFTMK-RYFV2",
      output: "jsonp",
    });
    if (res.status === 0) {
      provinceOptions.value = res.result[0];
      localStorage.setItem("area_provinces", JSON.stringify(res.result[0]));
    }
  }
};

const loadCities = async (provinceName: string) => {
  const cachedCities = localStorage.getItem("area_cities");
  let provinceId = "";
  const cachedProvinces = localStorage.getItem("area_provinces");
  if (cachedProvinces) {
    const arr = JSON.parse(cachedProvinces);
    const found = arr.find((p: any) => p.fullname === provinceName);
    if (found) provinceId = found.id;
  }
  if (provinceId) {
    if (cachedCities) {
      const citiesObj = JSON.parse(cachedCities);
      if (citiesObj[provinceId]) {
        cityOptions.value = citiesObj[provinceId];
        return;
      }
    }
    // 直辖市特殊处理
    if (MUNICIPALITIES.includes(provinceId)) {
      cityOptions.value = [];
      await loadDistrictsByProvince(provinceId);
    } else {
      const res = await jsonp(
        "https://apis.map.qq.com/ws/district/v1/getchildren",
        {
          key: "LXLBZ-HP66Q-PYL5K-B74JY-IFTMK-RYFV2",
          id: provinceId,
          output: "jsonp",
        }
      );
      if (res.status === 0) {
        cityOptions.value = res.result[0];
        let citiesObj = {};
        if (cachedCities) citiesObj = JSON.parse(cachedCities);
        citiesObj[provinceId] = res.result[0];
        localStorage.setItem("area_cities", JSON.stringify(citiesObj));
      }
    }
  } else {
    cityOptions.value = [];
  }
};

const loadDistricts = async (cityName: string) => {
  const cachedDistricts = localStorage.getItem("area_districts");
  let cityId = "";
  if (cityOptions.value && cityOptions.value.length) {
    const found = cityOptions.value.find((c: any) => c.fullname === cityName);
    if (found) cityId = found.id;
  }
  if (cityId) {
    if (cachedDistricts) {
      const districtsObj = JSON.parse(cachedDistricts);
      if (districtsObj[cityId]) {
        districtOptions.value = districtsObj[cityId];
        return;
      }
    }
    const res = await jsonp(
      "https://apis.map.qq.com/ws/district/v1/getchildren",
      {
        key: "LXLBZ-HP66Q-PYL5K-B74JY-IFTMK-RYFV2",
        id: cityId,
        output: "jsonp",
      }
    );
    if (res.status === 0) {
      districtOptions.value = res.result[0];
      let districtsObj = {};
      if (cachedDistricts) districtsObj = JSON.parse(cachedDistricts);
      districtsObj[cityId] = res.result[0];
      localStorage.setItem("area_districts", JSON.stringify(districtsObj));
    }
  } else {
    // 直辖市时，districtOptions 已由 loadDistrictsByProvince 加载，无需处理
  }
};

// 直辖市直接查区县
const loadDistrictsByProvince = async (provinceId: string) => {
  const cachedDistricts = localStorage.getItem("area_districts");
  if (cachedDistricts) {
    const districtsObj = JSON.parse(cachedDistricts);
    if (districtsObj[provinceId]) {
      districtOptions.value = districtsObj[provinceId];
      return;
    }
  }
  const res = await jsonp(
    "https://apis.map.qq.com/ws/district/v1/getchildren",
    {
      key: "LXLBZ-HP66Q-PYL5K-B74JY-IFTMK-RYFV2",
      id: provinceId,
      output: "jsonp",
    }
  );
  if (res.status === 0) {
    districtOptions.value = res.result[0];
    let districtsObj = {};
    if (cachedDistricts) districtsObj = JSON.parse(cachedDistricts);
    districtsObj[provinceId] = res.result[0];
    localStorage.setItem("area_districts", JSON.stringify(districtsObj));
  }
};

const loadStreets = async (districtName: string) => {
  const cachedStreets = localStorage.getItem("area_streets");
  let districtId = "";
  if (districtOptions.value && districtOptions.value.length) {
    const found = districtOptions.value.find(
      (d: any) => d.fullname === districtName
    );
    if (found) districtId = found.id;
  }
  if (districtId) {
    if (cachedStreets) {
      const streetsObj = JSON.parse(cachedStreets);
      if (streetsObj[districtId]) {
        streetOptions.value = streetsObj[districtId];
        return;
      }
    }
    const res = await jsonp(
      "https://apis.map.qq.com/ws/district/v1/getchildren",
      {
        key: "LXLBZ-HP66Q-PYL5K-B74JY-IFTMK-RYFV2",
        id: districtId,
        output: "jsonp",
      }
    );
    if (res.status === 0) {
      streetOptions.value = res.result[0];
      let streetsObj = {};
      if (cachedStreets) streetsObj = JSON.parse(cachedStreets);
      streetsObj[districtId] = res.result[0];
      localStorage.setItem("area_streets", JSON.stringify(streetsObj));
    }
  } else {
    streetOptions.value = [];
  }
};

// 户口所在地选择事件
const onHukouProvinceChange = (val: string) => {
  hukouCity.value = "";
  hukouDistrict.value = "";
  hukouStreet.value = "";
  loadCities(val);
};
const onHukouCityChange = (val: string) => {
  hukouDistrict.value = "";
  hukouStreet.value = "";
  loadDistricts(val);
};
const onHukouDistrictChange = (val: string) => {
  hukouStreet.value = "";
  loadStreets(val);
};

// 现住址选择事件
const onCurrentProvinceChange = (val: string) => {
  currentCity.value = "";
  currentDistrict.value = "";
  currentStreet.value = "";
  loadCities(val);
};
const onCurrentCityChange = (val: string) => {
  currentDistrict.value = "";
  currentStreet.value = "";
  loadDistricts(val);
};
const onCurrentDistrictChange = (val: string) => {
  currentStreet.value = "";
  loadStreets(val);
};

// 拼接并同步到itemInfo
watch(
  [hukouProvince, hukouCity, hukouDistrict, hukouStreet, hukouDetail],
  () => {
    const arr = [
      hukouProvince.value,
      hukouCity.value,
      hukouDistrict.value,
      hukouStreet.value,
      hukouDetail.value,
    ].filter(Boolean);
    props.itemInfo.householdRegistLocation = arr.join(",");
  }
);
watch(
  [currentProvince, currentCity, currentDistrict, currentStreet, currentDetail],
  () => {
    const arr = [
      currentProvince.value,
      currentCity.value,
      currentDistrict.value,
      currentStreet.value,
      currentDetail.value,
    ].filter(Boolean);
    props.itemInfo.currentPlace = arr.join(",");
  }
);

// 初始化行政区划选项
onMounted(() => {
  loadProvinces();
  // 如果itemInfo已有值，进行反向赋值
  if (props.itemInfo.householdRegistLocation) {
    const arr = props.itemInfo.householdRegistLocation.split(",");
    hukouProvince.value = arr[0] || "";
    hukouCity.value = arr[1] || "";
    hukouDistrict.value = arr[2] || "";
    hukouStreet.value = arr[3] || "";
    hukouDetail.value = arr.slice(4).join(",") || "";
    loadCities(hukouProvince.value);
    loadDistricts(hukouCity.value);
    loadStreets(hukouDistrict.value);
  }
  if (props.itemInfo.currentPlace) {
    const arr = props.itemInfo.currentPlace.split(",");
    currentProvince.value = arr[0] || "";
    currentCity.value = arr[1] || "";
    currentDistrict.value = arr[2] || "";
    currentStreet.value = arr[3] || "";
    currentDetail.value = arr.slice(4).join(",") || "";
    loadCities(currentProvince.value);
    loadDistricts(currentCity.value);
    loadStreets(currentDistrict.value);
  }
});

// 新增/编辑状态判断（需响应式，且在内容变化时自动更新）
// 新增时，isNewHukou/isNewCurrent 一直为 true，直到用户点击“确定”按钮才变为 false
const isNewHukou = ref(!props.itemInfo.householdRegistLocation);
const isNewCurrent = ref(!props.itemInfo.currentPlace);

const hukouEditMode = ref(false);
const currentEditMode = ref(false);

const showHukouDisplay = computed(() => {
  return !isNewHukou.value && !hukouEditMode.value;
});
const showCurrentDisplay = computed(() => {
  return !isNewCurrent.value && !currentEditMode.value;
});

const confirmHukouEdit = () => {
  hukouEditMode.value = false;
  isNewHukou.value = false; // 用户点击确定才切换为“编辑”模式
};
const cancelHukouEdit = () => {
  hukouEditMode.value = false;
  // 恢复原值
  if (props.itemInfo.householdRegistLocation) {
    const arr = props.itemInfo.householdRegistLocation.split(",");
    hukouProvince.value = arr[0] || "";
    hukouCity.value = arr[1] || "";
    hukouDistrict.value = arr[2] || "";
    hukouStreet.value = arr[3] || "";
    hukouDetail.value = arr.slice(4).join(",") || "";
  }
};

const confirmCurrentEdit = () => {
  currentEditMode.value = false;
  isNewCurrent.value = false; // 用户点击确定才切换为“编辑”模式
};
const cancelCurrentEdit = () => {
  currentEditMode.value = false;
  // 恢复原值
  if (props.itemInfo.currentPlace) {
    const arr = props.itemInfo.currentPlace.split(",");
    currentProvince.value = arr[0] || "";
    currentCity.value = arr[1] || "";
    currentDistrict.value = arr[2] || "";
    currentStreet.value = arr[3] || "";
    currentDetail.value = arr.slice(4).join(",") || "";
  }
};

// 保证在外部传入的itemInfo变化时，isNewHukou/isNewCurrent能同步
watch(
  () => props.itemInfo.householdRegistLocation,
  (val) => {
    if (!val) isNewHukou.value = true;
  }
);
watch(
  () => props.itemInfo.currentPlace,
  (val) => {
    if (!val) isNewCurrent.value = true;
  }
);
</script>

<style scoped>
:deep(.el-select) {
  width: 25vw !important; /* 让输入框占满表单项宽度 */
}
:deep(.el-dialog) {
  margin-top: -50% !important;
  width: 80vh !important;
}
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  color: #3382f1;
  border-bottom: dashed 1px #c8c8ff;
  padding-bottom: 3px;
}
:deep(.el-col) {
  width: 75%; /* 让输入框占满表单项宽度 */
  margin-left: 12.5%;
  margin-right: 12.5%;
}
/* 修改输入框样式 */
:deep(.el-input) {
  width: 25vw !important; /* 让输入框占满表单项宽度 */
}

/* 保持标签文字加粗 */
:deep(.el-form-item__label) {
  font-weight: 600 !important;
  min-width: 120px; /* 确保标签有固定宽度 */
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
  width: 300px;
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
  width: 100px;
  height: 100px;
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
