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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var vue_1 = require("vue");
exports.default = await (function () { return __awaiter(void 0, void 0, void 0, function () {
    var props, __VLS_ctx, __VLS_components, __VLS_directives, __VLS_0, __VLS_1, __VLS_2, __VLS_4, __VLS_5, __VLS_6, __VLS_7, __VLS_9, __VLS_10, __VLS_11, __VLS_8, __VLS_13, __VLS_14, __VLS_15, __VLS_17, __VLS_18, __VLS_19, __VLS_21, __VLS_22, __VLS_23, __VLS_25, __VLS_26, __VLS_27, __VLS_20, __VLS_16, __VLS_29, __VLS_30, __VLS_31, __VLS_33, __VLS_34, __VLS_35, __VLS_37, __VLS_38, __VLS_39, __VLS_41, __VLS_42, __VLS_43, __VLS_36, __VLS_32, __VLS_45, __VLS_46, __VLS_47, __VLS_49, __VLS_50, __VLS_51, __VLS_53, __VLS_54, __VLS_55, __VLS_57, __VLS_58, __VLS_59, __VLS_52, __VLS_48, __VLS_61, __VLS_62, __VLS_63, __VLS_65, __VLS_66, __VLS_67, __VLS_64, __VLS_69, __VLS_70, __VLS_71, __VLS_73, __VLS_74, __VLS_75, __VLS_77, __VLS_78, __VLS_79, __VLS_81, __VLS_82, __VLS_83, __VLS_85, __VLS_86, __VLS_87, __VLS_89, __VLS_90, __VLS_91, __VLS_76, __VLS_72, __VLS_93, __VLS_94, __VLS_95, __VLS_97, __VLS_98, __VLS_99, __VLS_101, __VLS_102, __VLS_103, __VLS_105, __VLS_106, __VLS_107, __VLS_109, __VLS_110, __VLS_111, __VLS_100, __VLS_96, __VLS_113, __VLS_114, __VLS_115, __VLS_117, __VLS_118, __VLS_119, __VLS_121, __VLS_122, __VLS_123, __VLS_125, __VLS_126, __VLS_127, __VLS_120, __VLS_116, __VLS_129, __VLS_130, __VLS_131, __VLS_133, __VLS_134, __VLS_135, __VLS_137, __VLS_138, __VLS_139, __VLS_141, __VLS_142, __VLS_143, __VLS_145, __VLS_146, __VLS_147, __VLS_149, __VLS_150, __VLS_151, __VLS_153, __VLS_154, __VLS_155, __VLS_136, __VLS_132, __VLS_157, __VLS_158, __VLS_159, __VLS_161, __VLS_162, __VLS_163, __VLS_165, __VLS_166, __VLS_167, __VLS_169, __VLS_170, __VLS_171, __VLS_173, __VLS_174, __VLS_175, __VLS_177, __VLS_178, __VLS_179, __VLS_181, __VLS_182, __VLS_183, __VLS_185, __VLS_186, __VLS_187, __VLS_189, __VLS_190, __VLS_191, __VLS_193, __VLS_194, __VLS_195, __VLS_164, __VLS_160, __VLS_197, __VLS_198, __VLS_199, __VLS_201, __VLS_202, __VLS_203, __VLS_205, __VLS_206, __VLS_207, __VLS_209, __VLS_210, __VLS_211, __VLS_213, __VLS_214, __VLS_215, __VLS_217, __VLS_218, __VLS_219, __VLS_204, __VLS_200, __VLS_221, __VLS_222, __VLS_223, __VLS_225, __VLS_226, __VLS_227, __VLS_229, __VLS_230, __VLS_231, __VLS_233, __VLS_234, __VLS_235, __VLS_228, __VLS_224, __VLS_237, __VLS_238, __VLS_239, __VLS_241, __VLS_242, __VLS_243, __VLS_240, __VLS_245, __VLS_246, __VLS_247, __VLS_249, __VLS_250, __VLS_251, __VLS_248, __VLS_253, __VLS_254, __VLS_255, __VLS_257, __VLS_258, __VLS_259, __VLS_261, __VLS_262, __VLS_263, __VLS_265, __VLS_266, __VLS_267, __VLS_269, __VLS_270, __VLS_271, __VLS_273, __VLS_274, __VLS_275, __VLS_260, __VLS_256, __VLS_277, __VLS_278, __VLS_279, __VLS_281, __VLS_282, __VLS_283, __VLS_280, __VLS_3, __VLS_dollars, __VLS_self;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                props = (0, vue_1.defineProps)({
                    memberInfo: {
                        type: Object,
                        required: true
                    },
                    disabled: {
                        type: Boolean,
                        default: false
                    }
                });
                // ...验证规则和其他逻辑
                debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
                __VLS_ctx = {};
                __VLS_0 = {}.ElForm;
                /** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
                __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ model: (__VLS_ctx.memberInfo), labelWidth: "120px", disabled: (__VLS_ctx.disabled) }, { style: {} })));
                __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ model: (__VLS_ctx.memberInfo), labelWidth: "120px", disabled: (__VLS_ctx.disabled) }, { style: {} })], __VLS_functionalComponentArgsRest(__VLS_1), false));
                __VLS_4 = {};
                __VLS_3.slots.default;
                __VLS_5 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
                    label: "姓名",
                    prop: "name",
                }));
                __VLS_7 = __VLS_6.apply(void 0, __spreadArray([{
                        label: "姓名",
                        prop: "name",
                    }], __VLS_functionalComponentArgsRest(__VLS_6), false));
                __VLS_8.slots.default;
                __VLS_9 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
                    modelValue: (__VLS_ctx.memberInfo.name),
                }));
                __VLS_11 = __VLS_10.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.memberInfo.name),
                    }], __VLS_functionalComponentArgsRest(__VLS_10), false));
                __VLS_13 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
                    label: "关系",
                    prop: "relation",
                }));
                __VLS_15 = __VLS_14.apply(void 0, __spreadArray([{
                        label: "关系",
                        prop: "relation",
                    }], __VLS_functionalComponentArgsRest(__VLS_14), false));
                __VLS_16.slots.default;
                __VLS_17 = {}.ElSelect;
                /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
                __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
                    modelValue: (__VLS_ctx.memberInfo.relation),
                    placeholder: "请选择与户主的关系",
                }));
                __VLS_19 = __VLS_18.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.memberInfo.relation),
                        placeholder: "请选择与户主的关系",
                    }], __VLS_functionalComponentArgsRest(__VLS_18), false));
                __VLS_20.slots.default;
                __VLS_21 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
                    label: "子女",
                    value: "子女",
                }));
                __VLS_23 = __VLS_22.apply(void 0, __spreadArray([{
                        label: "子女",
                        value: "子女",
                    }], __VLS_functionalComponentArgsRest(__VLS_22), false));
                __VLS_25 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
                    label: "孙子女",
                    value: "孙子女",
                }));
                __VLS_27 = __VLS_26.apply(void 0, __spreadArray([{
                        label: "孙子女",
                        value: "孙子女",
                    }], __VLS_functionalComponentArgsRest(__VLS_26), false));
                __VLS_29 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
                    label: "是否收养",
                    prop: "ifAdopt",
                }));
                __VLS_31 = __VLS_30.apply(void 0, __spreadArray([{
                        label: "是否收养",
                        prop: "ifAdopt",
                    }], __VLS_functionalComponentArgsRest(__VLS_30), false));
                __VLS_32.slots.default;
                __VLS_33 = {}.ElRadioGroup;
                /** @type {[typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, ]} */ ;
                __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
                    modelValue: (__VLS_ctx.memberInfo.ifAdopt),
                }));
                __VLS_35 = __VLS_34.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.memberInfo.ifAdopt),
                    }], __VLS_functionalComponentArgsRest(__VLS_34), false));
                __VLS_36.slots.default;
                __VLS_37 = {}.ElRadio;
                /** @type {[typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, ]} */ ;
                __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
                    label: "是",
                }));
                __VLS_39 = __VLS_38.apply(void 0, __spreadArray([{
                        label: "是",
                    }], __VLS_functionalComponentArgsRest(__VLS_38), false));
                __VLS_41 = {}.ElRadio;
                /** @type {[typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, ]} */ ;
                __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
                    label: "否",
                }));
                __VLS_43 = __VLS_42.apply(void 0, __spreadArray([{
                        label: "否",
                    }], __VLS_functionalComponentArgsRest(__VLS_42), false));
                __VLS_45 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
                    label: "性别",
                    prop: "gender",
                }));
                __VLS_47 = __VLS_46.apply(void 0, __spreadArray([{
                        label: "性别",
                        prop: "gender",
                    }], __VLS_functionalComponentArgsRest(__VLS_46), false));
                __VLS_48.slots.default;
                __VLS_49 = {}.ElRadioGroup;
                /** @type {[typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, ]} */ ;
                __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
                    modelValue: (__VLS_ctx.memberInfo.gender),
                }));
                __VLS_51 = __VLS_50.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.memberInfo.gender),
                    }], __VLS_functionalComponentArgsRest(__VLS_50), false));
                __VLS_52.slots.default;
                __VLS_53 = {}.ElRadio;
                /** @type {[typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, ]} */ ;
                __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
                    label: "男",
                }));
                __VLS_55 = __VLS_54.apply(void 0, __spreadArray([{
                        label: "男",
                    }], __VLS_functionalComponentArgsRest(__VLS_54), false));
                __VLS_57 = {}.ElRadio;
                /** @type {[typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, ]} */ ;
                __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
                    label: "女",
                }));
                __VLS_59 = __VLS_58.apply(void 0, __spreadArray([{
                        label: "女",
                    }], __VLS_functionalComponentArgsRest(__VLS_58), false));
                __VLS_61 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
                    label: "出生日期",
                    prop: "birthDate",
                }));
                __VLS_63 = __VLS_62.apply(void 0, __spreadArray([{
                        label: "出生日期",
                        prop: "birthDate",
                    }], __VLS_functionalComponentArgsRest(__VLS_62), false));
                __VLS_64.slots.default;
                __VLS_65 = {}.ElDatePicker;
                /** @type {[typeof __VLS_components.ElDatePicker, typeof __VLS_components.elDatePicker, ]} */ ;
                __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
                    modelValue: (__VLS_ctx.memberInfo.birthDate),
                    type: "date",
                }));
                __VLS_67 = __VLS_66.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.memberInfo.birthDate),
                        type: "date",
                    }], __VLS_functionalComponentArgsRest(__VLS_66), false));
                __VLS_69 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({
                    label: "健康状况",
                    prop: "healthStatus",
                }));
                __VLS_71 = __VLS_70.apply(void 0, __spreadArray([{
                        label: "健康状况",
                        prop: "healthStatus",
                    }], __VLS_functionalComponentArgsRest(__VLS_70), false));
                __VLS_72.slots.default;
                __VLS_73 = {}.ElSelect;
                /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
                __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
                    modelValue: (__VLS_ctx.memberInfo.healthStatus),
                    placeholder: "请选择健康状况",
                }));
                __VLS_75 = __VLS_74.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.memberInfo.healthStatus),
                        placeholder: "请选择健康状况",
                    }], __VLS_functionalComponentArgsRest(__VLS_74), false));
                __VLS_76.slots.default;
                __VLS_77 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({
                    label: "良好",
                    value: "良好",
                }));
                __VLS_79 = __VLS_78.apply(void 0, __spreadArray([{
                        label: "良好",
                        value: "良好",
                    }], __VLS_functionalComponentArgsRest(__VLS_78), false));
                __VLS_81 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
                    label: "高龄 (大于等于80周岁)",
                    value: "高龄",
                }));
                __VLS_83 = __VLS_82.apply(void 0, __spreadArray([{
                        label: "高龄 (大于等于80周岁)",
                        value: "高龄",
                    }], __VLS_functionalComponentArgsRest(__VLS_82), false));
                __VLS_85 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({
                    label: "慢性病 (高血压/糖尿病/心脏病等需长期服药疾病)",
                    value: "慢性病",
                }));
                __VLS_87 = __VLS_86.apply(void 0, __spreadArray([{
                        label: "慢性病 (高血压/糖尿病/心脏病等需长期服药疾病)",
                        value: "慢性病",
                    }], __VLS_functionalComponentArgsRest(__VLS_86), false));
                __VLS_89 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({
                    label: "失能 (依据巴氏指数评估法，进餐/穿衣/如厕等五项活动能力)",
                    value: "失能",
                }));
                __VLS_91 = __VLS_90.apply(void 0, __spreadArray([{
                        label: "失能 (依据巴氏指数评估法，进餐/穿衣/如厕等五项活动能力)",
                        value: "失能",
                    }], __VLS_functionalComponentArgsRest(__VLS_90), false));
                __VLS_93 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93({
                    label: "生活自理能力",
                    prop: "takecareLifeAbility",
                }));
                __VLS_95 = __VLS_94.apply(void 0, __spreadArray([{
                        label: "生活自理能力",
                        prop: "takecareLifeAbility",
                    }], __VLS_functionalComponentArgsRest(__VLS_94), false));
                __VLS_96.slots.default;
                __VLS_97 = {}.ElSelect;
                /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
                __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({
                    modelValue: (__VLS_ctx.memberInfo.takecareLifeAbility),
                    placeholder: "请选择生活自理能力",
                }));
                __VLS_99 = __VLS_98.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.memberInfo.takecareLifeAbility),
                        placeholder: "请选择生活自理能力",
                    }], __VLS_functionalComponentArgsRest(__VLS_98), false));
                __VLS_100.slots.default;
                __VLS_101 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_102 = __VLS_asFunctionalComponent(__VLS_101, new __VLS_101({
                    label: "完全自理",
                    value: "完全自理",
                }));
                __VLS_103 = __VLS_102.apply(void 0, __spreadArray([{
                        label: "完全自理",
                        value: "完全自理",
                    }], __VLS_functionalComponentArgsRest(__VLS_102), false));
                __VLS_105 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
                    label: "半自理",
                    value: "半自理",
                }));
                __VLS_107 = __VLS_106.apply(void 0, __spreadArray([{
                        label: "半自理",
                        value: "半自理",
                    }], __VLS_functionalComponentArgsRest(__VLS_106), false));
                __VLS_109 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({
                    label: "不能自理",
                    value: "不能自理",
                }));
                __VLS_111 = __VLS_110.apply(void 0, __spreadArray([{
                        label: "不能自理",
                        value: "不能自理",
                    }], __VLS_functionalComponentArgsRest(__VLS_110), false));
                __VLS_113 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({
                    label: "是否独居",
                    prop: "ifLivingAlone",
                }));
                __VLS_115 = __VLS_114.apply(void 0, __spreadArray([{
                        label: "是否独居",
                        prop: "ifLivingAlone",
                    }], __VLS_functionalComponentArgsRest(__VLS_114), false));
                __VLS_116.slots.default;
                __VLS_117 = {}.ElRadioGroup;
                /** @type {[typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, ]} */ ;
                __VLS_118 = __VLS_asFunctionalComponent(__VLS_117, new __VLS_117({
                    modelValue: (__VLS_ctx.memberInfo.ifLivingAlone),
                }));
                __VLS_119 = __VLS_118.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.memberInfo.ifLivingAlone),
                    }], __VLS_functionalComponentArgsRest(__VLS_118), false));
                __VLS_120.slots.default;
                __VLS_121 = {}.ElRadio;
                /** @type {[typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, ]} */ ;
                __VLS_122 = __VLS_asFunctionalComponent(__VLS_121, new __VLS_121({
                    label: "是",
                }));
                __VLS_123 = __VLS_122.apply(void 0, __spreadArray([{
                        label: "是",
                    }], __VLS_functionalComponentArgsRest(__VLS_122), false));
                __VLS_125 = {}.ElRadio;
                /** @type {[typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, ]} */ ;
                __VLS_126 = __VLS_asFunctionalComponent(__VLS_125, new __VLS_125({
                    label: "否",
                }));
                __VLS_127 = __VLS_126.apply(void 0, __spreadArray([{
                        label: "否",
                    }], __VLS_functionalComponentArgsRest(__VLS_126), false));
                __VLS_129 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_130 = __VLS_asFunctionalComponent(__VLS_129, new __VLS_129({
                    label: "伤残类别",
                    prop: "disabilityType",
                }));
                __VLS_131 = __VLS_130.apply(void 0, __spreadArray([{
                        label: "伤残类别",
                        prop: "disabilityType",
                    }], __VLS_functionalComponentArgsRest(__VLS_130), false));
                __VLS_132.slots.default;
                __VLS_133 = {}.ElSelect;
                /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
                __VLS_134 = __VLS_asFunctionalComponent(__VLS_133, new __VLS_133({
                    modelValue: (__VLS_ctx.memberInfo.disabilityType),
                    placeholder: "请选择伤残类别",
                }));
                __VLS_135 = __VLS_134.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.memberInfo.disabilityType),
                        placeholder: "请选择伤残类别",
                    }], __VLS_functionalComponentArgsRest(__VLS_134), false));
                __VLS_136.slots.default;
                __VLS_137 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_138 = __VLS_asFunctionalComponent(__VLS_137, new __VLS_137({
                    label: "无",
                    value: "无",
                }));
                __VLS_139 = __VLS_138.apply(void 0, __spreadArray([{
                        label: "无",
                        value: "无",
                    }], __VLS_functionalComponentArgsRest(__VLS_138), false));
                __VLS_141 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_142 = __VLS_asFunctionalComponent(__VLS_141, new __VLS_141({
                    label: "肢体",
                    value: "肢体",
                }));
                __VLS_143 = __VLS_142.apply(void 0, __spreadArray([{
                        label: "肢体",
                        value: "肢体",
                    }], __VLS_functionalComponentArgsRest(__VLS_142), false));
                __VLS_145 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_146 = __VLS_asFunctionalComponent(__VLS_145, new __VLS_145({
                    label: "视力",
                    value: "视力",
                }));
                __VLS_147 = __VLS_146.apply(void 0, __spreadArray([{
                        label: "视力",
                        value: "视力",
                    }], __VLS_functionalComponentArgsRest(__VLS_146), false));
                __VLS_149 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_150 = __VLS_asFunctionalComponent(__VLS_149, new __VLS_149({
                    label: "听力",
                    value: "听力",
                }));
                __VLS_151 = __VLS_150.apply(void 0, __spreadArray([{
                        label: "听力",
                        value: "听力",
                    }], __VLS_functionalComponentArgsRest(__VLS_150), false));
                __VLS_153 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_154 = __VLS_asFunctionalComponent(__VLS_153, new __VLS_153({
                    label: "精神",
                    value: "精神",
                }));
                __VLS_155 = __VLS_154.apply(void 0, __spreadArray([{
                        label: "精神",
                        value: "精神",
                    }], __VLS_functionalComponentArgsRest(__VLS_154), false));
                if (__VLS_ctx.memberInfo.disabilityType == '肢体' || __VLS_ctx.memberInfo.disabilityType == '精神') {
                    __VLS_157 = {}.ElFormItem;
                    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                    __VLS_158 = __VLS_asFunctionalComponent(__VLS_157, new __VLS_157({
                        label: "伤残级别",
                        prop: "disabilityLevel",
                    }));
                    __VLS_159 = __VLS_158.apply(void 0, __spreadArray([{
                            label: "伤残级别",
                            prop: "disabilityLevel",
                        }], __VLS_functionalComponentArgsRest(__VLS_158), false));
                    __VLS_160.slots.default;
                    __VLS_161 = {}.ElSelect;
                    /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
                    __VLS_162 = __VLS_asFunctionalComponent(__VLS_161, new __VLS_161({
                        modelValue: (__VLS_ctx.memberInfo.disabilityLevel),
                    }));
                    __VLS_163 = __VLS_162.apply(void 0, __spreadArray([{
                            modelValue: (__VLS_ctx.memberInfo.disabilityLevel),
                        }], __VLS_functionalComponentArgsRest(__VLS_162), false));
                    __VLS_164.slots.default;
                    __VLS_165 = {}.ElOption;
                    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                    __VLS_166 = __VLS_asFunctionalComponent(__VLS_165, new __VLS_165({
                        label: "无",
                        value: "无",
                    }));
                    __VLS_167 = __VLS_166.apply(void 0, __spreadArray([{
                            label: "无",
                            value: "无",
                        }], __VLS_functionalComponentArgsRest(__VLS_166), false));
                    if (__VLS_ctx.memberInfo.disabilityType == '肢体') {
                        __VLS_169 = {}.ElOption;
                        /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                        __VLS_170 = __VLS_asFunctionalComponent(__VLS_169, new __VLS_169({
                            label: "一级 (四肢瘫/截瘫/偏瘫等，完全丧失活动能力)",
                            value: "一级",
                        }));
                        __VLS_171 = __VLS_170.apply(void 0, __spreadArray([{
                                label: "一级 (四肢瘫/截瘫/偏瘫等，完全丧失活动能力)",
                                value: "一级",
                            }], __VLS_functionalComponentArgsRest(__VLS_170), false));
                    }
                    if (__VLS_ctx.memberInfo.disabilityType == '肢体') {
                        __VLS_173 = {}.ElOption;
                        /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                        __VLS_174 = __VLS_asFunctionalComponent(__VLS_173, new __VLS_173({
                            label: "二级 (保留部分功能，无法独立行走)",
                            value: "二级",
                        }));
                        __VLS_175 = __VLS_174.apply(void 0, __spreadArray([{
                                label: "二级 (保留部分功能，无法独立行走)",
                                value: "二级",
                            }], __VLS_functionalComponentArgsRest(__VLS_174), false));
                    }
                    if (__VLS_ctx.memberInfo.disabilityType == '肢体') {
                        __VLS_177 = {}.ElOption;
                        /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                        __VLS_178 = __VLS_asFunctionalComponent(__VLS_177, new __VLS_177({
                            label: "三级 (部分功能保留，需辅助器具)",
                            value: "三级",
                        }));
                        __VLS_179 = __VLS_178.apply(void 0, __spreadArray([{
                                label: "三级 (部分功能保留，需辅助器具)",
                                value: "三级",
                            }], __VLS_functionalComponentArgsRest(__VLS_178), false));
                    }
                    if (__VLS_ctx.memberInfo.disabilityType == '肢体') {
                        __VLS_181 = {}.ElOption;
                        /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                        __VLS_182 = __VLS_asFunctionalComponent(__VLS_181, new __VLS_181({
                            label: "四级 (轻度功能障碍，如脊柱测凸<45°)",
                            value: "四级",
                        }));
                        __VLS_183 = __VLS_182.apply(void 0, __spreadArray([{
                                label: "四级 (轻度功能障碍，如脊柱测凸<45°)",
                                value: "四级",
                            }], __VLS_functionalComponentArgsRest(__VLS_182), false));
                    }
                    if (__VLS_ctx.memberInfo.disabilityType == '精神') {
                        __VLS_185 = {}.ElOption;
                        /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                        __VLS_186 = __VLS_asFunctionalComponent(__VLS_185, new __VLS_185({
                            label: "一级 (完全无法参与社会活动)",
                            value: "一级",
                        }));
                        __VLS_187 = __VLS_186.apply(void 0, __spreadArray([{
                                label: "一级 (完全无法参与社会活动)",
                                value: "一级",
                            }], __VLS_functionalComponentArgsRest(__VLS_186), false));
                    }
                    if (__VLS_ctx.memberInfo.disabilityType == '精神') {
                        __VLS_189 = {}.ElOption;
                        /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                        __VLS_190 = __VLS_asFunctionalComponent(__VLS_189, new __VLS_189({
                            label: "二级 (严重受限，需全天监护)",
                            value: "二级",
                        }));
                        __VLS_191 = __VLS_190.apply(void 0, __spreadArray([{
                                label: "二级 (严重受限，需全天监护)",
                                value: "二级",
                            }], __VLS_functionalComponentArgsRest(__VLS_190), false));
                    }
                    if (__VLS_ctx.memberInfo.disabilityType == '精神') {
                        __VLS_193 = {}.ElOption;
                        /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                        __VLS_194 = __VLS_asFunctionalComponent(__VLS_193, new __VLS_193({
                            label: "三级 (部分受限，需间歇支持)",
                            value: "三级",
                        }));
                        __VLS_195 = __VLS_194.apply(void 0, __spreadArray([{
                                label: "三级 (部分受限，需间歇支持)",
                                value: "三级",
                            }], __VLS_functionalComponentArgsRest(__VLS_194), false));
                    }
                }
                __VLS_197 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_198 = __VLS_asFunctionalComponent(__VLS_197, new __VLS_197({
                    label: "医疗依赖",
                    prop: "medicalDependence",
                }));
                __VLS_199 = __VLS_198.apply(void 0, __spreadArray([{
                        label: "医疗依赖",
                        prop: "medicalDependence",
                    }], __VLS_functionalComponentArgsRest(__VLS_198), false));
                __VLS_200.slots.default;
                __VLS_201 = {}.ElSelect;
                /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
                __VLS_202 = __VLS_asFunctionalComponent(__VLS_201, new __VLS_201({
                    placeholder: "请选择医疗依赖类型",
                    modelValue: (__VLS_ctx.memberInfo.medicalDependence),
                }));
                __VLS_203 = __VLS_202.apply(void 0, __spreadArray([{
                        placeholder: "请选择医疗依赖类型",
                        modelValue: (__VLS_ctx.memberInfo.medicalDependence),
                    }], __VLS_functionalComponentArgsRest(__VLS_202), false));
                __VLS_204.slots.default;
                __VLS_205 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_206 = __VLS_asFunctionalComponent(__VLS_205, new __VLS_205({
                    label: "完全依赖护理 (需全天候照护)",
                    value: "完全依赖护理",
                }));
                __VLS_207 = __VLS_206.apply(void 0, __spreadArray([{
                        label: "完全依赖护理 (需全天候照护)",
                        value: "完全依赖护理",
                    }], __VLS_functionalComponentArgsRest(__VLS_206), false));
                __VLS_209 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_210 = __VLS_asFunctionalComponent(__VLS_209, new __VLS_209({
                    label: "重度依赖 (需部分协助)",
                    value: "重度依赖",
                }));
                __VLS_211 = __VLS_210.apply(void 0, __spreadArray([{
                        label: "重度依赖 (需部分协助)",
                        value: "重度依赖",
                    }], __VLS_functionalComponentArgsRest(__VLS_210), false));
                __VLS_213 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_214 = __VLS_asFunctionalComponent(__VLS_213, new __VLS_213({
                    label: "轻度依赖 (需少量帮助)",
                    value: "轻度依赖",
                }));
                __VLS_215 = __VLS_214.apply(void 0, __spreadArray([{
                        label: "轻度依赖 (需少量帮助)",
                        value: "轻度依赖",
                    }], __VLS_functionalComponentArgsRest(__VLS_214), false));
                __VLS_217 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_218 = __VLS_asFunctionalComponent(__VLS_217, new __VLS_217({
                    label: "完全自理 (仅需监护)",
                    value: "完全自理",
                }));
                __VLS_219 = __VLS_218.apply(void 0, __spreadArray([{
                        label: "完全自理 (仅需监护)",
                        value: "完全自理",
                    }], __VLS_functionalComponentArgsRest(__VLS_218), false));
                __VLS_221 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_222 = __VLS_asFunctionalComponent(__VLS_221, new __VLS_221({
                    label: "是否有慢性病",
                    prop: "ifChronicDisease",
                }));
                __VLS_223 = __VLS_222.apply(void 0, __spreadArray([{
                        label: "是否有慢性病",
                        prop: "ifChronicDisease",
                    }], __VLS_functionalComponentArgsRest(__VLS_222), false));
                __VLS_224.slots.default;
                __VLS_225 = {}.ElRadioGroup;
                /** @type {[typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, ]} */ ;
                __VLS_226 = __VLS_asFunctionalComponent(__VLS_225, new __VLS_225({
                    modelValue: (__VLS_ctx.memberInfo.ifChronicDisease),
                }));
                __VLS_227 = __VLS_226.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.memberInfo.ifChronicDisease),
                    }], __VLS_functionalComponentArgsRest(__VLS_226), false));
                __VLS_228.slots.default;
                __VLS_229 = {}.ElRadio;
                /** @type {[typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, ]} */ ;
                __VLS_230 = __VLS_asFunctionalComponent(__VLS_229, new __VLS_229({
                    label: "是",
                }));
                __VLS_231 = __VLS_230.apply(void 0, __spreadArray([{
                        label: "是",
                    }], __VLS_functionalComponentArgsRest(__VLS_230), false));
                __VLS_233 = {}.ElRadio;
                /** @type {[typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, ]} */ ;
                __VLS_234 = __VLS_asFunctionalComponent(__VLS_233, new __VLS_233({
                    label: "否",
                }));
                __VLS_235 = __VLS_234.apply(void 0, __spreadArray([{
                        label: "否",
                    }], __VLS_functionalComponentArgsRest(__VLS_234), false));
                __VLS_237 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_238 = __VLS_asFunctionalComponent(__VLS_237, new __VLS_237({
                    label: "慢性病名称",
                    prop: "chronicDiseaseName",
                }));
                __VLS_239 = __VLS_238.apply(void 0, __spreadArray([{
                        label: "慢性病名称",
                        prop: "chronicDiseaseName",
                    }], __VLS_functionalComponentArgsRest(__VLS_238), false));
                __VLS_240.slots.default;
                __VLS_241 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_242 = __VLS_asFunctionalComponent(__VLS_241, new __VLS_241({
                    modelValue: (__VLS_ctx.memberInfo.chronicDiseaseName),
                }));
                __VLS_243 = __VLS_242.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.memberInfo.chronicDiseaseName),
                    }], __VLS_functionalComponentArgsRest(__VLS_242), false));
                __VLS_245 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_246 = __VLS_asFunctionalComponent(__VLS_245, new __VLS_245({
                    label: "常用药物",
                    prop: "commonlyMedications",
                }));
                __VLS_247 = __VLS_246.apply(void 0, __spreadArray([{
                        label: "常用药物",
                        prop: "commonlyMedications",
                    }], __VLS_functionalComponentArgsRest(__VLS_246), false));
                __VLS_248.slots.default;
                __VLS_249 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_250 = __VLS_asFunctionalComponent(__VLS_249, new __VLS_249({
                    modelValue: (__VLS_ctx.memberInfo.commonlyMedications),
                }));
                __VLS_251 = __VLS_250.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.memberInfo.commonlyMedications),
                    }], __VLS_functionalComponentArgsRest(__VLS_250), false));
                __VLS_253 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_254 = __VLS_asFunctionalComponent(__VLS_253, new __VLS_253({
                    label: "等级划分",
                    prop: "grading",
                }));
                __VLS_255 = __VLS_254.apply(void 0, __spreadArray([{
                        label: "等级划分",
                        prop: "grading",
                    }], __VLS_functionalComponentArgsRest(__VLS_254), false));
                __VLS_256.slots.default;
                __VLS_257 = {}.ElSelect;
                /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
                __VLS_258 = __VLS_asFunctionalComponent(__VLS_257, new __VLS_257({
                    modelValue: (__VLS_ctx.memberInfo.grading),
                    placeholder: "请选择等级",
                }));
                __VLS_259 = __VLS_258.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.memberInfo.grading),
                        placeholder: "请选择等级",
                    }], __VLS_functionalComponentArgsRest(__VLS_258), false));
                __VLS_260.slots.default;
                __VLS_261 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_262 = __VLS_asFunctionalComponent(__VLS_261, new __VLS_261({
                    label: "红",
                    value: "红",
                }));
                __VLS_263 = __VLS_262.apply(void 0, __spreadArray([{
                        label: "红",
                        value: "红",
                    }], __VLS_functionalComponentArgsRest(__VLS_262), false));
                __VLS_265 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_266 = __VLS_asFunctionalComponent(__VLS_265, new __VLS_265({
                    label: "橙",
                    value: "橙",
                }));
                __VLS_267 = __VLS_266.apply(void 0, __spreadArray([{
                        label: "橙",
                        value: "橙",
                    }], __VLS_functionalComponentArgsRest(__VLS_266), false));
                __VLS_269 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_270 = __VLS_asFunctionalComponent(__VLS_269, new __VLS_269({
                    label: "黄",
                    value: "黄",
                }));
                __VLS_271 = __VLS_270.apply(void 0, __spreadArray([{
                        label: "黄",
                        value: "黄",
                    }], __VLS_functionalComponentArgsRest(__VLS_270), false));
                __VLS_273 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_274 = __VLS_asFunctionalComponent(__VLS_273, new __VLS_273({
                    label: "绿",
                    value: "绿",
                }));
                __VLS_275 = __VLS_274.apply(void 0, __spreadArray([{
                        label: "绿",
                        value: "绿",
                    }], __VLS_functionalComponentArgsRest(__VLS_274), false));
                __VLS_277 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_278 = __VLS_asFunctionalComponent(__VLS_277, new __VLS_277({
                    label: "备注",
                    prop: "remark",
                }));
                __VLS_279 = __VLS_278.apply(void 0, __spreadArray([{
                        label: "备注",
                        prop: "remark",
                    }], __VLS_functionalComponentArgsRest(__VLS_278), false));
                __VLS_280.slots.default;
                __VLS_281 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_282 = __VLS_asFunctionalComponent(__VLS_281, new __VLS_281({
                    modelValue: (__VLS_ctx.memberInfo.remark),
                }));
                __VLS_283 = __VLS_282.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.memberInfo.remark),
                    }], __VLS_functionalComponentArgsRest(__VLS_282), false));
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('vue')); })];
            case 1:
                __VLS_self = (_a.sent()).defineComponent({
                    setup: function () {
                        return {};
                    },
                    props: {
                        memberInfo: {
                            type: Object,
                            required: true
                        },
                        disabled: {
                            type: Boolean,
                            default: false
                        }
                    },
                    name: 'ChildGrandInfoDialog',
                });
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('vue')); })];
            case 2: return [2 /*return*/, (_a.sent()).defineComponent({
                    setup: function () {
                        return {};
                    },
                    props: {
                        memberInfo: {
                            type: Object,
                            required: true
                        },
                        disabled: {
                            type: Boolean,
                            default: false
                        }
                    },
                    name: 'ChildGrandInfoDialog',
                })];
        }
    });
}); })(); /* PartiallyEnd: #4569/main.vue */
