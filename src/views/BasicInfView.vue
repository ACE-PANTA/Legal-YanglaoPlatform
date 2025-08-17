<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref, computed, watch } from "vue";
import { ElMessage, ElMessageBox, type FormRules } from "element-plus";
import { jsonp } from "vue-jsonp";
import {
  GetOneFamilyWithUid,
  GetBaseInfoList,
  AddBaseInfo,
  UpdateBaseInfo,
  DeleteBaseInfo,
  getFamilyDetail,
  GetTempFamilyInfo,
  UpdateRegionInfo
} from "@/api/family";
import {
  BasicInfTemplate,
  EnrollChildGrandRequest,
  EnrollHouseHoldSpouseRequests,
} from "@/models";
import BaseInfoEditDialog from "@/components/BaseInfors/BaseInfoEditDialog.vue";
import FamilyEditDialog from "@/components/BaseInfors/FamilyEditDialog.vue";
import ChildGrandInfoDialog from "@/components/BaseInfors/ChildGrandInfoDialog.vue";
import DetailShowDialog from "@/components/BaseInfors/DetailShowDialog.vue";
import { useMainStore } from "@/store";
import VisitRecord from "@/components/BaseInfors/VisitRecord.vue";
import axios from "axios";
import { Loading } from "@element-plus/icons-vue";
import ExportVisitDialog from "@/components/Exports/ExportVisitDialog.vue";
import ExportFamilyFilterDialog from "@/components/Exports/ExportFamilyFilterDialog.vue";
import { exportFamilyExcel, exportPeopleExcel, exportChildExcel } from "@/api/visit";
import AreaSelector from '@/components/Common/AreaSelector.vue'

const formData = ref<Array<BasicInfTemplate>>([]);
const total = ref(0); // 新增：总条数

const localPermission = ref("");

const role = ref("");

const searchLabel = ref("姓名");

const searchValue = ref("");
const selectedRegion = ref({
  provinceId: "88888888",
  provinceName: "全部",
  cityId: "88888888",
  cityName: "全部",
  districtId: "88888888",
  districtName: "全部",
  streetId: "88888888",
  streetName: "全部"
});

const checkVisitVisible = ref(false);

const checkingFamily = ref({});

const provinces = ref([]);
const cities = ref([]);
const districts = ref([]);
const streets = ref([]);

const areaCache = reactive({
  provinces: [],
  cities: {},
  districts: {},
  streets: {},
});

const ALL_OPTION = { id: "88888888", fullname: "全部" };
const MUNICIPALITIES = ["110000", "120000", "310000", "500000"];

const loadCacheData = async () => {
  try {
    const cachedProvinces = localStorage.getItem("area_provinces");
    const cachedCities = localStorage.getItem("area_cities");
    const cachedDistricts = localStorage.getItem("area_districts");

    if (cachedProvinces) {
      areaCache.provinces = JSON.parse(cachedProvinces);
      provinces.value = addDefaultOption(areaCache.provinces);
    } else {
      await getProvinces(); // 如果缓存不存在，发送请求获取数据
    }

    if (cachedCities) {
      areaCache.cities = JSON.parse(cachedCities);
    }

    if (cachedDistricts) {
      areaCache.districts = JSON.parse(cachedDistricts);
    }
  } catch (error) {
    await getProvinces(); // 如果加载失败，发送请求获取数据
  }
};

const saveCacheData = () => {
  try {
    localStorage.setItem("area_provinces", JSON.stringify(areaCache.provinces));
    localStorage.setItem("area_cities", JSON.stringify(areaCache.cities));
    localStorage.setItem("area_districts", JSON.stringify(areaCache.districts));
  } catch (error) {
    console.error("保存缓存数据失败:", error);
  }
};

const addDefaultOption = (list) => [
  { id: "88888888", fullname: "全部" },
  ...list,
];

const getProvinces = async () => {
  try {
    const res = await jsonp("https://apis.map.qq.com/ws/district/v1/list", {
      key: "LXLBZ-HP66Q-PYL5K-B74JY-IFTMK-RYFV2",
      output: "jsonp",
    });
    if (res.status === 0) {
      areaCache.provinces = res.result[0];
      provinces.value = addDefaultOption(areaCache.provinces);
      saveCacheData();
    }
  } catch (error) {
    ElMessage.error("获取省份数据失败");
  }
};




const dialogEditVisible = ref(false);
const dialogAddVisible = ref(false);
const dialogDetailVisible = ref(false);
const passed = ref(false);

const itemInfo = ref<BasicInfTemplate>({
  grading: "",
  annualIncome: "",
  annualExpenditure: "",
  provinceId: "",
  provinceName: "",
  municipalityId: "",
  municipalityName: "",
  districtId: "",
  districtName: "",
  townshipStreetsId: "",
  townshipStreetsName: "",
  Remark: "",
  ListEnrollHouseHoldSpouseRequest: [],
  ListEnrollChildGrandRequest: [],
});

const editInfo = ref<any>({});

const editHostInfo = ref<any>({
  relation: "户主",
  name: "",
  photo: "",
  identificationNumber: "",
  householdRegistLocation: "",
  gender: "",
  birthDate: "",
  ethnicity: "",
  region: "",
  politicalAffiliation: "",
  maritalStatus: "",
  educationLevel: "",
  phoneNumber: "",
  administrativeDivision: "",
  employerSchool: "",
  employmentStatus: "",
  remark: "",
  grading: "",
  healthInformationRequest: {
    bloodType: "",
    limbMobility: "",
    limbDisability: "",
    medicalHistory: "",
    recordDisease: "",
    isLongTermMedication: "",
    majorDiseases: "",
    healthStatus: "",
    disabilityLevel: "无",
    disabilityType: "",
    remark: "",
  },
  socialSecurityRequest: {
    medicalInsurance: "",
    pensionInsurance: "",
    housingFund: "",
    lowIncomeSupport: "",
    insurance: "",
    fiveGuaranteesSupport: "",
    otherBenefits: "",
    employmentSupport: "",
  },
});

