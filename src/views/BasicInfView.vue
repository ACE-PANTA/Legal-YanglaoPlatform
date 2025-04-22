<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox, type FormRules } from 'element-plus';
import { jsonp } from 'vue-jsonp';
import { GetOneFamilyWithUid, GetBaseInfoList, AddBaseInfo, UpdateBaseInfo, DeleteBaseInfo,
  getFamilyDetail
 } from '@/api/family';
import { BasicInfTemplate, EnrollChildGrandRequest, EnrollHouseHoldSpouseRequests } from '@/models';
import BaseInfoEditDialog from '@/components/BaseInfors/BaseInfoEditDialog.vue';
import FamilyEditDialog from '@/components/BaseInfors/FamilyEditDialog.vue';
import ChildGrandInfoDialog from '@/components/BaseInfors/ChildGrandInfoDialog.vue';
import DetailShowDialog from '@/components/BaseInfors/DetailShowDialog.vue';
import { useMainStore } from '@/store';
import VisitRecord from '@/components/BaseInfors/VisitRecord.vue'

const formData = ref<Array<BasicInfTemplate>>([]);

const localPermission=ref('')

const role=ref('');

const searchLabel = ref('姓名');

const searchValue = ref('');
const selectedRegion = ref({
  ProvinceId: '88888888',
  MunicipalityId: '88888888',
  DistrictId: '88888888',
  TownshipStreetsId: '88888888',
});

const checkVisitVisible=ref(false);

const checkingFamily=ref({})




const provinces = ref([]);
const cities = ref([]);
const districts = ref([]);
const streets = ref([]);

const areaCache = reactive({
  provinces: [],
  cities: {},
  districts: {},
  streets: {}
});

const ALL_OPTION = { id: '88888888', fullname: '全部' };
const MUNICIPALITIES = ['110000', '120000', '310000', '500000'];

const loadCacheData = async () => {
  try {
    const cachedProvinces = localStorage.getItem('area_provinces');
    const cachedCities = localStorage.getItem('area_cities');
    const cachedDistricts = localStorage.getItem('area_districts');

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
    localStorage.setItem('area_provinces', JSON.stringify(areaCache.provinces));
    localStorage.setItem('area_cities', JSON.stringify(areaCache.cities));
    localStorage.setItem('area_districts', JSON.stringify(areaCache.districts));
  } catch (error) {
    console.error('保存缓存数据失败:', error);
  }
};

const addDefaultOption = (list) => [{ id: '88888888', fullname: '全部' }, ...list];

const getProvinces = async () => {
  try {
    const res = await jsonp('https://apis.map.qq.com/ws/district/v1/list', {
      key: 'LXLBZ-HP66Q-PYL5K-B74JY-IFTMK-RYFV2',
      output: 'jsonp'
    });
    if (res.status === 0) {
      areaCache.provinces = res.result[0];
      provinces.value = addDefaultOption(areaCache.provinces);
      saveCacheData();
    }
  } catch (error) {
    ElMessage.error('获取省份数据失败');
  }
};

const getChildren = async (id, level) => {
  try {
    if (level === 1 && areaCache.cities[id]) {
      cities.value = addDefaultOption(areaCache.cities[id]);
      return;
    }
    if (level === 2 && areaCache.districts[id]) {
      districts.value = addDefaultOption(areaCache.districts[id]);
      return;
    }
    if (level === 3 && areaCache.streets[id]) {
      streets.value = addDefaultOption(areaCache.streets[id]);
      return;
    }

    const res = await jsonp('https://apis.map.qq.com/ws/district/v1/getchildren', {
      key: 'LXLBZ-HP66Q-PYL5K-B74JY-IFTMK-RYFV2',
      id,
      output: 'jsonp'
    });

    if (res.status === 0) {
      if (level === 1) {
        if (MUNICIPALITIES.includes(id)) {
          areaCache.districts[id] = res.result[0];
          districts.value = addDefaultOption(areaCache.districts[id]);
          cities.value = [];
        } else {
          areaCache.cities[id] = res.result[0];
          cities.value = addDefaultOption(areaCache.cities[id]);
          districts.value = [];
        }
        streets.value = [];
      } else if (level === 2) {
        areaCache.districts[id] = res.result[0];
        districts.value = addDefaultOption(areaCache.districts[id]);
        streets.value = [];
      } else if (level === 3) {
        areaCache.streets[id] = res.result[0];
        streets.value = addDefaultOption(areaCache.streets[id]);
      }
      saveCacheData();
    }
  } catch (error) {
    ElMessage.error('获取下级行政区失败');
  }
};

