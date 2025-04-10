"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var __VLS_props = defineProps({
    data: {
        type: Object,
        required: true
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['el-form-item']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "spouse-info" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ style: {} }));
var __VLS_0 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign(__assign({ 'onClick': {} }, { type: "info" }), { style: {} })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign(__assign({ 'onClick': {} }, { type: "info" }), { style: {} })], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_4;
var __VLS_5;
var __VLS_6;
var __VLS_7 = {
    onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.$emit('goBack');
    }
};
__VLS_3.slots.default;
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(__assign({ style: {} }));
var __VLS_8 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
var __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    model: (__VLS_ctx.data),
    labelWidth: "120px",
    labelPosition: "left",
}));
var __VLS_10 = __VLS_9.apply(void 0, __spreadArray([{
        model: (__VLS_ctx.data),
        labelWidth: "120px",
        labelPosition: "left",
    }], __VLS_functionalComponentArgsRest(__VLS_9), false));
__VLS_11.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "title" }));
var __VLS_12 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    label: "姓名",
}));
var __VLS_14 = __VLS_13.apply(void 0, __spreadArray([{
        label: "姓名",
    }], __VLS_functionalComponentArgsRest(__VLS_13), false));
__VLS_15.slots.default;
(__VLS_ctx.data.name);
var __VLS_15;
var __VLS_16 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    label: "身份证号",
}));
var __VLS_18 = __VLS_17.apply(void 0, __spreadArray([{
        label: "身份证号",
    }], __VLS_functionalComponentArgsRest(__VLS_17), false));
__VLS_19.slots.default;
(__VLS_ctx.data.identificationNumber);
var __VLS_19;
var __VLS_20 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    label: "性别",
}));
var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([{
        label: "性别",
    }], __VLS_functionalComponentArgsRest(__VLS_21), false));
__VLS_23.slots.default;
(__VLS_ctx.data.gender);
var __VLS_23;
var __VLS_24 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    label: "户口所在地",
}));
var __VLS_26 = __VLS_25.apply(void 0, __spreadArray([{
        label: "户口所在地",
    }], __VLS_functionalComponentArgsRest(__VLS_25), false));
__VLS_27.slots.default;
(__VLS_ctx.data.householdRegistLocation);
var __VLS_27;
var __VLS_28 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    label: "出生日期",
}));
var __VLS_30 = __VLS_29.apply(void 0, __spreadArray([{
        label: "出生日期",
    }], __VLS_functionalComponentArgsRest(__VLS_29), false));
__VLS_31.slots.default;
(__VLS_ctx.data.birthDate);
var __VLS_31;
var __VLS_32 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
    label: "民族",
}));
var __VLS_34 = __VLS_33.apply(void 0, __spreadArray([{
        label: "民族",
    }], __VLS_functionalComponentArgsRest(__VLS_33), false));
__VLS_35.slots.default;
(__VLS_ctx.data.ethnicity);
var __VLS_35;
var __VLS_36 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    label: "地域",
}));
var __VLS_38 = __VLS_37.apply(void 0, __spreadArray([{
        label: "地域",
    }], __VLS_functionalComponentArgsRest(__VLS_37), false));
__VLS_39.slots.default;
(__VLS_ctx.data.region);
var __VLS_39;
var __VLS_40 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    label: "电话",
}));
var __VLS_42 = __VLS_41.apply(void 0, __spreadArray([{
        label: "电话",
    }], __VLS_functionalComponentArgsRest(__VLS_41), false));
__VLS_43.slots.default;
(__VLS_ctx.data.phoneNumber);
var __VLS_43;
var __VLS_44 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    label: "政治面貌",
}));
var __VLS_46 = __VLS_45.apply(void 0, __spreadArray([{
        label: "政治面貌",
    }], __VLS_functionalComponentArgsRest(__VLS_45), false));
__VLS_47.slots.default;
(__VLS_ctx.data.politicalAffiliation);
var __VLS_47;
var __VLS_48 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    label: "婚姻状况",
}));
var __VLS_50 = __VLS_49.apply(void 0, __spreadArray([{
        label: "婚姻状况",
    }], __VLS_functionalComponentArgsRest(__VLS_49), false));
__VLS_51.slots.default;
(__VLS_ctx.data.maritalStatus);
var __VLS_51;
var __VLS_52 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    label: "文化程度",
}));
var __VLS_54 = __VLS_53.apply(void 0, __spreadArray([{
        label: "文化程度",
    }], __VLS_functionalComponentArgsRest(__VLS_53), false));
__VLS_55.slots.default;
(__VLS_ctx.data.educationLevel);
var __VLS_55;
var __VLS_56 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    label: "行政区划",
}));
var __VLS_58 = __VLS_57.apply(void 0, __spreadArray([{
        label: "行政区划",
    }], __VLS_functionalComponentArgsRest(__VLS_57), false));