const editSpouseInfo = ref<any>({
  relation: "配偶",
  name: "",
  photo: "",
  identificationNumber: "",
  householdRegistLocation: "",
  gender: "",
  birthDate: "",
  ethnicity: "",
  region: "",
  politicalAffiliation: "",
  maritalStatus: "",
  educationLevel: "",
  phoneNumber: "",
  administrativeDivision: "",
  employerSchool: "",
  employmentStatus: "",
  remark: "",
  grading: "",
  healthInformationRequest: {
    bloodType: "",
    limbMobility: "",
    limbDisability: "",
    medicalHistory: "",
    recordDisease: "",
    isLongTermMedication: "",
    majorDiseases: "",
    healthStatus: "",
    disabilityLevel: "无",
    disabilityType: "",
    remark: "",
  },
  socialSecurityRequest: {
    medicalInsurance: "",
    pensionInsurance: "",
    housingFund: "",
    lowIncomeSupport: "",
    insurance: "",
    fiveGuaranteesSupport: "",
    otherBenefits: "",
    employmentSupport: "",
  },
});

const detailInfo = ref();

// 表单验证规则
const rules = reactive<FormRules<BasicInfTemplate>>({
  // grading: [{ required: true, message: '请输入分级', trigger: 'blur' }],
  // annualIncome: [{ required: true, message: '请输入年收入', trigger: 'blur' }],
  // annualExpenditure: [{ required: true, message: '请输入年支出', trigger: 'blur' }]
});

const exportData = () => {
  console.log("导出数据");
};

const search = () => {
  const query = {
    PageIndex: getForm.pagenumber,
    PageSize: getForm.pageSize,
    HouseHoldName: searchLabel.value === "姓名" ? searchValue.value : "",
    IdentificationNumber:
      searchLabel.value === "身份证" ? searchValue.value : "",
    ProvinceId: selectedRegion.value.provinceId,
    MunicipalityId: selectedRegion.value.cityId,
    DistrictId: selectedRegion.value.districtId,
    TownshipStreetsId: selectedRegion.value.streetId,
  }
  GetBaseInfoList(query, localStorage.getItem("UserRole")).then((res) => {
    if (res.status === 200) {
      formData.value = res.data.data
      total.value = res.data.total || 0
    }
  })
};

const getForm = reactive({
  pagenumber: 1,
  pageSize: 10,
});

const getBaseInfoList = () => {
  GetBaseInfoList(getForm, localStorage.getItem("UserRole")).then((res) => {
    if (res.status === 200) {
      formData.value = res.data.data;
      total.value = res.data.total || 0; // 绑定total
    }
  });
};

// 添加基本信息：验证后新增数据
const add = async () => {
  itemInfo.value.ListEnrollHouseHoldSpouseRequest = [];
  itemInfo.value.ListEnrollHouseHoldSpouseRequest.push(hostInfo.value);
  // 只有已婚才添加配偶
  if (showSpouseTab.value && houseHoldInfo.value.name !== "") {
    itemInfo.value.ListEnrollHouseHoldSpouseRequest.push(houseHoldInfo.value);
  }
  AddBaseInfo(itemInfo.value)
    .then((res) => {
      if (res.status === 200) {
        ElMessage.success("添加成功");
        getBaseInfoList();
        dialogAddVisible.value = false;
      }
    })
    .catch((err) => {
      if (err.status == 400) {
        console.error(err);
        ElMessage.error("字段填写不全，请仔细检查！");
      }
    });
  activeTab.value = "baseInfo";
};

const confirmEdit = async () => {
  let sendInfo;
  sendInfo = editInfo.value;
  sendInfo.ListEnrollHouseHoldSpouseRequest = null;
  editHostInfo.value.UpdateHealthInformationRequest =
    editHostInfo.value.healthInformation;
  editHostInfo.value.healthInformationRequest = null;
  editHostInfo.value.UpdateSocialSecurityRequest =
    editHostInfo.value.socialSecurityRequest;
  editHostInfo.value.socialSecurityRequest = null;
  sendInfo.ListUpdateHouseHoldSpouseRequest = [];
  sendInfo.ListUpdateHouseHoldSpouseRequest.push(editHostInfo.value);
  if (editSpouseInfo.value.name !== "") {
    editSpouseInfo.value.UpdateHealthInformationRequest =
      editSpouseInfo.value.healthInformation;
    editSpouseInfo.value.healthInformationRequest = null;
    editSpouseInfo.value.UpdateSocialSecurityRequest =
      editSpouseInfo.value.socialSecurityRequest;
    editSpouseInfo.value.socialSecurityRequest = null;
    sendInfo.ListUpdateHouseHoldSpouseRequest.push(editSpouseInfo.value);
  }
  sendInfo.ListUpdateChildGrandRequest = editInfo.value.listChildGrand;
  sendInfo.FromProvinceId = editInfo.value.ProvinceId;
  sendInfo.FromMunicipalityId = editInfo.value.MunicipalityId;
  sendInfo.FromDistrictId = editInfo.value.DistrictId;
  sendInfo.FromTownshipStreetsId = editInfo.value.TownshipStreetsId;
  sendInfo.FromProvinceName = editInfo.value.ProvinceName;
  sendInfo.FromMunicipalityName = editInfo.value.MunicipalityName;
  sendInfo.FromDistrictName = editInfo.value.DistrictName;
  sendInfo.FromTownshipStreetsName = editInfo.value.TownshipStreetsName;
  UpdateBaseInfo(sendInfo)
    .then((res) => {
      if (res.status === 200) {
        UpdateRegionInfo({
          "FamilyId": editInfo.value.uid,
          "ProvinceId": editInfo.value.ProvinceId,
          "ProvinceName": editInfo.value.ProvinceName,
          "MunicipalityId": editInfo.value.MunicipalityId,
          "MunicipalityName": editInfo.value.MunicipalityName,
          "DistrictId": editInfo.value.DistrictId,
          "DistrictName": editInfo.value.DistrictName,
          "TownshipStreetsId": editInfo.value.TownshipStreetsId,
          "TownshipStreetsName": editInfo.value.TownshipStreetsName
        })
        .then((res)=>{
          if(res.status==200)
        {
          ElMessage.success("修改成功");
          dialogAddVisible.value = false;
          activeTab.value = "baseInfo";
          getBaseInfoList();
          dialogEditVisible.value = false;
        }
          
        })
        
      }
    })
    .catch((err) => {
      if (err.status == 400) {
        console.error(err);
        ElMessage.error("字段填写不全，请仔细检查！");
      } else if (err.response) {
        ElMessage.error(err.response.data.msg);
      }
    });
};

