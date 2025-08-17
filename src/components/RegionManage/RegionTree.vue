<template>
  <div class="region-tree">
    <RegionNode
      v-for="node in treeData"
      :key="node.uid"
      :node="node"
      @edit="$emit('edit', $event)"
      @add="$emit('add', $event.node, $event.level)"
      @delete="$emit('delete', $event)"
      @refresh="$emit('refresh',$event)"
      @load-children="(...args) => $emit('load-children', ...args)"
    />
  </div>
</template>

<script setup>
import RegionNode from './RegionNode.vue'
defineProps({
  treeData: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.region-tree {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  padding: 24px;
  margin: 0 auto;
  max-width: 900px;
}
</style>
