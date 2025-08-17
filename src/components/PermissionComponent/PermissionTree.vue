<script setup>
import { onMounted, ref } from 'vue';
import TreeNode from './TreeNode.vue'; // 确保正确引入 TreeNode 组件
import { getPermissionTree } from '@/api/region';

const treeData = ref({
  uid:'',
  regionName:'',
  authorizedToName:'',
  children:[],
  expanded:true
});

const getTree= ()=>{
  getPermissionTree()
  .then(res=>{
    if(res.status==200)
    {
      console.log(res);
      treeData.value=res.data
    }
    
  })
}


const toggleNode = (node) => {
  node.expanded = !node.expanded;
};

onMounted(()=>{
  getTree();
})
</script>

<template>
  <div class="tree-container">
    <h2>我管辖的区域</h2>
    <ul class="tree">
      <TreeNode :node="treeData" @toggle="toggleNode" />
    </ul>
  </div>
</template>

<style scoped>
.tree-container {
  font-family: Arial, sans-serif;
  width: 100%;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h2 {
  margin-bottom: 30px;
  color: rgb(83, 83, 83);
  font-weight: 600;
}

.tree {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}
</style>
