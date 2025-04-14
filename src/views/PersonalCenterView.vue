<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { GetStaff, GetVolunteer, UpdateStaff, UpdateStaffPassword } from '@/api';
import { UpdateStaffPhoto,getStaffPhoto } from '@/api/staff';
import { sha256 } from 'js-sha256';
import { useMainStore } from '@/store';

interface EnrollStaffRequest {
    uid: string;
    userName: string;
    phone: string;
    gender: string;
    birthDate: string;
    standby: string;
    address: string;
    identificationNumber: string;
    role: number;
    name: string;
    skill: string;
}

interface UpdatePasswordRequest {
    Uid: string;
    OldPassword: string;
    NewPassword: string;
}

const staff = ref<EnrollStaffRequest>({
    uid: '',
    userName: '',
    phone: '',
    gender: '',
    birthDate: '',
    standby: '',
    address: '',
    identificationNumber: '',
    role: 0,
    name: '',
    skill: ''
});

const isEditing = ref(false);

// 修改头像相关属性
const avatar = ref('');
const tempAvatar = ref(''); // 用于存储临时预览的头像
const selectedFile = ref<File | null>(null); // 存储选择的文件

// 选择文件后的预览处理
const handleFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    // 验证文件
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
        ElMessage.error('头像只能是 JPG/PNG 格式!');
        return;
    }
    if (!isLt2M) {
        ElMessage.error('头像大小不能超过 2MB!');
        return;
    }

    // 保存文件并预览
    selectedFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
        tempAvatar.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
};

// 确认上传头像
const confirmUpload = async () => {
    if (!selectedFile.value) {
        ElMessage.warning('请先选择头像');
        return;
    }

    const formData = new FormData();
    formData.append('File', selectedFile.value);
    formData.append('uid', staff.value.uid);

    try {
        const res = await UpdateStaffPhoto(formData);
        if (res.status === 200) {
            avatar.value = tempAvatar.value;
            tempAvatar.value = '';
            selectedFile.value = null;
            ElMessage.success('头像更新成功，重新登陆后可见');
            let store=useMainStore()
            store.userInfo.photoUrl=res.data.photoUrl
            if(store.userInfo.photoUrl !=''){
                getStaffPhoto(store.userInfo.photoUrl).then(res => {
                    if (res.data.code === 200) {
                        store.avatarUrl = res.data.photoUrl
                        
                    } else {
                        ElMessage.error("获取用户头像失败！")
                    }
                }).catch(err => {
                    console.error(err);
                    ElMessage.error("获取用户头像失败！")
                })
            }
        } else {
            ElMessage.error(res.data.msg || '头像更新失败');
        }
    } catch (error) {
        console.error('上传头像失败:', error);
        ElMessage.error('上传头像失败');
    }
};

// 取消上传
const cancelUpload = () => {
    tempAvatar.value = '';
    selectedFile.value = null;
};

const handleEdit = () => {
    isEditing.value = true;
};

const handleSubmit = () => {
    if (!staff.value.phone || !staff.value.gender || !staff.value.identificationNumber) {
        ElMessage.error('请填写必填项');
        return;
    }
    ElMessageBox.confirm(
        '确定要保存修改吗?',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            UpdateStaff(staff.value).then((res) => {
                if (res.status == 200) {
                    ElMessage.success('保存成功');
                    getPersonalInf();
                } else {
                    ElMessage.error(res.data.msg);
                }
            }).catch(err => {
                console.log(err);
            });
            isEditing.value = false;
        })
        .catch(() => {
            ElMessage.info('已取消保存');
        });
};

const handleCancel = () => {
    getPersonalInf();
    isEditing.value = false;
};

const handleUpdatePassword = () => {
    ElMessageBox.prompt('请输入旧密码', '修改密码', {
        confirmButtonText: '下一步',
        cancelButtonText: '取消',
        inputType: 'password'
    }).then(({ value }) => {
        ElMessageBox.prompt('请输入新密码', '修改密码', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputType: 'password'
        }).then(({ value: newPassword }) => {
            const uid = localStorage.getItem('Uid');
            if (uid) {
                const updatePasswordData: UpdatePasswordRequest = {
                    Uid: uid,
                    OldPassword: sha256(value),
                    NewPassword: sha256(newPassword)
                };
                UpdateStaffPassword(updatePasswordData).then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        ElMessage.success('密码修改成功');
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        });
    }).catch(() => {
        ElMessage.info('已取消操作');
    });
};

const getRole = (role: number) => {
    if (role == 1) {
        return '志愿者';
    } else if (role == 2) {
        return '工作人员';
    }
    else if (role == 0) {
        return '高级管理人员'
    }
    else if (role == 88) {
        return '超级管理员'
    }
    else {
        return '未知'
    }
}

const getPersonalInf = () => {
    const role = localStorage.getItem('UserRole');
    const uid = localStorage.getItem('Uid');
    if (role === 'Volunteer') {
        GetVolunteer(uid).then((res) => {
            if (res.status === 200) {
                staff.value = {
                    uid: res.data.uid,
                    userName: res.data.userName,
                    phone: res.data.phone,
                    gender: res.data.gender,
                    birthDate: res.data.birthDate,
                    standby: res.data.standby,
                    address: res.data.address,
                    identificationNumber: res.data.identificationNumber,
                    role: res.data.role,
                    name: res.data.name,
                    skill: res.data.skill
                };
            } else {
                ElMessage.error(res.data.msg);
            }
        }).catch(err => {
            console.log(err);
        });
    } else if (role == 'Staff' || role == 'Manager' || role == 'SuperAdmin') {
        GetStaff(uid).then((res) => {
            if (res.status === 200) {
                staff.value = {
                    uid: res.data.uid,
                    userName: res.data.userName,
                    phone: res.data.phone,
                    gender: res.data.gender,
                    birthDate: res.data.birthDate,
                    standby: res.data.standby,
                    address: res.data.address,
                    identificationNumber: res.data.identificationNumber,
                    role: res.data.role,
                    name: res.data.name,
                    skill: res.data.skill
                };
            } else {
                ElMessage.error(res.data.msg);
            }
        }).catch(err => {
            console.log(err);
        });
    }
};

