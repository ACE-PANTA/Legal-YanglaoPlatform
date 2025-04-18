<template>
  <div>
    <div class="search-bar">
      <el-input
        v-model="searchName"
        placeholder="请输入户主姓名"
        clearable
        @clear="fetchFamilyList"
        @keyup.enter.native="fetchFamilyList"
      />
      <el-button type="primary" @click="fetchFamilyList">搜索</el-button>
    </div>
    <div class="added-families">
      <el-button type="text" @click="toggleAddedFamilies">
        已添加家庭 ({{ addedFamiliesList.length }})
      </el-button>
      <el-dialog v-model="showAddedFamilies" title="已添加家庭">
        <el-table :data="addedFamiliesList" style="width: 100%">
          <el-table-column prop="listHouseHoldSpouse[0].name" label="户主姓名" />
          <el-table-column label="地址">
            <template #default="{ row }">
              {{ row.provinceName }}{{ row.municipalityName }}{{ row.districtName }}{{ row.townshipStreetsName }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button type="text" @click="removeFamily(row)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
    <el-table :data="familyList" style="width: 100%">
      <el-table-column prop="listHouseHoldSpouse[0].name" label="户主姓名" />
      <el-table-column label="地址">
        <template #default="{ row }">
          {{ row.provinceName }}{{ row.municipalityName }}{{ row.districtName }}{{ row.townshipStreetsName }}
        </template>
      </el-table-column>
      <el-table-column prop="grading" label="等级划分" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="text"
            @click="toggleFamily(row)"
          >
            {{ addedFamilies.has(row.uid) ? '移除' : '添加' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      @current-change="handlePageChange"
    />
    <div class="dialog-footer">
      <el-button @click="$emit('prev')">上一步</el-button>
      <el-button type="primary" @click="handleNext">下一步</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, defineProps, defineEmits } from 'vue';
import { GetBaseInfoList } from '@/api/family';
import { ElMessage } from 'element-plus';

const props = defineProps({
  selectedFamilies: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits(['update:selectedFamilies', 'next', 'prev']);

const familyList = ref([]);
const allFamiliesMap = ref(new Map<number, any>());
const addedFamilies = ref(new Set<number>());
const searchName = ref('');
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});
const showAddedFamilies = ref(false);

// 同步外部 v-model
watch(() => props.selectedFamilies, (val) => {
  addedFamilies.value = new Set(val.map((f: any) => f.uid));
}, { immediate: true });

// 计算属性，始终与 addedFamilies 保持同步
const addedFamiliesList = computed(() =>
  Array.from(addedFamilies.value).map(uid => allFamiliesMap.value.get(uid)).filter(Boolean)
);

// 移除递归 watch
// watch(addedFamiliesList, (val) => {
//   emit('update:selectedFamilies', val);
// });

const fetchFamilyList = async () => {
  const params = {
    districtId: '88888888',
    HouseHoldName: searchName.value,
    page: pagination.value.currentPage,
    pageSize: pagination.value.pageSize,
  };
  const res = await GetBaseInfoList(params, localStorage.getItem('UserRole'));
  if (res.status === 200) {
    familyList.value = res.data.data;
    res.data.data.forEach((family: any) => {
      allFamiliesMap.value.set(family.uid, { ...family });
    });
    pagination.value.total = res.data.total;
  }
};

const handlePageChange = (page: number) => {
  pagination.value.currentPage = page;
  fetchFamilyList();
};

const toggleFamily = (family: any) => {
  const id = family.uid;
  if (addedFamilies.value.has(id)) {
    addedFamilies.value.delete(id);
  } else {
    addedFamilies.value.add(id);
    if (!allFamiliesMap.value.has(id)) {
      allFamiliesMap.value.set(id, { ...family });
    }
  }
  emit('update:selectedFamilies', addedFamiliesList.value);
};

const removeFamily = (family: any) => {
  const id = family.uid;
  addedFamilies.value.delete(id);
  emit('update:selectedFamilies', addedFamiliesList.value);
};

const toggleAddedFamilies = () => {
  showAddedFamilies.value = !showAddedFamilies.value;
};

const handleNext = () => {
  if (!addedFamiliesList.value.length) {
    ElMessage.error('请至少选择一个家庭');
    return;
  }
  emit('next', addedFamiliesList.value);
};

onMounted(() => {
  fetchFamilyList();
});
</script>

<style scoped>
.search-bar {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}
.added-families {
  margin-bottom: 20px;
}
</style>