const handleProvinceChange = async (value) => {
  selectedRegion.value.ProvinceId = value;
  selectedRegion.value.MunicipalityId = '';
  selectedRegion.value.DistrictId = '';
  selectedRegion.value.TownshipStreetsId = '';
  if (value && value !== ALL_OPTION.id) await getChildren(value, 1);
};

const handleCityChange = async (value) => {
  selectedRegion.value.MunicipalityId = value;
  selectedRegion.value.DistrictId = '';
  selectedRegion.value.TownshipStreetsId = '';
  if (value && value !== ALL_OPTION.id) await getChildren(value, 2);
};

const handleDistrictChange = async (value) => {
  selectedRegion.value.DistrictId = value;
  selectedRegion.value.TownshipStreetsId = '';
  if (value && value !== ALL_OPTION.id) await getChildren(value, 3);
};

const handleStreetChange = (value) => {
  selectedRegion.value.TownshipStreetsId = value;
};

const dialogEditVisible = ref(false);
const dialogAddVisible = ref(false);
const dialogDetailVisible = ref(false);
const passed = ref(false);

const itemInfo = ref<BasicInfTemplate>({
  grading: '',
  annualIncome: '',
  annualExpenditure: '',
  provinceId:  '',
  provinceName: '',
  municipalityId:  '',
  municipalityName: '',
  districtId: '',
  districtName: '',
  townshipStreetsId: '',
  townshipStreetsName:  '',
  Remark:  '',
  ListEnrollHouseHoldSpouseRequest: [],
  ListEnrollChildGrandRequest: []
});

const editInfo= ref<any>({});

const editHostInfo = ref<any>({
  relation: '户主',
  name: '',
  photo: '',
  identificationNumber: '',
  householdRegistLocation: '',
  gender: '',
  birthDate: '',
  ethnicity: '',
  region: '',
  politicalAffiliation: '',
  maritalStatus: '',
  educationLevel: '',
  phoneNumber: '',
  administrativeDivision: '',
  employerSchool: '',
  employmentStatus: '',
  remark: '',
  grading: '',
  healthInformationRequest: {
    bloodType: '',
    limbMobility: '',
    limbDisability: '',
    medicalHistory: '',
    recordDisease: '',
    isLongTermMedication: '',
    majorDiseases: '',
    healthStatus: '',
    disabilityLevel: '无',
    disabilityType: '',
    remark: ''
  },
  socialSecurityRequest: {
    medicalInsurance: '',
    pensionInsurance: '',
    housingFund: '',
    lowIncomeSupport: '',
    insurance: '',
    fiveGuaranteesSupport: '',
    otherBenefits: '',
    employmentSupport: ''
  }
});

const editSpouseInfo = ref<any>({
  relation: '配偶',
  name: '',
  photo: '',
  identificationNumber: '',
  householdRegistLocation: '',
  gender: '',
  birthDate: '',
  ethnicity: '',
  region: '',
  politicalAffiliation: '',
  maritalStatus: '',
  educationLevel: '',
  phoneNumber: '',
  administrativeDivision: '',
  employerSchool: '',
  employmentStatus: '',
  remark: '',
  grading: '',
  healthInformationRequest: {
    bloodType: '',
    limbMobility: '',
    limbDisability: '',
    medicalHistory: '',
    recordDisease: '',
    isLongTermMedication: '',
    majorDiseases: '',
    healthStatus: '',
    disabilityLevel: '无',
    disabilityType: '',
    remark: ''
  },
  socialSecurityRequest: {
    medicalInsurance: '',
    pensionInsurance: '',
    housingFund: '',
    lowIncomeSupport: '',
    insurance: '',
    fiveGuaranteesSupport: '',
    otherBenefits: '',
    employmentSupport: ''
  }
});

const detailInfo=new Object({});

