<template>
    <div v-if="currentSection === 'main'" class="button-container">
        <button @click="switchSection('household')">户主信息</button>
        <button @click="switchSection('spouse')">配偶信息</button>
        <button @click="switchSection('children')">子女信息</button>
        <button @click="switchSection('family')">家庭情况</button>
    </div>
    <HouseholdInfo v-if="currentSection === 'household'" @goBack="switchSection('main')" :data="householdData" />
    <SpouseInfo v-else-if="currentSection === 'spouse'" @goBack="switchSection('main')" :data="spouseData" />
    <ChildrenInfo v-else-if="currentSection === 'children'" @goBack="switchSection('main')" :data="data.listChildGrand" />
    <FamilyInfo v-else-if="currentSection === 'family'" @goBack="switchSection('main')" :data="data" />
</template>

<script lang="ts">
export default {
    name: 'DetailShowDialog',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    computed: {
        householdData() {
            return this.data.listHouseHoldSpouse.find(item => item.relation === '户主') || {};
        },
        spouseData() {
            return this.data.listHouseHoldSpouse.find(item => item.relation === '配偶') || {};
        }
    }
}
</script>

<script lang="ts" setup>
import { ref } from 'vue';
import HouseholdInfo from './HouseholdInfo.vue';
import SpouseInfo from './SpouseInfo.vue';
import ChildrenInfo from './ChildrenInfo.vue';
import FamilyInfo from './FamilyInfo.vue';

const currentSection = ref('main');

function switchSection(section: string) {
    currentSection.value = section;
}
</script>

<style scoped>
.button-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 400px;
    margin: 50px auto;
}

button {
    padding: 15px 20px;
    font-size: 16px;
    border: none;
    border-radius: 10px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

button:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    background-color: #0056b3;
}
</style>