// 打开编辑对话框
const openEditDialog = (row: any) => {
  // 先清空 editInfo，防止上次数据残留
  editInfo.value = {};
  dialogEditVisible.value = true;
  getFamilyDetail(row.uid).then((res) => {
    if (res.status == 200) {
      editInfo.value = res.data.data;

      editInfo.value.listHouseHoldSpouse.forEach((element) => {
        if (element.relation == "户主") {
          Object.assign(editHostInfo.value, element);
          Object.assign(
            editHostInfo.value.healthInformationRequest,
            element.healthInformation
          );
          Object.assign(
            editHostInfo.value.socialSecurityRequest,
            element.socialSecurityInformation
          );
        } else if (element.relation == "配偶") {
          Object.assign(editSpouseInfo.value, element);
          Object.assign(
            editSpouseInfo.value.healthInformationRequest,
            element.healthInformation
          );
          Object.assign(
            editSpouseInfo.value.socialSecurityRequest,
            element.socialSecurityInformation
          );
        }
      });
    }
  });
};

// 打开添加对话框
const openAddDialog = () => {
  initItemInfo();
  // 重置配偶信息
  houseHoldInfo.value = {
    relation: "配偶",
    name: "",
    photo: "",
    identificationNumber: "",
    householdRegistLocation: "",
    currentPlace: "",
    gender: "",
    birthDate: "",
    ethnicity: "",
    region: "",
    politicalAffiliation: "",
    maritalStatus: "",
    educationLevel: "",
    phoneNumber: "",
    administrativeDivision: "",
    employerSchool: "",
    employmentStatus: "",
    remark: "",
    grading: "",
    healthInformationRequest: {
      bloodType: "",
      limbMobility: "",
      limbDisability: "",
      medicalHistory: "",
      recordDisease: "",
      isLongTermMedication: "",
      majorDiseases: "",
      healthStatus: "",
      disabilityLevel: "无",
      disabilityType: "",
      remark: "",
    },
    socialSecurityRequest: {
      medicalInsurance: "",
      pensionInsurance: "",
      housingFund: "",
      lowIncomeSupport: "",
      insurance: "",
      fiveGuaranteesSupport: "",
      otherBenefits: "",
      employmentSupport: "",
    },
  };
  dialogAddVisible.value = true;
};

//重置/初始化iteminfo
const initItemInfo = () => {
  Object.assign(itemInfo.value, {
    grading: "",
    annualIncome: "",
    annualExpenditure: "",
    ListEnrollHouseHoldSpouseRequest: [],
    ListEnrollChildGrandRequest: [],
  });
};

const checkVisitRecord = async (row: any) => {
  checkingFamily.value = row.uid;
  checkVisitVisible.value = true;
};

// 打开详细信息对话框
const openDetailDialog = async (row: BasicInfTemplate) => {
  
  try {
    const res = await GetOneFamilyWithUid(row.uid); // 调用接口获取详情数据
    if (res.status === 200) {
      detailInfo.value = res.data.data;

      dialogDetailVisible.value = true; // 打开详情对话框
    } else {
      ElMessage.error("获取详情失败");
    }
  } catch (error) {
    ElMessage.error("获取详情失败");
  }
};

// 删除记录
const deleteRecord = (row: any) => {
  ElMessageBox.confirm("确定进行信息删除操作？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    DeleteBaseInfo(row.uid)
      .then((res) => {
        if (res.status === 200) {
          ElMessage.success("删除成功");
          getBaseInfoList();
        }
      })
      .catch((res) => {
        if (res.status == 403) {
          ElMessage.error("权限错误");
        } else {
          ElMessage.error("操作失败，请检查网络状态");
        }
      });
  });
};

onBeforeMount(() => {
  initItemInfo();
});

onMounted(async () => {
  await loadCacheData();
  selectedRegion.value = {
    ProvinceId: ALL_OPTION.id,
    MunicipalityId: "",
    DistrictId: "",
    TownshipStreetsId: "",
  };
  getBaseInfoList();
  role.value = localStorage.getItem("UserRole");
  localPermission.value =
    useMainStore().userInfo.havePermissionLevel.toString();
});

const imageUrl = ref(null);

const childDialogVisible = ref(false);
const tempChildInfo = ref<EnrollChildGrandRequest>({
  name: "",
  relation: "",
  ifAdopt: "",
  gender: "",
  birthDate: "",
  healthStatus: "",
  takecareLifeAbility: "",
  ifLivingAlone: "",
  disabilityType: "",
  disabilityLevel: "",
  medicalDependence: "",
  ifChronicDisease: "",
  chronicDiseaseName: "",
  commonlyMedications: "",
  grading: "",
  remark: "",
});

