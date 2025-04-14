<script setup>
import { ref } from 'vue';

const props = defineProps({
  node: Object,
});

const emit = defineEmits(['toggle']);
</script>

<template>
  <li class="tree-node">
    <div class="node-content">
      <button v-if="node.children.length" @click="emit('toggle', node)">
        {{ node.expanded ? '-' : '+' }}
      </button>
      <div class="node-info" style="width: 15vw;">
        <h3>{{ node.regionName }}</h3>
        <p>区域主管: {{ node.authorizedToName }}</p>
      </div>
      <div class="node-info" style="width: 12vw;">
        <h3>&nbsp; </h3>
        <p>授权者: {{ node.authorizerName }}</p>
      </div>
      <div class="node-info" style="width: 17vw;" v-if="node.createdAt">
        <h3>&nbsp; </h3>
        <p>授权时间: {{ node.createdAt? node.createdAt.replace('T',' ').split('.')[0]:'' }}</p>
      </div>
      <div class="node-info" style="width: 15vw;">
        <h3>&nbsp; </h3>
        <p>行政区划编码: {{ node.regionId }}</p>
      </div>
    </div>
    <ul v-if="node.expanded" class="children">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        @toggle="$emit('toggle', $event)"
      />
    </ul>
  </li>
</template>

<style scoped>
h3{
  color: #3b3b3b;
}
.tree-node {
  position: relative;
  margin: 10px 0;
}

.node-content {
  display: flex;
  align-items: center;
  background: #fcfcfc;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.node-content button {
  margin-right: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  padding: 5px 10px;
}

.node-content button:hover {
  background: #0056b3;
}

.node-info h3 {
  margin: 0;
  font-size: 16px;
}

.node-info p {
  margin: 5px 0 0;
  font-size: 14px;
  color: #666;
}

.children {
  list-style: none;
  padding-left: 0.7vw;
  margin: 0;
  margin-left: 1.2vw;
  border-left: 2px solid #ccc;
}
</style>