// 表单验证规则
const rules = reactive<FormRules<BasicInfTemplate>>({
  // grading: [{ required: true, message: '请输入分级', trigger: 'blur' }],
  // annualIncome: [{ required: true, message: '请输入年收入', trigger: 'blur' }],
  // annualExpenditure: [{ required: true, message: '请输入年支出', trigger: 'blur' }]
});

const exportData = () => {
  console.log('导出数据');
};

// 编辑基本信息：验证后更新数据
const saveEdit = async () => {
  if (passed.value) {
    passed.value = false;
    const itemInfoData = getItemInfoData();
    initItemInfo();
    UpdateBaseInfo(itemInfoData).then((res) => {
      if (res.status === 200) {
        ElMessage.success('更新成功');
      }
    });
    getBaseInfoList();
    dialogEditVisible.value = false;
  } else {
    ElMessage.error('请填写基本信息中的必填字段');
  }
};

const search = () => {
  const query = {
    PageIndex: getForm.pagenumber,
    PageSize: getForm.pageSize,
    HouseHoldName: searchLabel.value === '姓名' ? searchValue.value : '',
    IdentificationNumber: searchLabel.value === '身份证' ? searchValue.value : '',
    ProvinceId: selectedRegion.value.ProvinceId === ALL_OPTION.id ? ALL_OPTION.id : selectedRegion.value.ProvinceId,
    MunicipalityId: selectedRegion.value.MunicipalityId === ALL_OPTION.id ? ALL_OPTION.id : selectedRegion.value.MunicipalityId,
    DistrictId: selectedRegion.value.DistrictId === ALL_OPTION.id ? ALL_OPTION.id : selectedRegion.value.DistrictId,
    TownshipStreetsId: selectedRegion.value.TownshipStreetsId === ALL_OPTION.id ? ALL_OPTION.id : selectedRegion.value.TownshipStreetsId,
  };

  GetBaseInfoList(query, localStorage.getItem('UserRole')).then((res) => {
    if (res.status === 200) {
      formData.value = res.data.data;
    }
  });
};
const getForm={
  pagenumber:1,
  pageSize:15
}
const getBaseInfoList = () => {
  GetBaseInfoList(getForm,localStorage.getItem('UserRole')).then((res) => {
    if (res.status === 200) {
      formData.value = res.data.data
    }
  })
}

const getItemInfoData = () => {
  return itemInfo.value;
}

// 添加基本信息：验证后新增数据
const add = async () => {
  console.log(itemInfo.value);
  itemInfo.value.ListEnrollHouseHoldSpouseRequest.push(hostInfo.value);
  if(houseHoldInfo.value.name !== '') {
    itemInfo.value.ListEnrollHouseHoldSpouseRequest.push(houseHoldInfo.value);
  }
  AddBaseInfo(itemInfo.value).then((res) => {
    if (res.status === 200) {
      ElMessage.success('添加成功');
      getBaseInfoList();
      dialogAddVisible.value = false;
    }
  }).catch((err => {
    if(err.status==400)
    {
      console.error(err);
      ElMessage.error('字段填写不全，请仔细检查！');
    }
    
  }));
  activeTab.value='baseInfo';
  
};

const confirmEdit = async () => {
  let sendInfo;
  sendInfo=editInfo.value
  sendInfo.ListEnrollHouseHoldSpouseRequest=null
  editHostInfo.value.UpdateHealthInformationRequest=editHostInfo.value.healthInformationRequest
  editHostInfo.value.healthInformationRequest=null
  editHostInfo.value.UpdateSocialSecurityRequest=editHostInfo.value.socialSecurityRequest
  editHostInfo.value.socialSecurityRequest=null
  sendInfo.ListUpdateHouseHoldSpouseRequest=[]
  sendInfo.ListUpdateHouseHoldSpouseRequest.push(editHostInfo.value);
  if(editSpouseInfo.value.name !== '') {
    editSpouseInfo.value.UpdateHealthInformationRequest=editSpouseInfo.value.healthInformationRequest
    editSpouseInfo.value.healthInformationRequest=null
    editSpouseInfo.value.UpdateSocialSecurityRequest=editSpouseInfo.value.socialSecurityRequest
    editSpouseInfo.value.socialSecurityRequest=null
    sendInfo.ListUpdateHouseHoldSpouseRequest.push(editSpouseInfo.value);
  }
  sendInfo.ListUpdateChildGrandRequest=editInfo.value.listChildGrand;
  UpdateBaseInfo(sendInfo).then((res) => {
    if (res.status === 200) {
      ElMessage.success('添加成功');
      dialogAddVisible.value = false;
      activeTab.value='baseInfo';
      getBaseInfoList();
    }
  }).catch((err => {
    if(err.status==400)
    {
      console.error(err);
      ElMessage.error('字段填写不全，请仔细检查！');
    }
    else if(err.response)
    {
      ElMessage.error(err.response.data.msg)
    }
    
  }));
  
  
};



