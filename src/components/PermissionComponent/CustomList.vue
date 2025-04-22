<template>
    <ul class="list">
        <li v-for="item in items" :key="item.id" class="list-item">
            <div style="display: flex;flex-direction: column;"> 
                <div>申请人：{{ item.requesterName }}</div>
                <div>区划：&nbsp;&nbsp;&nbsp;{{ item.provinceName }}{{ item.municipalityName }}{{ item.districtName }}{{ item.townshipStreetsName }}</div>
            </div>
            <div style="display: flex;flex-direction: column;">
                <div>申请时间：{{ item.createdAt.replace('T',' ') }}</div> 
                <div>申请理由：{{ item.reason }}</div>
                <div v-if="item.requestType==0">分配权限请求</div>
                <div v-else>删除权限请求</div>
            </div>
            <div style="display: flex;flex-direction: column;">
                <div>申请类型:<div v-if="item.requestType==0" style="color: green;">分配权限请求</div>
                  <div v-else style="color: red;">删除权限请求</div>
                </div> 
                
            </div>
            <div v-if="approve && reject" class="actions">
                <button @click="$emit('approve', item.uid)">同意</button>
                <button @click="$emit('reject', item.uid)">拒绝</button>
            </div>
            <div v-else style="width: 12vw;">
                <div v-if="item.status==1" style="color: green;font-weight: 600;">已同意</div>
                <div v-else style="color: red;font-weight: 600;">已拒绝</div>
                <div v-if="item.reviewNote">审批意见：{{ item.reviewNote }}</div>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'CustomList',
    props: {
        items: {
            type: Array,
            required: true
        },
        approve: {
            type: Boolean,
            default: false
        },
        reject: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style scoped>
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fcfcfc;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.actions button {
  margin-left: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.actions button:first-child {
  background: #28a745;
  color: white;
}

.actions button:first-child:hover {
  background: #218838;
}

.actions button:last-child {
  background: #dc3545;
  color: white;
}

.actions button:last-child:hover {
  background: #c82333;
}
</style>
