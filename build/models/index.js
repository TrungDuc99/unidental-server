"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var User_1 = __importDefault(require("./User"));
var UserModel = mongoose_1.default.model('User', User_1.default);
exports.UserModel = UserModel;
UserModel.collection.createIndex({ name: 'text', email: 'text' });