// 添加子女信息的方法
const addChild = () => {
  childDialogVisible.value = true;
};
const childEditDialogVisible = ref(false);
const addEditChild = () => {
  isChildEdit.value = false;
  childEditDialogVisible.value = true;
};

// 保存子女信息的方法
const saveChildInfo = () => {
  // 深拷贝当前临时数据
  const newChild = JSON.parse(JSON.stringify(tempChildInfo.value));
  // 添加到主表单数据中
  itemInfo.value.ListEnrollChildGrandRequest.push(newChild);
  // 重置临时数据
  tempChildInfo.value = {
    name: "",
    relation: "",
    ifAdopt: "",
    gender: "",
    birthDate: "",
    healthStatus: "",
    takecareLifeAbility: "",
    ifLivingAlone: "",
    disabilityType: "",
    disabilityLevel: "",
    medicalDependence: "",
    ifChronicDisease: "",
    chronicDiseaseName: "",
    commonlyMedications: "",
    grading: "",
    remark: "",
  };
  childDialogVisible.value = false;
};

const saveEditChildInfo = () => {
  // 深拷贝当前临时数据
  const newChild = JSON.parse(JSON.stringify(tempChildInfo.value));

  if (isChildEdit.value) {
    editInfo.value.listChildGrand[selectedChildIndex.value] = newChild;
  } else {
    editInfo.value.listChildGrand.push(newChild);
  }

  tempChildInfo.value = {
    name: "",
    relation: "",
    ifAdopt: "",
    gender: "",
    birthDate: "",
    healthStatus: "",
    takecareLifeAbility: "",
    ifLivingAlone: "",
    disabilityType: "",
    disabilityLevel: "",
    medicalDependence: "",
    ifChronicDisease: "",
    chronicDiseaseName: "",
    commonlyMedications: "",
    grading: "",
    remark: "",
  };
  isChildEdit.value = false;
  childEditDialogVisible.value = false;
};

// 删除子女信息
const removeChild = (index: number) => {
  itemInfo.value.ListEnrollChildGrandRequest.splice(index, 1);
};

const removeEditChild = (index: number) => {
  editInfo.value.listChildGrand.splice(index, 1);
};

const isChildEdit = ref(false);
const selectedChildIndex = ref(0);
const editChildInfo = (child: any, index: number) => {
  tempChildInfo.value = child;
  selectedChildIndex.value = index;
  isChildEdit.value = true;
  childEditDialogVisible.value = true;
};

// Define hostInfo to resolve the error
const hostInfo = ref<EnrollHouseHoldSpouseRequests>({
  relation: "户主",
  name: "",
  photo: "",
  identificationNumber: "",
  householdRegistLocation: "",
  currentPlace: "",
  gender: "",
  birthDate: "",
  ethnicity: "",
  region: "",
  politicalAffiliation: "",
  maritalStatus: "",
  educationLevel: "",
  phoneNumber: "",
  administrativeDivision: "",
  employerSchool: "",
  employmentStatus: "",
  remark: "",
  grading: "",
  healthInformationRequest: {
    bloodType: "",
    limbMobility: "",
    limbDisability: "",
    medicalHistory: "",
    recordDisease: "",
    isLongTermMedication: "",
    majorDiseases: "",
    healthStatus: "",
    disabilityLevel: "无",
    disabilityType: "",
    remark: "",
  },
  socialSecurityRequest: {
    medicalInsurance: "",
    pensionInsurance: "",
    housingFund: "",
    lowIncomeSupport: "",
    insurance: "",
    fiveGuaranteesSupport: "",
    otherBenefits: "",
    employmentSupport: "",
  },
});

const houseHoldInfo = ref<EnrollHouseHoldSpouseRequests>({
  relation: "配偶",
  name: "",
  photo: "",
  identificationNumber: "",
  householdRegistLocation: "",
  currentPlace: "",
  gender: "",
  birthDate: "",
  ethnicity: "",
  region: "",
  politicalAffiliation: "",
  maritalStatus: "",
  educationLevel: "",
  phoneNumber: "",
  administrativeDivision: "",
  employerSchool: "",
  employmentStatus: "",
  remark: "",
  grading: "",
  healthInformationRequest: {
    bloodType: "",
    limbMobility: "",
    limbDisability: "",
    medicalHistory: "",
    recordDisease: "",
    isLongTermMedication: "",
    majorDiseases: "",
    healthStatus: "",
    disabilityLevel: "无",
    disabilityType: "",
    remark: "",
  },
  socialSecurityRequest: {
    medicalInsurance: "",
    pensionInsurance: "",
    housingFund: "",
    lowIncomeSupport: "",
    insurance: "",
    fiveGuaranteesSupport: "",
    otherBenefits: "",
    employmentSupport: "",
  },
});

const activeTab = ref("baseInfo");

const handlePageSizeChange = (size: number) => {
  getForm.pageSize = size;
  getForm.pagenumber = 1; // 切换每页数量时重置为第一页
  getBaseInfoList();
};

const handlePageNumberChange = (page: number) => {
  getForm.pagenumber = page;
  getBaseInfoList();
};

// 临时人员信息相关
const tempDialogVisible = ref(false);
const tempFamilyList = ref<any[]>([]);
const tempLoading = ref(false);
const tempSearchName = ref("");
const tempSearchId = ref("");
const tempPage = ref(1);
const tempTotal = ref(0);

