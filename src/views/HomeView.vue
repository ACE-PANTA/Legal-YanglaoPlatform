<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMainStore } from '@/store';
const store=useMainStore();
const index=ref('')

const isCollapse = ref(false);
const router = useRouter();
const showUrl=ref('');
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
const permission=ref(0)

let userName = ref('');
const defaultAvatarUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');

onMounted(() => {
  userName.value = store.userInfo.name.toString();
  showUrl.value = store.avatarUrl;
  index.value='/'+useRoute().path.split('/')[2];
  permission.value=Number(store.userInfo.havePermissionLevel);
});

const handleCommand = (command: string) => {
  if (command === 'personal') {
    router.push('/home/personalCenter');
  } else if (command === 'logout') {
    // 清除存储的信息
    localStorage.removeItem('Uid');
    localStorage.removeItem('Authorization');
    localStorage.removeItem('UserName');
    store.$state.avatarUrl=''
    store.$state.userInfo=null
    // 跳转到登录页
    router.push('/login');
  }
};
</script>

<template>
  <div style="height:100vh; background-color: #f3f3f3f3;">
    <el-container style="height:100vh">
      <el-header>
        <div id="topTitle">
          <el-icon>
            <el-icon><img src="/logo.jpg" style="width: 130%;aspect-ratio: 1/1;margin-right: 50%;"></el-icon>
          </el-icon>
            计生特殊家庭全方位帮扶云平台
        </div>
        <div style="display: flex; align-items: center;">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar 
                :src="showUrl || defaultAvatarUrl" 
                :size="32"
                style="margin-right: 8px"
              />
              {{ userName }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-container style="height:100%">
        <el-aside :width="isCollapse ? '64px' : '240px'" height="100%">
          <el-menu 
            :default-active="index"
            router 
            :collapse="isCollapse" 
            :collapse-transition="true"
          >
            <el-menu-item @click="isCollapse = !isCollapse">
              <el-icon v-if="!isCollapse">
                <Fold />
              </el-icon>
              <el-icon v-else>
                <Expand />
              </el-icon>
            </el-menu-item>
            <el-menu-item index="/basicInf" route="/home/basicInf">
              <el-icon>
                <EditPen />
              </el-icon>
              <span>基本情况登记</span>
            </el-menu-item>
            <!-- <el-menu-item index="/visitRecord" route="/home/visitRecord">
              <el-icon>
                <View />
              </el-icon>
              <span>探访记录</span>
            </el-menu-item> -->
            <el-menu-item index="/volunteer" route="/home/volunteer">
              <el-icon>
                <svg t="1743086385686" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7546" width="200" height="200"><path d="M50.176 1024C30.72 1024 15.36 1008.128 15.36 989.184c0-120.32 46.592-233.472 132.096-318.976 46.08-46.08 102.4-82.432 163.328-104.448-40.96-24.064-75.776-58.368-101.376-98.816-31.232-48.64-47.616-104.96-47.616-162.816C162.304 136.704 298.496 0 466.432 0c81.408 0 157.696 31.744 215.04 89.088s89.088 133.632 89.088 215.04c0 167.424-136.704 304.128-304.128 304.128-3.584 0-7.168 0-11.264-0.512-97.28 2.56-188.928 37.376-258.048 106.496-72.192 72.192-112.128 167.936-112.128 269.312 0.512 19.456-11.776 40.448-34.816 40.448z m416.256-479.232c1.536 0 3.072 0 5.12 0.512 130.048-2.56 236.032-110.592 236.032-241.152 0-132.608-108.032-241.152-241.152-241.152S225.28 171.52 225.28 304.128c0 129.024 100.864 234.496 229.888 240.64h11.264z" p-id="7547"></path><path d="M755.712 1017.344c-9.728 0-18.432-3.072-26.112-8.704-4.608-4.096-119.296-92.672-164.864-164.864-16.384-26.112-36.864-58.368-36.864-105.984 0-81.408 60.928-147.456 136.192-147.456 34.304 0 67.072 13.824 92.16 38.912 25.088-25.088 57.856-38.912 92.16-38.912 74.752 0 136.192 66.048 136.192 147.456 0 47.616-20.48 79.872-36.864 105.984-46.08 72.704-160.256 160.768-164.864 164.864-8.704 5.632-17.92 8.704-27.136 8.704z m-92.16-362.496c-40.96 0-74.24 37.376-74.24 82.944 0 26.112 11.776 46.592 27.136 70.656 32.768 51.712 113.152 118.784 139.776 140.288 26.112-21.504 106.496-88.064 139.776-140.288 15.36-24.064 27.136-44.032 27.136-70.656 0-46.08-33.28-82.944-74.24-82.944-29.184 0-55.808 19.456-67.584 48.64l-5.12 10.752h-3.072c-4.608 4.096-10.752 6.144-16.896 6.144-6.656 0-12.8-2.56-17.92-7.168l-2.048 0.512-4.608-10.24c-12.288-29.696-38.912-48.64-68.096-48.64z" p-id="7548"></path></svg>
              </el-icon>
              <span>志愿者列表</span>
            </el-menu-item>
            <!-- <el-menu-item index="2-7" route="/volunteerService">
              <el-icon>
                <Document />
              </el-icon>
              <span>志愿者服务表</span>
            </el-menu-item> -->
            <el-menu-item index="/activity" route="/home/activity">
              <el-icon>
                <svg t="1743086349354" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6446" width="200" height="200"><path d="M286.986 130.181a263.37 263.37 0 0 0-59.233 40.376c-47.757 43.127-78.81 102.341-85.057 179.386-0.726 8.948 5.94 16.789 14.887 17.514 8.948 0.726 16.789-5.94 17.514-14.887 5.553-68.488 32.638-120.134 74.443-157.887 16.517-14.915 34.235-26.601 51.918-35.393 6.146-3.056 11.822-5.523 16.869-7.447 2.909-1.11 4.877-1.768 5.745-2.024 8.612-2.534 13.539-11.57 11.004-20.181-2.534-8.612-11.57-13.539-20.18-11.005-5.92 1.742-15.64 5.448-27.91 11.548zM747.402 804.834c148.867 0 268.471-139.238 268.471-309.874 0-170.637-119.604-309.874-268.47-309.874-39.925 0-78.624 10.064-113.954 29.188l15.475 28.589c30.639-16.585 64.031-25.27 98.478-25.27 129.724 0 235.963 123.68 235.963 277.367S877.126 772.326 747.402 772.326c-79.617 0-152.795-46.844-196.43-123.705l-28.27 16.049c49.173 86.615 132.824 140.164 224.7 140.164z" fill="" p-id="6447"></path><path d="M654.204 381.968c0-193.803-138.266-349.46-306.785-349.46-168.518 0-306.784 155.657-306.784 349.46 0 193.803 138.266 349.46 306.784 349.46 168.519 0 306.785-155.657 306.785-349.46z m-646.077 0C8.127 171.013 160.033 0 347.419 0c187.386 0 339.293 171.013 339.293 381.968S534.805 763.937 347.419 763.937 8.127 592.923 8.127 381.968z" fill="" p-id="6448"></path><path d="M315.906 759.266c-18.66 34.194-22.232 72.028-0.499 108.964 30.447 51.744 35.767 62.916 35.735 80.281-0.024 12.505-5.366 25.098-18.2 40.402-5.769 6.878-4.869 17.13 2.01 22.898 6.878 5.768 17.13 4.869 22.898-2.01 17.413-20.763 25.76-40.44 25.8-61.229 0.048-26.02-5.855-38.416-40.225-96.828-15.129-25.71-12.662-51.84 1.017-76.905 4.273-7.83 8.477-13.475 10.969-16.21 6.046-6.636 5.567-16.916-1.069-22.962-6.635-6.045-16.916-5.567-22.961 1.069-4.12 4.52-9.832 12.19-15.475 22.53zM718.689 797.615c-14.29 20.949-17.16 45.26-0.172 68.356 18.713 25.441 22.174 31.256 22.16 37.56-0.01 3.888-2.49 8.566-9.632 15.379-6.496 6.196-6.738 16.485-0.542 22.98 6.196 6.495 16.485 6.738 22.98 0.542 13.023-12.423 19.669-24.955 19.701-38.825 0.04-16.835-3.981-23.59-28.48-56.897-7.587-10.316-6.43-20.12 0.84-30.775 2.445-3.585 4.855-6.174 6.111-7.277 6.746-5.923 7.412-16.193 1.49-22.938-5.924-6.746-16.194-7.412-22.94-1.49-3.15 2.768-7.351 7.28-11.516 13.385z" fill="" p-id="6449"></path></svg>
              </el-icon>
              <span>志愿者活动表</span>
            </el-menu-item>
            <el-menu-item index="/employee" route="/home/employee">
              <el-icon>
                <svg t="1743086430573" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9511" width="200" height="200"><path d="M512 56.888889a199.111111 199.111111 0 1 1 0 398.222222 199.111111 199.111111 0 0 1 0-398.222222z m0 56.888889a142.222222 142.222222 0 1 0 0 284.444444 142.222222 142.222222 0 0 0 0-284.444444z m0 412.444444c113.891556 0 211.057778 40.277333 291.669333 120.775111 80.497778 80.554667 120.775111 177.777778 120.775111 291.669334h-56.888888c0-98.190222-34.702222-181.987556-104.106667-251.448889-60.074667-60.017778-130.844444-94.094222-212.366222-102.172445l77.880889 252.984889L512 984.177778l-107.52-134.485334-9.443556-11.719111 77.880889-252.984889c-81.521778 8.078222-152.291556 42.154667-212.309333 102.229334C191.146667 756.622222 156.444444 840.476444 156.444444 938.666667h-56.888888c0-113.891556 40.277333-211.057778 120.775111-291.669334C300.942222 566.556444 398.108444 526.222222 512 526.222222z m0 125.155556l-53.703111 174.648889L512 893.155556l53.703111-67.128889L512 651.377778z" fill="#7D818E" p-id="9512"></path></svg>
              </el-icon>
              <span>工作人员记录表</span>
            </el-menu-item>
            <el-menu-item index="/task" route="/home/task" v-if="permission==4">
              <el-icon>
                <svg t="1742630238698" class="icon" viewBox="0 0 1038 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="3481" width="200" height="200">
                  <path
                    d="M892.908564 1023.979235H145.357208a41.530631 41.530631 0 0 1-41.530631-41.509866V151.835986a41.530631 41.530631 0 0 1 41.530631-41.53063h166.122524a20.765315 20.765315 0 0 1 0 41.53063 19.996999 19.996999 0 0 1-10.465719-3.239389H166.122523a20.765315 20.765315 0 0 0-20.765315 20.765316v795.58153a20.765315 20.765315 0 0 0 20.765315 20.765315h706.020725a20.765315 20.765315 0 0 0 20.765316-20.765315V169.361913a20.765315 20.765315 0 0 0-20.765316-20.765316h-114.126173a19.996999 19.996999 0 0 1-10.465719 3.239389 20.765315 20.765315 0 1 1 0-41.53063h145.357208a41.530631 41.530631 0 0 1 41.530631 41.53063v830.633383a41.530631 41.530631 0 0 1-41.530631 41.509866zM269.949101 452.953826a10.382658 10.382658 0 0 1 10.382657-10.403423h477.602255a10.382658 10.382658 0 0 1 10.382658 10.403423v20.765315a10.382658 10.382658 0 0 1-10.382658 10.361892h-477.602255a10.382658 10.382658 0 0 1-10.382657-10.361892v-20.765315z m10.382657 363.39302h477.602255a10.382658 10.382658 0 0 1 10.382658 10.361892v20.765315a10.382658 10.382658 0 0 1-10.382658 10.403424h-477.602255a10.382658 10.382658 0 0 1-10.382657-10.403424v-20.765315a10.382658 10.382658 0 0 1 10.382657-10.361892z m-10.382657-176.505182a10.382658 10.382658 0 0 1 10.382657-10.403423h477.602255a10.382658 10.382658 0 0 1 10.382658 10.403423v20.744551a10.382658 10.382658 0 0 1-10.382658 10.403423h-477.602255a10.382658 10.382658 0 0 1-10.382657-10.403423v-20.744551zM612.057672 134.849958a10.361892 10.361892 0 0 1-14.681078 0L539.898201 77.392331v250.969602a10.382658 10.382658 0 0 1-10.382657 10.382658h-20.765316a10.382658 10.382658 0 0 1-10.382658-10.382658V77.392331l-57.478393 57.457627a10.361892 10.361892 0 0 1-14.681078 0l-14.681078-14.681078a10.382658 10.382658 0 0 1 0-14.681078l80.133353-80.133352a10.278831 10.278831 0 0 1 2.927909-7.953116l4.651431-4.672196a10.424188 10.424188 0 0 1 5.378216-5.357451l4.651431-4.651431c2.720256-2.741022 6.395717-2.948675 9.863525-2.014235 3.467808-0.934439 7.143269-0.726786 9.863525 2.014235l4.65143 4.651431c2.408777 1.038266 4.319186 2.96944 5.378217 5.357451l4.651431 4.672196a10.278831 10.278831 0 0 1 2.927909 7.953116l80.133352 80.133352a10.382658 10.382658 0 0 1 0 14.681078l-14.681078 14.681078z"
                    fill="" p-id="3482"></path>
                </svg>
              </el-icon>
              <span>任务发布</span>
            </el-menu-item>
            <el-menu-item index="/permission" route="/home/permission">
              <el-icon><LocationInformation /></el-icon>
              <span>行政区域-工作划分</span>
            </el-menu-item>
            <el-menu-item>
              <el-icon><Connection /></el-icon>
              <span>资源管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="content">
          <div>
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
#topTitle {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 1000;
    color: rgb(65, 114, 212);
}
.el-header {
  background-color: #FFFFFF;
  display: flex;
  font-size: 14px;
  position: relative;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #ebebeb;
  background-color: #fff;
  color: #999;
}

.el-menu--horizontal .el-menu-item {
  height: var(--el-menu-horizontal-height);
  line-height: var(--el-menu-horizontal-height);
}

.el-aside {
  transition: width 0.3s;
  background-color: #FFFFFF;
  border-right: 2px solid #ebebeb;
}

.content {
  margin: 10px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: #FFFFFF;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #333;
}
</style>