// 打开编辑对话框
const openEditDialog = (row: any) => {
  getFamilyDetail(row.uid)
  .then(res=>{
    if(res.status==200)
    {
      editInfo.value=res.data.data
      
      editInfo.value.listHouseHoldSpouse.forEach(element => {
        if(element.relation=='户主')
        {
          Object.assign(editHostInfo.value,element)
          Object.assign(editHostInfo.value.healthInformationRequest,element.healthInformation)
          Object.assign(editHostInfo.value.socialSecurityRequest,element.socialSecurityInformation)
        }
        else if(element.relation=='配偶')
        {
          Object.assign(editSpouseInfo.value,element)
          Object.assign(editSpouseInfo.value.healthInformationRequest,element.healthInformation)
          Object.assign(editSpouseInfo.value.socialSecurityRequest,element.socialSecurityInformation)
        }
      });
    }
  })
  dialogEditVisible.value = true;
};

// 打开添加对话框
const openAddDialog = () => {
  initItemInfo();
  dialogAddVisible.value = true;
};

//重置/初始化iteminfo
const initItemInfo = () => {
  Object.assign(itemInfo.value, {
    grading: '',
    annualIncome: '',
    annualExpenditure: '',
    ListEnrollHouseHoldSpouseRequest: [],
    ListEnrollChildGrandRequest: []
  });
}

const checkVisitRecord = async(row:any)=>{
  checkingFamily.value=row.uid
  checkVisitVisible.value=true
}

// 打开详细信息对话框
const openDetailDialog = async (row: BasicInfTemplate) => {
  try {
    const res = await GetOneFamilyWithUid(row.uid); // 调用接口获取详情数据
    if (res.status === 200) {
      Object.assign(detailInfo, res.data.data); // 将接口返回的数据赋值到 itemInfo
      
      dialogDetailVisible.value = true; // 打开详情对话框
    } else {
      ElMessage.error('获取详情失败');
    }
  } catch (error) {
    ElMessage.error('获取详情失败');
  }
};

// 删除记录
const deleteRecord = (row: any) => {
  ElMessageBox.confirm(
    '确定进行信息删除操作？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    DeleteBaseInfo(row.uid).then((res) => {
      if (res.status === 200) {
        ElMessage.success('删除成功');
        getBaseInfoList();
      }
    })
    .catch(res=>{
      if(res.status==403)
      {
        ElMessage.error('权限错误')
      }
      else
      {
        ElMessage.error('操作失败，请检查网络状态')
      }
    })
  })

};

onBeforeMount(() => {
  initItemInfo();
})

onMounted(async () => {
  await loadCacheData();
  selectedRegion.value = {
    ProvinceId: ALL_OPTION.id,
    MunicipalityId: '',
    DistrictId: '',
    TownshipStreetsId: ''
  }; 
  getBaseInfoList();
  role.value=localStorage.getItem('UserRole');
  localPermission.value=useMainStore().userInfo.havePermissionLevel.toString()
});

const imageUrl = ref(null);

const childDialogVisible = ref(false)
const tempChildInfo = ref<EnrollChildGrandRequest>({
  name:'',
  relation:'',
  ifAdopt:'',
  gender:'',
  birthDate:'',
  healthStatus:'',
  takecareLifeAbility:'',
  ifLivingAlone:'',
  disabilityType:'',
  disabilityLevel:'',
  medicalDependence:'',
  ifChronicDisease:'',
  chronicDiseaseName:'',
  commonlyMedications:'',
  grading:'',
  remark:''
})

// 添加子女信息的方法
const addChild = () => {
  childDialogVisible.value = true
}
const childEditDialogVisible=ref(false)
const addEditChild= () => {
  isChildEdit.value=false
  childEditDialogVisible.value = true
}