onMounted(() => {
    getPersonalInf();
    avatar.value=useMainStore().avatarUrl;
});

// 添加日期格式化方法
const formatDate = (date: string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
};
</script>

<template>
    <div class="enroll-staff">
        <h2 class="title">个人中心</h2>
        
        <!-- 修改头像上传组件 -->
        <div class="avatar-container">
            <div class="avatar-wrapper">
                <img v-if="tempAvatar || avatar" :src="tempAvatar || avatar" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                
                <!-- 隐藏的文件输入框 -->
                <input
                    type="file"
                    ref="fileInput"
                    accept="image/jpeg,image/png"
                    style="display: none"
                    @change="handleFileChange"
                />
            </div>
            
            <div class="avatar-actions">
                <!-- 选择文件的按钮 -->
                <el-button
                    v-if="!tempAvatar"
                    type="primary"
                    size="small"
                    @click="$refs.fileInput.click()"
                >
                    更换头像
                </el-button>
                
                <!-- 显示确认和取消按钮 -->
                <template v-if="tempAvatar">
                    <el-button type="primary" size="small" @click="confirmUpload">确认上传</el-button>
                    <el-button size="small" @click="cancelUpload">取消</el-button>
                </template>
            </div>
        </div>

        <el-form
            :model="staff"
            label-width="120px"
            class="staff-form"
            size="large"
        >
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="用户名">
                        <el-input
                            v-show="isEditing"
                            v-model="staff.userName"
                            placeholder="用户名"
                            readonly
                        />
                        <span v-show="!isEditing" class="info-text">{{ staff.userName }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="姓名">
                        <el-input
                            v-show="isEditing"
                            v-model="staff.name"
                            placeholder="请输入姓名"
                        />
                        <span v-show="!isEditing" class="info-text">{{ staff.name }}</span>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="联系方式">
                        <el-input
                            v-show="isEditing"
                            v-model="staff.phone"
                            placeholder="请输入联系方式"
                        />
                        <span v-show="!isEditing" class="info-text">{{ staff.phone }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="性别">
                        <el-radio-group v-show="isEditing" v-model="staff.gender">
                            <el-radio label="男">男</el-radio>
                            <el-radio label="女">女</el-radio>
                        </el-radio-group>
                        <span v-show="!isEditing" class="info-text">{{ staff.gender }}</span>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="出生日期">
                        <el-date-picker
                            v-if="isEditing"
                            v-model="staff.birthDate"
                            type="date"
                            placeholder="请选择出生日期"
                            style="width: 100%"
                        />
                        <span v-show="!isEditing" class="info-text">{{ formatDate(staff.birthDate) }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="身份证号">
                        <el-input
                            v-show="isEditing"
                            v-model="staff.identificationNumber"
                            placeholder="请输入身份证号"
                        />
                        <span v-show="!isEditing" class="info-text">{{ staff.identificationNumber }}</span>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="备用邮箱">
                        <el-input
                            v-show="isEditing"
                            v-model="staff.standby"
                            placeholder="请输入备用邮箱"
                        />
                        <span v-show="!isEditing" class="info-text">{{ staff.standby }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="地址">
                        <el-input
                            v-show="isEditing"
                            v-model="staff.address"
                            placeholder="请输入地址"
                        />
                        <span v-show="!isEditing" class="info-text">{{ staff.address }}</span>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="技能">
                        <el-input
                            v-show="isEditing"
                            v-model="staff.skill"
                            placeholder="请输入技能"
                        />
                        <span v-show="!isEditing" class="info-text">{{ staff.skill }}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="身份">
                        <span class="info-text">{{ getRole(staff.role) }}</span>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item>
                <div v-if="!isEditing">
                    <el-button type="primary" @click="handleEdit">编辑</el-button>
                    <el-button @click="handleUpdatePassword">修改密码</el-button>
                </div>
                <div v-else>
                    <el-button type="primary" @click="handleSubmit">保存</el-button>
                    <el-button @click="handleCancel">取消</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.enroll-staff {
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
}

.title {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
}

.staff-form {
    width: 100%;
}

:deep(.el-form-item__label) {
    font-weight: 500;
    color: #606266;
}

:deep(.el-input) {
    width: 100%;
}

:deep(.el-button) {
    margin-top: 10px;
}

.info-text {
    line-height: 32px;
    font-size: 14px;
    color: #606266;
}

:deep(.el-form-item__content) {
    min-height: 32px;
}

.avatar-container {
    text-align: center;
    margin-bottom: 30px;
}

.avatar-wrapper {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto;
    border: 1px dashed var(--el-border-color);
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    transition: var(--el-transition-duration-fast);
}

.avatar-wrapper:hover {
    border-color: var(--el-color-primary);
}

.avatar-actions {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    gap: 8px;
}

.avatar-uploader {
    display: inline-block;
}

.avatar-uploader :deep(.el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader :deep(.el-upload:hover) {
    border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    text-align: center;
    border-radius: 50%;
    line-height: 120px;
}

.avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: block;
    object-fit: cover;
}

.avatar-text {
    margin-top: 10px;
    color: #606266;
    font-size: 14px;
}
</style>