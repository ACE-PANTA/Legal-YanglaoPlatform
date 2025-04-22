<template>
    <div>
        <h2>审批消息盒子 
            <el-button circle @click="getAllowList">
                <el-icon><Refresh /></el-icon>
            </el-button> 
        </h2>
        <div class="tabs">
            <button :class="{ active: activeTab === 'pending' }" @click="activeTab = 'pending'">待审批</button>
            <button :class="{ active: activeTab === 'approved' }" @click="activeTab = 'approved'">已审批</button>
        </div>
        <div v-if="activeTab === 'pending'">
            <CustomList 
                :items="pendingMessages" 
                :approve="true" 
                :reject="true" 
                @approve="approveMessage" 
                @reject="rejectMessage" 
            />
        </div>
        <div v-else>
            <CustomList :items="approvedMessages" />
        </div>
        <el-dialog v-model="reasonDialog"> 
            <template #title><div style="font-size: larger;font-weight: 600;">{{ msg }}理由填写</div></template>
            <el-input v-model="reason" placeholder="请填写理由"></el-input>
            <template #footer>
                <el-button @click="reasonDialog=false">取消</el-button>
                <el-button type="danger" @click="confirmHandle">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import CustomList from './CustomList.vue';
import {getPermissionToBeChecked,getCheckedPermission,confirmRegionRequest,denyRegionRequest} from '@/api/region'

export default {
    name: 'AllowDelete',
    components: { CustomList },
    data() {
        return {
            activeTab: 'pending',
            pendingMessages: [],
            approvedMessages: [],
            reason:'',
            reasonDialog:false,
            msg:'',
            selectedId:''
        };
    },
    methods: {
        confirmHandle(){
            if(this.reason=='')
            {
                ElMessage.warning('请填写理由')
                return
            }
            let form={
                RequestId:this.selectedId,
                ReviewNote:this.reason
            }
            if(this.msg=='同意')
            {
                confirmRegionRequest(form)
                .then(res=>{
                    if(res.status==200)
                    {
                        ElMessage.success('审批通过，已同意进行该操作')
                        this.selectedId=''
                        this.reason=''
                        this.reasonDialog=false
                        this.getAllowList()
                    }
                })
                .catch((err)=>{
                    if(err.response&&err.response.data)
                    {
                        ElMessage.error(err.response.data.message)
                    }
                    else
                    {
                        ElMessage.error('服务出错，请检查网络配置或权限配置')
                    }
                }
                )
            }
            else{
                denyRegionRequest(form)
                .then(res=>{
                    if(res.status==200)
                    {
                        ElMessage.warning('审批未通过，已拒绝进行该操作')
                        this.selectedId=''
                        this.reason=''
                        this.reasonDialog=false
                        this.getAllowList()
                    }
                })
                .catch((err)=>{
                    if(err.response&&err.response.data)
                    {
                        ElMessage.error(err.response.data.message)
                    }
                    else
                    {
                        ElMessage.error('服务出错，请检查网络配置或权限配置')
                    }
                }
                )
            }
        },
        approveMessage(id) {
            this.reasonDialog=true
            this.msg='同意'
            this.selectedId=id
        },
        rejectMessage(id) {
            this.reasonDialog=true
            this.msg='拒绝'
            this.selectedId=id
        },
        getAllowList(){
            getPermissionToBeChecked()
            .then(res=>{
                if(res.status==200)
                {
                    this.pendingMessages=res.data
                }
                
            })
            getCheckedPermission()
            .then(res=>{
                if(res.status==200)
                {
                    this.approvedMessages=res.data
                }
                
            })
        }
    },
    mounted(){
        this.getAllowList()
    }
};
</script>

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

.tabs {
  margin-top: 5px;
  display: flex;
  margin-bottom: 10px;
}

.tabs button {
  padding: 10px 20px;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
  margin-right: 5px;
}

.tabs button.active {
  background: #007bff;
  color: white;
}

.tabs button:hover {
  background: #0056b3;
  color: white;
}
</style>