// 保存子女信息的方法
const saveChildInfo = () => {
  // 深拷贝当前临时数据
  const newChild = JSON.parse(JSON.stringify(tempChildInfo.value))
  // 添加到主表单数据中
  itemInfo.value.ListEnrollChildGrandRequest.push(newChild)
  // 重置临时数据
  tempChildInfo.value = {
    name:'',
    relation:'',
    ifAdopt:'',
    gender:'',
    birthDate:'',
    healthStatus:'',
    takecareLifeAbility:'',
    ifLivingAlone:'',
    disabilityType:'',
    disabilityLevel:'',
    medicalDependence:'',
    ifChronicDisease:'',
    chronicDiseaseName:'',
    commonlyMedications:'',
    grading:'',
    remark:''
  }
  childDialogVisible.value = false
}

const saveEditChildInfo = () => {
  // 深拷贝当前临时数据
  const newChild = JSON.parse(JSON.stringify(tempChildInfo.value))
  
  if(isChildEdit.value)
  {
    editInfo.value.listChildGrand[selectedChildIndex.value]=newChild
  }
  else{
    editInfo.value.listChildGrand.push(newChild)
  }
  

  tempChildInfo.value = {
    name:'',
    relation:'',
    ifAdopt:'',
    gender:'',
    birthDate:'',
    healthStatus:'',
    takecareLifeAbility:'',
    ifLivingAlone:'',
    disabilityType:'',
    disabilityLevel:'',
    medicalDependence:'',
    ifChronicDisease:'',
    chronicDiseaseName:'',
    commonlyMedications:'',
    grading:'',
    remark:''
  }
  isChildEdit.value=false
  childEditDialogVisible.value = false
}

// 删除子女信息
const removeChild = (index: number) => {
  itemInfo.value.ListEnrollChildGrandRequest.splice(index, 1)
}

const removeEditChild = (index: number) => {
  editInfo.value.listChildGrand.splice(index, 1)
}

const isChildEdit=ref(false)
const selectedChildIndex=ref(0)
const editChildInfo=(child:any,index:number)=>{
  tempChildInfo.value=child
  selectedChildIndex.value=index
  isChildEdit.value=true
  childEditDialogVisible.value=true
}


// Define hostInfo to resolve the error
const hostInfo = ref<EnrollHouseHoldSpouseRequests>({
  relation:'户主',
  name:'',
  photo:'',
  identificationNumber:'',
  householdRegistLocation:'',
  gender:'',
  birthDate:'',
  ethnicity:'',
  region:'',
  politicalAffiliation:'',
  maritalStatus:'',
  educationLevel:'',
  phoneNumber:'',
  administrativeDivision:'',
  employerSchool:'',
  employmentStatus:'',
  remark:'',
  grading:'',
  healthInformationRequest:({
    bloodType:'',
    limbMobility:'',
    limbDisability:'',
    medicalHistory:'',
    recordDisease:'',
    isLongTermMedication:'',
    majorDiseases:'',
    healthStatus:'',
    disabilityLevel:'无',
    disabilityType:'',
    remark:''
  }),
  socialSecurityRequest:({
    medicalInsurance:'',
    pensionInsurance:'',
    housingFund:'',
    lowIncomeSupport:'',
    insurance:'',
    fiveGuaranteesSupport:'',
    otherBenefits:'',
    employmentSupport:''
  })
  
});

const houseHoldInfo = ref<EnrollHouseHoldSpouseRequests>({
  relation:'配偶',
  name:'',
  photo:'',
  identificationNumber:'',
  householdRegistLocation:'',
  gender:'',
  birthDate:'',
  ethnicity:'',
  region:'',
  politicalAffiliation:'',
  maritalStatus:'',
  educationLevel:'',
  phoneNumber:'',
  administrativeDivision:'',
  employerSchool:'',
  employmentStatus:'',
  remark:'',
  grading:'',
  healthInformationRequest:({
    bloodType:'',
    limbMobility:'',
    limbDisability:'',
    medicalHistory:'',
    recordDisease:'',
    isLongTermMedication:'',
    majorDiseases:'',
    healthStatus:'',
    disabilityLevel:'无',
    disabilityType:'',
    remark:''
  }),
  socialSecurityRequest:({
    medicalInsurance:'',
    pensionInsurance:'',
    housingFund:'',
    lowIncomeSupport:'',
    insurance:'',
    fiveGuaranteesSupport:'',
    otherBenefits:'',
    employmentSupport:''
  })
  
});