// 修改 fetchTempFamilyInfo 支持分页和 total
const fetchTempFamilyInfo = async (nameKey = "", idNumber = "", page = 1) => {
  tempLoading.value = true;
  try {
    const res = await GetTempFamilyInfo({
      NameKey: nameKey,
      IdentifacationNumber: idNumber,
      Pagenumber: page,
      Pagesize: 10,
    });
    // 兼容后端返回格式
    if (res.data && Array.isArray(res.data.tempFamilyData)) {
      tempFamilyList.value = res.data.tempFamilyData;
      tempTotal.value = res.data.total || 0;
    } else if (res.data && Array.isArray(res.data.data)) {
      tempFamilyList.value = res.data.data;
      tempTotal.value = res.data.total || res.data.data.length || 0;
    } else if (Array.isArray(res.data)) {
      tempFamilyList.value = res.data;
      tempTotal.value = res.data.length;
    } else {
      tempFamilyList.value = [];
      tempTotal.value = 0;
    }
    tempDialogVisible.value = true;
  } catch (e) {
    ElMessage.error("获取临时人员信息失败");
  } finally {
    tempLoading.value = false;
  }
};

const openTempDialog = () => {
  tempSearchName.value = "";
  tempSearchId.value = "";
  tempPage.value = 1;
  fetchTempFamilyInfo();
};

const handleTempSearch = () => {
  tempPage.value = 1;
  fetchTempFamilyInfo(tempSearchName.value, tempSearchId.value, 1);
};

// 计算属性：只有户主婚姻状态为已婚时才显示配偶信息Tab
const showSpouseTab = computed(() => hostInfo.value.maritalStatus === "已婚");

// 计算属性：姓名、户口所在地、现住址、身份证号（18位）、电话必填
const canGoNextBaseInfo = computed(() => {
  return (
    !!hostInfo.value.name &&
    !!hostInfo.value.householdRegistLocation &&
    !!hostInfo.value.currentPlace &&
    !!hostInfo.value.identificationNumber &&
    hostInfo.value.identificationNumber.length === 18 &&
    !!hostInfo.value.phoneNumber
  );
});

// 计算属性：配偶信息必填项校验（含18位身份证号和电话）
const canGoNextSpouseInfo = computed(() => {
  if (!showSpouseTab.value) return true;
  return (
    !!houseHoldInfo.value.name &&
    !!houseHoldInfo.value.householdRegistLocation &&
    !!houseHoldInfo.value.currentPlace &&
    !!houseHoldInfo.value.identificationNumber &&
    houseHoldInfo.value.identificationNumber.length === 18 &&
    !!houseHoldInfo.value.phoneNumber
  );
});


// 监听婚姻状态变化，切换Tab并清空配偶信息
watch(
  () => hostInfo.value.maritalStatus,
  (val, oldVal) => {
    if (val !== "已婚") {
      // 如果不是已婚，自动跳到子女信息页并清空配偶信息
      if (activeTab.value === "spouseInfo") {
        activeTab.value = "childInfo";
      }
      // 清空配偶信息
      Object.assign(houseHoldInfo.value, {
        relation: "配偶",
        name: "",
        photo: "",
        identificationNumber: "",
        householdRegistLocation: "",
        currentPlace: "",
        gender: "",
        birthDate: "",
        ethnicity: "",
        region: "",
        politicalAffiliation: "",
        maritalStatus: "",
        educationLevel: "",
        phoneNumber: "",
        administrativeDivision: "",
        employerSchool: "",
        employmentStatus: "",
        remark: "",
        grading: "",
        healthInformationRequest: {
          bloodType: "",
          limbMobility: "",
          limbDisability: "",
          medicalHistory: "",
          recordDisease: "",
          isLongTermMedication: "",
          majorDiseases: "",
          healthStatus: "",
          disabilityLevel: "无",
          disabilityType: "",
          remark: "",
        },
        socialSecurityRequest: {
          medicalInsurance: "",
          pensionInsurance: "",
          housingFund: "",
          lowIncomeSupport: "",
          insurance: "",
          fiveGuaranteesSupport: "",
          otherBenefits: "",
          employmentSupport: "",
        },
      });
    }
  }
);

const showExportDialog = ref(false);
const exportLoading = ref(false);

function handleExportFamily(conditions, done) {
  exportLoading.value = true;
  exportFamilyExcel(conditions)
    .then(res => {
      const blob = res instanceof Blob ? res : res.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '家庭基本信息.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch(() => {
      ElMessage.error('导出失败');
    })
    .finally(() => {
      exportLoading.value = false;
      if (typeof done === 'function') done();
      else showExportDialog.value = false;
    });
}

function handleExportAdult(conditions, done) {
  exportLoading.value = true;
  exportPeopleExcel(conditions)
    .then(res => {
      const blob = res instanceof Blob ? res : res.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '人员基本信息.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch(() => {
      ElMessage.error('导出失败');
    })
    .finally(() => {
      exportLoading.value = false;
      if (typeof done === 'function') done();
      else showExportDialog.value = false;
    });
}

function handleExportChild(conditions, done) {
  exportLoading.value = true;
  exportChildExcel(conditions)
    .then(res => {
      const blob = res instanceof Blob ? res : res.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '子女基本信息.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch(() => {
      ElMessage.error('导出失败');
    })
    .finally(() => {
      exportLoading.value = false;
      if (typeof done === 'function') done();
      else showExportDialog.value = false;
    });
}
</script>

