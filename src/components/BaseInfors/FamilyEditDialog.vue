<template>
  <el-form :model="familyInfo" label-width="120px" :disabled="disabled" style="display: flex;flex-direction: column;">
    <el-form-item label="等级划分" prop="grading">
      <el-select placeholder="请选择等级划分" v-model="familyInfo.grading">
        <el-option label="红" value="红" />
        <el-option label="橙" value="橙" />
        <el-option label="黄" value="黄" />
        <el-option label="绿" value="绿" />
      </el-select>
    </el-form-item>
    <el-form-item label="家庭年收入(元)" prop="annualIncome">
      <el-input v-model="familyInfo.annualIncome" />
    </el-form-item>
    <el-form-item label="家庭年支出(元)" prop="annualExpenditure">
      <el-input v-model="familyInfo.annualExpenditure" />
    </el-form-item>
    
    <div class="title">行政区划</div>
    
    <el-form-item label="省份" prop="ProvinceId">
      <el-select 
        v-model="familyInfo.ProvinceId" 
        placeholder="请选择省份"
        @change="handleProvinceChange"
      >
        <el-option 
          v-for="item in provinces"
          :key="item.id"
          :label="item.fullname"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    
    <el-form-item v-if="!MUNICIPALITIES.includes(familyInfo.ProvinceId)" label="城市" prop="MunicipalityId">
      <el-select 
        v-model="familyInfo.MunicipalityId" 
        placeholder="请选择城市"
        @change="handleCityChange"
        :disabled="!familyInfo.ProvinceId"
      >
        <el-option 
          v-for="item in cities"
          :key="item.id"
          :label="item.fullname"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    
    <el-form-item label="区县" prop="DistrictId">
      <el-select 
        v-model="familyInfo.DistrictId" 
        placeholder="请选择区县"
        @change="handleDistrictChange"
        :disabled="!MUNICIPALITIES.includes(familyInfo.ProvinceId) && !familyInfo.MunicipalityId"
      >
        <el-option 
          v-for="item in districts"
          :key="item.id"
          :label="item.fullname"
          :value="item.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="街道/乡镇" prop="TownshipStreetsId">
      <el-select 
        v-model="familyInfo.TownshipStreetsId" 
        placeholder="请选择街道/乡镇"
        @change="handleStreetChange"
        :disabled="!familyInfo.DistrictId"
      >
        <el-option 
          v-for="item in streets"
          :key="item.id"
          :label="item.fullname"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
export default {
  name: 'FamilyEditDialog'
}
</script>

<script setup lang="ts">

import { ref, defineProps, PropType, onMounted } from 'vue'
import type { BasicInfTemplate } from '@/models'
import { jsonp } from 'vue-jsonp'
import { ElMessage } from 'element-plus'

// 区域数据接口
interface DistrictItem {
  id: string
  fullname: string
  name: string
  type?: number
  children?: DistrictItem[]
}

const props = defineProps({
  familyInfo: {
    type: Object as PropType<BasicInfTemplate>,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const MUNICIPALITIES = ['110000', '120000', '310000', '500000']  // 北京、天津、上海、重庆

// 区域数据
const provinces = ref<DistrictItem[]>([])
const cities = ref<DistrictItem[]>([])
const districts = ref<DistrictItem[]>([])
const streets = ref<DistrictItem[]>([])

const addDefaultOption = (list: DistrictItem[]) => [{ id: '88888888', fullname: '全部' }, ...list];

// 获取省份数据
const getProvinces = async () => {
  try {
    const res = await jsonp('https://apis.map.qq.com/ws/district/v1/list', {
      key: 'LXLBZ-HP66Q-PYL5K-B74JY-IFTMK-RYFV2',
      output: 'jsonp'
    })
    if (res.status === 0) {
      provinces.value = addDefaultOption(res.result[0])
    }
  } catch (error) {
    ElMessage.error('获取省份数据失败')
  }
}

// 获取下级行政区
const getChildren = async (id: string, level: number) => {
  try {
    const res = await jsonp('https://apis.map.qq.com/ws/district/v1/getchildren', {
      key: 'LXLBZ-HP66Q-PYL5K-B74JY-IFTMK-RYFV2',
      id: id,
      output: 'jsonp'
    })

    if (res.status === 0) {
      if (level === 1) {
        cities.value = addDefaultOption(res.result[0])
      } else if (level === 2) {
        districts.value = addDefaultOption(res.result[0])
      } else if (level === 3) {
        streets.value = addDefaultOption(res.result[0])
      }
    }
  } catch (error) {
    ElMessage.error('获取下级行政区失败')
  }
}

// 选择处理方法
const handleProvinceChange = async (value: string) => {
  props.familyInfo.ProvinceId = value
  props.familyInfo.ProvinceName = provinces.value.find(p => p.id === value)?.fullname || ''
  props.familyInfo.MunicipalityId = ''
  props.familyInfo.MunicipalityName = ''
  props.familyInfo.DistrictId = ''
  props.familyInfo.DistrictName = ''
  props.familyInfo.TownshipStreetsId = ''
  props.familyInfo.TownshipStreetsName = ''

  if (value) {
    if (MUNICIPALITIES.includes(value)) {
      // 如果是直辖市，直接加载区县
      await getChildren(value, 2)
    } else {
      // 普通省份加载城市
      await getChildren(value, 1)
    }
  }
}

const handleCityChange = async (value: string) => {
  props.familyInfo.MunicipalityId = value
  props.familyInfo.MunicipalityName = cities.value.find(c => c.id === value)?.fullname || ''
  props.familyInfo.DistrictId = ''
  props.familyInfo.DistrictName = ''
  props.familyInfo.TownshipStreetsId = ''
  props.familyInfo.TownshipStreetsName = ''
  
  if (value) {
    await getChildren(value, 2)
  }
}

const handleDistrictChange = async (value: string) => {
  props.familyInfo.DistrictId = value
  props.familyInfo.DistrictName = districts.value.find(d => d.id === value)?.fullname || ''
  props.familyInfo.TownshipStreetsId = ''
  props.familyInfo.TownshipStreetsName = ''
  
  if (value) {
    await getChildren(value, 3)
  }
}

const handleStreetChange = (value: string) => {
  props.familyInfo.TownshipStreetsId = value
  props.familyInfo.TownshipStreetsName = streets.value.find(s => s.id === value)?.fullname || ''
}

onMounted(async () => {
  await getProvinces()
  
  // 如果已有省份数据，加载下级区域
  if (props.familyInfo.ProvinceId) {
    await getChildren(props.familyInfo.ProvinceId, 1)
    if (props.familyInfo.MunicipalityId) {
      await getChildren(props.familyInfo.MunicipalityId, 2)
      if (props.familyInfo.DistrictId) {
        await getChildren(props.familyInfo.DistrictId, 3)
      }
    }
  }
})
</script>

<style scoped>
.title{
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
    color: #3382f1;
    border-bottom: dashed 1px #c8c8ff;
    padding-bottom: 3px;
}
</style>
