<template>
  <div class="area-selector">
    <el-select
      v-model="selected.provinceId"
      placeholder="请选择省份"
      @change="onProvinceChange"
      :style="{ width: '22%' }"
      filterable
      clearable
    >
      <el-option v-for="item in provinces" :key="item.id" :label="item.fullname" :value="item.id" />
    </el-select>
    <el-select
      v-model="selected.cityId"
      placeholder="请选择城市"
      @change="onCityChange"
      :style="{ width: '22%' }"
      :disabled="!selected.provinceId"
      filterable
      clearable
    >
      <el-option v-for="item in cities" :key="item.id" :label="item.fullname" :value="item.id" />
    </el-select>
    <el-select
      v-model="selected.districtId"
      placeholder="请选择区县"
      @change="onDistrictChange"
      :style="{ width: '22%' }"
      :disabled="!selected.cityId"
      filterable
      clearable
    >
      <el-option v-for="item in districts" :key="item.id" :label="item.fullname" :value="item.id" />
    </el-select>
    <el-select
      v-model="selected.streetId"
      placeholder="请选择街道/乡镇"
      @change="onStreetChange"
      :style="{ width: '22%' }"
      :disabled="!selected.districtId"
      filterable
      clearable
    >
      <el-option v-for="item in streets" :key="item.id" :label="item.fullname" :value="item.id" />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import { getRegionsByFatherId } from '@/api/region'

const emit = defineEmits(['update:area'])

const ROOT_UID = 5099263649039605
const ALL_OPTION = { id: '88888888', name: '全部', fullname: '全部', uid: '88888888' }

const provinces = ref<any[]>([ALL_OPTION])
const cities = ref<any[]>([ALL_OPTION])
const districts = ref<any[]>([ALL_OPTION])
const streets = ref<any[]>([ALL_OPTION])

const selected = reactive({
  provinceId: '88888888',
  provinceName: '全部',
  cityId: '88888888',
  cityName: '全部',
  districtId: '88888888',
  districtName: '全部',
  streetId: '88888888',
  streetName: '全部'
})

// 获取省级
const getProvinces = async () => {
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
const getChildren = async (fatherUid: string, targetArr: any[]) => {
  if (fatherUid === ALL_OPTION.uid) {
    targetArr.splice(0, targetArr.length, ALL_OPTION)
    return
  }
  try {
    const res = await getRegionsByFatherId(fatherUid)
    if (res.status === 200) {
      targetArr.splice(0, targetArr.length, ALL_OPTION, ...res.data.data.map(item => ({
        id: item.regionCode,
        name: item.regionName,
        fullname: item.regionName,
        uid: item.uid
      })))
    }
  } catch (error) {
    targetArr.splice(0, targetArr.length, ALL_OPTION)
  }
}

const onProvinceChange = async (val: string) => {
  const p = provinces.value.find(p => p.id === val) || ALL_OPTION
  selected.provinceName = p.name
  selected.cityId = '88888888'
  selected.cityName = '全部'
  selected.districtId = '88888888'
  selected.districtName = '全部'
  selected.streetId = '88888888'
  selected.streetName = '全部'
  await getChildren(p.uid, cities.value)
  districts.value = [ALL_OPTION]
  streets.value = [ALL_OPTION]
  emitArea()
}
const onCityChange = async (val: string) => {
  const c = cities.value.find(c => c.id === val) || ALL_OPTION
  selected.cityName = c.name
  selected.districtId = '88888888'
  selected.districtName = '全部'
  selected.streetId = '88888888'
  selected.streetName = '全部'
  await getChildren(c.uid, districts.value)
  streets.value = [ALL_OPTION]
  emitArea()
}
const onDistrictChange = async (val: string) => {
  const d = districts.value.find(d => d.id === val) || ALL_OPTION
  selected.districtName = d.name
  selected.streetId = '88888888'
  selected.streetName = '全部'
  await getChildren(d.uid, streets.value)
  emitArea()
}
const onStreetChange = (val: string) => {
  const s = streets.value.find(s => s.id === val) || ALL_OPTION
  selected.streetName = s.name
  emitArea()
}

function emitArea() {
  emit('update:area', {
    provinceId: selected.provinceId,
    provinceName: selected.provinceName,
    cityId: selected.cityId,
    cityName: selected.cityName,
    districtId: selected.districtId,
    districtName: selected.districtName,
    streetId: selected.streetId,
    streetName: selected.streetName
  })
}

onMounted(() => {
  getProvinces()
})
</script>

<style scoped>
.area-selector {
  display: flex;
  gap: 3%;
  width: 100%;
  margin-bottom: 1.5vh;
}
</style>
