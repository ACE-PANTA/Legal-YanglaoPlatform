<script setup>
import { ref, watch, onMounted } from 'vue';
import { jsonp } from 'vue-jsonp';

// 修改为接收父组件的 v-model 绑定
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  }
});

const emit = defineEmits(['update:modelValue']);

const ALL_OPTION = { id: '88888888', name: '全部', fullname: '全部' };

const modelValue = ref({
  ProvinceId: '88888888',
  MunicipalityId: '88888888',
  DistrictId: '88888888',
  TownshipStreetsId: '88888888',
});

const provinces = ref([]);
const municipalities = ref([ALL_OPTION]);
const districts = ref([ALL_OPTION]);
const townships = ref([ALL_OPTION]);

const MUNICIPALITIES = ['110000', '120000', '310000', '500000'];

const loadProvinces = async () => {
  try {
    const res = await jsonp('https://apis.map.qq.com/ws/district/v1/list', {
      key: 'LXLBZ-HP66Q-PYL5K-B74JY-IFTMK-RYFV2',
      output: 'jsonp',
    });
    if (res.status === 0) {
      provinces.value = [ALL_OPTION, ...res.result[0]];
    }
  } catch (error) {
    console.error('获取省份数据失败:', error);
    provinces.value = [ALL_OPTION];
  }
};

const loadChildren = async (id, level) => {
  if (id === ALL_OPTION.id) {
    if (level === 1) municipalities.value = [ALL_OPTION];
    else if (level === 2) districts.value = [ALL_OPTION];
    else if (level === 3) townships.value = [ALL_OPTION];
    return;
  }

  try {
    const res = await jsonp('https://apis.map.qq.com/ws/district/v1/getchildren', {
      key: 'LXLBZ-HP66Q-PYL5K-B74JY-IFTMK-RYFV2',
      id,
      output: 'jsonp',
    });
    if (res.status === 0) {
      if (level === 1) {
        municipalities.value = [ALL_OPTION, ...res.result[0]];
      } else if (level === 2) {
        districts.value = [ALL_OPTION, ...res.result[0]];
      } else if (level === 3) {
        townships.value = [ALL_OPTION, ...res.result[0]];
      }
    }
  } catch (error) {
    console.error('获取下级行政区失败:', error);
    if (level === 1) municipalities.value = [ALL_OPTION];
    else if (level === 2) districts.value = [ALL_OPTION];
    else if (level === 3) townships.value = [ALL_OPTION];
  }
};

// 监听 modelValue 的变化并同步到内部数据
watch(
  () => props.modelValue,
  (newVal) => {
    modelValue.value = { ...newVal };
  },
  { immediate: true }
);

// 监听内部数据变化并同步到父组件
watch(
  () => modelValue.value,
  (newVal) => {
    emit('update:modelValue', { ...newVal });
  }
);

watch(
  () => modelValue.value.ProvinceId,
  async (newVal) => {
    if (newVal) {
      modelValue.value.MunicipalityId = '88888888';
      modelValue.value.DistrictId = '88888888';
      modelValue.value.TownshipStreetsId = '88888888';
      if (MUNICIPALITIES.includes(newVal)) {
        municipalities.value = [ALL_OPTION];
        await loadChildren(newVal, 2);
      } else {
        await loadChildren(newVal, 1);
      }
    } else {
      municipalities.value = [ALL_OPTION];
      districts.value = [ALL_OPTION];
      townships.value = [ALL_OPTION];
    }
  }
);

watch(
  () => modelValue.value.MunicipalityId,
  async (newVal) => {
    if (newVal) {
      modelValue.value.DistrictId = '88888888';
      modelValue.value.TownshipStreetsId = '88888888';
      await loadChildren(newVal, 2);
    } else {
      districts.value = [ALL_OPTION];
      townships.value = [ALL_OPTION];
    }
  }
);

watch(
  () => modelValue.value.DistrictId,
  async (newVal) => {
    if (newVal) {
      modelValue.value.TownshipStreetsId = '88888888';
      await loadChildren(newVal, 3);
    } else {
      townships.value = [ALL_OPTION];
    }
  }
);

onMounted(() => {
  loadProvinces();
});
</script>

<template>
  <div style="display: flex; gap: 10px;">
    <el-select v-model="modelValue.ProvinceId" placeholder="选择省" style="width: 150px;">
      <el-option v-for="province in provinces" :key="province.id" :label="province.fullname" :value="province.id" />
    </el-select>

    <el-select v-model="modelValue.MunicipalityId" placeholder="选择市" style="width: 150px;" :disabled="!municipalities.length">
      <el-option v-for="municipality in municipalities" :key="municipality.id" :label="municipality.fullname" :value="municipality.id" />
    </el-select>

    <el-select v-model="modelValue.DistrictId" placeholder="选择区/县" style="width: 150px;" :disabled="!districts.length">
      <el-option v-for="district in districts" :key="district.id" :label="district.fullname" :value="district.id" />
    </el-select>

    <el-select v-model="modelValue.TownshipStreetsId" placeholder="选择乡/街道" style="width: 150px;" :disabled="!townships.length">
      <el-option v-for="township in townships" :key="township.id" :label="township.fullname" :value="township.id" />
    </el-select>
  </div>
</template>

<style scoped>
/* 样式调整 */
</style>