const activeTab = ref('baseInfo');

const handlePageSizeChange = (size: number) => {
  getForm.pageSize = size;
  getBaseInfoList();
};

const handlePageNumberChange = (page: number) => {
  getForm.pagenumber = page;
  getBaseInfoList();
};
</script>

<template>
  <div style="height: 80vh;">
    <h1>基本情况登记</h1>

    <!-- 搜索功能区域 -->
    <div style="display: flex; align-items: center; gap: 10px; padding: 10px 25px; flex-wrap: wrap;"
    v-if="role!='SuperAdmin'">
      <el-select v-model="searchLabel" placeholder="选择搜索类型" style="width: 8vw;">
        <el-option label="姓名" value="姓名" />
        <el-option label="身份证" value="身份证" />
      </el-select>

      <el-input v-model="searchValue" v-if="searchLabel !== '行政区划'" placeholder="请输入" style="width: 10vw;" />
      
      <label style="color: black;">行政区划</label>
      <el-select v-model="selectedRegion.ProvinceId" placeholder="请选择省份" @change="handleProvinceChange" style="width: 8vw;">
        <el-option v-for="item in provinces" :key="item.id" :label="item.fullname" :value="item.id" />
      </el-select>
      <el-select v-model="selectedRegion.MunicipalityId" placeholder="请选择城市" @change="handleCityChange" :disabled="!selectedRegion.ProvinceId || MUNICIPALITIES.includes(selectedRegion.ProvinceId)" style="width: 8vw;">
        <el-option v-for="item in cities" :key="item.id" :label="item.fullname" :value="item.id" />
      </el-select>
      <el-select v-model="selectedRegion.DistrictId" placeholder="请选择区县" @change="handleDistrictChange" :disabled="!selectedRegion.MunicipalityId && !MUNICIPALITIES.includes(selectedRegion.ProvinceId)" style="width: 8vw;">
        <el-option v-for="item in districts" :key="item.id" :label="item.fullname" :value="item.id" />
      </el-select>
      <el-select v-model="selectedRegion.TownshipStreetsId" placeholder="请选择街道/乡镇" @change="handleStreetChange" :disabled="!selectedRegion.DistrictId" style="width: 8vw;">
        <el-option v-for="item in streets" :key="item.id" :label="item.fullname" :value="item.id" />
      </el-select>

      <el-button type="primary" @click="search" style="width: 100px;">搜索</el-button>
      <el-button type="primary" @click="openAddDialog" style="width: 100px;">添加</el-button>
      <el-button type="primary" @click="exportData" style="width: 100px;">导出</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="formData" stripe size="large" style="width:100%;height: 80%;">
      <!-- 基本信息列 -->
      <el-table-column prop="listHouseHoldSpouse[0].name" width="130"  label="户主姓名" show-overflow-tooltip />
      <el-table-column prop="listHouseHoldSpouse[0].identificationNumber" width="220" label="户主身份证号" show-overflow-tooltip />
      <el-table-column label="家庭所在地" width="230" show-overflow-tooltip>
        <template #default="{row}">
          {{ row.provinceName }}{{ row.municipalityName }}{{ row.districtName }}{{ row.townshipStreetsName }}
        </template>
      </el-table-column>
      <el-table-column prop="annualIncome" label="家庭年收入(元)" show-overflow-tooltip />
      <el-table-column prop="annualExpenditure" label="家庭年支出(元)" show-overflow-tooltip />
      <el-table-column label="操作" fixed="right" width="350">
        <template #default="{ row }">
          <div style="display: flex; justify-content: center;">
            <el-button type="success" size="medium" style="margin:0 5px;" @click="checkVisitRecord(row)">
              <el-icon><Document /></el-icon>
              探访记录
            </el-button>
            <el-button type="info" size="medium" style="margin:0 5px;" @click="openDetailDialog(row)">
              <el-icon>
                <InfoFilled />
              </el-icon>
              详情
            </el-button>
            <el-button v-if="role=='Staff'" type="primary" size="medium" style="margin:0 5px;" @click="openEditDialog(row)">
              <el-icon>
                <Edit />
              </el-icon>
              编辑
            </el-button>
            <el-button v-if="localPermission=='4'" type="danger" size="medium" style="margin:0 5px;" @click="deleteRecord(row)">
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
      v-model:current-page="getForm.pagenumber"
      page-size="10"
      :total="formData.length"
      layout="prev, pager, next, jumper"
      @size-change="handlePageSizeChange"
      @current-change="handlePageNumberChange"
    />

    <el-dialog v-model="checkVisitVisible" destroy-on-close width="50%" class="custom-dialog" >
      <template #default>
        <VisitRecord :record="checkingFamily" />
      </template>
    </el-dialog>

    <!-- 详细信息对话框 -->
    <el-dialog v-model="dialogDetailVisible" width="700px" class="custom-dialog" :modal="true">
      <template #default>
        <DetailShowDialog :data="detailInfo"></DetailShowDialog>
      </template>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog v-model="dialogEditVisible" width="50%" class="custom-dialog" :modal="true">
      <template #default>
        <div class="dialog-scroll-container">
          <el-tabs class="custom-tabs" v-model="activeTab">
            <el-tab-pane name="baseInfo">
              <template #label>
                <span class="tabs-label">户主信息</span>
              </template>
              <BaseInfoEditDialog v-model:state="passed" v-model:rules="rules" v-model:itemInfo="editHostInfo"
                :disabled="false">
              </BaseInfoEditDialog>
            </el-tab-pane>
            <el-tab-pane name="spouseInfo">
              <template #label>
                <span class="tabs-label">配偶信息</span>
              </template>
              <BaseInfoEditDialog v-model:state="passed" v-model:rules="rules" v-model:itemInfo="editSpouseInfo"
                :disabled="false">
              </BaseInfoEditDialog>
            </el-tab-pane>
            
            <el-tab-pane name="childInfo">
              <template #label>
                <span class="tabs-label">子女信息</span>
              </template>
              <div class="child-info-container">
                <el-card v-for="(child, index) in editInfo.listChildGrand" 
                        :key="index" 
                        class="child-card">
                  <div class="child-card-content">
                    <div class="child-info">
                      <span>姓名: {{ child.name }}</span>
                      <span>关系: {{ child.relation }}</span>
                      <span>出生日期: {{ child.birthDate }}</span>
                    </div>
                    <div class="child-actions">
                      <el-button type="primary" 
                          size="small" 
                          circle
                          @click="editChildInfo(child,index)">
                        <el-icon><EditPen /></el-icon>
                      </el-button>
                      <el-button type="danger" 
                          size="small" 
                          circle
                          @click="removeEditChild(index)">
                        <el-icon><Delete /></el-icon>
                      </el-button>
                    </div>
                  </div>
                </el-card>
                
                <!-- 添加子女按钮 -->
                <el-button type="primary" 
                          style="margin-top: 20px;"
                          @click="addEditChild">
                  添加子女信息
                </el-button>
              </div>
            </el-tab-pane>

            <!-- 添加子女信息对话框 -->
            <el-dialog v-model="childEditDialogVisible" 
                      title="子女信息" 
                      width="50%" 
                      :modal="true">
              <ChildGrandInfoDialog
                v-model:memberInfo="tempChildInfo"
                :disabled="false">
              </ChildGrandInfoDialog>
              <template #footer>
                <div class="dialog-footer">
                  <el-button @click="childEditDialogVisible = false">取消</el-button>
                  <el-button type="primary" @click="saveEditChildInfo">确定</el-button>
                </div>
              </template>
            </el-dialog>
            <el-tab-pane name="familyInfo">
              <template #label>
                <span class="tabs-label">家庭情况</span>
              </template>
              <FamilyEditDialog v-model:familyInfo="editInfo" :disabled="false"></FamilyEditDialog>
            </el-tab-pane>

          </el-tabs>
        </div>
      </template>

      <template #footer>
        <div class="dialog-footer">
          <div v-if="activeTab =='baseInfo'">
            <el-button type="primary" @click="activeTab='spouseInfo'">下一页</el-button>
          </div>
          <div v-else-if="activeTab =='spouseInfo'">
            <el-button @click="activeTab='baseInfo'">上一页</el-button>
            <el-button type="primary" @click="activeTab='childInfo'">下一页</el-button>
          </div>
          <div v-else-if="activeTab =='childInfo'">
            <el-button @click="activeTab='spouseInfo'">上一页</el-button>
            <el-button type="primary" @click="activeTab='familyInfo'">下一页</el-button>
          </div>
          <div v-else-if="activeTab =='familyInfo'">
            <el-button @click="activeTab='childInfo'">上一页</el-button>
            <el-button type="primary" @click="confirmEdit()">确定</el-button>
          </div>
          
        </div>
      </template>
    </el-dialog>

    <!-- 添加对话框 -->
    <el-dialog v-model="dialogAddVisible" width="50%" class="custom-dialog" :modal="true">
      <template #default>
        <div class="dialog-scroll-container">
          <el-tabs class="custom-tabs" v-model="activeTab">
            <el-tab-pane name="baseInfo">
              <template #label>
                <span class="tabs-label">户主信息</span>
              </template>
              <BaseInfoEditDialog v-model:state="passed" v-model:rules="rules" v-model:itemInfo="hostInfo"
                :disabled="false">
              </BaseInfoEditDialog>
            </el-tab-pane>
            <el-tab-pane name="spouseInfo">
              <template #label>
                <span class="tabs-label">配偶信息</span>
              </template>
              <BaseInfoEditDialog v-model:state="passed" v-model:rules="rules" v-model:itemInfo="houseHoldInfo"
                :disabled="false">
              </BaseInfoEditDialog>
            </el-tab-pane>
            
            <el-tab-pane name="childInfo">
              <template #label>
                <span class="tabs-label">子女信息</span>
              </template>
              <div class="child-info-container">
                <el-card v-for="(child, index) in itemInfo.ListEnrollChildGrandRequest" 
                        :key="index" 
                        class="child-card">
                  <div class="child-card-content">
                    <div class="child-info">
                      <span>姓名: {{ child.name }}</span>
                      <span>关系: {{ child.relation }}</span>
                      <span>出生日期: {{ child.birthDate }}</span>
                    </div>
                    <div class="child-actions">
                      <el-button type="danger" 
                                size="small" 
                                circle
                                @click="removeChild(index)">
                        <el-icon><Delete /></el-icon>
                      </el-button>
                    </div>
                  </div>
                </el-card>
                
                <!-- 添加子女按钮 -->
                <el-button type="primary" 
                          style="margin-top: 20px;"
                          @click="addChild">
                  添加子女信息
                </el-button>
              </div>
            </el-tab-pane>

            <!-- 添加子女信息对话框 -->
            <el-dialog v-model="childDialogVisible" 
                      title="添加子女信息" 
                      width="50%" 
                      :modal="true">
              <ChildGrandInfoDialog
                v-model:memberInfo="tempChildInfo"
                :disabled="false">
              </ChildGrandInfoDialog>
              <template #footer>
                <div class="dialog-footer">
                  <el-button @click="childDialogVisible = false">取消</el-button>
                  <el-button type="primary" @click="saveChildInfo">确定</el-button>
                </div>
              </template>
            </el-dialog>
            <el-tab-pane name="familyInfo">
              <template #label>
                <span class="tabs-label">家庭情况</span>
              </template>
              <FamilyEditDialog v-model:familyInfo="itemInfo" :disabled="false"></FamilyEditDialog>
            </el-tab-pane>

          </el-tabs>
        </div>
      </template>

      <template #footer>
        <div class="dialog-footer">
          <div v-if="activeTab =='baseInfo'">
            <el-button type="primary" @click="activeTab='spouseInfo'">下一页</el-button>
          </div>
          <div v-else-if="activeTab =='spouseInfo'">
            <el-button @click="activeTab='baseInfo'">上一页</el-button>
            <el-button type="primary" @click="activeTab='childInfo'">下一页</el-button>
          </div>
          <div v-else-if="activeTab =='childInfo'">
            <el-button @click="activeTab='spouseInfo'">上一页</el-button>
            <el-button type="primary" @click="activeTab='familyInfo'">下一页</el-button>
          </div>
          <div v-else-if="activeTab =='familyInfo'">
            <el-button @click="activeTab='childInfo'">上一页</el-button>
            <el-button type="primary" @click="add()">确定</el-button>
          </div>
          
        </div>
      </template>
    </el-dialog>
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