__VLS_59.slots.default;
(__VLS_ctx.data.administrativeDivision);
var __VLS_59;
var __VLS_60 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
    label: "单位学校",
}));
var __VLS_62 = __VLS_61.apply(void 0, __spreadArray([{
        label: "单位学校",
    }], __VLS_functionalComponentArgsRest(__VLS_61), false));
__VLS_63.slots.default;
(__VLS_ctx.data.employerSchool);
var __VLS_63;
var __VLS_64 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    label: "工作情况",
}));
var __VLS_66 = __VLS_65.apply(void 0, __spreadArray([{
        label: "工作情况",
    }], __VLS_functionalComponentArgsRest(__VLS_65), false));
__VLS_67.slots.default;
(__VLS_ctx.data.employmentStatus);
var __VLS_67;
var __VLS_68 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
    label: "等级划分",
}));
var __VLS_70 = __VLS_69.apply(void 0, __spreadArray([{
        label: "等级划分",
    }], __VLS_functionalComponentArgsRest(__VLS_69), false));
__VLS_71.slots.default;
(__VLS_ctx.data.grading);
var __VLS_71;
var __VLS_72 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    label: "备注",
}));
var __VLS_74 = __VLS_73.apply(void 0, __spreadArray([{
        label: "备注",
    }], __VLS_functionalComponentArgsRest(__VLS_73), false));
__VLS_75.slots.default;
(__VLS_ctx.data.remark);
var __VLS_75;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "title" }));
var __VLS_76 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
    label: "血型",
}));
var __VLS_78 = __VLS_77.apply(void 0, __spreadArray([{
        label: "血型",
    }], __VLS_functionalComponentArgsRest(__VLS_77), false));
__VLS_79.slots.default;
(__VLS_ctx.data.healthInformation.bloodType);
var __VLS_79;
var __VLS_80 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
    label: "四肢活动",
}));
var __VLS_82 = __VLS_81.apply(void 0, __spreadArray([{
        label: "四肢活动",
    }], __VLS_functionalComponentArgsRest(__VLS_81), false));
__VLS_83.slots.default;
(__VLS_ctx.data.healthInformation.limbMobility);
var __VLS_83;
var __VLS_84 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
    label: "既往病史",
}));
var __VLS_86 = __VLS_85.apply(void 0, __spreadArray([{
        label: "既往病史",
    }], __VLS_functionalComponentArgsRest(__VLS_85), false));
__VLS_87.slots.default;
(__VLS_ctx.data.healthInformation.medicalHistory);
var __VLS_87;
var __VLS_88 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
    label: "建档时疾病",
}));
var __VLS_90 = __VLS_89.apply(void 0, __spreadArray([{
        label: "建档时疾病",
    }], __VLS_functionalComponentArgsRest(__VLS_89), false));
__VLS_91.slots.default;
(__VLS_ctx.data.healthInformation.recordDisease);
var __VLS_91;
var __VLS_92 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
    label: "是否长期用药",
}));
var __VLS_94 = __VLS_93.apply(void 0, __spreadArray([{
        label: "是否长期用药",
    }], __VLS_functionalComponentArgsRest(__VLS_93), false));
__VLS_95.slots.default;
(__VLS_ctx.data.healthInformation.isLongTermMedication);
var __VLS_95;
var __VLS_96 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({
    label: "重大疾病",
}));
var __VLS_98 = __VLS_97.apply(void 0, __spreadArray([{
        label: "重大疾病",
    }], __VLS_functionalComponentArgsRest(__VLS_97), false));
__VLS_99.slots.default;
(__VLS_ctx.data.healthInformation.majorDiseases);
var __VLS_99;
var __VLS_100 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
    label: "健康状况",
}));
var __VLS_102 = __VLS_101.apply(void 0, __spreadArray([{
        label: "健康状况",
    }], __VLS_functionalComponentArgsRest(__VLS_101), false));
__VLS_103.slots.default;
(__VLS_ctx.data.healthInformation.healthStatus);
var __VLS_103;
var __VLS_104 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({
    label: "伤残级别",
}));
var __VLS_106 = __VLS_105.apply(void 0, __spreadArray([{
        label: "伤残级别",
    }], __VLS_functionalComponentArgsRest(__VLS_105), false));
__VLS_107.slots.default;
(__VLS_ctx.data.healthInformation.disabilityLevel);
var __VLS_107;
var __VLS_108 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_109 = __VLS_asFunctionalComponent(__VLS_108, new __VLS_108({
    label: "伤残类别",
}));
var __VLS_110 = __VLS_109.apply(void 0, __spreadArray([{
        label: "伤残类别",
    }], __VLS_functionalComponentArgsRest(__VLS_109), false));
