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
        type: (Array),
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "children-info" }));
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
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.data)); _i < _a.length; _i++) {
    var _b = _a[_i], child = _b[0], index = _b[1];
    var __VLS_8 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    var __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(__assign({ key: (index) }, { class: "child-card" })));
    var __VLS_10 = __VLS_9.apply(void 0, __spreadArray([__assign({ key: (index) }, { class: "child-card" })], __VLS_functionalComponentArgsRest(__VLS_9), false));
    __VLS_11.slots.default;
    var __VLS_12 = {}.ElForm;
    /** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
    // @ts-ignore
    var __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        model: (child),
        labelWidth: "120px",
        labelPosition: "left",
    }));
    var __VLS_14 = __VLS_13.apply(void 0, __spreadArray([{
            model: (child),
            labelWidth: "120px",
            labelPosition: "left",
        }], __VLS_functionalComponentArgsRest(__VLS_13), false));
    __VLS_15.slots.default;
    var __VLS_16 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    var __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        label: "姓名",
    }));
    var __VLS_18 = __VLS_17.apply(void 0, __spreadArray([{
            label: "姓名",
        }], __VLS_functionalComponentArgsRest(__VLS_17), false));
    __VLS_19.slots.default;
    (child.name);
    var __VLS_19;
    var __VLS_20 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    var __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        label: "关系",
    }));
    var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([{
            label: "关系",
        }], __VLS_functionalComponentArgsRest(__VLS_21), false));
    __VLS_23.slots.default;
    (child.relation);
    var __VLS_23;
    var __VLS_24 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    var __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        label: "是否为收养",
    }));
    var __VLS_26 = __VLS_25.apply(void 0, __spreadArray([{
            label: "是否为收养",
        }], __VLS_functionalComponentArgsRest(__VLS_25), false));
    __VLS_27.slots.default;
    (child.relation);
    var __VLS_27;
    var __VLS_28 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    var __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        label: "性别",
    }));
    var __VLS_30 = __VLS_29.apply(void 0, __spreadArray([{
            label: "性别",
        }], __VLS_functionalComponentArgsRest(__VLS_29), false));
    __VLS_31.slots.default;
    (child.gender);
    var __VLS_31;
    var __VLS_32 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    var __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        label: "出生日期",
    }));
    var __VLS_34 = __VLS_33.apply(void 0, __spreadArray([{
            label: "出生日期",
        }], __VLS_functionalComponentArgsRest(__VLS_33), false));
    __VLS_35.slots.default;
    (child.birthDate);
    var __VLS_35;
    var __VLS_36 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    var __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        label: "健康状况",
    }));
    var __VLS_38 = __VLS_37.apply(void 0, __spreadArray([{
            label: "健康状况",
        }], __VLS_functionalComponentArgsRest(__VLS_37), false));
    __VLS_39.slots.default;
    (child.healthStatus);
    var __VLS_39;
    var __VLS_40 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    var __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        label: "生活自理能力",
    }));
    var __VLS_42 = __VLS_41.apply(void 0, __spreadArray([{
            label: "生活自理能力",
        }], __VLS_functionalComponentArgsRest(__VLS_41), false));
    __VLS_43.slots.default;
    (child.takecareLifeAbility);
    var __VLS_43;
    var __VLS_44 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    var __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
        label: "是否独居",
    }));
    var __VLS_46 = __VLS_45.apply(void 0, __spreadArray([{
            label: "是否独居",
        }], __VLS_functionalComponentArgsRest(__VLS_45), false));
    __VLS_47.slots.default;
    (child.ifLivingAlone);
    var __VLS_47;
    var __VLS_48 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    var __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        label: "伤残类别",
    }));
    var __VLS_50 = __VLS_49.apply(void 0, __spreadArray([{
            label: "伤残类别",
        }], __VLS_functionalComponentArgsRest(__VLS_49), false));
    __VLS_51.slots.default;
    (child.disabilityType);
    var __VLS_51;
    var __VLS_52 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    var __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        label: "伤残级别",
    }));
    var __VLS_54 = __VLS_53.apply(void 0, __spreadArray([{
            label: "伤残级别",
        }], __VLS_functionalComponentArgsRest(__VLS_53), false));
    __VLS_55.slots.default;
    (child.disabilityLevel);
    var __VLS_55;
    var __VLS_56 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    var __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
        label: "医疗依赖",
    }));
    var __VLS_58 = __VLS_57.apply(void 0, __spreadArray([{
            label: "医疗依赖",
        }], __VLS_functionalComponentArgsRest(__VLS_57), false));
    __VLS_59.slots.default;
    (child.medicalDependence);
    var __VLS_59;
    var __VLS_60 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    var __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
        label: "是否有慢性病",
    }));
    var __VLS_62 = __VLS_61.apply(void 0, __spreadArray([{
            label: "是否有慢性病",
        }], __VLS_functionalComponentArgsRest(__VLS_61), false));
    __VLS_63.slots.default;
    (child.ifChronicDisease);
    var __VLS_63;
    var __VLS_64 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    var __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
        label: "慢性病名称",
    }));
    var __VLS_66 = __VLS_65.apply(void 0, __spreadArray([{
            label: "慢性病名称",
        }], __VLS_functionalComponentArgsRest(__VLS_65), false));
    __VLS_67.slots.default;
    (child.chronicDiseaseName);
    var __VLS_67;
    var __VLS_68 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    var __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
        label: "常用药物",
    }));
    var __VLS_70 = __VLS_69.apply(void 0, __spreadArray([{
            label: "常用药物",
        }], __VLS_functionalComponentArgsRest(__VLS_69), false));
    __VLS_71.slots.default;
    (child.commonlyMedications);
    var __VLS_71;
    var __VLS_72 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    var __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
        label: "等级划分",
    }));
    var __VLS_74 = __VLS_73.apply(void 0, __spreadArray([{
            label: "等级划分",
        }], __VLS_functionalComponentArgsRest(__VLS_73), false));
    __VLS_75.slots.default;
    (child.grading);
    var __VLS_75;
    var __VLS_76 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    var __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
        label: "备注",
    }));
    var __VLS_78 = __VLS_77.apply(void 0, __spreadArray([{
            label: "备注",
        }], __VLS_functionalComponentArgsRest(__VLS_77), false));
    __VLS_79.slots.default;
    (child.remark);
    var __VLS_79;
    var __VLS_15;
    var __VLS_11;
}
/** @type {__VLS_StyleScopedClasses['children-info']} */ ;
/** @type {__VLS_StyleScopedClasses['child-card']} */ ;
var __VLS_dollars;
var __VLS_self = (await Promise.resolve().then(function () { return __importStar(require('vue')); })).defineComponent({
    setup: function () {
        return {};
    },
    props: {
        data: {
            type: (Array),
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
            type: (Array),
            required: true
        }
    },
});
; /* PartiallyEnd: #4569/main.vue */
