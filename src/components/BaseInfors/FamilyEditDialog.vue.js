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
var vue_jsonp_1 = require("vue-jsonp");
var element_plus_1 = require("element-plus");
exports.default = await (function () { return __awaiter(void 0, void 0, void 0, function () {
    var props, MUNICIPALITIES, provinces, cities, districts, streets, addDefaultOption, getProvinces, getChildren, handleProvinceChange, handleCityChange, handleDistrictChange, handleStreetChange, __VLS_ctx, __VLS_components, __VLS_directives, __VLS_0, __VLS_1, __VLS_2, __VLS_4, __VLS_5, __VLS_6, __VLS_7, __VLS_9, __VLS_10, __VLS_11, __VLS_13, __VLS_14, __VLS_15, __VLS_17, __VLS_18, __VLS_19, __VLS_21, __VLS_22, __VLS_23, __VLS_25, __VLS_26, __VLS_27, __VLS_12, __VLS_8, __VLS_29, __VLS_30, __VLS_31, __VLS_33, __VLS_34, __VLS_35, __VLS_32, __VLS_37, __VLS_38, __VLS_39, __VLS_41, __VLS_42, __VLS_43, __VLS_40, __VLS_45, __VLS_46, __VLS_47, __VLS_49, __VLS_50, __VLS_51, __VLS_53, __VLS_54, __VLS_55, __VLS_56, _i, _a, item, __VLS_57, __VLS_58, __VLS_59, __VLS_52, __VLS_48, __VLS_61, __VLS_62, __VLS_63, __VLS_65, __VLS_66, __VLS_67, __VLS_69, __VLS_70, __VLS_71, __VLS_72, _b, _c, item, __VLS_73, __VLS_74, __VLS_75, __VLS_68, __VLS_64, __VLS_77, __VLS_78, __VLS_79, __VLS_81, __VLS_82, __VLS_83, __VLS_85, __VLS_86, __VLS_87, __VLS_88, _d, _e, item, __VLS_89, __VLS_90, __VLS_91, __VLS_84, __VLS_80, __VLS_93, __VLS_94, __VLS_95, __VLS_97, __VLS_98, __VLS_99, __VLS_101, __VLS_102, __VLS_103, __VLS_104, _f, _g, item, __VLS_105, __VLS_106, __VLS_107, __VLS_100, __VLS_96, __VLS_3, __VLS_dollars, __VLS_self;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                props = (0, vue_1.defineProps)({
                    familyInfo: {
                        type: Object,
                        required: true
                    },
                    disabled: {
                        type: Boolean,
                        default: false
                    }
                });
                MUNICIPALITIES = ['110000', '120000', '310000', '500000'] // 北京、天津、上海、重庆
                ;
                provinces = (0, vue_1.ref)([]);
                cities = (0, vue_1.ref)([]);
                districts = (0, vue_1.ref)([]);
                streets = (0, vue_1.ref)([]);
                addDefaultOption = function (list) { return __spreadArray([{ id: '88888888', fullname: '全部' }], list, true); };
                getProvinces = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var res, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, (0, vue_jsonp_1.jsonp)('https://apis.map.qq.com/ws/district/v1/list', {
                                        key: 'LXLBZ-HP66Q-PYL5K-B74JY-IFTMK-RYFV2',
                                        output: 'jsonp'
                                    })];
                            case 1:
                                res = _a.sent();
                                if (res.status === 0) {
                                    provinces.value = addDefaultOption(res.result[0]);
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                element_plus_1.ElMessage.error('获取省份数据失败');
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                getChildren = function (id, level) { return __awaiter(void 0, void 0, void 0, function () {
                    var res, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, (0, vue_jsonp_1.jsonp)('https://apis.map.qq.com/ws/district/v1/getchildren', {
                                        key: 'LXLBZ-HP66Q-PYL5K-B74JY-IFTMK-RYFV2',
                                        id: id,
                                        output: 'jsonp'
                                    })];
                            case 1:
                                res = _a.sent();
                                if (res.status === 0) {
                                    if (level === 1) {
                                        cities.value = addDefaultOption(res.result[0]);
                                    }
                                    else if (level === 2) {
                                        districts.value = addDefaultOption(res.result[0]);
                                    }
                                    else if (level === 3) {
                                        streets.value = addDefaultOption(res.result[0]);
                                    }
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                error_2 = _a.sent();
                                element_plus_1.ElMessage.error('获取下级行政区失败');
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                handleProvinceChange = function (value) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                props.familyInfo.ProvinceId = value;
                                props.familyInfo.ProvinceName = ((_a = provinces.value.find(function (p) { return p.id === value; })) === null || _a === void 0 ? void 0 : _a.fullname) || '';
                                props.familyInfo.MunicipalityId = '';
                                props.familyInfo.MunicipalityName = '';
                                props.familyInfo.DistrictId = '';
                                props.familyInfo.DistrictName = '';
                                props.familyInfo.TownshipStreetsId = '';
                                props.familyInfo.TownshipStreetsName = '';
                                if (!value) return [3 /*break*/, 4];
                                if (!MUNICIPALITIES.includes(value)) return [3 /*break*/, 2];
                                // 如果是直辖市，直接加载区县
                                return [4 /*yield*/, getChildren(value, 2)];
                            case 1:
                                // 如果是直辖市，直接加载区县
                                _b.sent();
                                return [3 /*break*/, 4];
                            case 2: 
                            // 普通省份加载城市
                            return [4 /*yield*/, getChildren(value, 1)];
                            case 3:
                                // 普通省份加载城市
                                _b.sent();
                                _b.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); };
                handleCityChange = function (value) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                props.familyInfo.MunicipalityId = value;
                                props.familyInfo.MunicipalityName = ((_a = cities.value.find(function (c) { return c.id === value; })) === null || _a === void 0 ? void 0 : _a.fullname) || '';
                                props.familyInfo.DistrictId = '';
                                props.familyInfo.DistrictName = '';
                                props.familyInfo.TownshipStreetsId = '';
                                props.familyInfo.TownshipStreetsName = '';
                                if (!value) return [3 /*break*/, 2];
                                return [4 /*yield*/, getChildren(value, 2)];
                            case 1:
                                _b.sent();
                                _b.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); };
                handleDistrictChange = function (value) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                props.familyInfo.DistrictId = value;
                                props.familyInfo.DistrictName = ((_a = districts.value.find(function (d) { return d.id === value; })) === null || _a === void 0 ? void 0 : _a.fullname) || '';
                                props.familyInfo.TownshipStreetsId = '';
                                props.familyInfo.TownshipStreetsName = '';
                                if (!value) return [3 /*break*/, 2];
                                return [4 /*yield*/, getChildren(value, 3)];
                            case 1:
                                _b.sent();
                                _b.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); };
                handleStreetChange = function (value) {
                    var _a;
                    props.familyInfo.TownshipStreetsId = value;
                    props.familyInfo.TownshipStreetsName = ((_a = streets.value.find(function (s) { return s.id === value; })) === null || _a === void 0 ? void 0 : _a.fullname) || '';
                };
                (0, vue_1.onMounted)(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, getProvinces()
                                // 如果已有省份数据，加载下级区域
                            ];
                            case 1:
                                _a.sent();
                                if (!props.familyInfo.ProvinceId) return [3 /*break*/, 5];
                                return [4 /*yield*/, getChildren(props.familyInfo.ProvinceId, 1)];
                            case 2:
                                _a.sent();
                                if (!props.familyInfo.MunicipalityId) return [3 /*break*/, 5];
                                return [4 /*yield*/, getChildren(props.familyInfo.MunicipalityId, 2)];
                            case 3:
                                _a.sent();
                                if (!props.familyInfo.DistrictId) return [3 /*break*/, 5];
                                return [4 /*yield*/, getChildren(props.familyInfo.DistrictId, 3)];
                            case 4:
                                _a.sent();
                                _a.label = 5;
                            case 5: return [2 /*return*/];
                        }
                    });
                }); });
                debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
                __VLS_ctx = {};
                __VLS_0 = {}.ElForm;
                /** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
                __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ model: (__VLS_ctx.familyInfo), labelWidth: "120px", disabled: (__VLS_ctx.disabled) }, { style: {} })));
                __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ model: (__VLS_ctx.familyInfo), labelWidth: "120px", disabled: (__VLS_ctx.disabled) }, { style: {} })], __VLS_functionalComponentArgsRest(__VLS_1), false));
                __VLS_4 = {};
                __VLS_3.slots.default;
                __VLS_5 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
                    label: "等级划分",
                    prop: "grading",
                }));
                __VLS_7 = __VLS_6.apply(void 0, __spreadArray([{
                        label: "等级划分",
                        prop: "grading",
                    }], __VLS_functionalComponentArgsRest(__VLS_6), false));
                __VLS_8.slots.default;
                __VLS_9 = {}.ElSelect;
                /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
                __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
                    placeholder: "请选择等级划分",
                    modelValue: (__VLS_ctx.familyInfo.grading),
                }));
                __VLS_11 = __VLS_10.apply(void 0, __spreadArray([{
                        placeholder: "请选择等级划分",
                        modelValue: (__VLS_ctx.familyInfo.grading),
                    }], __VLS_functionalComponentArgsRest(__VLS_10), false));
                __VLS_12.slots.default;
                __VLS_13 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
                    label: "红",
                    value: "红",
                }));
                __VLS_15 = __VLS_14.apply(void 0, __spreadArray([{
                        label: "红",
                        value: "红",
                    }], __VLS_functionalComponentArgsRest(__VLS_14), false));
                __VLS_17 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
                    label: "橙",
                    value: "橙",
                }));
                __VLS_19 = __VLS_18.apply(void 0, __spreadArray([{
                        label: "橙",
                        value: "橙",
                    }], __VLS_functionalComponentArgsRest(__VLS_18), false));
                __VLS_21 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
                    label: "黄",
                    value: "黄",
                }));
                __VLS_23 = __VLS_22.apply(void 0, __spreadArray([{
                        label: "黄",
                        value: "黄",
                    }], __VLS_functionalComponentArgsRest(__VLS_22), false));
                __VLS_25 = {}.ElOption;
                /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
                    label: "绿",
                    value: "绿",
                }));
                __VLS_27 = __VLS_26.apply(void 0, __spreadArray([{
                        label: "绿",
                        value: "绿",
                    }], __VLS_functionalComponentArgsRest(__VLS_26), false));
                __VLS_29 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
                    label: "家庭年收入(元)",
                    prop: "annualIncome",
                }));
                __VLS_31 = __VLS_30.apply(void 0, __spreadArray([{
                        label: "家庭年收入(元)",
                        prop: "annualIncome",
                    }], __VLS_functionalComponentArgsRest(__VLS_30), false));
                __VLS_32.slots.default;
                __VLS_33 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
                    modelValue: (__VLS_ctx.familyInfo.annualIncome),
                }));
                __VLS_35 = __VLS_34.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.familyInfo.annualIncome),
                    }], __VLS_functionalComponentArgsRest(__VLS_34), false));
                __VLS_37 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
                    label: "家庭年支出(元)",
                    prop: "annualExpenditure",
                }));
                __VLS_39 = __VLS_38.apply(void 0, __spreadArray([{
                        label: "家庭年支出(元)",
                        prop: "annualExpenditure",
                    }], __VLS_functionalComponentArgsRest(__VLS_38), false));
                __VLS_40.slots.default;
                __VLS_41 = {}.ElInput;
                /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
                __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
                    modelValue: (__VLS_ctx.familyInfo.annualExpenditure),
                }));
                __VLS_43 = __VLS_42.apply(void 0, __spreadArray([{
                        modelValue: (__VLS_ctx.familyInfo.annualExpenditure),
                    }], __VLS_functionalComponentArgsRest(__VLS_42), false));
                __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "title" }));
                __VLS_45 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
                    label: "省份",
                    prop: "ProvinceId",
                }));
                __VLS_47 = __VLS_46.apply(void 0, __spreadArray([{
                        label: "省份",
                        prop: "ProvinceId",
                    }], __VLS_functionalComponentArgsRest(__VLS_46), false));
                __VLS_48.slots.default;
                __VLS_49 = {}.ElSelect;
                /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
                __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49(__assign({ 'onChange': {} }, { modelValue: (__VLS_ctx.familyInfo.ProvinceId), placeholder: "请选择省份" })));
                __VLS_51 = __VLS_50.apply(void 0, __spreadArray([__assign({ 'onChange': {} }, { modelValue: (__VLS_ctx.familyInfo.ProvinceId), placeholder: "请选择省份" })], __VLS_functionalComponentArgsRest(__VLS_50), false));
                __VLS_56 = {
                    onChange: (__VLS_ctx.handleProvinceChange)
                };
                __VLS_52.slots.default;
                for (_i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.provinces)); _i < _a.length; _i++) {
                    item = _a[_i][0];
                    __VLS_57 = {}.ElOption;
                    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                    __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
                        key: (item.id),
                        label: (item.fullname),
                        value: (item.id),
                    }));
                    __VLS_59 = __VLS_58.apply(void 0, __spreadArray([{
                            key: (item.id),
                            label: (item.fullname),
                            value: (item.id),
                        }], __VLS_functionalComponentArgsRest(__VLS_58), false));
                }
                if (!__VLS_ctx.MUNICIPALITIES.includes(__VLS_ctx.familyInfo.ProvinceId)) {
                    __VLS_61 = {}.ElFormItem;
                    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                    __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
                        label: "城市",
                        prop: "MunicipalityId",
                    }));
                    __VLS_63 = __VLS_62.apply(void 0, __spreadArray([{
                            label: "城市",
                            prop: "MunicipalityId",
                        }], __VLS_functionalComponentArgsRest(__VLS_62), false));
                    __VLS_64.slots.default;
                    __VLS_65 = {}.ElSelect;
                    /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
                    __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65(__assign({ 'onChange': {} }, { modelValue: (__VLS_ctx.familyInfo.MunicipalityId), placeholder: "请选择城市", disabled: (!__VLS_ctx.familyInfo.ProvinceId) })));
                    __VLS_67 = __VLS_66.apply(void 0, __spreadArray([__assign({ 'onChange': {} }, { modelValue: (__VLS_ctx.familyInfo.MunicipalityId), placeholder: "请选择城市", disabled: (!__VLS_ctx.familyInfo.ProvinceId) })], __VLS_functionalComponentArgsRest(__VLS_66), false));
                    __VLS_69 = void 0;
                    __VLS_70 = void 0;
                    __VLS_71 = void 0;
                    __VLS_72 = {
                        onChange: (__VLS_ctx.handleCityChange)
                    };
                    __VLS_68.slots.default;
                    for (_b = 0, _c = __VLS_getVForSourceType((__VLS_ctx.cities)); _b < _c.length; _b++) {
                        item = _c[_b][0];
                        __VLS_73 = {}.ElOption;
                        /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                        __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
                            key: (item.id),
                            label: (item.fullname),
                            value: (item.id),
                        }));
                        __VLS_75 = __VLS_74.apply(void 0, __spreadArray([{
                                key: (item.id),
                                label: (item.fullname),
                                value: (item.id),
                            }], __VLS_functionalComponentArgsRest(__VLS_74), false));
                    }
                }
                __VLS_77 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({
                    label: "区县",
                    prop: "DistrictId",
                }));
                __VLS_79 = __VLS_78.apply(void 0, __spreadArray([{
                        label: "区县",
                        prop: "DistrictId",
                    }], __VLS_functionalComponentArgsRest(__VLS_78), false));
                __VLS_80.slots.default;
                __VLS_81 = {}.ElSelect;
                /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
                __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81(__assign({ 'onChange': {} }, { modelValue: (__VLS_ctx.familyInfo.DistrictId), placeholder: "请选择区县", disabled: (!__VLS_ctx.MUNICIPALITIES.includes(__VLS_ctx.familyInfo.ProvinceId) && !__VLS_ctx.familyInfo.MunicipalityId) })));
                __VLS_83 = __VLS_82.apply(void 0, __spreadArray([__assign({ 'onChange': {} }, { modelValue: (__VLS_ctx.familyInfo.DistrictId), placeholder: "请选择区县", disabled: (!__VLS_ctx.MUNICIPALITIES.includes(__VLS_ctx.familyInfo.ProvinceId) && !__VLS_ctx.familyInfo.MunicipalityId) })], __VLS_functionalComponentArgsRest(__VLS_82), false));
                __VLS_88 = {
                    onChange: (__VLS_ctx.handleDistrictChange)
                };
                __VLS_84.slots.default;
                for (_d = 0, _e = __VLS_getVForSourceType((__VLS_ctx.districts)); _d < _e.length; _d++) {
                    item = _e[_d][0];
                    __VLS_89 = {}.ElOption;
                    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                    __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({
                        key: (item.id),
                        label: (item.fullname),
                        value: (item.id),
                    }));
                    __VLS_91 = __VLS_90.apply(void 0, __spreadArray([{
                            key: (item.id),
                            label: (item.fullname),
                            value: (item.id),
                        }], __VLS_functionalComponentArgsRest(__VLS_90), false));
                }
                __VLS_93 = {}.ElFormItem;
                /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
                __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93({
                    label: "街道/乡镇",
                    prop: "TownshipStreetsId",
                }));
                __VLS_95 = __VLS_94.apply(void 0, __spreadArray([{
                        label: "街道/乡镇",
                        prop: "TownshipStreetsId",
                    }], __VLS_functionalComponentArgsRest(__VLS_94), false));
                __VLS_96.slots.default;
                __VLS_97 = {}.ElSelect;
                /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
                __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97(__assign({ 'onChange': {} }, { modelValue: (__VLS_ctx.familyInfo.TownshipStreetsId), placeholder: "请选择街道/乡镇", disabled: (!__VLS_ctx.familyInfo.DistrictId) })));
                __VLS_99 = __VLS_98.apply(void 0, __spreadArray([__assign({ 'onChange': {} }, { modelValue: (__VLS_ctx.familyInfo.TownshipStreetsId), placeholder: "请选择街道/乡镇", disabled: (!__VLS_ctx.familyInfo.DistrictId) })], __VLS_functionalComponentArgsRest(__VLS_98), false));
                __VLS_104 = {
                    onChange: (__VLS_ctx.handleStreetChange)
                };
                __VLS_100.slots.default;
                for (_f = 0, _g = __VLS_getVForSourceType((__VLS_ctx.streets)); _f < _g.length; _f++) {
                    item = _g[_f][0];
                    __VLS_105 = {}.ElOption;
                    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
                    __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
                        key: (item.id),
                        label: (item.fullname),
                        value: (item.id),
                    }));
                    __VLS_107 = __VLS_106.apply(void 0, __spreadArray([{
                            key: (item.id),
                            label: (item.fullname),
                            value: (item.id),
                        }], __VLS_functionalComponentArgsRest(__VLS_106), false));
                }
                /** @type {__VLS_StyleScopedClasses['title']} */ ;
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('vue')); })];
            case 1:
                __VLS_self = (_h.sent()).defineComponent({
                    setup: function () {
                        return {
                            MUNICIPALITIES: MUNICIPALITIES,
                            provinces: provinces,
                            cities: cities,
                            districts: districts,
                            streets: streets,
                            handleProvinceChange: handleProvinceChange,
                            handleCityChange: handleCityChange,
                            handleDistrictChange: handleDistrictChange,
                            handleStreetChange: handleStreetChange,
                        };
                    },
                    props: {
                        familyInfo: {
                            type: Object,
                            required: true
                        },
                        disabled: {
                            type: Boolean,
                            default: false
                        }
                    },
                    name: 'FamilyEditDialog'
                });
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('vue')); })];
            case 2: return [2 /*return*/, (_h.sent()).defineComponent({
                    setup: function () {
                        return {};
                    },
                    props: {
                        familyInfo: {
                            type: Object,
                            required: true
                        },
                        disabled: {
                            type: Boolean,
                            default: false
                        }
                    },
                    name: 'FamilyEditDialog'
                })];
        }
    });
}); })(); /* PartiallyEnd: #4569/main.vue */
