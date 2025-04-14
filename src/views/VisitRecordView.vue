<template>
  <div>
    <h1>探访记录</h1>

    <!-- 搜索和添加、导出区域 -->
    <div style="width:100%; display:flex; justify-content:flex-end; padding:10px 25px;">
      <el-select v-model="searchLabel" placeholder="请选择搜索类型" size="large" style="width:110px; margin-right:10px;">
        <el-option v-for="label in searchLabelList" :key="label" :label="label" :value="label" />
      </el-select>
      <el-input v-model="searchValue" size="large" :placeholder="'请输入' + searchLabel"
        style="max-width:250px; margin-right:10px;" />
      <el-button size="large" type="primary" style="margin-right:10px">搜索</el-button>
      <!-- <el-button size="large" type="primary" style="margin-right:10px" @click="openAddDialog">添加</el-button> -->
      <el-button size="large" type="primary" @click="exportData">导出</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="visitRecords" stripe size="large" style="width:100%;">
      <!-- 基本信息列 -->
      <el-table-column prop="beginTime" label="开始时间" show-overflow-tooltip />
      <el-table-column prop="endTime" label="结束时间" show-overflow-tooltip />
      <el-table-column prop="method" label="探访方式" show-overflow-tooltip />
      <el-table-column prop="visitor" label="探访人员姓名" show-overflow-tooltip />
      <el-table-column prop="client" label="服务对象姓名" show-overflow-tooltip />
      <el-table-column prop="administrativeDivision" label="行政区划" show-overflow-tooltip />
      <el-table-column prop="address" label="详细地址" show-overflow-tooltip />

      <!-- 操作列 -->
      <el-table-column label="操作" fixed="right" width="150">
        <template #default="{ row }">
          <div style="display: flex; justify-content: center;">
            <el-button type="info" circle size="medium" style="margin:0 5px;" @click="openDetailDialog(row)">
              <el-icon>
                <InfoFilled />
              </el-icon>
            </el-button>
            <el-button type="primary" circle size="medium" style="margin:0 5px;" @click="openEditDialog(row)">
              <el-icon>
                <Edit />
              </el-icon>
            </el-button>
            <el-button type="danger" circle size="medium" style="margin:0 5px;" @click="deleteRecord(row)">
              <el-icon>
                <DeleteFilled />
              </el-icon>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑对话框 -->
    <el-dialog v-model="dialogEditVisible" title="编辑探访记录" width="900">
      <el-form :model="currentRecord" ref="recordFormRef" :rules="rules" label-width="125px" label-position="right">
        <!-- 基本信息 -->
        <h3>基本信息</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="开始时间" prop="beginTime">
              <el-date-picker v-model="currentRecord.beginTime" type="datetime" placeholder="选择开始时间"
                style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker v-model="currentRecord.endTime" type="datetime" placeholder="选择结束时间" style="width:100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="探访方式" prop="method">
              <el-input v-model="currentRecord.method" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="探访人员姓名" prop="visitor">
              <el-input v-model="currentRecord.visitor" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="服务对象姓名" prop="client">
              <el-input v-model="currentRecord.client" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行政区划" prop="administrativeDivision">
              <ChinaAeraSelect :value="currentRecord.administrativeDivision"
                @input="currentRecord.administrativeDivision = $event"></ChinaAeraSelect>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="currentRecord.address" autocomplete="off" />
        </el-form-item>

        <!-- 服务对象 -->
        <h3>服务对象</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="家庭结构" prop="familyStructure">
              <el-input v-model="currentRecord.familyStructure" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="健康状况" prop="healthInformation">
              <el-input v-model="currentRecord.healthInformation" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="经济状况" prop="economy">
          <el-input v-model="currentRecord.economy" autocomplete="off" />
        </el-form-item>

        <!-- 探访目的 -->
        <h3>探访目的</h3>
        <el-form-item label="探访目的" prop="purpose">
          <el-input v-model="currentRecord.purpose" type="textarea" :rows="2" autocomplete="off" />
        </el-form-item>

        <!-- 探访内容 -->
        <h3>探访内容</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="居住环境" prop="environment">
              <el-input v-model="currentRecord.environment" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="饮食情况" prop="diet">
              <el-input v-model="currentRecord.diet" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="日常活动" prop="dailyActivity">
              <el-input v-model="currentRecord.dailyActivity" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身体状况询问" prop="physicalCondition">
              <el-input v-model="currentRecord.physicalCondition" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="医疗需求询问" prop="medicalCommand">
              <el-input v-model="currentRecord.medicalCommand" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="健康指导提供" prop="healthGuidance">
              <el-input v-model="currentRecord.healthGuidance" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="心理状态观察" prop="psychologicalState">
              <el-input v-model="currentRecord.psychologicalState" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="情感陪伴与疏导" prop="emotionalGuidance">
              <el-input v-model="currentRecord.emotionalGuidance" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="政策宣传解答" prop="policyPromotion">
              <el-input v-model="currentRecord.policyPromotion" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="信息收集反馈" prop="informationFeedback">
              <el-input v-model="currentRecord.informationFeedback" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 问题与需求发现 -->
        <h3>问题与需求发现</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="生活问题" prop="lifeIssue">
              <el-input v-model="currentRecord.lifeIssue" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="健康问题" prop="healthIssue">
              <el-input v-model="currentRecord.healthIssue" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="心理问题" prop="psychologicalIssue">
              <el-input v-model="currentRecord.psychologicalIssue" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其他需求" prop="otherNeeds">
              <el-input v-model="currentRecord.otherNeeds" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 解决方案与建议 -->
        <h3>解决方案与建议</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="生活问题解决方案" prop="lifeProblemSolution">
              <el-input v-model="currentRecord.lifeProblemSolution" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生活问题建议" prop="lifeProblemSuggestion">
              <el-input v-model="currentRecord.lifeProblemSuggestion" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="健康问题解决方案" prop="healthProblemSolution">
              <el-input v-model="currentRecord.healthProblemSolution" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="健康问题建议" prop="healthProblemSuggestion">
              <el-input v-model="currentRecord.healthProblemSuggestion" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="心理问题解决方案" prop="psychologicalProblemSolution">
              <el-input v-model="currentRecord.psychologicalProblemSolution" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="心理问题建议" prop="psychologicalProblemSuggestion">
              <el-input v-model="currentRecord.psychologicalProblemSuggestion" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="其他需求解决方案" prop="otherNeedsSolution">
              <el-input v-model="currentRecord.otherNeedsSolution" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其他需求建议" prop="otherNeedsSuggestion">
              <el-input v-model="currentRecord.otherNeedsSuggestion" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 服务对象反馈 -->
        <h3>服务对象反馈</h3>
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="服务对象反馈" prop="feedback">
              <el-input v-model="currentRecord.feedback" type="textarea" :rows="2" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="反馈时间" prop="feedbackTime">
              <el-date-picker v-model="currentRecord.feedbackTime" type="datetime" placeholder="选择时间"
                style="width:100%" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 探访人员总结 -->
        <h3>探访人员总结</h3>
        <el-form-item label="探访人员总结" prop="visitorSummary">
          <el-input v-model="currentRecord.visitorSummary" type="textarea" :rows="3" autocomplete="off" />
        </el-form-item>

        <!-- 备注与附件 -->
        <h3>备注与附件</h3>
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="currentRecord.remarks" type="textarea" :rows="2" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="附件" prop="attachments">
              <div>
                <ul>
                  <li v-for="(attachment, index) in currentRecord.attachments" :key="index">
                    <a :href="attachment" target="_blank" rel="noopener noreferrer">附件 {{ index + 1 }}</a>
                  </li>
                </ul>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取消</el-button>
          <el-button type="primary" @click="saveRecord(recordFormRef)">确定</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 添加对话框 -->
    <el-dialog v-model="dialogAddVisible" title="添加探访记录" width="900">
      <el-form :model="newRecord" ref="newRecordFormRef" :rules="rules" label-width="125px" label-position="right">
        <!-- 基本信息 -->
        <h3>基本信息</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="开始时间" prop="beginTime">
              <el-date-picker v-model="newRecord.beginTime" type="datetime" placeholder="选择开始时间" style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker v-model="newRecord.endTime" type="datetime" placeholder="选择结束时间" style="width:100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="探访方式" prop="method">
              <el-input v-model="newRecord.method" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="探访人员姓名" prop="visitor">
              <el-input v-model="newRecord.visitor" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="服务对象姓名" prop="client">
              <el-input v-model="newRecord.client" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行政区划" prop="administrativeDivision">
              <ChinaAeraSelect :value="newRecord.administrativeDivision"
                @input="newRecord.administrativeDivision = $event">
              </ChinaAeraSelect>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="newRecord.address" autocomplete="off" />
        </el-form-item>

        <!-- 服务对象 -->
        <h3>服务对象</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="家庭结构" prop="familyStructure">
              <el-input v-model="newRecord.familyStructure" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="健康状况" prop="healthInformation">
              <el-input v-model="newRecord.healthInformation" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="经济状况" prop="economy">
          <el-input v-model="newRecord.economy" autocomplete="off" />
        </el-form-item>

        <!-- 探访目的 -->
        <h3>探访目的</h3>
        <el-form-item label="探访目的" prop="purpose">
          <el-input v-model="newRecord.purpose" type="textarea" :rows="2" autocomplete="off" />
        </el-form-item>

        <!-- 探访内容 -->
        <h3>探访内容</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="居住环境" prop="environment">
              <el-input v-model="newRecord.environment" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="饮食情况" prop="diet">
              <el-input v-model="newRecord.diet" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="日常活动" prop="dailyActivity">
              <el-input v-model="newRecord.dailyActivity" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身体状况询问" prop="physicalCondition">
              <el-input v-model="newRecord.physicalCondition" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="医疗需求询问" prop="medicalCommand">
              <el-input v-model="newRecord.medicalCommand" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="健康指导提供" prop="healthGuidance">
              <el-input v-model="newRecord.healthGuidance" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="心理状态观察" prop="psychologicalState">
              <el-input v-model="newRecord.psychologicalState" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="情感陪伴与疏导" prop="emotionalGuidance">
              <el-input v-model="newRecord.emotionalGuidance" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="政策宣传解答" prop="policyPromotion">
              <el-input v-model="newRecord.policyPromotion" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="信息收集反馈" prop="informationFeedback">
              <el-input v-model="newRecord.informationFeedback" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 问题与需求发现 -->
        <h3>问题与需求发现</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="生活问题" prop="lifeIssue">
              <el-input v-model="newRecord.lifeIssue" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="健康问题" prop="healthIssue">
              <el-input v-model="newRecord.healthIssue" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="心理问题" prop="psychologicalIssue">
              <el-input v-model="newRecord.psychologicalIssue" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其他需求" prop="otherNeeds">
              <el-input v-model="newRecord.otherNeeds" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 解决方案与建议 -->
        <h3>解决方案与建议</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="生活问题解决方案" prop="lifeProblemSolution">
              <el-input v-model="newRecord.lifeProblemSolution" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生活问题建议" prop="lifeProblemSuggestion">
              <el-input v-model="newRecord.lifeProblemSuggestion" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="健康问题解决方案" prop="healthProblemSolution">
              <el-input v-model="newRecord.healthProblemSolution" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="健康问题建议" prop="healthProblemSuggestion">
              <el-input v-model="newRecord.healthProblemSuggestion" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="心理问题解决方案" prop="psychologicalProblemSolution">
              <el-input v-model="newRecord.psychologicalProblemSolution" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="心理问题建议" prop="psychologicalProblemSuggestion">
              <el-input v-model="newRecord.psychologicalProblemSuggestion" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="其他需求解决方案" prop="otherNeedsSolution">
              <el-input v-model="newRecord.otherNeedsSolution" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其他需求建议" prop="otherNeedsSuggestion">
              <el-input v-model="newRecord.otherNeedsSuggestion" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 服务对象反馈 -->
        <h3>服务对象反馈</h3>
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="服务对象反馈" prop="feedback">
              <el-input v-model="newRecord.feedback" type="textarea" :rows="2" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="反馈时间" prop="feedbackTime">
              <el-date-picker v-model="newRecord.feedbackTime" type="datetime" placeholder="选择时间" style="width:100%" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 探访人员总结 -->
        <h3>探访人员总结</h3>
        <el-form-item label="探访人员总结" prop="visitorSummary">
          <el-input v-model="newRecord.visitorSummary" type="textarea" :rows="3" autocomplete="off" />
        </el-form-item>

        <!-- 备注与附件 -->
        <h3>备注与附件</h3>
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="newRecord.remarks" type="textarea" :rows="2" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="附件" prop="attachments">
              <el-upload class="upload-demo" action="" :on-preview="handlePreview" :on-remove="handleRemove"
                :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed"
                :file-list="newRecord.attachments">
                <el-button type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取消</el-button>
          <el-button type="primary" @click="addRecord(newRecordFormRef)">确定</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 详细信息对话框 -->
    <el-dialog v-model="dialogDetailVisible" title="详细信息" width="900" class="detail-dialog">
      <el-form :model="detailRecord" label-width="125px" label-position="right" class="detail-form">
        <!-- 基本信息 -->
        <h3 class="section-title">基本信息</h3>
        <el-row :gutter="20" class="form-row">
          <el-col :span="12" class="form-col">
            <el-form-item label="开始时间" class="form-item">
              <span class="form-item-content">{{ detailRecord.beginTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-col">
            <el-form-item label="结束时间" class="form-item">
              <span class="form-item-content">{{ detailRecord.endTime }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="form-row">
          <el-col :span="12" class="form-col">
            <el-form-item label="探访方式" class="form-item">
              <span class="form-item-content">{{ detailRecord.method }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-col">
            <el-form-item label="探访人员姓名" class="form-item">
              <span class="form-item-content">{{ detailRecord.visitor }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="form-row">
          <el-col :span="12" class="form-col">
            <el-form-item label="服务对象姓名" class="form-item">
              <span class="form-item-content">{{ detailRecord.client }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-col">
            <el-form-item label="行政区划" class="form-item">
              <span class="form-item-content">{{ detailRecord.administrativeDivision }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="详细地址" class="form-item full-width">
          <span class="form-item-content">{{ detailRecord.address }}</span>
        </el-form-item>

        <!-- 服务对象 -->
        <h3 class="section-title">服务对象</h3>
        <el-row :gutter="20" class="form-row">
          <el-col :span="12" class="form-col">
            <el-form-item label="家庭结构" class="form-item">
              <span class="form-item-content">{{ detailRecord.familyStructure }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-col">
            <el-form-item label="健康状况" class="form-item">
              <span class="form-item-content">{{ detailRecord.healthInformation }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="经济状况" class="form-item full-width">
          <span class="form-item-content">{{ detailRecord.economy }}</span>
        </el-form-item>

        <!-- 探访目的 -->
        <h3 class="section-title">探访目的</h3>
        <el-form-item label="探访目的" class="form-item full-width">
          <span class="form-item-content">{{ detailRecord.purpose }}</span>
        </el-form-item>

        <!-- 探访内容 -->
        <h3 class="section-title">探访内容</h3>
        <el-row :gutter="20" class="form-row">
          <el-col :span="12" class="form-col">
            <el-form-item label="居住环境" class="form-item">
              <span class="form-item-content">{{ detailRecord.environment }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-col">
            <el-form-item label="饮食情况" class="form-item">
              <span class="form-item-content">{{ detailRecord.diet }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="form-row">
          <el-col :span="12" class="form-col">
            <el-form-item label="日常活动" class="form-item">
              <span class="form-item-content">{{ detailRecord.dailyActivity }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-col">
            <el-form-item label="身体状况询问" class="form-item">
              <span class="form-item-content">{{ detailRecord.physicalCondition }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="form-row">
          <el-col :span="12" class="form-col">
            <el-form-item label="医疗需求询问" class="form-item">
              <span class="form-item-content">{{ detailRecord.medicalCommand }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-col">
            <el-form-item label="健康指导提供" class="form-item">
              <span class="form-item-content">{{ detailRecord.healthGuidance }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="form-row">
          <el-col :span="12" class="form-col">
            <el-form-item label="心理状态观察" class="form-item">
              <span class="form-item-content">{{ detailRecord.psychologicalState }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-col">
            <el-form-item label="情感陪伴与疏导" class="form-item">
              <span class="form-item-content">{{ detailRecord.emotionalGuidance }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="form-row">
          <el-col :span="12" class="form-col">
            <el-form-item label="政策宣传解答" class="form-item">
              <span class="form-item-content">{{ detailRecord.policyPromotion }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-col">
            <el-form-item label="信息收集反馈" class="form-item">
              <span class="form-item-content">{{ detailRecord.informationFeedback }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 问题与需求发现 -->
        <h3 class="section-title">问题与需求发现</h3>
        <el-row :gutter="20" class="form-row">
          <el-col :span="12" class="form-col">
            <el-form-item label="生活问题" class="form-item">
              <span class="form-item-content">{{ detailRecord.lifeIssue }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-col">
            <el-form-item label="健康问题" class="form-item">
              <span class="form-item-content">{{ detailRecord.healthIssue }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="form-row">
          <el-col :span="12" class="form-col">
            <el-form-item label="心理问题" class="form-item">
              <span class="form-item-content">{{ detailRecord.psychologicalIssue }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-col">
            <el-form-item label="其他需求" class="form-item">
              <span class="form-item-content">{{ detailRecord.otherNeeds }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 解决方案与建议 -->
        <h3 class="section-title">解决方案与建议</h3>
        <el-row :gutter="20" class="form-row">
          <el-col :span="12" class="form-col">
            <el-form-item label="生活问题解决方案" class="form-item">
              <span class="form-item-content">{{ detailRecord.lifeProblemSolution }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-col">
            <el-form-item label="生活问题建议" class="form-item">
              <span class="form-item-content">{{ detailRecord.lifeProblemSuggestion }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="form-row">
          <el-col :span="12" class="form-col">
            <el-form-item label="健康问题解决方案" class="form-item">
              <span class="form-item-content">{{ detailRecord.healthProblemSolution }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-col">
            <el-form-item label="健康问题建议" class="form-item">
              <span class="form-item-content">{{ detailRecord.healthProblemSuggestion }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="form-row">
          <el-col :span="12" class="form-col">
            <el-form-item label="心理问题解决方案" class="form-item">
              <span class="form-item-content">{{ detailRecord.psychologicalProblemSolution }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-col">
            <el-form-item label="心理问题建议" class="form-item">
              <span class="form-item-content">{{ detailRecord.psychologicalProblemSuggestion }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="form-row">
          <el-col :span="12" class="form-col">
            <el-form-item label="其他需求解决方案" class="form-item">
              <span class="form-item-content">{{ detailRecord.otherNeedsSolution }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-col">
            <el-form-item label="其他需求建议" class="form-item">
              <span class="form-item-content">{{ detailRecord.otherNeedsSuggestion }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 服务对象反馈 -->
        <h3 class="section-title">服务对象反馈</h3>
        <el-row :gutter="20" class="form-row">
          <el-col class="form-col">
            <el-form-item label="服务对象反馈" class="form-item full-width">
              <span class="form-item-content">{{ detailRecord.feedback }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10" class="form-col">
            <el-form-item label="反馈时间" class="form-item">
              <span class="form-item-content">{{ detailRecord.feedbackTime }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 探访人员总结 -->
        <h3 class="section-title">探访人员总结</h3>
        <el-form-item label="探访人员总结" class="form-item full-width">
          <span class="form-item-content">{{ detailRecord.visitorSummary }}</span>
        </el-form-item>

        <!-- 备注与附件 -->
        <h3 class="section-title">备注与附件</h3>
        <el-row :gutter="20" class="form-row">
          <el-col class="form-col">
            <el-form-item label="备注" class="form-item full-width">
              <span class="form-item-content">{{ detailRecord.remarks }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10" class="form-col">
            <el-form-item label="附件" class="form-item">
              <div class="attachment-list">
                <ul>
                  <li v-for="(attachment, index) in detailRecord.attachments" :key="index" class="attachment-item">
                    <a :href="attachment" target="_blank" rel="noopener noreferrer">附件 {{ index + 1 }}</a>
                  </li>
                </ul>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox, type FormInstance, type UploadFile } from 'element-plus';
import ChinaAeraSelect from '@/components/ChinaAeraSelect.vue';
import { Edit, DeleteFilled, InfoFilled } from '@element-plus/icons-vue';
import { AddVisit, DeleteVisit, GetVisitList, UpdateVisit } from '@/api';

// 定义探访记录接口
interface VisitRecord {
  // 基本信息
  uid: string; // 唯一标识字段
  beginTime: Date | string;
  endTime: Date | string;
  method: string;
  visitor: string;
  client: string;
  administrativeDivision: string;
  address: string;

  // 服务对象
  familyStructure: string;
  healthInformation: string;
  economy: string;

  // 探访目的
  purpose: string;

  // 探访内容
  environment: string;
  diet: string;
  dailyActivity: string;
  physicalCondition: string;
  medicalCommand: string;
  healthGuidance: string;
  psychologicalState: string;
  emotionalGuidance: string;
  policyPromotion: string;
  informationFeedback: string;

  // 问题与需求发现
  lifeIssue: string;
  healthIssue: string;
  psychologicalIssue: string;
  otherNeeds: string;

  // 解决方案与建议
  lifeProblemSolution: string;
  lifeProblemSuggestion: string;
  healthProblemSolution: string;
  healthProblemSuggestion: string;
  psychologicalProblemSolution: string;
  psychologicalProblemSuggestion: string;
  otherNeedsSolution: string;
  otherNeedsSuggestion: string;

  // 服务对象反馈
  feedback: string;
  feedbackTime: Date | string;

  // 探访人员总结
  visitorSummary: string;

  // 备注与附件
  remarks: string;
  attachments: string[];
}

// 示例数据
const visitRecords = reactive<VisitRecord[]>([]);

const searchValue = ref('');
const searchLabel = ref('开始时间');
const searchLabelList = ref(['开始时间', '结束时间', '服务对象姓名']);

const dialogEditVisible = ref(false);
const dialogAddVisible = ref(false);
const dialogDetailVisible = ref(false);

let currentRecord = reactive<VisitRecord>({
  uid: '', // 初始化为空字符串
  beginTime: '',
  endTime: '',
  method: '',
  visitor: '',
  client: '',
  administrativeDivision: '',
  address: '',
  familyStructure: '',
  healthInformation: '',
  economy: '',
  purpose: '',
  environment: '',
  diet: '',
  dailyActivity: '',
  physicalCondition: '',
  medicalCommand: '',
  healthGuidance: '',
  psychologicalState: '',
  emotionalGuidance: '',
  policyPromotion: '',
  informationFeedback: '',
  lifeIssue: '',
  healthIssue: '',
  psychologicalIssue: '',
  otherNeeds: '',
  lifeProblemSolution: '',
  lifeProblemSuggestion: '',
  healthProblemSolution: '',
  healthProblemSuggestion: '',
  psychologicalProblemSolution: '',
  psychologicalProblemSuggestion: '',
  otherNeedsSolution: '',
  otherNeedsSuggestion: '',
  feedback: '',
  feedbackTime: '',
  visitorSummary: '',
  remarks: '',
  attachments: []
});

const detailRecord = reactive<VisitRecord>({
  uid: '', // 初始化为空字符串
  beginTime: '',
  endTime: '',
  method: '',
  visitor: '',
  client: '',
  administrativeDivision: '',
  address: '',
  familyStructure: '',
  healthInformation: '',
  economy: '',
  purpose: '',
  environment: '',
  diet: '',
  dailyActivity: '',
  physicalCondition: '',
  medicalCommand: '',
  healthGuidance: '',
  psychologicalState: '',
  emotionalGuidance: '',
  policyPromotion: '',
  informationFeedback: '',
  lifeIssue: '',
  healthIssue: '',
  psychologicalIssue: '',
  otherNeeds: '',
  lifeProblemSolution: '',
  lifeProblemSuggestion: '',
  healthProblemSolution: '',
  healthProblemSuggestion: '',
  psychologicalProblemSolution: '',
  psychologicalProblemSuggestion: '',
  otherNeedsSolution: '',
  otherNeedsSuggestion: '',
  feedback: '',
  feedbackTime: '',
  visitorSummary: '',
  remarks: '',
  attachments: []
});

const newRecord = reactive<VisitRecord>({
  uid: '', // 初始化为空字符串
  beginTime: '',
  endTime: '',
  method: '',
  visitor: '',
  client: '',
  administrativeDivision: '',
  address: '',
  familyStructure: '',
  healthInformation: '',
  economy: '',
  purpose: '',
  environment: '',
  diet: '',
  dailyActivity: '',
  physicalCondition: '',
  medicalCommand: '',
  healthGuidance: '',
  psychologicalState: '',
  emotionalGuidance: '',
  policyPromotion: '',
  informationFeedback: '',
  lifeIssue: '',
  healthIssue: '',
  psychologicalIssue: '',
  otherNeeds: '',
  lifeProblemSolution: '',
  lifeProblemSuggestion: '',
  healthProblemSolution: '',
  healthProblemSuggestion: '',
  psychologicalProblemSolution: '',
  psychologicalProblemSuggestion: '',
  otherNeedsSolution: '',
  otherNeedsSuggestion: '',
  feedback: '',
  feedbackTime: '',
  visitorSummary: '',
  remarks: '',
  attachments: []
});

const recordFormRef = ref<FormInstance>();
const newRecordFormRef = ref<FormInstance>();

// 获取服务对象数据
const getServiceObjectData = (row: VisitRecord) => {
  return [
    { key: '家庭结构', value: row.familyStructure },
    { key: '健康状况', value: row.healthInformation },
    { key: '经济状况', value: row.economy }
  ];
};

// 获取探访目的数据
const getVisitPurposeData = (row: VisitRecord) => {
  return [
    { key: '探访目的', value: row.purpose }
  ];
};

// 获取探访内容数据
const getVisitContentData = (row: VisitRecord) => {
  return [
    { key: '居住环境', value: row.environment },
    { key: '饮食情况', value: row.diet },
    { key: '日常活动', value: row.dailyActivity },
    { key: '身体状况询问', value: row.physicalCondition },
    { key: '医疗需求询问', value: row.medicalCommand },
    { key: '健康指导提供', value: row.healthGuidance },
    { key: '心理状态观察', value: row.psychologicalState },
    { key: '情感陪伴与疏导', value: row.emotionalGuidance },
    { key: '政策宣传解答', value: row.policyPromotion },
    { key: '信息收集反馈', value: row.informationFeedback }
  ];
};

// 获取问题与需求发现数据
const getIssuesData = (row: VisitRecord) => {
  return [
    { key: '生活问题', value: row.lifeIssue },
    { key: '健康问题', value: row.healthIssue },
    { key: '心理问题', value: row.psychologicalIssue },
    { key: '其他需求', value: row.otherNeeds }
  ];
};

// 获取解决方案与建议数据
const getSolutionsData = (row: VisitRecord) => {
  return [
    { key: '生活问题解决方案', value: row.lifeProblemSolution },
    { key: '生活问题建议', value: row.lifeProblemSuggestion },
    { key: '健康问题解决方案', value: row.healthProblemSolution },
    { key: '健康问题建议', value: row.healthProblemSuggestion },
    { key: '心理问题解决方案', value: row.psychologicalProblemSolution },
    { key: '心理问题建议', value: row.psychologicalProblemSuggestion },
    { key: '其他需求解决方案', value: row.otherNeedsSolution },
    { key: '其他需求建议', value: row.otherNeedsSuggestion }
  ];
};

// 获取服务对象反馈数据
const getFeedbackData = (row: VisitRecord) => {
  return [
    { key: '服务对象反馈', value: row.feedback },
    { key: '反馈时间', value: row.feedbackTime }
  ];
};

// 获取探访人员总结数据
const getSummaryData = (row: VisitRecord) => {
  return [
    { key: '探访人员总结', value: row.visitorSummary }
  ];
};

// 获取备注与附件数据
const getNotesData = (row: VisitRecord) => {
  return [
    { key: '备注', value: row.remarks },
    { key: '附件', value: row.attachments.length > 0 ? '有附件' : '无' }
  ];
};

// 表单验证规则
const rules = reactive({
  beginTime: [{ required: true, message: '请选择开始时间', trigger: 'blur' }],
  endTime: [{ required: true, message: '请选择结束时间', trigger: 'blur' }],
  visitor: [{ required: true, message: '请输入探访人员姓名', trigger: 'blur' }],
  client: [{ required: true, message: '请输入服务对象姓名', trigger: 'blur' }],
  administrativeDivision: [{ required: true, message: '请选择行政区划', trigger: 'blur' }]
});

const exportData = () => {
  console.log('导出数据');
};

// 保存编辑的记录
const saveRecord = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      UpdateVisit(currentRecord).then(res => {
        if (res.status == 200) {
          ElMessage.success('保存成功');
          getVisitList();
        } else {
          ElMessage.error('保存失败！');
        }
      }).catch(err => {
        ElMessage.error('保存失败！');
        console.log(err);
      });
      dialogEditVisible.value = false;
    } else {
      console.log('保存失败：', fields);
    }
  });
};

const getVisitList = () => {
  GetVisitList().then(res => {
    if (res.status === 200) {
      visitRecords.length = 0;
      visitRecords.push(...res.data);
      console.log(visitRecords);
    }
  });
};

// 添加新的记录
const addRecord = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      AddVisit(newRecord).then(res => {
        if (res.status == 200) {
          ElMessage.success('添加成功');
          getVisitList();
        }
      });
      // 重置表单
      Object.assign(newRecord, {
        uid: '',
        beginTime: '',
        endTime: '',
        method: '',
        visitor: '',
        client: '',
        administrativeDivision: '',
        address: '',
        familyStructure: '',
        healthInformation: '',
        economy: '',
        purpose: '',
        environment: '',
        diet: '',
        dailyActivity: '',
        physicalCondition: '',
        medicalCommand: '',
        healthGuidance: '',
        psychologicalState: '',
        emotionalGuidance: '',
        policyPromotion: '',
        informationFeedback: '',
        lifeIssue: '',
        healthIssue: '',
        psychologicalIssue: '',
        otherNeeds: '',
        lifeProblemSolution: '',
        lifeProblemSuggestion: '',
        healthProblemSolution: '',
        healthProblemSuggestion: '',
        psychologicalProblemSolution: '',
        psychologicalProblemSuggestion: '',
        otherNeedsSolution: '',
        otherNeedsSuggestion: '',
        feedback: '',
        feedbackTime: '',
        visitorSummary: '',
        remarks: '',
        attachments: []
      });
      dialogAddVisible.value = false;
    } else {
      console.log('添加失败：', fields);
    }
  });
};

// 打开编辑对话框
const openEditDialog = (row: any) => {
  currentRecord.uid = row.uid;
  currentRecord.beginTime = row.beginTime;
  currentRecord.endTime = row.endTime;
  currentRecord.method = row.method;
  currentRecord.visitor = row.visitor;
  currentRecord.client = row.client;
  currentRecord.administrativeDivision = row.administrativeDivision;
  currentRecord.address = row.address;
  currentRecord.familyStructure = row.familyStructure;
  currentRecord.healthInformation = row.healthInformation;
  currentRecord.economy = row.economy;
  currentRecord.purpose = row.purpose;
  currentRecord.environment = row.environment;
  currentRecord.diet = row.diet;
  currentRecord.dailyActivity = row.dailyActivity;
  currentRecord.physicalCondition = row.physicalCondition;
  currentRecord.medicalCommand = row.medicalCommand;
  currentRecord.healthGuidance = row.healthGuidance;
  currentRecord.psychologicalState = row.psychologicalState;
  currentRecord.emotionalGuidance = row.emotionalGuidance;
  currentRecord.policyPromotion = row.policyPromotion;
  currentRecord.informationFeedback = row.informationFeedback;
  currentRecord.lifeIssue = row.lifeIssue;
  currentRecord.healthIssue = row.healthIssue;
  currentRecord.psychologicalIssue = row.psychologicalIssue;
  currentRecord.otherNeeds = row.otherNeeds;
  currentRecord.lifeProblemSolution = row.lifeProblemSolution;
  currentRecord.lifeProblemSuggestion = row.lifeProblemSuggestion;
  currentRecord.healthProblemSolution = row.healthProblemSolution;
  currentRecord.healthProblemSuggestion = row.healthProblemSuggestion;
  currentRecord.psychologicalProblemSolution = row.psychologicalProblemSolution;
  currentRecord.psychologicalProblemSuggestion = row.psychologicalProblemSuggestion;
  currentRecord.otherNeedsSolution = row.otherNeedsSolution;
  currentRecord.otherNeedsSuggestion = row.otherNeedsSuggestion;
  currentRecord.feedback = row.feedback;
  currentRecord.feedbackTime = row.feedbackTime;
  currentRecord.visitorSummary = row.visitorSummary;
  currentRecord.remarks = row.remarks;
  currentRecord.attachments = row.attachments;

  console.log(currentRecord);
  dialogEditVisible.value = true;
};

// 打开详细信息对话框
const openDetailDialog = (row: any) => {
  Object.assign(detailRecord, row);
  dialogDetailVisible.value = true;
};

// 打开添加对话框
const openAddDialog = () => {
  dialogAddVisible.value = true;
};

// 删除记录
const deleteRecord = (row: VisitRecord) => {
  ElMessageBox.confirm(
    '此操作将永久删除该探访信息, 是否继续?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    DeleteVisit(row.uid).then(res => {
      if (res.status == 200) {
        ElMessage.success('删除成功');
        getVisitList();
      }
    });
  });
};

// 文件上传相关方法
const handlePreview = (file: UploadFile) => {
  console.log('Preview file:', file);
};

const handleRemove = (file: UploadFile, fileList: UploadFile[]) => {
  console.log('Remove file:', file);
};

const beforeRemove = (file: UploadFile, fileList: UploadFile[]) => {
  return new Promise((resolve) => {
    resolve(true);
  });
};

const handleExceed = (files: File[], fileList: UploadFile[]) => {
  console.log('Exceed max limit:', files);
};

onMounted(() => {
  getVisitList();
});
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
.detail-dialog {
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.detail-form {
  padding: 20px;
}

.section-title {
  margin-top: 20px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e8e8e8;
  color: #333;
  font-weight: bold;
}

.form-row {
  margin-bottom: 15px;
}

.form-col {
  padding: 0 10px;
}

.form-item {
  margin-bottom: 15px;
}

.full-width {
  width: 100%;
}

.form-item-content {
  display: block;
  color: #666;
  word-break: break-all;
}

.attachment-list {
  width: 100%;
}

.attachment-item {
  margin-bottom: 5px;
  list-style-type: none;
}

.attachment-item a {
  color: #409eff;
  text-decoration: none;
}

.attachment-item a:hover {
  text-decoration: underline;
}
</style>