__VLS_111.slots.default;
(__VLS_ctx.data.healthInformation.disabilityType);
var __VLS_111;
var __VLS_112 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_113 = __VLS_asFunctionalComponent(__VLS_112, new __VLS_112({
    label: "备注",
}));
var __VLS_114 = __VLS_113.apply(void 0, __spreadArray([{
        label: "备注",
    }], __VLS_functionalComponentArgsRest(__VLS_113), false));
__VLS_115.slots.default;
(__VLS_ctx.data.healthInformation.remark);
var __VLS_115;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "title" }));
var __VLS_116 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_117 = __VLS_asFunctionalComponent(__VLS_116, new __VLS_116({
    label: "医疗",
}));
var __VLS_118 = __VLS_117.apply(void 0, __spreadArray([{
        label: "医疗",
    }], __VLS_functionalComponentArgsRest(__VLS_117), false));
__VLS_119.slots.default;
(__VLS_ctx.data.socialSecurityInformation.medicalInsurance);
var __VLS_119;
var __VLS_120 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_121 = __VLS_asFunctionalComponent(__VLS_120, new __VLS_120({
    label: "养老",
}));
var __VLS_122 = __VLS_121.apply(void 0, __spreadArray([{
        label: "养老",
    }], __VLS_functionalComponentArgsRest(__VLS_121), false));
__VLS_123.slots.default;
(__VLS_ctx.data.socialSecurityInformation.medicalInsurance);
var __VLS_123;
var __VLS_124 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_125 = __VLS_asFunctionalComponent(__VLS_124, new __VLS_124({
    label: "住房",
}));
var __VLS_126 = __VLS_125.apply(void 0, __spreadArray([{
        label: "住房",
    }], __VLS_functionalComponentArgsRest(__VLS_125), false));
__VLS_127.slots.default;
(__VLS_ctx.data.socialSecurityInformation.medicalInsurance);
var __VLS_127;
var __VLS_128 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_129 = __VLS_asFunctionalComponent(__VLS_128, new __VLS_128({
    label: "低保",
}));
var __VLS_130 = __VLS_129.apply(void 0, __spreadArray([{
        label: "低保",
    }], __VLS_functionalComponentArgsRest(__VLS_129), false));
__VLS_131.slots.default;
(__VLS_ctx.data.socialSecurityInformation.medicalInsurance);
var __VLS_131;
var __VLS_132 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_133 = __VLS_asFunctionalComponent(__VLS_132, new __VLS_132({
    label: "保险",
}));
var __VLS_134 = __VLS_133.apply(void 0, __spreadArray([{
        label: "保险",
    }], __VLS_functionalComponentArgsRest(__VLS_133), false));
__VLS_135.slots.default;
(__VLS_ctx.data.socialSecurityInformation.medicalInsurance);
var __VLS_135;
var __VLS_136 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_137 = __VLS_asFunctionalComponent(__VLS_136, new __VLS_136({
    label: "五保",
}));
var __VLS_138 = __VLS_137.apply(void 0, __spreadArray([{
        label: "五保",
    }], __VLS_functionalComponentArgsRest(__VLS_137), false));
__VLS_139.slots.default;
(__VLS_ctx.data.socialSecurityInformation.medicalInsurance);
var __VLS_139;
var __VLS_140 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_141 = __VLS_asFunctionalComponent(__VLS_140, new __VLS_140({
    label: "其他保障",
}));
var __VLS_142 = __VLS_141.apply(void 0, __spreadArray([{
        label: "其他保障",
    }], __VLS_functionalComponentArgsRest(__VLS_141), false));
__VLS_143.slots.default;
(__VLS_ctx.data.socialSecurityInformation.medicalInsurance);
var __VLS_143;
var __VLS_144 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
var __VLS_145 = __VLS_asFunctionalComponent(__VLS_144, new __VLS_144({
    label: "就业扶持",
}));
var __VLS_146 = __VLS_145.apply(void 0, __spreadArray([{
        label: "就业扶持",
    }], __VLS_functionalComponentArgsRest(__VLS_145), false));
__VLS_147.slots.default;
(__VLS_ctx.data.socialSecurityInformation.medicalInsurance);
var __VLS_147;
var __VLS_11;
/** @type {__VLS_StyleScopedClasses['spouse-info']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
var __VLS_dollars;
var __VLS_self = (await Promise.resolve().then(function () { return __importStar(require('vue')); })).defineComponent({
    setup: function () {
        return {};
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
});
exports.default = (await Promise.resolve().then(function () { return __importStar(require('vue')); })).defineComponent({
    setup: function () {
        return {};
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
});
; /* PartiallyEnd: #4569/main.vue */
