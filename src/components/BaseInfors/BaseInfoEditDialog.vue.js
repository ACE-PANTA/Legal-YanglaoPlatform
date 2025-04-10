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
var element_plus_1 = require("element-plus");
exports.default = await (function () { return __awaiter(void 0, void 0, void 0, function () {
    var props, validateForm, beforePhotoUpload, itemInfoRef, emit, __VLS_ctx, __VLS_components, __VLS_directives, __VLS_0, __VLS_1, __VLS_2, __VLS_4, __VLS_6, __VLS_7, __VLS_8, __VLS_10, __VLS_11, __VLS_12, __VLS_14, __VLS_15, __VLS_16, __VLS_13, __VLS_9, __VLS_18, __VLS_19, __VLS_20, __VLS_22, __VLS_23, __VLS_24, __VLS_26, __VLS_27, __VLS_28, __VLS_25, __VLS_21, __VLS_30, __VLS_31, __VLS_32, __VLS_34, __VLS_35, __VLS_36, __VLS_38, __VLS_39, __VLS_40, __VLS_37, __VLS_33, __VLS_42, __VLS_43, __VLS_44, __VLS_46, __VLS_47, __VLS_48, __VLS_50, __VLS_51, __VLS_52, __VLS_54, __VLS_55, __VLS_56, __VLS_57, __VLS_58, __VLS_59, __VLS_60, __VLS_61, __VLS_53, __VLS_49, __VLS_45, __VLS_62, __VLS_63, __VLS_64, __VLS_66, __VLS_67, __VLS_68, __VLS_70, __VLS_71, __VLS_72, __VLS_69, __VLS_65, __VLS_74, __VLS_75, __VLS_76, __VLS_78, __VLS_79, __VLS_80, __VLS_82, __VLS_83, __VLS_84, __VLS_81, __VLS_77, __VLS_86, __VLS_87, __VLS_88, __VLS_90, __VLS_91, __VLS_92, __VLS_94, __VLS_95, __VLS_96, __VLS_98, __VLS_99, __VLS_100, __VLS_101, __VLS_102, __VLS_103, __VLS_104, __VLS_105, __VLS_97, __VLS_93, __VLS_89, __VLS_106, __VLS_107, __VLS_108, __VLS_110, __VLS_111, __VLS_112, __VLS_114, __VLS_115, __VLS_116, __VLS_118, __VLS_119, __VLS_120, __VLS_122, __VLS_123, __VLS_124, __VLS_126, __VLS_127, __VLS_128, __VLS_130, __VLS_131, __VLS_132, __VLS_117, __VLS_113, __VLS_109, __VLS_134, __VLS_135, __VLS_136, __VLS_138, __VLS_139, __VLS_140, __VLS_142, __VLS_143, __VLS_144, __VLS_146, __VLS_147, __VLS_148, __VLS_150, __VLS_151, __VLS_152, __VLS_154, __VLS_155, __VLS_156, __VLS_158, __VLS_159, __VLS_160, __VLS_162, __VLS_163, __VLS_164, __VLS_166, __VLS_167, __VLS_168, __VLS_145, __VLS_141, __VLS_137, __VLS_170, __VLS_171, __VLS_172, __VLS_174, __VLS_175, __VLS_176, __VLS_178, __VLS_179, __VLS_180, __VLS_182, __VLS_183, __VLS_184, __VLS_186, __VLS_187, __VLS_188, __VLS_190, __VLS_191, __VLS_192, __VLS_194, __VLS_195, __VLS_196, __VLS_198, __VLS_199, __VLS_200, __VLS_202, __VLS_203, __VLS_204, __VLS_206, __VLS_207, __VLS_208, __VLS_210, __VLS_211, __VLS_212, __VLS_214, __VLS_215, __VLS_216, __VLS_181, __VLS_177, __VLS_173, __VLS_218, __VLS_219, __VLS_220, __VLS_222, __VLS_223, __VLS_224, __VLS_226, __VLS_227, __VLS_228, __VLS_225, __VLS_221, __VLS_230, __VLS_231, __VLS_232, __VLS_234, __VLS_235, __VLS_236, __VLS_238, __VLS_239, __VLS_240, __VLS_237, __VLS_233, __VLS_242, __VLS_243, __VLS_244, __VLS_246, __VLS_247, __VLS_248, __VLS_250, __VLS_251, __VLS_252, __VLS_254, __VLS_255, __VLS_256, __VLS_258, __VLS_259, __VLS_260, __VLS_262, __VLS_263, __VLS_264, __VLS_266, __VLS_267, __VLS_268, __VLS_253, __VLS_249, __VLS_245, __VLS_270, __VLS_271, __VLS_272, __VLS_274, __VLS_275, __VLS_276, __VLS_278, __VLS_279, __VLS_280, __VLS_277, __VLS_273, __VLS_282, __VLS_283, __VLS_284, __VLS_286, __VLS_287, __VLS_288, __VLS_290, __VLS_291, __VLS_292, __VLS_289, __VLS_285, __VLS_294, __VLS_295, __VLS_296, __VLS_298, __VLS_299, __VLS_300, __VLS_302, __VLS_303, __VLS_304, __VLS_306, __VLS_307, __VLS_308, __VLS_310, __VLS_311, __VLS_312, __VLS_314, __VLS_315, __VLS_316, __VLS_318, __VLS_319, __VLS_320, __VLS_322, __VLS_323, __VLS_324, __VLS_305, __VLS_301, __VLS_297, __VLS_326, __VLS_327, __VLS_328, __VLS_330, __VLS_331, __VLS_332, __VLS_334, __VLS_335, __VLS_336, __VLS_338, __VLS_339, __VLS_340, __VLS_342, __VLS_343, __VLS_344, __VLS_346, __VLS_347, __VLS_348, __VLS_350, __VLS_351, __VLS_352, __VLS_354, __VLS_355, __VLS_356, __VLS_358, __VLS_359, __VLS_360, __VLS_337, __VLS_333, __VLS_329, __VLS_362, __VLS_363, __VLS_364, __VLS_366, __VLS_367, __VLS_368, __VLS_370, __VLS_371, __VLS_372, __VLS_374, __VLS_375, __VLS_376, __VLS_377, __VLS_378, __VLS_379, __VLS_380, __VLS_381, __VLS_373, __VLS_369, __VLS_365, __VLS_382, __VLS_383, __VLS_384, __VLS_386, __VLS_387, __VLS_388, __VLS_390, __VLS_391, __VLS_392, __VLS_389, __VLS_385, __VLS_394, __VLS_395, __VLS_396, __VLS_398, __VLS_399, __VLS_400, __VLS_402, __VLS_403, __VLS_404, __VLS_401, __VLS_397, __VLS_406, __VLS_407, __VLS_408, __VLS_410, __VLS_411, __VLS_412, __VLS_414, __VLS_415, __VLS_416, __VLS_418, __VLS_419, __VLS_420, __VLS_421, __VLS_422, __VLS_423, __VLS_424, __VLS_425, __VLS_417, __VLS_413, __VLS_409, __VLS_426, __VLS_427, __VLS_428, __VLS_430, __VLS_431, __VLS_432, __VLS_434, __VLS_435, __VLS_436, __VLS_433, __VLS_429, __VLS_438, __VLS_439, __VLS_440, __VLS_442, __VLS_443, __VLS_444, __VLS_446, __VLS_447, __VLS_448, __VLS_450, __VLS_451, __VLS_452, __VLS_454, __VLS_455, __VLS_456, __VLS_458, __VLS_459, __VLS_460, __VLS_462, __VLS_463, __VLS_464, __VLS_449, __VLS_445, __VLS_441, __VLS_466, __VLS_467, __VLS_468, __VLS_470, __VLS_471, __VLS_472, __VLS_474, __VLS_475, __VLS_476, __VLS_478, __VLS_479, __VLS_480, __VLS_482, __VLS_483, __VLS_484, __VLS_486, __VLS_487, __VLS_488, __VLS_490, __VLS_491, __VLS_492, __VLS_494, __VLS_495, __VLS_496, __VLS_477, __VLS_473, __VLS_469, __VLS_498, __VLS_499, __VLS_500, __VLS_502, __VLS_503, __VLS_504, __VLS_506, __VLS_507, __VLS_508, __VLS_510, __VLS_511, __VLS_512, __VLS_514, __VLS_515, __VLS_516, __VLS_518, __VLS_519, __VLS_520, __VLS_522, __VLS_523, __VLS_524, __VLS_526, __VLS_527, __VLS_528, __VLS_530, __VLS_531, __VLS_532, __VLS_534, __VLS_535, __VLS_536, __VLS_538, __VLS_539, __VLS_540, __VLS_509, __VLS_505, __VLS_501, __VLS_542, __VLS_543, __VLS_544, __VLS_546, __VLS_547, __VLS_548, __VLS_550, __VLS_551, __VLS_552, __VLS_549, __VLS_545, __VLS_554, __VLS_555, __VLS_556, __VLS_558, __VLS_559, __VLS_560, __VLS_562, __VLS_563, __VLS_564, __VLS_561, __VLS_557, __VLS_566, __VLS_567, __VLS_568, __VLS_570, __VLS_571, __VLS_572, __VLS_574, __VLS_575, __VLS_576, __VLS_573, __VLS_569, __VLS_578, __VLS_579, __VLS_580, __VLS_582, __VLS_583, __VLS_584, __VLS_586, __VLS_587, __VLS_588, __VLS_585, __VLS_581, __VLS_590, __VLS_591, __VLS_592, __VLS_594, __VLS_595, __VLS_596, __VLS_598, __VLS_599, __VLS_600, __VLS_597, __VLS_593, __VLS_602, __VLS_603, __VLS_604, __VLS_606, __VLS_607, __VLS_608, __VLS_610, __VLS_611, __VLS_612, __VLS_609, __VLS_605, __VLS_614, __VLS_615, __VLS_616, __VLS_618, __VLS_619, __VLS_620, __VLS_622, __VLS_623, __VLS_624, __VLS_621, __VLS_617, __VLS_626, __VLS_627, __VLS_628, __VLS_630, __VLS_631, __VLS_632, __VLS_634, __VLS_635, __VLS_636, __VLS_633, __VLS_629, __VLS_638, __VLS_639, __VLS_640, __VLS_642, __VLS_643, __VLS_644, __VLS_646, __VLS_647, __VLS_648, __VLS_645, __VLS_641, __VLS_3, __VLS_5, __VLS_dollars, __VLS_self;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                props = defineProps({
                    itemInfo: {
                        type: Object,
                        required: true
                    },
                    rules: {
                        type: Object,
                        required: true
                    },
                    state: {
                        type: Object,
                        required: true
                    },
                    disabled: {
                        type: Boolean,
                        default: false
                    }
                });
                //当前组件的值发生变化时，校验表单并更新父组件的值
                (0, vue_1.watch)(function () { return props.itemInfo; }, function (newVal) {
                    validateForm();
                    emit('update:itemInfo', newVal);
                }, { deep: true });
                validateForm = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var form;
                    return __generator(this, function (_a) {
                        form = itemInfoRef.value;
                        form.validate(function (valid) {
                            if (valid) {
                                console.log('表单校验成功');
                                emit('update:state', true);
                            }
                            else {
                                emit('update:state', false);
                                console.log('表单校验失败');
                            }
                        });
                        return [2 /*return*/];
                    });
                }); };
                beforePhotoUpload = function (file) {
                    var isImage = file.type.startsWith('image/');
                    var isLt2M = file.size / 1024 / 1024 < 2;
                    if (!isImage) {
                        element_plus_1.ElMessage.error('上传的文件必须是图片!');
                    }
                    if (!isLt2M) {
                        element_plus_1.ElMessage.error('上传的图片大小不能超过 2MB!');
                    }
                    return isImage && isLt2M;
                };
                itemInfoRef = (0, vue_1.ref)();
                emit = defineEmits(['update:itemInfo', 'update:state']);
                debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
                __VLS_ctx = {};
                /** @type {__VLS_StyleScopedClasses['el-form-item__label']} */ ;
                /** @type {__VLS_StyleScopedClasses['el-form-item__label']} */ ;
                __VLS_0 = {}.ElForm;
                /** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
                __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
                    model: (__VLS_ctx.itemInfo),
                    rules: (__VLS_ctx.rules),
                    ref: "itemInfoRef",
                    labelPosition: "left",
                    labelWidth: "120px",
                    disabled: (__VLS_ctx.disabled),
                }));
                __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
                        model: (__VLS_ctx.itemInfo),
                        rules: (__VLS_ctx.rules),
                        ref: "itemInfoRef",
                        labelPosition: "left",
                        labelWidth: "120px",
                        disabled: (__VLS_ctx.disabled),
                    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
                /** @type {typeof __VLS_ctx.itemInfoRef} */ ;
                __VLS_4 = {};
                __VLS_3.slots.default;
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "title" }));
                if (__VLS_ctx.itemInfo.relation == '户主') {
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ style: {} }));
                }
                else {
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ style: {} }));
                    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(__assign({ style: {} }));
                }
                __VLS_6 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6(__assign({ class: "form-item" })));
                __VLS_8 = __VLS_7.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_7), false));
                __VLS_9.slots.default;
                __VLS_10 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10(__assign({ label: "姓名", prop: "name" }, { class: "form-item" })));
                __VLS_12 = __VLS_11.apply(void 0, __spreadArray([__assign({ label: "姓名", prop: "name" }, { class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_11), false));
                __VLS_13.slots.default;
                __VLS_14 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
                    modelValue: (__VLS_ctx.itemInfo.name),
                    autocomplete: "off",
                }));
                __VLS_16 = __VLS_15.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.itemInfo.name),
                        autocomplete: "off",
                    }], __VLS_functionalComponentArgsRest(__VLS_15), false));
                __VLS_18 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18(__assign({ class: "form-item" })));
                __VLS_20 = __VLS_19.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_19), false));
                __VLS_21.slots.default;
                __VLS_22 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
                    label: "身份证",
                    prop: "identifactionNumber",
                }));
                __VLS_24 = __VLS_23.apply(void 0, __spreadArray([{
                        label: "身份证",
                        prop: "identifactionNumber",
                    }], __VLS_functionalComponentArgsRest(__VLS_23), false));
                __VLS_25.slots.default;
                __VLS_26 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
                    modelValue: (__VLS_ctx.itemInfo.identificationNumber),
                    autocomplete: "off",
                }));
                __VLS_28 = __VLS_27.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.itemInfo.identificationNumber),
                        autocomplete: "off",
                    }], __VLS_functionalComponentArgsRest(__VLS_27), false));
                __VLS_30 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30(__assign({ class: "form-item" })));
                __VLS_32 = __VLS_31.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_31), false));
                __VLS_33.slots.default;
                __VLS_34 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
                    label: "户口所在地",
                    prop: "householdRegistLocation",
                }));
                __VLS_36 = __VLS_35.apply(void 0, __spreadArray([{
                        label: "户口所在地",
                        prop: "householdRegistLocation",
                    }], __VLS_functionalComponentArgsRest(__VLS_35), false));
                __VLS_37.slots.default;
                __VLS_38 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
                    modelValue: (__VLS_ctx.itemInfo.householdRegistLocation),
                    autocomplete: "off",
                }));
                __VLS_40 = __VLS_39.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.itemInfo.householdRegistLocation),
                        autocomplete: "off",
                    }], __VLS_functionalComponentArgsRest(__VLS_39), false));
                __VLS_42 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42(__assign({ class: "form-item" })));
                __VLS_44 = __VLS_43.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_43), false));
                __VLS_45.slots.default;
                __VLS_46 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
                    label: "性别",
                    prop: "gender",
                }));
                __VLS_48 = __VLS_47.apply(void 0, __spreadArray([{
                        label: "性别",
                        prop: "gender",
                    }], __VLS_functionalComponentArgsRest(__VLS_47), false));
                __VLS_49.slots.default;
                __VLS_50 = {}.ElRadioGroup;
                /** @type {[typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, ]} */ ;
                __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
                    label: "性别",
                    modelValue: (__VLS_ctx.itemInfo.gender),
                }));
                __VLS_52 = __VLS_51.apply(void 0, __spreadArray([{
                        label: "性别",
                        modelValue: (__VLS_ctx.itemInfo.gender),
                    }], __VLS_functionalComponentArgsRest(__VLS_51), false));
                __VLS_53.slots.default;
                __VLS_54 = {}.ElRadio;
                /** @type {[typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, ]} */ ;
                __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
                    label: "男",
                    value: "男",
                }));
                __VLS_56 = __VLS_55.apply(void 0, __spreadArray([{
                        label: "男",
                        value: "男",
                    }], __VLS_functionalComponentArgsRest(__VLS_55), false));
                __VLS_57.slots.default;
                __VLS_58 = {}.ElRadio;
                /** @type {[typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, ]} */ ;
                __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({
                    label: "女",
                    value: "女",
                }));
                __VLS_60 = __VLS_59.apply(void 0, __spreadArray([{
                        label: "女",
                        value: "女",
                    }], __VLS_functionalComponentArgsRest(__VLS_59), false));
                __VLS_61.slots.default;
                __VLS_62 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62(__assign({ class: "form-item" })));
                __VLS_64 = __VLS_63.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_63), false));
                __VLS_65.slots.default;
                __VLS_66 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({
                    label: "出生年月",
                    prop: "birthDate",
                }));
                __VLS_68 = __VLS_67.apply(void 0, __spreadArray([{
                        label: "出生年月",
                        prop: "birthDate",
                    }], __VLS_functionalComponentArgsRest(__VLS_67), false));
                __VLS_69.slots.default;
                __VLS_70 = {}.ElDatePicker;
                /** @type {[typeof __VLS_components.ElDatePicker, typeof __VLS_components.elDatePicker, ]} */ ;
                __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70(__assign({ modelValue: (__VLS_ctx.itemInfo.birthDate), type: "date", placeholder: "选择日期" }, { style: {} })));
                __VLS_72 = __VLS_71.apply(void 0, __spreadArray([__assign({ modelValue: (__VLS_ctx.itemInfo.birthDate), type: "date", placeholder: "选择日期" }, { style: {} })], __VLS_functionalComponentArgsRest(__VLS_71), false));
                __VLS_74 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74(__assign({ class: "form-item" })));
                __VLS_76 = __VLS_75.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_75), false));
                __VLS_77.slots.default;
                __VLS_78 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({
                    label: "民族",
                    prop: "ethnicity",
                }));
                __VLS_80 = __VLS_79.apply(void 0, __spreadArray([{
                        label: "民族",
                        prop: "ethnicity",
                    }], __VLS_functionalComponentArgsRest(__VLS_79), false));
                __VLS_81.slots.default;
                __VLS_82 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({
                    modelValue: (__VLS_ctx.itemInfo.ethnicity),
                    placeholder: "请输入民族",
                    autocomplete: "off",
                }));
                __VLS_84 = __VLS_83.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.itemInfo.ethnicity),
                        placeholder: "请输入民族",
                        autocomplete: "off",
                    }], __VLS_functionalComponentArgsRest(__VLS_83), false));
                __VLS_86 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86(__assign({ class: "form-item" })));
                __VLS_88 = __VLS_87.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_87), false));
                __VLS_89.slots.default;
                __VLS_90 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({
                    label: "地域",
                    prop: "region",
                }));
                __VLS_92 = __VLS_91.apply(void 0, __spreadArray([{
                        label: "地域",
                        prop: "region",
                    }], __VLS_functionalComponentArgsRest(__VLS_91), false));
                __VLS_93.slots.default;
                __VLS_94 = {}.ElRadioGroup;
                /** @type {[typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, ]} */ ;
                __VLS_95 = __VLS_asFunctionalComponent(__VLS_94, new __VLS_94({
                    modelValue: (__VLS_ctx.itemInfo.region),
                }));
                __VLS_96 = __VLS_95.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.itemInfo.region),
                    }], __VLS_functionalComponentArgsRest(__VLS_95), false));
                __VLS_97.slots.default;
                __VLS_98 = {}.ElRadio;
                /** @type {[typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, ]} */ ;
                __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({
                    label: "城市",
                    value: "城市",
                }));
                __VLS_100 = __VLS_99.apply(void 0, __spreadArray([{
                        label: "城市",
                        value: "城市",
                    }], __VLS_functionalComponentArgsRest(__VLS_99), false));
                __VLS_101.slots.default;
                __VLS_102 = {}.ElRadio;
                /** @type {[typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, ]} */ ;
                __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({
                    label: "农村",
                    value: "农村",
                }));
                __VLS_104 = __VLS_103.apply(void 0, __spreadArray([{
                        label: "农村",
                        value: "农村",
                    }], __VLS_functionalComponentArgsRest(__VLS_103), false));
                __VLS_105.slots.default;
                __VLS_106 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106(__assign({ class: "form-item" })));
                __VLS_108 = __VLS_107.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_107), false));
                __VLS_109.slots.default;
                __VLS_110 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({
                    label: "政治面貌",
                    prop: "politicalAffiliation",
                }));
                __VLS_112 = __VLS_111.apply(void 0, __spreadArray([{
                        label: "政治面貌",
                        prop: "politicalAffiliation",
                    }], __VLS_functionalComponentArgsRest(__VLS_111), false));
                __VLS_113.slots.default;
                __VLS_114 = {}.ElSelect;
                /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
                __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({
                    modelValue: (__VLS_ctx.itemInfo.politicalAffiliation),
                    placeholder: "请选择政治面貌",
                }));
                __VLS_116 = __VLS_115.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.itemInfo.politicalAffiliation),
                        placeholder: "请选择政治面貌",
                    }], __VLS_functionalComponentArgsRest(__VLS_115), false));
                __VLS_117.slots.default;
                __VLS_118 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_119 = __VLS_asFunctionalComponent(__VLS_118, new __VLS_118({
                    label: "中共党员",
                    value: "中共党员",
                }));
                __VLS_120 = __VLS_119.apply(void 0, __spreadArray([{
                        label: "中共党员",
                        value: "中共党员",
                    }], __VLS_functionalComponentArgsRest(__VLS_119), false));
                __VLS_122 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({
                    label: "民主党派",
                    value: "民主党派",
                }));
                __VLS_124 = __VLS_123.apply(void 0, __spreadArray([{
                        label: "民主党派",
                        value: "民主党派",
                    }], __VLS_functionalComponentArgsRest(__VLS_123), false));
                __VLS_126 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({
                    label: "共青团员",
                    value: "共青团员",
                }));
                __VLS_128 = __VLS_127.apply(void 0, __spreadArray([{
                        label: "共青团员",
                        value: "共青团员",
                    }], __VLS_functionalComponentArgsRest(__VLS_127), false));
                __VLS_130 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({
                    label: "群众",
                    value: "群众",
                }));
                __VLS_132 = __VLS_131.apply(void 0, __spreadArray([{
                        label: "群众",
                        value: "群众",
                    }], __VLS_functionalComponentArgsRest(__VLS_131), false));
                __VLS_134 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_135 = __VLS_asFunctionalComponent(__VLS_134, new __VLS_134(__assign({ class: "form-item" })));
                __VLS_136 = __VLS_135.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_135), false));
                __VLS_137.slots.default;
                __VLS_138 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({
                    label: "婚姻情况",
                    prop: "maritalStatus",
                }));
                __VLS_140 = __VLS_139.apply(void 0, __spreadArray([{
                        label: "婚姻情况",
                        prop: "maritalStatus",
                    }], __VLS_functionalComponentArgsRest(__VLS_139), false));
                __VLS_141.slots.default;
                __VLS_142 = {}.ElSelect;
                /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
                __VLS_143 = __VLS_asFunctionalComponent(__VLS_142, new __VLS_142({
                    modelValue: (__VLS_ctx.itemInfo.maritalStatus),
                    placeholder: "请选择婚姻情况",
                }));
                __VLS_144 = __VLS_143.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.itemInfo.maritalStatus),
                        placeholder: "请选择婚姻情况",
                    }], __VLS_functionalComponentArgsRest(__VLS_143), false));
                __VLS_145.slots.default;
                __VLS_146 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({
                    label: "已婚",
                    value: "已婚",
                }));
                __VLS_148 = __VLS_147.apply(void 0, __spreadArray([{
                        label: "已婚",
                        value: "已婚",
                    }], __VLS_functionalComponentArgsRest(__VLS_147), false));
                __VLS_150 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_151 = __VLS_asFunctionalComponent(__VLS_150, new __VLS_150({
                    label: "未婚",
                    value: "未婚",
                }));
                __VLS_152 = __VLS_151.apply(void 0, __spreadArray([{
                        label: "未婚",
                        value: "未婚",
                    }], __VLS_functionalComponentArgsRest(__VLS_151), false));
                __VLS_154 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_155 = __VLS_asFunctionalComponent(__VLS_154, new __VLS_154({
                    label: "离异",
                    value: "离异",
                }));
                __VLS_156 = __VLS_155.apply(void 0, __spreadArray([{
                        label: "离异",
                        value: "离异",
                    }], __VLS_functionalComponentArgsRest(__VLS_155), false));
                __VLS_158 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_159 = __VLS_asFunctionalComponent(__VLS_158, new __VLS_158({
                    label: "丧偶",
                    value: "丧偶",
                }));
                __VLS_160 = __VLS_159.apply(void 0, __spreadArray([{
                        label: "丧偶",
                        value: "丧偶",
                    }], __VLS_functionalComponentArgsRest(__VLS_159), false));
                __VLS_162 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_163 = __VLS_asFunctionalComponent(__VLS_162, new __VLS_162({
                    label: "再婚",
                    value: "再婚",
                }));
                __VLS_164 = __VLS_163.apply(void 0, __spreadArray([{
                        label: "再婚",
                        value: "再婚",
                    }], __VLS_functionalComponentArgsRest(__VLS_163), false));
                __VLS_166 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_167 = __VLS_asFunctionalComponent(__VLS_166, new __VLS_166({
                    label: "其他",
                    value: "其他",
                }));
                __VLS_168 = __VLS_167.apply(void 0, __spreadArray([{
                        label: "其他",
                        value: "其他",
                    }], __VLS_functionalComponentArgsRest(__VLS_167), false));
                __VLS_170 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_171 = __VLS_asFunctionalComponent(__VLS_170, new __VLS_170(__assign({ class: "form-item" })));
                __VLS_172 = __VLS_171.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_171), false));
                __VLS_173.slots.default;
                __VLS_174 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_175 = __VLS_asFunctionalComponent(__VLS_174, new __VLS_174({
                    label: "文化程度",
                    prop: "educationLevel",
                }));
                __VLS_176 = __VLS_175.apply(void 0, __spreadArray([{
                        label: "文化程度",
                        prop: "educationLevel",
                    }], __VLS_functionalComponentArgsRest(__VLS_175), false));
                __VLS_177.slots.default;
                __VLS_178 = {}.ElSelect;
                /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
                __VLS_179 = __VLS_asFunctionalComponent(__VLS_178, new __VLS_178({
                    modelValue: (__VLS_ctx.itemInfo.educationLevel),
                    placeholder: "请选择文化程度",
                }));
                __VLS_180 = __VLS_179.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.itemInfo.educationLevel),
                        placeholder: "请选择文化程度",
                    }], __VLS_functionalComponentArgsRest(__VLS_179), false));
                __VLS_181.slots.default;
                __VLS_182 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_183 = __VLS_asFunctionalComponent(__VLS_182, new __VLS_182({
                    label: "文盲或半文盲",
                    value: "文盲或半文盲",
                }));
                __VLS_184 = __VLS_183.apply(void 0, __spreadArray([{
                        label: "文盲或半文盲",
                        value: "文盲或半文盲",
                    }], __VLS_functionalComponentArgsRest(__VLS_183), false));
                __VLS_186 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_187 = __VLS_asFunctionalComponent(__VLS_186, new __VLS_186({
                    label: "小学",
                    value: "小学",
                }));
                __VLS_188 = __VLS_187.apply(void 0, __spreadArray([{
                        label: "小学",
                        value: "小学",
                    }], __VLS_functionalComponentArgsRest(__VLS_187), false));
                __VLS_190 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_191 = __VLS_asFunctionalComponent(__VLS_190, new __VLS_190({
                    label: "初中",
                    value: "初中",
                }));
                __VLS_192 = __VLS_191.apply(void 0, __spreadArray([{
                        label: "初中",
                        value: "初中",
                    }], __VLS_functionalComponentArgsRest(__VLS_191), false));
                __VLS_194 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_195 = __VLS_asFunctionalComponent(__VLS_194, new __VLS_194({
                    label: "高中",
                    value: "高中",
                }));
                __VLS_196 = __VLS_195.apply(void 0, __spreadArray([{
                        label: "高中",
                        value: "高中",
                    }], __VLS_functionalComponentArgsRest(__VLS_195), false));
                __VLS_198 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_199 = __VLS_asFunctionalComponent(__VLS_198, new __VLS_198({
                    label: "专科",
                    value: "专科",
                }));
                __VLS_200 = __VLS_199.apply(void 0, __spreadArray([{
                        label: "专科",
                        value: "专科",
                    }], __VLS_functionalComponentArgsRest(__VLS_199), false));
                __VLS_202 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_203 = __VLS_asFunctionalComponent(__VLS_202, new __VLS_202({
                    label: "本科",
                    value: "本科",
                }));
                __VLS_204 = __VLS_203.apply(void 0, __spreadArray([{
                        label: "本科",
                        value: "本科",
                    }], __VLS_functionalComponentArgsRest(__VLS_203), false));
                __VLS_206 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_207 = __VLS_asFunctionalComponent(__VLS_206, new __VLS_206({
                    label: "硕士",
                    value: "硕士",
                }));
                __VLS_208 = __VLS_207.apply(void 0, __spreadArray([{
                        label: "硕士",
                        value: "硕士",
                    }], __VLS_functionalComponentArgsRest(__VLS_207), false));
                __VLS_210 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_211 = __VLS_asFunctionalComponent(__VLS_210, new __VLS_210({
                    label: "博士",
                    value: "博士",
                }));
                __VLS_212 = __VLS_211.apply(void 0, __spreadArray([{
                        label: "博士",
                        value: "博士",
                    }], __VLS_functionalComponentArgsRest(__VLS_211), false));
                __VLS_214 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_215 = __VLS_asFunctionalComponent(__VLS_214, new __VLS_214({
                    label: "其他",
                    value: "其他",
                }));
                __VLS_216 = __VLS_215.apply(void 0, __spreadArray([{
                        label: "其他",
                        value: "其他",
                    }], __VLS_functionalComponentArgsRest(__VLS_215), false));
                __VLS_218 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_219 = __VLS_asFunctionalComponent(__VLS_218, new __VLS_218(__assign({ class: "form-item" })));
                __VLS_220 = __VLS_219.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_219), false));
                __VLS_221.slots.default;
                __VLS_222 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_223 = __VLS_asFunctionalComponent(__VLS_222, new __VLS_222({
                    label: "电话",
                    prop: "phoneNumber",
                }));
                __VLS_224 = __VLS_223.apply(void 0, __spreadArray([{
                        label: "电话",
                        prop: "phoneNumber",
                    }], __VLS_functionalComponentArgsRest(__VLS_223), false));
                __VLS_225.slots.default;
                __VLS_226 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_227 = __VLS_asFunctionalComponent(__VLS_226, new __VLS_226({
                    modelValue: (__VLS_ctx.itemInfo.phoneNumber),
                    autocomplete: "off",
                }));
                __VLS_228 = __VLS_227.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.itemInfo.phoneNumber),
                        autocomplete: "off",
                    }], __VLS_functionalComponentArgsRest(__VLS_227), false));
                __VLS_230 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_231 = __VLS_asFunctionalComponent(__VLS_230, new __VLS_230(__assign({ class: "form-item" })));
                __VLS_232 = __VLS_231.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_231), false));
                __VLS_233.slots.default;
                __VLS_234 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_235 = __VLS_asFunctionalComponent(__VLS_234, new __VLS_234({
                    label: "行政区划",
                    prop: "administrativeDivision",
                }));
                __VLS_236 = __VLS_235.apply(void 0, __spreadArray([{
                        label: "行政区划",
                        prop: "administrativeDivision",
                    }], __VLS_functionalComponentArgsRest(__VLS_235), false));
                __VLS_237.slots.default;
                __VLS_238 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_239 = __VLS_asFunctionalComponent(__VLS_238, new __VLS_238({
                    modelValue: (__VLS_ctx.itemInfo.administrativeDivision),
                    autocomplete: "off",
                }));
                __VLS_240 = __VLS_239.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.itemInfo.administrativeDivision),
                        autocomplete: "off",
                    }], __VLS_functionalComponentArgsRest(__VLS_239), false));
                __VLS_242 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_243 = __VLS_asFunctionalComponent(__VLS_242, new __VLS_242(__assign({ class: "form-item" })));
                __VLS_244 = __VLS_243.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_243), false));
                __VLS_245.slots.default;
                __VLS_246 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_247 = __VLS_asFunctionalComponent(__VLS_246, new __VLS_246({
                    label: "等级划分",
                    prop: "grading",
                }));
                __VLS_248 = __VLS_247.apply(void 0, __spreadArray([{
                        label: "等级划分",
                        prop: "grading",
                    }], __VLS_functionalComponentArgsRest(__VLS_247), false));
                __VLS_249.slots.default;
                __VLS_250 = {}.ElSelect;
                /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
                __VLS_251 = __VLS_asFunctionalComponent(__VLS_250, new __VLS_250({
                    modelValue: (__VLS_ctx.itemInfo.grading),
                    placeholder: "请选择等级划分",
                }));
                __VLS_252 = __VLS_251.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.itemInfo.grading),
                        placeholder: "请选择等级划分",
                    }], __VLS_functionalComponentArgsRest(__VLS_251), false));
                __VLS_253.slots.default;
                __VLS_254 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_255 = __VLS_asFunctionalComponent(__VLS_254, new __VLS_254({
                    label: "红",
                    value: "红",
                }));
                __VLS_256 = __VLS_255.apply(void 0, __spreadArray([{
                        label: "红",
                        value: "红",
                    }], __VLS_functionalComponentArgsRest(__VLS_255), false));
                __VLS_258 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_259 = __VLS_asFunctionalComponent(__VLS_258, new __VLS_258({
                    label: "橙",
                    value: "橙",
                }));
                __VLS_260 = __VLS_259.apply(void 0, __spreadArray([{
                        label: "橙",
                        value: "橙",
                    }], __VLS_functionalComponentArgsRest(__VLS_259), false));
                __VLS_262 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_263 = __VLS_asFunctionalComponent(__VLS_262, new __VLS_262({
                    label: "黄",
                    value: "黄",
                }));
                __VLS_264 = __VLS_263.apply(void 0, __spreadArray([{
                        label: "黄",
                        value: "黄",
                    }], __VLS_functionalComponentArgsRest(__VLS_263), false));
                __VLS_266 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_267 = __VLS_asFunctionalComponent(__VLS_266, new __VLS_266({
                    label: "绿",
                    value: "绿",
                }));
                __VLS_268 = __VLS_267.apply(void 0, __spreadArray([{
                        label: "绿",
                        value: "绿",
                    }], __VLS_functionalComponentArgsRest(__VLS_267), false));
                __VLS_270 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_271 = __VLS_asFunctionalComponent(__VLS_270, new __VLS_270(__assign({ class: "form-item" })));
                __VLS_272 = __VLS_271.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_271), false));
                __VLS_273.slots.default;
                __VLS_274 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_275 = __VLS_asFunctionalComponent(__VLS_274, new __VLS_274({
                    label: "备注",
                    prop: "remark",
                }));
                __VLS_276 = __VLS_275.apply(void 0, __spreadArray([{
                        label: "备注",
                        prop: "remark",
                    }], __VLS_functionalComponentArgsRest(__VLS_275), false));
                __VLS_277.slots.default;
                __VLS_278 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_279 = __VLS_asFunctionalComponent(__VLS_278, new __VLS_278({
                    modelValue: (__VLS_ctx.itemInfo.remark),
                    autocomplete: "off",
                }));
                __VLS_280 = __VLS_279.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.itemInfo.remark),
                        autocomplete: "off",
                    }], __VLS_functionalComponentArgsRest(__VLS_279), false));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "title" }));
                __VLS_282 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_283 = __VLS_asFunctionalComponent(__VLS_282, new __VLS_282(__assign({ class: "form-item" })));
                __VLS_284 = __VLS_283.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_283), false));
                __VLS_285.slots.default;
                __VLS_286 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_287 = __VLS_asFunctionalComponent(__VLS_286, new __VLS_286({
                    label: "单位学校",
                    prop: "employSchool",
                }));
                __VLS_288 = __VLS_287.apply(void 0, __spreadArray([{
                        label: "单位学校",
                        prop: "employSchool",
                    }], __VLS_functionalComponentArgsRest(__VLS_287), false));
                __VLS_289.slots.default;
                __VLS_290 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_291 = __VLS_asFunctionalComponent(__VLS_290, new __VLS_290({
                    modelValue: (__VLS_ctx.itemInfo.employSchool),
                    autocomplete: "off",
                }));
                __VLS_292 = __VLS_291.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.itemInfo.employSchool),
                        autocomplete: "off",
                    }], __VLS_functionalComponentArgsRest(__VLS_291), false));
                __VLS_294 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_295 = __VLS_asFunctionalComponent(__VLS_294, new __VLS_294(__assign({ class: "form-item" })));
                __VLS_296 = __VLS_295.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_295), false));
                __VLS_297.slots.default;
                __VLS_298 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_299 = __VLS_asFunctionalComponent(__VLS_298, new __VLS_298({
                    label: "工作情况",
                    prop: "employmentStatus",
                }));
                __VLS_300 = __VLS_299.apply(void 0, __spreadArray([{
                        label: "工作情况",
                        prop: "employmentStatus",
                    }], __VLS_functionalComponentArgsRest(__VLS_299), false));
                __VLS_301.slots.default;
                __VLS_302 = {}.ElSelect;
                /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
                __VLS_303 = __VLS_asFunctionalComponent(__VLS_302, new __VLS_302({
                    modelValue: (__VLS_ctx.itemInfo.employmentStatus),
                    placeholder: "请选择工作情况",
                }));
                __VLS_304 = __VLS_303.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.itemInfo.employmentStatus),
                        placeholder: "请选择工作情况",
                    }], __VLS_functionalComponentArgsRest(__VLS_303), false));
                __VLS_305.slots.default;
                __VLS_306 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_307 = __VLS_asFunctionalComponent(__VLS_306, new __VLS_306({
                    label: "务工",
                    value: "务工",
                }));
                __VLS_308 = __VLS_307.apply(void 0, __spreadArray([{
                        label: "务工",
                        value: "务工",
                    }], __VLS_functionalComponentArgsRest(__VLS_307), false));
                __VLS_310 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_311 = __VLS_asFunctionalComponent(__VLS_310, new __VLS_310({
                    label: "单位职工",
                    value: "单位职工",
                }));
                __VLS_312 = __VLS_311.apply(void 0, __spreadArray([{
                        label: "单位职工",
                        value: "单位职工",
                    }], __VLS_functionalComponentArgsRest(__VLS_311), false));
                __VLS_314 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_315 = __VLS_asFunctionalComponent(__VLS_314, new __VLS_314({
                    label: "零工",
                    value: "零工",
                }));
                __VLS_316 = __VLS_315.apply(void 0, __spreadArray([{
                        label: "零工",
                        value: "零工",
                    }], __VLS_functionalComponentArgsRest(__VLS_315), false));
                __VLS_318 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_319 = __VLS_asFunctionalComponent(__VLS_318, new __VLS_318({
                    label: "已退休",
                    value: "已退休",
                }));
                __VLS_320 = __VLS_319.apply(void 0, __spreadArray([{
                        label: "已退休",
                        value: "已退休",
                    }], __VLS_functionalComponentArgsRest(__VLS_319), false));
                __VLS_322 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_323 = __VLS_asFunctionalComponent(__VLS_322, new __VLS_322({
                    label: "无劳动力",
                    value: "无劳动力",
                }));
                __VLS_324 = __VLS_323.apply(void 0, __spreadArray([{
                        label: "无劳动力",
                        value: "无劳动力",
                    }], __VLS_functionalComponentArgsRest(__VLS_323), false));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "title" }));
                __VLS_326 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_327 = __VLS_asFunctionalComponent(__VLS_326, new __VLS_326(__assign({ class: "form-item" })));
                __VLS_328 = __VLS_327.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_327), false));
                __VLS_329.slots.default;
                __VLS_330 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_331 = __VLS_asFunctionalComponent(__VLS_330, new __VLS_330({
                    label: "血型",
                    prop: "bloodType",
                }));
                __VLS_332 = __VLS_331.apply(void 0, __spreadArray([{
                        label: "血型",
                        prop: "bloodType",
                    }], __VLS_functionalComponentArgsRest(__VLS_331), false));
                __VLS_333.slots.default;
                __VLS_334 = {}.ElSelect;
                /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
                __VLS_335 = __VLS_asFunctionalComponent(__VLS_334, new __VLS_334({
                    modelValue: (__VLS_ctx.itemInfo.healthInformationRequest.bloodType),
                    placeholder: "请选择血型",
                }));
                __VLS_336 = __VLS_335.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.itemInfo.healthInformationRequest.bloodType),
                        placeholder: "请选择血型",
                    }], __VLS_functionalComponentArgsRest(__VLS_335), false));
                __VLS_337.slots.default;
                __VLS_338 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_339 = __VLS_asFunctionalComponent(__VLS_338, new __VLS_338({
                    label: "A型",
                    value: "A型",
                }));
                __VLS_340 = __VLS_339.apply(void 0, __spreadArray([{
                        label: "A型",
                        value: "A型",
                    }], __VLS_functionalComponentArgsRest(__VLS_339), false));
                __VLS_342 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_343 = __VLS_asFunctionalComponent(__VLS_342, new __VLS_342({
                    label: "B型",
                    value: "B型",
                }));
                __VLS_344 = __VLS_343.apply(void 0, __spreadArray([{
                        label: "B型",
                        value: "B型",
                    }], __VLS_functionalComponentArgsRest(__VLS_343), false));
                __VLS_346 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_347 = __VLS_asFunctionalComponent(__VLS_346, new __VLS_346({
                    label: "AB型",
                    value: "AB型",
                }));
                __VLS_348 = __VLS_347.apply(void 0, __spreadArray([{
                        label: "AB型",
                        value: "AB型",
                    }], __VLS_functionalComponentArgsRest(__VLS_347), false));
                __VLS_350 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_351 = __VLS_asFunctionalComponent(__VLS_350, new __VLS_350({
                    label: "O型",
                    value: "O型",
                }));
                __VLS_352 = __VLS_351.apply(void 0, __spreadArray([{
                        label: "O型",
                        value: "O型",
                    }], __VLS_functionalComponentArgsRest(__VLS_351), false));
                __VLS_354 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_355 = __VLS_asFunctionalComponent(__VLS_354, new __VLS_354({
                    label: "RH阴性",
                    value: "RH阴性",
                }));
                __VLS_356 = __VLS_355.apply(void 0, __spreadArray([{
                        label: "RH阴性",
                        value: "RH阴性",
                    }], __VLS_functionalComponentArgsRest(__VLS_355), false));
                __VLS_358 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_359 = __VLS_asFunctionalComponent(__VLS_358, new __VLS_358({
                    label: "RH阳性",
                    value: "RH阳性",
                }));
                __VLS_360 = __VLS_359.apply(void 0, __spreadArray([{
                        label: "RH阳性",
                        value: "RH阳性",
                    }], __VLS_functionalComponentArgsRest(__VLS_359), false));
                __VLS_362 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_363 = __VLS_asFunctionalComponent(__VLS_362, new __VLS_362(__assign({ class: "form-item" })));
                __VLS_364 = __VLS_363.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_363), false));
                __VLS_365.slots.default;
                __VLS_366 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_367 = __VLS_asFunctionalComponent(__VLS_366, new __VLS_366({
                    label: "四肢活动",
                    prop: "limbMobility",
                }));
                __VLS_368 = __VLS_367.apply(void 0, __spreadArray([{
                        label: "四肢活动",
                        prop: "limbMobility",
                    }], __VLS_functionalComponentArgsRest(__VLS_367), false));
                __VLS_369.slots.default;
                __VLS_370 = {}.ElRadioGroup;
                /** @type {[typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, ]} */ ;
                __VLS_371 = __VLS_asFunctionalComponent(__VLS_370, new __VLS_370({
                    modelValue: (__VLS_ctx.itemInfo.healthInformationRequest.limbMobility),
                }));
                __VLS_372 = __VLS_371.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.itemInfo.healthInformationRequest.limbMobility),
                    }], __VLS_functionalComponentArgsRest(__VLS_371), false));
                __VLS_373.slots.default;
                __VLS_374 = {}.ElRadio;
                /** @type {[typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, ]} */ ;
                __VLS_375 = __VLS_asFunctionalComponent(__VLS_374, new __VLS_374({
                    label: "自如",
                    value: "自如",
                }));
                __VLS_376 = __VLS_375.apply(void 0, __spreadArray([{
                        label: "自如",
                        value: "自如",
                    }], __VLS_functionalComponentArgsRest(__VLS_375), false));
                __VLS_377.slots.default;
                __VLS_378 = {}.ElRadio;
                /** @type {[typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, ]} */ ;
                __VLS_379 = __VLS_asFunctionalComponent(__VLS_378, new __VLS_378({
                    label: "不便",
                    value: "不便",
                }));
                __VLS_380 = __VLS_379.apply(void 0, __spreadArray([{
                        label: "不便",
                        value: "不便",
                    }], __VLS_functionalComponentArgsRest(__VLS_379), false));
                __VLS_381.slots.default;
                __VLS_382 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_383 = __VLS_asFunctionalComponent(__VLS_382, new __VLS_382(__assign({ class: "form-item" })));
                __VLS_384 = __VLS_383.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_383), false));
                __VLS_385.slots.default;
                __VLS_386 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_387 = __VLS_asFunctionalComponent(__VLS_386, new __VLS_386({
                    label: "既往病史",
                    prop: "medicalHistory",
                }));
                __VLS_388 = __VLS_387.apply(void 0, __spreadArray([{
                        label: "既往病史",
                        prop: "medicalHistory",
                    }], __VLS_functionalComponentArgsRest(__VLS_387), false));
                __VLS_389.slots.default;
                __VLS_390 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_391 = __VLS_asFunctionalComponent(__VLS_390, new __VLS_390({
                    placeholder: "请填写既往病史",
                    modelValue: (__VLS_ctx.itemInfo.healthInformationRequest.medicalHistory),
                    autocomplete: "off",
                }));
                __VLS_392 = __VLS_391.apply(void 0, __spreadArray([{
                        placeholder: "请填写既往病史",
                        modelValue: (__VLS_ctx.itemInfo.healthInformationRequest.medicalHistory),
                        autocomplete: "off",
                    }], __VLS_functionalComponentArgsRest(__VLS_391), false));
                __VLS_394 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_395 = __VLS_asFunctionalComponent(__VLS_394, new __VLS_394(__assign({ class: "form-item" })));
                __VLS_396 = __VLS_395.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_395), false));
                __VLS_397.slots.default;
                __VLS_398 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_399 = __VLS_asFunctionalComponent(__VLS_398, new __VLS_398({
                    label: "建档时疾病",
                    prop: "bloodType",
                }));
                __VLS_400 = __VLS_399.apply(void 0, __spreadArray([{
                        label: "建档时疾病",
                        prop: "bloodType",
                    }], __VLS_functionalComponentArgsRest(__VLS_399), false));
                __VLS_401.slots.default;
                __VLS_402 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_403 = __VLS_asFunctionalComponent(__VLS_402, new __VLS_402({
                    modelValue: (__VLS_ctx.itemInfo.healthInformationRequest.recordDisease),
                    autocomplete: "off",
                }));
                __VLS_404 = __VLS_403.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.itemInfo.healthInformationRequest.recordDisease),
                        autocomplete: "off",
                    }], __VLS_functionalComponentArgsRest(__VLS_403), false));
                __VLS_406 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_407 = __VLS_asFunctionalComponent(__VLS_406, new __VLS_406(__assign({ class: "form-item" })));
                __VLS_408 = __VLS_407.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_407), false));
                __VLS_409.slots.default;
                __VLS_410 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_411 = __VLS_asFunctionalComponent(__VLS_410, new __VLS_410({
                    label: "是否长期用药",
                    prop: "isLongTermMedication",
                }));
                __VLS_412 = __VLS_411.apply(void 0, __spreadArray([{
                        label: "是否长期用药",
                        prop: "isLongTermMedication",
                    }], __VLS_functionalComponentArgsRest(__VLS_411), false));
                __VLS_413.slots.default;
                __VLS_414 = {}.ElRadioGroup;
                /** @type {[typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, ]} */ ;
                __VLS_415 = __VLS_asFunctionalComponent(__VLS_414, new __VLS_414({
                    modelValue: (__VLS_ctx.itemInfo.healthInformationRequest.isLongTermMedication),
                }));
                __VLS_416 = __VLS_415.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.itemInfo.healthInformationRequest.isLongTermMedication),
                    }], __VLS_functionalComponentArgsRest(__VLS_415), false));
                __VLS_417.slots.default;
                __VLS_418 = {}.ElRadio;
                /** @type {[typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, ]} */ ;
                __VLS_419 = __VLS_asFunctionalComponent(__VLS_418, new __VLS_418({
                    label: "是",
                    value: "是",
                }));
                __VLS_420 = __VLS_419.apply(void 0, __spreadArray([{
                        label: "是",
                        value: "是",
                    }], __VLS_functionalComponentArgsRest(__VLS_419), false));
                __VLS_421.slots.default;
                __VLS_422 = {}.ElRadio;
                /** @type {[typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, ]} */ ;
                __VLS_423 = __VLS_asFunctionalComponent(__VLS_422, new __VLS_422({
                    label: "否",
                    value: "否",
                }));
                __VLS_424 = __VLS_423.apply(void 0, __spreadArray([{
                        label: "否",
                        value: "否",
                    }], __VLS_functionalComponentArgsRest(__VLS_423), false));
                __VLS_425.slots.default;
                __VLS_426 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_427 = __VLS_asFunctionalComponent(__VLS_426, new __VLS_426(__assign({ class: "form-item" })));
                __VLS_428 = __VLS_427.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_427), false));
                __VLS_429.slots.default;
                __VLS_430 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_431 = __VLS_asFunctionalComponent(__VLS_430, new __VLS_430({
                    label: "重大疾病",
                    prop: "majorDisease",
                }));
                __VLS_432 = __VLS_431.apply(void 0, __spreadArray([{
                        label: "重大疾病",
                        prop: "majorDisease",
                    }], __VLS_functionalComponentArgsRest(__VLS_431), false));
                __VLS_433.slots.default;
                __VLS_434 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_435 = __VLS_asFunctionalComponent(__VLS_434, new __VLS_434({
                    placeholder: "请填写建档时重大疾病",
                    modelValue: (__VLS_ctx.itemInfo.healthInformationRequest.majorDisease),
                    autocomplete: "off",
                }));
                __VLS_436 = __VLS_435.apply(void 0, __spreadArray([{
                        placeholder: "请填写建档时重大疾病",
                        modelValue: (__VLS_ctx.itemInfo.healthInformationRequest.majorDisease),
                        autocomplete: "off",
                    }], __VLS_functionalComponentArgsRest(__VLS_435), false));
                __VLS_438 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_439 = __VLS_asFunctionalComponent(__VLS_438, new __VLS_438(__assign({ class: "form-item" })));
                __VLS_440 = __VLS_439.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_439), false));
                __VLS_441.slots.default;
                __VLS_442 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_443 = __VLS_asFunctionalComponent(__VLS_442, new __VLS_442({
                    label: "健康状况",
                    prop: "healthStatus",
                }));
                __VLS_444 = __VLS_443.apply(void 0, __spreadArray([{
                        label: "健康状况",
                        prop: "healthStatus",
                    }], __VLS_functionalComponentArgsRest(__VLS_443), false));
                __VLS_445.slots.default;
                __VLS_446 = {}.ElSelect;
                /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
                __VLS_447 = __VLS_asFunctionalComponent(__VLS_446, new __VLS_446({
                    modelValue: (__VLS_ctx.itemInfo.healthInformationRequest.healthStatus),
                    placeholder: "请选择健康状况",
                }));
                __VLS_448 = __VLS_447.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.itemInfo.healthInformationRequest.healthStatus),
                        placeholder: "请选择健康状况",
                    }], __VLS_functionalComponentArgsRest(__VLS_447), false));
                __VLS_449.slots.default;
                __VLS_450 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_451 = __VLS_asFunctionalComponent(__VLS_450, new __VLS_450({
                    label: "良好",
                    value: "良好",
                }));
                __VLS_452 = __VLS_451.apply(void 0, __spreadArray([{
                        label: "良好",
                        value: "良好",
                    }], __VLS_functionalComponentArgsRest(__VLS_451), false));
                __VLS_454 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_455 = __VLS_asFunctionalComponent(__VLS_454, new __VLS_454({
                    label: "高龄 (大于等于80周岁)",
                    value: "高龄",
                }));
                __VLS_456 = __VLS_455.apply(void 0, __spreadArray([{
                        label: "高龄 (大于等于80周岁)",
                        value: "高龄",
                    }], __VLS_functionalComponentArgsRest(__VLS_455), false));
                __VLS_458 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_459 = __VLS_asFunctionalComponent(__VLS_458, new __VLS_458({
                    label: "慢性病 (高血压/糖尿病/心脏病等需长期服药疾病)",
                    value: "慢性病",
                }));
                __VLS_460 = __VLS_459.apply(void 0, __spreadArray([{
                        label: "慢性病 (高血压/糖尿病/心脏病等需长期服药疾病)",
                        value: "慢性病",
                    }], __VLS_functionalComponentArgsRest(__VLS_459), false));
                __VLS_462 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_463 = __VLS_asFunctionalComponent(__VLS_462, new __VLS_462({
                    label: "失能 (依据巴氏指数评估法，进餐/穿衣/如厕等五项活动能力)",
                    value: "失能",
                }));
                __VLS_464 = __VLS_463.apply(void 0, __spreadArray([{
                        label: "失能 (依据巴氏指数评估法，进餐/穿衣/如厕等五项活动能力)",
                        value: "失能",
                    }], __VLS_functionalComponentArgsRest(__VLS_463), false));
                __VLS_466 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_467 = __VLS_asFunctionalComponent(__VLS_466, new __VLS_466(__assign({ class: "form-item" })));
                __VLS_468 = __VLS_467.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_467), false));
                __VLS_469.slots.default;
                __VLS_470 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_471 = __VLS_asFunctionalComponent(__VLS_470, new __VLS_470({
                    label: "伤残类别",
                    prop: "disabilityType",
                }));
                __VLS_472 = __VLS_471.apply(void 0, __spreadArray([{
                        label: "伤残类别",
                        prop: "disabilityType",
                    }], __VLS_functionalComponentArgsRest(__VLS_471), false));
                __VLS_473.slots.default;
                __VLS_474 = {}.ElSelect;
                /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
                __VLS_475 = __VLS_asFunctionalComponent(__VLS_474, new __VLS_474({
                    modelValue: (__VLS_ctx.itemInfo.healthInformationRequest.disabilityType),
                    placeholder: "请选择伤残类别",
                }));
                __VLS_476 = __VLS_475.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.itemInfo.healthInformationRequest.disabilityType),
                        placeholder: "请选择伤残类别",
                    }], __VLS_functionalComponentArgsRest(__VLS_475), false));
                __VLS_477.slots.default;
                __VLS_478 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_479 = __VLS_asFunctionalComponent(__VLS_478, new __VLS_478({
                    label: "无",
                    value: "无",
                }));
                __VLS_480 = __VLS_479.apply(void 0, __spreadArray([{
                        label: "无",
                        value: "无",
                    }], __VLS_functionalComponentArgsRest(__VLS_479), false));
                __VLS_482 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_483 = __VLS_asFunctionalComponent(__VLS_482, new __VLS_482({
                    label: "肢体",
                    value: "肢体",
                }));
                __VLS_484 = __VLS_483.apply(void 0, __spreadArray([{
                        label: "肢体",
                        value: "肢体",
                    }], __VLS_functionalComponentArgsRest(__VLS_483), false));
                __VLS_486 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_487 = __VLS_asFunctionalComponent(__VLS_486, new __VLS_486({
                    label: "视力",
                    value: "视力",
                }));
                __VLS_488 = __VLS_487.apply(void 0, __spreadArray([{
                        label: "视力",
                        value: "视力",
                    }], __VLS_functionalComponentArgsRest(__VLS_487), false));
                __VLS_490 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_491 = __VLS_asFunctionalComponent(__VLS_490, new __VLS_490({
                    label: "听力",
                    value: "听力",
                }));
                __VLS_492 = __VLS_491.apply(void 0, __spreadArray([{
                        label: "听力",
                        value: "听力",
                    }], __VLS_functionalComponentArgsRest(__VLS_491), false));
                __VLS_494 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_495 = __VLS_asFunctionalComponent(__VLS_494, new __VLS_494({
                    label: "精神",
                    value: "精神",
                }));
                __VLS_496 = __VLS_495.apply(void 0, __spreadArray([{
                        label: "精神",
                        value: "精神",
                    }], __VLS_functionalComponentArgsRest(__VLS_495), false));
                if (__VLS_ctx.itemInfo.healthInformationRequest.disabilityType == '肢体' || __VLS_ctx.itemInfo.healthInformationRequest.disabilityType == '精神') {
                    __VLS_498 = {}.ElCol;
                    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                    __VLS_499 = __VLS_asFunctionalComponent(__VLS_498, new __VLS_498(__assign({ class: "form-item" })));
                    __VLS_500 = __VLS_499.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_499), false));
                    __VLS_501.slots.default;
                    __VLS_502 = {}.ElFormItem;
                    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                    __VLS_503 = __VLS_asFunctionalComponent(__VLS_502, new __VLS_502({
                        label: "伤残级别",
                        prop: "disabilityLevel",
                    }));
                    __VLS_504 = __VLS_503.apply(void 0, __spreadArray([{
                            label: "伤残级别",
                            prop: "disabilityLevel",
                        }], __VLS_functionalComponentArgsRest(__VLS_503), false));
                    __VLS_505.slots.default;
                    __VLS_506 = {}.ElSelect;
                    /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
                    __VLS_507 = __VLS_asFunctionalComponent(__VLS_506, new __VLS_506({
                        modelValue: (__VLS_ctx.itemInfo.healthInformationRequest.disabilityLevel),
                        placeholder: "请选择伤残级别",
                    }));
                    __VLS_508 = __VLS_507.apply(void 0, __spreadArray([{
                            modelValue: (__VLS_ctx.itemInfo.healthInformationRequest.disabilityLevel),
                            placeholder: "请选择伤残级别",
                        }], __VLS_functionalComponentArgsRest(__VLS_507), false));
                    __VLS_509.slots.default;
                    __VLS_510 = {}.ElOption;
                    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                    __VLS_511 = __VLS_asFunctionalComponent(__VLS_510, new __VLS_510({
                        label: "无",
                        value: "无",
                    }));
                    __VLS_512 = __VLS_511.apply(void 0, __spreadArray([{
                            label: "无",
                            value: "无",
                        }], __VLS_functionalComponentArgsRest(__VLS_511), false));
                    if (__VLS_ctx.itemInfo.healthInformationRequest.disabilityType == '肢体') {
                        __VLS_514 = {}.ElOption;
                        /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                        __VLS_515 = __VLS_asFunctionalComponent(__VLS_514, new __VLS_514({
                            label: "一级 (四肢瘫/截瘫/偏瘫等，完全丧失活动能力)",
                            value: "一级",
                        }));
                        __VLS_516 = __VLS_515.apply(void 0, __spreadArray([{
                                label: "一级 (四肢瘫/截瘫/偏瘫等，完全丧失活动能力)",
                                value: "一级",
                            }], __VLS_functionalComponentArgsRest(__VLS_515), false));
                    }
                    if (__VLS_ctx.itemInfo.healthInformationRequest.disabilityType == '肢体') {
                        __VLS_518 = {}.ElOption;
                        /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                        __VLS_519 = __VLS_asFunctionalComponent(__VLS_518, new __VLS_518({
                            label: "二级 (保留部分功能，无法独立行走)",
                            value: "二级",
                        }));
                        __VLS_520 = __VLS_519.apply(void 0, __spreadArray([{
                                label: "二级 (保留部分功能，无法独立行走)",
                                value: "二级",
                            }], __VLS_functionalComponentArgsRest(__VLS_519), false));
                    }
                    if (__VLS_ctx.itemInfo.healthInformationRequest.disabilityType == '肢体') {
                        __VLS_522 = {}.ElOption;
                        /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                        __VLS_523 = __VLS_asFunctionalComponent(__VLS_522, new __VLS_522({
                            label: "三级 (部分功能保留，需辅助器具)",
                            value: "三级",
                        }));
                        __VLS_524 = __VLS_523.apply(void 0, __spreadArray([{
                                label: "三级 (部分功能保留，需辅助器具)",
                                value: "三级",
                            }], __VLS_functionalComponentArgsRest(__VLS_523), false));
                    }
                    if (__VLS_ctx.itemInfo.healthInformationRequest.disabilityType == '肢体') {
                        __VLS_526 = {}.ElOption;
                        /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                        __VLS_527 = __VLS_asFunctionalComponent(__VLS_526, new __VLS_526({
                            label: "四级 (轻度功能障碍，如脊柱测凸<45°)",
                            value: "四级",
                        }));
                        __VLS_528 = __VLS_527.apply(void 0, __spreadArray([{
                                label: "四级 (轻度功能障碍，如脊柱测凸<45°)",
                                value: "四级",
                            }], __VLS_functionalComponentArgsRest(__VLS_527), false));
                    }
                    if (__VLS_ctx.itemInfo.healthInformationRequest.disabilityType == '精神') {
                        __VLS_530 = {}.ElOption;
                        /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                        __VLS_531 = __VLS_asFunctionalComponent(__VLS_530, new __VLS_530({
                            label: "一级 (完全无法参与社会活动)",
                            value: "一级",
                        }));
                        __VLS_532 = __VLS_531.apply(void 0, __spreadArray([{
                                label: "一级 (完全无法参与社会活动)",
                                value: "一级",
                            }], __VLS_functionalComponentArgsRest(__VLS_531), false));
                    }
                    if (__VLS_ctx.itemInfo.healthInformationRequest.disabilityType == '精神') {
                        __VLS_534 = {}.ElOption;
                        /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                        __VLS_535 = __VLS_asFunctionalComponent(__VLS_534, new __VLS_534({
                            label: "二级 (严重受限，需全天监护)",
                            value: "二级",
                        }));
                        __VLS_536 = __VLS_535.apply(void 0, __spreadArray([{
                                label: "二级 (严重受限，需全天监护)",
                                value: "二级",
                            }], __VLS_functionalComponentArgsRest(__VLS_535), false));
                    }
                    if (__VLS_ctx.itemInfo.healthInformationRequest.disabilityType == '精神') {
                        __VLS_538 = {}.ElOption;
                        /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                        __VLS_539 = __VLS_asFunctionalComponent(__VLS_538, new __VLS_538({
                            label: "三级 (部分受限，需间歇支持)",
                            value: "三级",
                        }));
                        __VLS_540 = __VLS_539.apply(void 0, __spreadArray([{
                                label: "三级 (部分受限，需间歇支持)",
                                value: "三级",
                            }], __VLS_functionalComponentArgsRest(__VLS_539), false));
                    }
                }
                __VLS_542 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_543 = __VLS_asFunctionalComponent(__VLS_542, new __VLS_542(__assign({ class: "form-item" })));
                __VLS_544 = __VLS_543.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_543), false));
                __VLS_545.slots.default;
                __VLS_546 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_547 = __VLS_asFunctionalComponent(__VLS_546, new __VLS_546({
                    label: "备注",
                    prop: "healthRemark",
                }));
                __VLS_548 = __VLS_547.apply(void 0, __spreadArray([{
                        label: "备注",
                        prop: "healthRemark",
                    }], __VLS_functionalComponentArgsRest(__VLS_547), false));
                __VLS_549.slots.default;
                __VLS_550 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_551 = __VLS_asFunctionalComponent(__VLS_550, new __VLS_550({
                    modelValue: (__VLS_ctx.itemInfo.healthInformationRequest.remark),
                    autocomplete: "off",
                }));
                __VLS_552 = __VLS_551.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.itemInfo.healthInformationRequest.remark),
                        autocomplete: "off",
                    }], __VLS_functionalComponentArgsRest(__VLS_551), false));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "title" }));
                __VLS_554 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_555 = __VLS_asFunctionalComponent(__VLS_554, new __VLS_554(__assign({ class: "form-item" })));
                __VLS_556 = __VLS_555.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_555), false));
                __VLS_557.slots.default;
                __VLS_558 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_559 = __VLS_asFunctionalComponent(__VLS_558, new __VLS_558({
                    label: "医疗",
                    prop: "medicalInsurance",
                }));
                __VLS_560 = __VLS_559.apply(void 0, __spreadArray([{
                        label: "医疗",
                        prop: "medicalInsurance",
                    }], __VLS_functionalComponentArgsRest(__VLS_559), false));
                __VLS_561.slots.default;
                __VLS_562 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_563 = __VLS_asFunctionalComponent(__VLS_562, new __VLS_562({
                    placeholder: "填写医疗",
                    modelValue: (__VLS_ctx.itemInfo.socialSecurityRequest.medicalInsurance),
                    autocomplete: "off",
                }));
                __VLS_564 = __VLS_563.apply(void 0, __spreadArray([{
                        placeholder: "填写医疗",
                        modelValue: (__VLS_ctx.itemInfo.socialSecurityRequest.medicalInsurance),
                        autocomplete: "off",
                    }], __VLS_functionalComponentArgsRest(__VLS_563), false));
                __VLS_566 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_567 = __VLS_asFunctionalComponent(__VLS_566, new __VLS_566(__assign({ class: "form-item" })));
                __VLS_568 = __VLS_567.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_567), false));
                __VLS_569.slots.default;
                __VLS_570 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_571 = __VLS_asFunctionalComponent(__VLS_570, new __VLS_570({
                    label: "养老",
                    prop: "pensionInsurance",
                }));
                __VLS_572 = __VLS_571.apply(void 0, __spreadArray([{
                        label: "养老",
                        prop: "pensionInsurance",
                    }], __VLS_functionalComponentArgsRest(__VLS_571), false));
                __VLS_573.slots.default;
                __VLS_574 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_575 = __VLS_asFunctionalComponent(__VLS_574, new __VLS_574({
                    placeholder: "填写养老",
                    modelValue: (__VLS_ctx.itemInfo.socialSecurityRequest.pensionInsurance),
                    autocomplete: "off",
                }));
                __VLS_576 = __VLS_575.apply(void 0, __spreadArray([{
                        placeholder: "填写养老",
                        modelValue: (__VLS_ctx.itemInfo.socialSecurityRequest.pensionInsurance),
                        autocomplete: "off",
                    }], __VLS_functionalComponentArgsRest(__VLS_575), false));
                __VLS_578 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_579 = __VLS_asFunctionalComponent(__VLS_578, new __VLS_578(__assign({ class: "form-item" })));
                __VLS_580 = __VLS_579.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_579), false));
                __VLS_581.slots.default;
                __VLS_582 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_583 = __VLS_asFunctionalComponent(__VLS_582, new __VLS_582({
                    label: "住房",
                    prop: "housingFund",
                }));
                __VLS_584 = __VLS_583.apply(void 0, __spreadArray([{
                        label: "住房",
                        prop: "housingFund",
                    }], __VLS_functionalComponentArgsRest(__VLS_583), false));
                __VLS_585.slots.default;
                __VLS_586 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_587 = __VLS_asFunctionalComponent(__VLS_586, new __VLS_586({
                    placeholder: "填写住房",
                    modelValue: (__VLS_ctx.itemInfo.socialSecurityRequest.housingFund),
                    autocomplete: "off",
                }));
                __VLS_588 = __VLS_587.apply(void 0, __spreadArray([{
                        placeholder: "填写住房",
                        modelValue: (__VLS_ctx.itemInfo.socialSecurityRequest.housingFund),
                        autocomplete: "off",
                    }], __VLS_functionalComponentArgsRest(__VLS_587), false));
                __VLS_590 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_591 = __VLS_asFunctionalComponent(__VLS_590, new __VLS_590(__assign({ class: "form-item" })));
                __VLS_592 = __VLS_591.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_591), false));
                __VLS_593.slots.default;
                __VLS_594 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_595 = __VLS_asFunctionalComponent(__VLS_594, new __VLS_594({
                    label: "低保",
                    prop: "lowIncomeSupport",
                }));
                __VLS_596 = __VLS_595.apply(void 0, __spreadArray([{
                        label: "低保",
                        prop: "lowIncomeSupport",
                    }], __VLS_functionalComponentArgsRest(__VLS_595), false));
                __VLS_597.slots.default;
                __VLS_598 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_599 = __VLS_asFunctionalComponent(__VLS_598, new __VLS_598({
                    placeholder: "填写低保",
                    modelValue: (__VLS_ctx.itemInfo.socialSecurityRequest.lowIncomeSupport),
                    autocomplete: "off",
                }));
                __VLS_600 = __VLS_599.apply(void 0, __spreadArray([{
                        placeholder: "填写低保",
                        modelValue: (__VLS_ctx.itemInfo.socialSecurityRequest.lowIncomeSupport),
                        autocomplete: "off",
                    }], __VLS_functionalComponentArgsRest(__VLS_599), false));
                __VLS_602 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_603 = __VLS_asFunctionalComponent(__VLS_602, new __VLS_602(__assign({ class: "form-item" })));
                __VLS_604 = __VLS_603.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_603), false));
                __VLS_605.slots.default;
                __VLS_606 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_607 = __VLS_asFunctionalComponent(__VLS_606, new __VLS_606({
                    label: "保险",
                    prop: "insurance",
                }));
                __VLS_608 = __VLS_607.apply(void 0, __spreadArray([{
                        label: "保险",
                        prop: "insurance",
                    }], __VLS_functionalComponentArgsRest(__VLS_607), false));
                __VLS_609.slots.default;
                __VLS_610 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_611 = __VLS_asFunctionalComponent(__VLS_610, new __VLS_610({
                    placeholder: "填写保险",
                    modelValue: (__VLS_ctx.itemInfo.socialSecurityRequest.insurance),
                    autocomplete: "off",
                }));
                __VLS_612 = __VLS_611.apply(void 0, __spreadArray([{
                        placeholder: "填写保险",
                        modelValue: (__VLS_ctx.itemInfo.socialSecurityRequest.insurance),
                        autocomplete: "off",
                    }], __VLS_functionalComponentArgsRest(__VLS_611), false));
                __VLS_614 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_615 = __VLS_asFunctionalComponent(__VLS_614, new __VLS_614(__assign({ class: "form-item" })));
                __VLS_616 = __VLS_615.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_615), false));
                __VLS_617.slots.default;
                __VLS_618 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_619 = __VLS_asFunctionalComponent(__VLS_618, new __VLS_618({
                    label: "五保",
                    prop: "fiveGuaranteesSupport",
                }));
                __VLS_620 = __VLS_619.apply(void 0, __spreadArray([{
                        label: "五保",
                        prop: "fiveGuaranteesSupport",
                    }], __VLS_functionalComponentArgsRest(__VLS_619), false));
                __VLS_621.slots.default;
                __VLS_622 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_623 = __VLS_asFunctionalComponent(__VLS_622, new __VLS_622({
                    placeholder: "填写五保",
                    modelValue: (__VLS_ctx.itemInfo.socialSecurityRequest.fiveGuaranteesSupport),
                    autocomplete: "off",
                }));
                __VLS_624 = __VLS_623.apply(void 0, __spreadArray([{
                        placeholder: "填写五保",
                        modelValue: (__VLS_ctx.itemInfo.socialSecurityRequest.fiveGuaranteesSupport),
                        autocomplete: "off",
                    }], __VLS_functionalComponentArgsRest(__VLS_623), false));
                __VLS_626 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_627 = __VLS_asFunctionalComponent(__VLS_626, new __VLS_626(__assign({ class: "form-item" })));
                __VLS_628 = __VLS_627.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_627), false));
                __VLS_629.slots.default;
                __VLS_630 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_631 = __VLS_asFunctionalComponent(__VLS_630, new __VLS_630({
                    label: "其他保障",
                    prop: "otherBenefits",
                }));
                __VLS_632 = __VLS_631.apply(void 0, __spreadArray([{
                        label: "其他保障",
                        prop: "otherBenefits",
                    }], __VLS_functionalComponentArgsRest(__VLS_631), false));
                __VLS_633.slots.default;
                __VLS_634 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_635 = __VLS_asFunctionalComponent(__VLS_634, new __VLS_634({
                    placeholder: "填写其他保障",
                    modelValue: (__VLS_ctx.itemInfo.socialSecurityRequest.otherBenefits),
                    autocomplete: "off",
                }));
                __VLS_636 = __VLS_635.apply(void 0, __spreadArray([{
                        placeholder: "填写其他保障",
                        modelValue: (__VLS_ctx.itemInfo.socialSecurityRequest.otherBenefits),
                        autocomplete: "off",
                    }], __VLS_functionalComponentArgsRest(__VLS_635), false));
                __VLS_638 = {}.ElCol;
                /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
                __VLS_639 = __VLS_asFunctionalComponent(__VLS_638, new __VLS_638(__assign({ class: "form-item" })));
                __VLS_640 = __VLS_639.apply(void 0, __spreadArray([__assign({ class: "form-item" })], __VLS_functionalComponentArgsRest(__VLS_639), false));
                __VLS_641.slots.default;
                __VLS_642 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_643 = __VLS_asFunctionalComponent(__VLS_642, new __VLS_642({
                    label: "就业扶持",
                    prop: "employmentSupport",
                }));
                __VLS_644 = __VLS_643.apply(void 0, __spreadArray([{
                        label: "就业扶持",
                        prop: "employmentSupport",
                    }], __VLS_functionalComponentArgsRest(__VLS_643), false));
                __VLS_645.slots.default;
                __VLS_646 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_647 = __VLS_asFunctionalComponent(__VLS_646, new __VLS_646({
                    placeholder: "填写就业扶持",
                    modelValue: (__VLS_ctx.itemInfo.socialSecurityRequest.employmentSupport),
                    autocomplete: "off",
                }));
                __VLS_648 = __VLS_647.apply(void 0, __spreadArray([{
                        placeholder: "填写就业扶持",
                        modelValue: (__VLS_ctx.itemInfo.socialSecurityRequest.employmentSupport),
                        autocomplete: "off",
                    }], __VLS_functionalComponentArgsRest(__VLS_647), false));
                /** @type {__VLS_StyleScopedClasses['title']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['title']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['title']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['title']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                /** @type {__VLS_StyleScopedClasses['form-item']} */ ;
                __VLS_5 = __VLS_4;
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('vue')); })];
            case 1:
                __VLS_self = (_a.sent()).defineComponent({
                    setup: function () {
                        return {
                            itemInfoRef: itemInfoRef,
                        };
                    },
                    emits: {},
                    props: {
                        itemInfo: {
                            type: Object,
                            required: true
                        },
                        rules: {
                            type: Object,
                            required: true
                        },
                        state: {
                            type: Object,
                            required: true
                        },
                        disabled: {
                            type: Boolean,
                            default: false
                        }
                    },
                    name: 'BaseInfoEditDialog'
                });
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('vue')); })];
            case 2: return [2 /*return*/, (_a.sent()).defineComponent({
                    setup: function () {
                        return {};
                    },
                    emits: {},
                    props: {
                        itemInfo: {
                            type: Object,
                            required: true
                        },
                        rules: {
                            type: Object,
                            required: true
                        },
                        state: {
                            type: Object,
                            required: true
                        },
                        disabled: {
                            type: Boolean,
                            default: false
                        }
                    },
                    name: 'BaseInfoEditDialog'
                })];
        }
    });
}); })(); /* PartiallyEnd: #4569/main.vue */
