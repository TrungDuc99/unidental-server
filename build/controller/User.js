"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
require('dotenv').config();
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var ObjectId = require('mongodb').ObjectId;
var secretKey = process.env.TOKEN_SECRET_KEY;
var UserCallback = /** @class */ (function () {
    function UserCallback() {
    }
    UserCallback.get = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, models_1.UserModel.find().select('email _id id name phone address avatarUrl created typeAccount')];
                    case 1:
                        payload = _a.sent();
                        return [2 /*return*/, res.json({ succeeded: true, data: payload })];
                    case 2:
                        err_1 = _a.sent();
                        res.status(500).json({ error: err_1 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //https://anonystick.com/blog-developer/full-text-search-mongodb-chi-mot-bai-viet-khong-can-nhieu-2022012063033379
    UserCallback.searchUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var authHeader, token, decodedToken_1, name, users, newArr, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        authHeader = req.headers.authorization;
                        token = authHeader && authHeader.split(' ')[1];
                        decodedToken_1 = token && jsonwebtoken_1.default.verify(token, secretKey);
                        name = req.params.search || '' // handle undefined or empty value
                        ;
                        return [4 /*yield*/, models_1.UserModel.find({
                                $text: {
                                    $search: name,
                                },
                            })];
                    case 1:
                        users = _a.sent();
                        newArr = users.filter(function (item) {
                            var _a;
                            var stringId = item._id.toString();
                            return stringId !== ((_a = decodedToken_1 === null || decodedToken_1 === void 0 ? void 0 : decodedToken_1.user) === null || _a === void 0 ? void 0 : _a.uid);
                        });
                        res.json({ succeeded: true, data: newArr });
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.error(err_2); // log the error for debugging purposes
                        res.status(500).json({ error: 'An internal server error occurred' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserCallback.getOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userID, payload, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userID = req.params.id;
                        return [4 /*yield*/, models_1.UserModel.findOne({ _id: userID }).select('email _id id name phone address avatarUrl created typeAccount')];
                    case 1:
                        payload = _a.sent();
                        return [2 /*return*/, res.json({ succeeded: true, data: payload })];
                    case 2:
                        err_3 = _a.sent();
                        res.status(500).json({ error: err_3 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserCallback.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, name, password, avatarUrl, phone, address, typeAccount, payload, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, name = _a.name, password = _a.password, avatarUrl = _a.avatarUrl, phone = _a.phone, address = _a.address, typeAccount = _a.typeAccount;
                        return [4 /*yield*/, models_1.UserModel.create({
                                email: email,
                                name: name,
                                typeAccount: typeAccount,
                                password: password,
                                avatarUrl: avatarUrl,
                                phone: phone,
                                address: address,
                            })];
                    case 1:
                        payload = _b.sent();
                        return [2 /*return*/, res.json({ succeeded: true, data: payload })];
                    case 2:
                        err_4 = _b.sent();
                        res.status(500).json({ error: err_4 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserCallback.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, name, password, phone, address, avatarUrl, typeAccount, payload, err_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        _a = req.body, name = _a.name, password = _a.password, phone = _a.phone, address = _a.address, avatarUrl = _a.avatarUrl, typeAccount = _a.typeAccount;
                        return [4 /*yield*/, models_1.UserModel.findOneAndUpdate({ id: id }, { name: name, password: password, phone: phone, address: address, avatarUrl: avatarUrl, typeAccount: typeAccount })];
                    case 1:
                        payload = _b.sent();
                        return [2 /*return*/, res.json({ succeeded: true, data: payload })];
                    case 2:
                        err_5 = _b.sent();
                        res.status(500).json({ error: err_5 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserCallback.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userID, payload, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userID = req.params.id;
                        return [4 /*yield*/, models_1.UserModel.deleteOne({ _id: userID })];
                    case 1:
                        payload = _a.sent();
                        if (payload.deletedCount === 0) {
                            // Trường hợp không tìm thấy bài đăng cần xóa
                            return [2 /*return*/, res.status(404).json({ succeeded: false, message: 'Not found' })];
                        }
                        else {
                            // Trường hợp đã xóa thành công
                            return [2 /*return*/, res.json({ succeeded: true, message: 'Successfully deleted' })];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        res.status(500).json({ error: err_6 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserCallback;
}());
exports.default = UserCallback;
