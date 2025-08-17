<script setup>
import { ref, watch, onMounted } from 'vue'
import { getRegionsByFatherId } from '@/api/region'

const ROOT_UID = 5099263649039605

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits(['update:modelValue'])

const ALL_OPTION = { id: '88888888', name: '全部', fullname: '全部', uid: '88888888' }

const modelValue = ref({
  ProvinceId: '88888888',
  ProvinceName: '全部',
  MunicipalityId: '88888888',
  MunicipalityName: '全部',
  DistrictId: '88888888',
  DistrictName: '全部',
  TownshipStreetsId: '88888888',
  TownshipStreetsName: '全部',
})

const provinces = ref([ALL_OPTION])
const municipalities = ref([ALL_OPTION])
const districts = ref([ALL_OPTION])
const townships = ref([ALL_OPTION])

// 获取省级
const loadProvinces = async () => {
  try {
    const res = await getRegionsByFatherId(ROOT_UID)
    if (res.status === 200) {
      provinces.value = [ALL_OPTION, ...res.data.data.map(item => ({
        id: item.regionCode,
        name: item.regionName,
        fullname: item.regionName,
        uid: item.uid
      }))]
    }
  } catch (error) {
    provinces.value = [ALL_OPTION]
  }
}

// 获取下级
const loadChildren = async (fatherUid, targetArr) => {
  if (fatherUid === ALL_OPTION.uid) {
    targetArr.value = [ALL_OPTION]
    return
  }
  try {
    const res = await getRegionsByFatherId(fatherUid)
    if (res.status === 200) {
      targetArr.value = [ALL_OPTION, ...res.data.data.map(item => ({
        id: item.regionCode,
        name: item.regionName,
        fullname: item.regionName,
        uid: item.uid
      }))]
    }
  } catch (error) {
    targetArr.value = [ALL_OPTION]
  }
}

// 监听 modelValue 的变化并同步到内部数据
watch(
  () => props.modelValue,
  (newVal) => {
    modelValue.value = { ...newVal }
  },
  { immediate: true }
)

// 监听内部数据变化并同步到父组件
watch(
  () => modelValue.value,
  (newVal) => {
    emit('update:modelValue', { ...newVal })
  },
  { deep: true }
)

// 省份变化
watch(
  () => modelValue.value.ProvinceId,
  async (newVal) => {
    const selected = provinces.value.find(p => p.id == newVal) || ALL_OPTION
    modelValue.value.ProvinceName = selected.name
    modelValue.value.MunicipalityId = '88888888'
    modelValue.value.MunicipalityName = '全部'
    modelValue.value.DistrictId = '88888888'
    modelValue.value.DistrictName = '全部'
    modelValue.value.TownshipStreetsId = '88888888'
    modelValue.value.TownshipStreetsName = '全部'
    await loadChildren(selected.uid, municipalities)
    districts.value = [ALL_OPTION]
    townships.value = [ALL_OPTION]
  }
)

// 市级变化
watch(
  () => modelValue.value.MunicipalityId,
  async (newVal) => {
    const selected = municipalities.value.find(m => m.id == newVal) || ALL_OPTION
    modelValue.value.MunicipalityName = selected.name
    modelValue.value.DistrictId = '88888888'
    modelValue.value.DistrictName = '全部'
    modelValue.value.TownshipStreetsId = '88888888'
    modelValue.value.TownshipStreetsName = '全部'
    await loadChildren(selected.uid, districts)
    townships.value = [ALL_OPTION]
  }
)

// 区县变化
watch(
  () => modelValue.value.DistrictId,
  async (newVal) => {
    const selected = districts.value.find(d => d.id == newVal) || ALL_OPTION
    modelValue.value.DistrictName = selected.name
    modelValue.value.TownshipStreetsId = '88888888'
    modelValue.value.TownshipStreetsName = '全部'
    await loadChildren(selected.uid, townships)
  }
)

// 街道变化
watch(
  () => modelValue.value.TownshipStreetsId,
  (newVal) => {
    const selected = townships.value.find(t => t.id == newVal) || ALL_OPTION
    modelValue.value.TownshipStreetsName = selected.name
  }
)

onMounted(() => {
  loadProvinces()
})
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
/* ...existing code... */
</style>