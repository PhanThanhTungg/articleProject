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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const md5_1 = __importDefault(require("md5"));
const User_model_1 = __importDefault(require("../Model/User.model"));
exports.default = {
    Query: {
        getUser: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (context.token) {
                const user = yield User_model_1.default.findOne({
                    token: context.token,
                    deleted: false
                }).lean();
                user["id"] = user._id;
                return Object.assign({ code: "200" }, user);
            }
            else
                return {
                    code: "400",
                    message: "error"
                };
        })
    },
    Mutation: {
        register: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const checkUser = yield User_model_1.default.findOne({
                email: user.email,
                deleted: false
            });
            if (checkUser)
                return {
                    code: "400",
                    message: "email exists"
                };
            user.password = (0, md5_1.default)(user.password);
            const UserObject = new User_model_1.default(user);
            yield UserObject.save();
            return Object.assign(Object.assign({}, UserObject), { code: "200", message: "register successfully" });
        }),
        login: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, password } = args.user;
            const existUser = yield User_model_1.default.findOne({
                email: email,
                deleted: false
            });
            if (!existUser) {
                return {
                    code: "400",
                    message: "email doesn't exist"
                };
            }
            if ((0, md5_1.default)(password) != existUser.password)
                return {
                    code: "400",
                    message: "wrong password"
                };
            const ObjectUser = existUser.toObject();
            ObjectUser["id"] = ObjectUser._id;
            return Object.assign({ code: "200", message: "login successfully" }, ObjectUser);
        })
    }
};