<template>
  <div style="height: 80vh">
    <h1>基本情况登记</h1>

    <!-- 搜索功能区域 -->
    <div
      style="
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 25px;
        flex-wrap: wrap;
      "
      v-if="role != 'SuperAdmin'"
    >
      <el-select
        v-model="searchLabel"
        placeholder="选择搜索类型"
        style="width: 8vw"
      >
        <el-option label="姓名" value="姓名" />
        <el-option label="身份证" value="身份证" />
      </el-select>

      <el-input
        v-model="searchValue"
        v-if="searchLabel !== '行政区划'"
        placeholder="请输入"
        style="width: 10vw"
      />

      <label style="color: black">行政区划</label>
      <!-- 替换为AreaSelector组件 -->
      <AreaSelector
        v-model:area="selectedRegion"
        style="max-width:45%;"
      />
      <el-button type="primary" @click="search" style="width: 100px"
        >搜索</el-button
      >
      <el-button type="primary" @click="openAddDialog" style="width: 100px"
        >添加</el-button
      >
    </div>
    <el-button type="warning" @click="openTempDialog" style="width: 150px"
      >查看临时人员信息</el-button
    >
    <el-button
        type="danger"
        @click="showExportDialog = true"
        style="width: 110px;margin-left: 5%;"
        >导出基本信息</el-button
      >
    
    <!-- 表格 -->
    <el-table
      :data="formData"
      stripe
      size="large"
      style="width: 100%; height: 80%"
    >
      <!-- 基本信息列 -->
      <el-table-column
        prop="listHouseHoldSpouse[0].name"
        width="130"
        label="户主姓名"
        show-overflow-tooltip
      />
      <el-table-column
        prop="listHouseHoldSpouse[0].identificationNumber"
        width="220"
        label="户主身份证号"
        show-overflow-tooltip
      />
      <el-table-column
        prop="listHouseHoldSpouse[0].householdRegistLocation"
        label="详细地址"
        show-overflow-tooltip
      />
      <el-table-column
        prop="listHouseHoldSpouse[0].identificationNumber"
        width="200"
        label="联系方式"
        show-overflow-tooltip
      />
      <el-table-column
        label="家庭所在区划"
        show-overflow-tooltip
      >
      <template #default="{ row }">
        <span>{{ row.provinceName }}{{ row.municipalityName }}{{ row.districtName }}{{ row.townshipStreetsName }}</span>
      </template>
      </el-table-column>
      <el-table-column
        prop="listHouseHoldSpouse[0].grading"
        width="70"
        label="等级"
        show-overflow-tooltip
      />
      <el-table-column label="操作" fixed="right" width="400">
        <template #default="{ row }">
          <div style="display: flex; justify-content: center">
            <el-button
              type="success"
              size="medium"
              style="margin: 0 5px"
              @click="checkVisitRecord(row)"
            >
              <el-icon><Document /></el-icon>
              探访记录
            </el-button>
            <el-button
              type="info"
              size="medium"
              style="margin: 0 5px"
              @click="openDetailDialog(row)"
            >
              <el-icon>
                <InfoFilled />
              </el-icon>
              详情
            </el-button>
            <el-button
              v-if="role == 'Staff'"
              type="primary"
              size="medium"
              style="margin: 0 5px"
              @click="openEditDialog(row)"
            >
              <el-icon>
                <Edit />
              </el-icon>
              编辑
            </el-button>
            <el-button
              v-if="localPermission == '4'"
              type="danger"
              size="medium"
              style="margin: 0 5px"
              @click="deleteRecord(row)"
            >
              <el-icon>
                <DeleteFilled />
              </el-icon>
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="getForm.pagenumber"
      :page-size="getForm.pageSize"
      :total="total"
      layout="prev, pager, next, jumper, total"
      @size-change="handlePageSizeChange"
      @current-change="handlePageNumberChange"
    />

    <el-dialog
      v-model="checkVisitVisible"
      destroy-on-close
      width="50%"
      class="custom-dialog"
    >
      <template #default>
        <VisitRecord :record="checkingFamily" />
      </template>
    </el-dialog>

    <!-- 详细信息对话框 -->
    <el-dialog
      v-model="dialogDetailVisible"
      width="700px"
      class="custom-dialog"
      :modal="true"
    >
        <DetailShowDialog :data="detailInfo" v-if="dialogDetailVisible"></DetailShowDialog>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog
      v-model="dialogEditVisible"
      destroy-on-close
      :close-on-click-modal="false"
      width="50%"
      class="custom-dialog"
      :modal="true"
    >
      <template #default>
        <div class="dialog-scroll-container">
          <template v-if="editHostInfo.name && editHostInfo.name != ''">
            <el-tabs class="custom-tabs" v-model="activeTab">
              <el-tab-pane name="baseInfo">
                <template #label>
                  <span class="tabs-label">户主信息</span>
                </template>
                <BaseInfoEditDialog
                  v-model:state="passed"
                  v-model:rules="rules"
                  v-model:itemInfo="editHostInfo"
                  :disabled="false"
                >
                </BaseInfoEditDialog>
              </el-tab-pane>
              <el-tab-pane
                name="spouseInfo"
                v-if="editHostInfo.maritalStatus === '已婚'"
              >
                <template #label>
                  <span class="tabs-label">配偶信息</span>
                </template>
                <BaseInfoEditDialog
                  v-model:state="passed"
                  v-model:rules="rules"
                  v-model:itemInfo="editSpouseInfo"
                  :disabled="false"
                >
                </BaseInfoEditDialog>
              </el-tab-pane>

              <el-tab-pane name="childInfo">
                <template #label>
                  <span class="tabs-label">子女信息</span>
                </template>
                <div class="child-info-container">
                  <el-card
                    v-for="(child, index) in editInfo.listChildGrand"
                    :key="index"
                    class="child-card"
                  >
                    <div class="child-card-content">
                      <div class="child-info">
                        <span>姓名: {{ child.name }}</span>
                        <span>关系: {{ child.relation }}</span>
                        <span>出生日期: {{ child.birthDate }}</span>
                      </div>
                      <div class="child-actions">
                        <el-button
                          type="primary"
                          size="small"
                          circle
                          @click="editChildInfo(child, index)"
                        >
                          <el-icon><EditPen /></el-icon>
                        </el-button>
                        <el-button
                          type="danger"
                          size="small"
                          circle
                          @click="removeEditChild(index)"
                        >
                          <el-icon><Delete /></el-icon>
                        </el-button>
                      </div>
                    </div>
                  </el-card>

                  <!-- 添加子女按钮 -->
                  <el-button
                    type="primary"
                    style="margin-top: 20px"
                    @click="addEditChild"
                  >
                    添加子女信息
                  </el-button>
                </div>
              </el-tab-pane>

              <!-- 添加子女信息对话框 -->
              <el-dialog
                v-model="childEditDialogVisible"
                title="子女信息"
                width="50%"
                :modal="true"
              >
                <ChildGrandInfoDialog
                  v-model:memberInfo="tempChildInfo"
                  :disabled="false"
                >
                </ChildGrandInfoDialog>
                <template #footer>
                  <div class="dialog-footer">
                    <el-button @click="childEditDialogVisible = false"
                      >取消</el-button
                    >
                    <el-button type="primary" @click="saveEditChildInfo"
                      >确定</el-button
                    >
                  </div>
                </template>
              </el-dialog>
              <el-tab-pane name="familyInfo">
                <template #label>
                  <span class="tabs-label">家庭情况</span>
                </template>
                <FamilyEditDialog
                  v-model:familyInfo="editInfo"
                  :disabled="false"
                ></FamilyEditDialog>
              </el-tab-pane>
            </el-tabs>
          </template>
          <template v-else>
            <div style="text-align: center; padding: 40px 0">
              <el-icon style="font-size: 32px; color: #999"
                ><Loading
              /></el-icon>
              <div style="margin-top: 10px; color: #999">
                正在加载数据，请稍候...
              </div>
            </div>
          </template>
        </div>
      </template>

      <template #footer>
        <div class="dialog-footer">
          <div v-if="activeTab == 'baseInfo'">
            <el-button
              type="primary"
              @click="
                editHostInfo.maritalStatus === '已婚'
                  ? (activeTab = 'spouseInfo')
                  : (activeTab = 'childInfo')
              "
              >下一页</el-button
            >
          </div>
          <div
            v-else-if="
              activeTab == 'spouseInfo' && editHostInfo.maritalStatus === '已婚'
            "
          >
            <el-button @click="activeTab = 'baseInfo'">上一页</el-button>
            <el-button type="primary" @click="activeTab = 'childInfo'"
              >下一页</el-button
            >
          </div>
          <div v-else-if="activeTab == 'childInfo'">
            <el-button
              @click="
                editHostInfo.maritalStatus === '已婚'
                  ? (activeTab = 'spouseInfo')
                  : (activeTab = 'baseInfo')
              "
              >上一页</el-button
            >
            <el-button type="primary" @click="activeTab = 'familyInfo'"
              >下一页</el-button
            >
          </div>
          <div v-else-if="activeTab == 'familyInfo'">
            <el-button @click="activeTab = 'childInfo'">上一页</el-button>
            <el-button type="primary" @click="confirmEdit()">确定</el-button>
          </div>
        </div>
      </template>
    </el-dialog>

    <!-- 添加对话框 -->
    <el-dialog
      v-model="dialogAddVisible"
      destroy-on-close
      :close-on-click-modal="false"
      width="50%"
      class="custom-dialog"
      :modal="true"
    >
      <template #default>
        <div class="dialog-scroll-container">
          <el-tabs class="custom-tabs" v-model="activeTab">
            <el-tab-pane name="baseInfo">
              <template #label>
                <span class="tabs-label">户主信息</span>
              </template>
              <BaseInfoEditDialog
                v-model:state="passed"
                v-model:rules="rules"
                v-model:itemInfo="hostInfo"
                :disabled="false"
              >
              </BaseInfoEditDialog>
            </el-tab-pane>
            <el-tab-pane name="spouseInfo" v-if="showSpouseTab">
              <template #label>
                <span class="tabs-label">配偶信息</span>
              </template>
              <BaseInfoEditDialog
                v-model:state="passed"
                v-model:rules="rules"
                v-model:itemInfo="houseHoldInfo"
                :disabled="false"
              >
              </BaseInfoEditDialog>
            </el-tab-pane>
            <el-tab-pane name="childInfo">
              <template #label>
                <span class="tabs-label">子女信息</span>
              </template>
              <div class="child-info-container">
                <el-card
                  v-for="(child, index) in itemInfo.ListEnrollChildGrandRequest"
                  :key="index"
                  class="child-card"
                >
                  <div class="child-card-content">
                    <div class="child-info">
                      <span>姓名: {{ child.name }}</span>
                      <span>关系: {{ child.relation }}</span>
                      <span>出生日期: {{ child.birthDate }}</span>
                    </div>
                    <div class="child-actions">
                      <el-button
                        type="danger"
                        size="small"
                        circle
                        @click="removeChild(index)"
                      >
                        <el-icon><Delete /></el-icon>
                      </el-button>
                    </div>
                  </div>
                </el-card>

                <!-- 添加子女按钮 -->
                <el-button
                  type="primary"
                  style="margin-top: 20px"
                  @click="addChild"
                >
                  添加子女信息
                </el-button>
              </div>
            </el-tab-pane>

            <!-- 添加子女信息对话框 -->
            <el-dialog
              v-model="childDialogVisible"
              title="添加子女信息"
              width="50%"
              :modal="true"
            >
              <ChildGrandInfoDialog
                v-model:memberInfo="tempChildInfo"
                :disabled="false"
              >
              </ChildGrandInfoDialog>
              <template #footer>
                <div class="dialog-footer">
                  <el-button @click="childDialogVisible = false"
                    >取消</el-button
                  >
                  <el-button type="primary" @click="saveChildInfo"
                    >确定</el-button
                  >
                </div>
              </template>
            </el-dialog>
            <el-tab-pane name="familyInfo">
              <template #label>
                <span class="tabs-label">家庭情况</span>
              </template>
              <FamilyEditDialog
                v-model:familyInfo="itemInfo"
                :disabled="false"
              ></FamilyEditDialog>
            </el-tab-pane>
          </el-tabs>
        </div>
      </template>

      <template #footer>
        <div class="dialog-footer">
          <div v-if="activeTab == 'baseInfo'">
            <!-- 下一页跳转到配偶或子女，未填写必填项时禁用 -->
            <el-button
              type="primary"
              :disabled="!canGoNextBaseInfo"
              @click="
                showSpouseTab
                  ? (activeTab = 'spouseInfo')
                  : (activeTab = 'childInfo')
              "
              >下一页</el-button
            >
          </div>
          <div v-else-if="activeTab == 'spouseInfo' && showSpouseTab">
            <el-button @click="activeTab = 'baseInfo'">上一页</el-button>
            <el-button
              type="primary"
              :disabled="!canGoNextSpouseInfo"
              @click="activeTab = 'childInfo'"
              >下一页</el-button
            >
          </div>
          <div v-else-if="activeTab == 'childInfo'">
            <el-button
              @click="
                showSpouseTab
                  ? (activeTab = 'spouseInfo')
                  : (activeTab = 'baseInfo')
              "
              >上一页</el-button
            >
            <el-button type="primary" @click="activeTab = 'familyInfo'"
              >下一页</el-button
            >
          </div>
          <div v-else-if="activeTab == 'familyInfo'">
            <el-button @click="activeTab = 'childInfo'">上一页</el-button>
            <el-button type="primary" @click="add()">确定</el-button>
          </div>
        </div>
      </template>
    </el-dialog>

    <!-- 临时人员信息弹窗 -->
    <el-dialog
      v-model="tempDialogVisible"
      title="临时人员信息"
      width="60%"
      :modal="true"
    >
      <div style="display: flex; gap: 10px; margin-bottom: 10px">
        <el-input
          v-model="tempSearchName"
          placeholder="姓名"
          style="width: 160px"
          clearable
        />
        <el-input
          v-model="tempSearchId"
          placeholder="身份证号"
          style="width: 200px"
          clearable
        />
        <el-button type="primary" @click="handleTempSearch">搜索</el-button>
      </div>
      <el-table
        :data="tempFamilyList"
        v-loading="tempLoading"
        style="width: 100%"
        height="400"
      >
        <el-table-column
          prop="name"
          label="姓名"
          width="100"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <span
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
              >{{ row.name }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          width="80"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <span
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
              >{{ row.gender }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="birthDate"
          label="出生日期"
          width="120"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <span
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
              >{{ row.birthDate.toString().replace("T", " ") }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="marryInfo"
          label="婚姻状况"
          width="100"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <span
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
              >{{ row.marryInfo }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="helpType"
          label="帮扶类型"
          width="120"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <span
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
              >{{ row.helpType }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="identifacationNumber"
          label="身份证号"
          width="180"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <span
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
              >{{ row.identifacationNumber }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="220"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <span
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
              >{{ row.address }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="phoneNumber"
          label="联系电话"
          width="140"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <span
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
              >{{ row.phoneNumber }}</span
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 10px; text-align: right"
        background
        layout="prev, pager, next, jumper, total"
        :total="tempTotal"
        :page-size="10"
        v-model:current-page="tempPage"
        @current-change="
          (val) => {
            fetchTempFamilyInfo(tempSearchName, tempSearchId, val);
          }
        "
      />
      <template #footer>
        <el-button @click="tempDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>

    <!-- 导出对话框 -->
    <ExportFamilyFilterDialog
      v-model="showExportDialog"
      @submitFamily="handleExportFamily"
      @submitAdult="handleExportAdult"
      @submitChild="handleExportChild"
    />
  </div>
</template>

<style scoped>
.child-info-container {
  padding: 20px;
}

.child-card {
  margin-bottom: 10px;
}

.child-card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.child-info {
  display: flex;
  gap: 20px;
}

.child-actions {
  display: flex;
  gap: 10px;
}
.dialog-footer {
  text-align: right;
}

.tabs-label {
  padding: 0 10px;
  text-align: center;
  font-size: large;
  font-weight: bold;
}

.dialog-title {
  margin: auto;
  font-size: large;
  font-weight: 300;
}

/* 对话框相关样式 */
.custom-dialog :deep(.el-dialog) {
  margin-top: -20% !important;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.custom-dialog :deep(.el-dialog__body) {
  padding: 0;
  height: calc(90vh - 120px); /* 减去header和footer的高度 */
  overflow: hidden;
}

.dialog-scroll-container {
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
}

/* 自定义滚动条 */
.dialog-scroll-container::-webkit-scrollbar {
  width: 6px;
}

.dialog-scroll-container::-webkit-scrollbar-thumb {
  background: #dcdfe6;
  border-radius: 3px;
}

.dialog-scroll-container::-webkit-scrollbar-track {
  background: #f5f7fa;
}

/* tabs样式 */
.custom-tabs :deep(.el-tabs__header) {
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  margin-bottom: 15px;
}

.custom-tabs :deep(.el-tabs__content) {
  overflow: visible;
}

/* 移除dialog内容区域的默认padding */
.custom-dialog :deep(.el-dialog__body) {
  padding: 0;
}

/* 确保footer样式正确 */
.custom-dialog :deep(.el-dialog__footer) {
  border-top: 1px solid #dcdfe6;
  padding: 10px 20px;
}

.other-info-container {
  padding: 20px;
}

.member-card {
  margin-bottom: 10px;
}

.member-card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.member-info {
  display: flex;
  gap: 20px;
}

.member-actions {
  display: flex;
  gap: 10px;
}
</style>
