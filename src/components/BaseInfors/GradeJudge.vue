<template>
    <div class="judge">
        <div class="title">等级评定</div>
        <div>
            <div v-for="(behavior, index) in behaviors" :key="index" class="behavior">
                <p class="behavior-title">{{ behavior.name }}：</p>
                <el-radio-group v-model="behavior.score" class="radio-group">
                    <el-radio :label="5">完全自理</el-radio>
                    <el-radio :label="3">半自理</el-radio>
                    <el-radio :label="0">不能自理</el-radio>
                </el-radio-group>
                <p class="description">{{ behavior.all }}</p>
                <p class="description">{{ behavior.half }}</p>
                <p class="description">{{ behavior.absolute }}</p>
            </div>
            <el-button type="primary" @click="evaluateGrade" class="evaluate-button">评定等级</el-button>
        </div>
        <div v-if="grade" class="result">
            <p>评定结果：<span :class="grade">{{ grade }}</span></p>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
    name: 'GradeJudge',
    emits: ['gradeEvaluated'], // 声明 emit 事件
    setup(_, { emit }) {
        const behaviors = ref([
            { name: '如厕', score: 0, all: '完全自理：独立完成如厕全过程（含去厕所、脱裤、清洁、冲水）；',
                half:'半自理：需协助整理衣物/冲水/使用便盆，但能完成核心动作；',
                absolute:'不能自理：完全依赖他人完成如厕（包括移动、排泄物处理）。'
             },
            { name: '进食', score: 0, all: '完全自理：独立完成进食（含持餐具、咀嚼、吞咽）；',
                half:'半自理：需部分喂食（如协助持勺、调整食物位置）；',
                absolute:'不能自理：完全依赖喂食或胃管饲食。' },
            { name: '活动（步行）', score: 0, all: '完全自理：独立行走（含上下楼梯，使用辅助器具不扣分）；',
                half:'半自理：需辅助器具(如拐杖)或部分帮助(搀扶)；',
                absolute:'不能自理：完全依赖轮椅/他人搬运。' },
            { name: '穿衣', score: 0, all: '完全自理：独立完成穿衣、脱衣及整理(系扣/拉链/鞋带)；',
                half:'半自理：需协助整理衣物或处理复杂步骤(如系鞋带）；',
                absolute:'不能自理：完全依赖他人完成穿衣全过程。' },
            { name: '洗澡', score: 0, all: '完全自理：独立完成洗澡(含准备热水、进出浴室、擦干身体)；',
                half:'半自理：需协助准备洗澡水或部分清洁步骤；',
                absolute:'不能自理：完全依赖他人完成洗澡。' },
        ]);
        const grade = ref<string | null>(null);

        const evaluateGrade = () => {
            const totalScore = behaviors.value.reduce((sum, behavior) => sum + (behavior.score || 0), 0);
            if (totalScore >= 21) {
                grade.value = '绿';
            } else if (totalScore >= 11) {
                grade.value = '黄';
            } else if (totalScore > 5) {
                grade.value = '橙';
            } else {
                grade.value = '红';
            }
            emit('gradeEvaluated', grade.value); // 通过 emit 传递评定结果
        };

        return {
            behaviors,
            grade,
            evaluateGrade,
        };
    },
});
</script>

<style scoped>
.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
    color: #2c3e50;
    border-bottom: solid 2px #3498db;
    padding-bottom: 10px;
}
.judge {
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    max-height: 70vh;
    overflow-y: auto;
    margin: 0 auto;
}
.behavior {
    margin-bottom: 20px;
}
.behavior-title {
    font-size: 18px;
    font-weight: bold;
    color: #34495e;
    margin-bottom: 5px;
}
.radio-group {
    margin-bottom: 10px;
}
.description {
    font-size: 14px;
    color: #7f8c8d;
    margin-top: 5px;
    padding-left: 10px;
    border-left: 3px solid #bdc3c7;
}
.evaluate-button {
    display: block;
    margin: 20px auto;
    background-color: #3498db;
    border-color: #3498db;
    color: #fff;
    font-size: 16px;
    padding: 10px 20px;
    border-radius: 5px;
}
.evaluate-button:hover {
    background-color: #2980b9;
    border-color: #2980b9;
}
.result {
    margin-top: 20px;
    text-align: center;
}
.result span {
    font-weight: bold;
    color: #fff;
    padding: 5px 15px;
    border-radius: 5px;
    font-size: 18px;
}
.result .红 {
    background-color: #e74c3c;
}
.result .橙 {
    background-color: #e67e22;
}
.result .黄 {
    background-color: #f1c40f;
    color: #000;
}
.result .绿 {
    background-color: #2ecc71;
}
</style>
