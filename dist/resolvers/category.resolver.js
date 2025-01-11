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
const Category_model_1 = __importDefault(require("../Model/Category.model"));
exports.default = {
    Query: {
        getListCategory: () => __awaiter(void 0, void 0, void 0, function* () {
            const categorys = yield Category_model_1.default.find({
                deleted: false
            });
            return categorys;
        }),
        getDetailCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const category = yield Category_model_1.default.findOne({
                _id: id,
                deleted: false
            });
            return category;
        })
    },
    Mutation: {
        createCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { category } = args;
            const categoryObject = new Category_model_1.default(category);
            yield categoryObject.save();
            return categoryObject;
        }),
        deleteCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const category = yield Category_model_1.default.findOne({ _id: id, deleted: false });
            if (!category)
                return {
                    code: "400",
                    message: "error!"
                };
            yield Category_model_1.default.updateOne({ _id: id, deleted: false }, { deleted: true, deletedAt: new Date() });
            return {
                code: "200",
                message: "delete successfully"
            };
        }),
        updateCategory: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, category } = args;
            yield Category_model_1.default.updateOne({ _id: id, deleted: false }, category);
            const categoryObject = yield Category_model_1.default.findOne({ _id: id });
            return categoryObject;
        })
    }
};
