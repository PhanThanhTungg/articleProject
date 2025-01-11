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
const Article_model_1 = __importDefault(require("../Model/Article.model"));
const Category_model_1 = __importDefault(require("../Model/Category.model"));
exports.default = {
    Query: {
        getListArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const find = {
                deleted: false
            };
            const { sortKey, sortValue, currentPage, limit, filterKey, filterValue, keySearch } = args;
            const sort = {};
            if (sortKey && sortValue)
                sort[sortKey] = sortValue;
            const skip = (currentPage - 1) * limit;
            if (filterKey && filterValue)
                find[filterKey] = filterValue;
            if (keySearch)
                find["title"] = new RegExp(keySearch, "i");
            const articles = yield Article_model_1.default.find(find).sort(sort).skip(skip).limit(limit);
            return articles;
        }),
        getDetailArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const article = yield Article_model_1.default.findOne({
                _id: id,
                deleted: false
            });
            return article;
        })
    },
    Mutation: {
        createArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { article } = args;
            const articleObject = new Article_model_1.default(article);
            yield articleObject.save();
            return articleObject;
        }),
        deleteArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const article = yield Article_model_1.default.findOne({ _id: id, deleted: false });
            if (!article)
                return {
                    code: "400",
                    message: "error!"
                };
            yield Article_model_1.default.updateOne({ _id: id, deleted: false }, { deleted: true, deletedAt: new Date() });
            return {
                code: "200",
                message: "delete successfully"
            };
        }),
        updateArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, article } = args;
            let articleObject = yield Article_model_1.default.findOne({ _id: id, deleted: false });
            if (!articleObject)
                return {
                    code: "400",
                    message: "error"
                };
            yield Article_model_1.default.updateOne({ _id: id }, article);
            articleObject = yield Article_model_1.default.findOne({ _id: id });
            return articleObject;
        })
    },
    Article: {
        category: (item) => __awaiter(void 0, void 0, void 0, function* () {
            const categoryId = item.categoryId;
            const category = yield Category_model_1.default.findOne({
                _id: categoryId,
                deleted: false
            });
            return category;
        })
    },
    updateArticleOutput: {
        __resolveType(Obj) {
            if (Obj.code)
                return "ResponseCode";
            if (Obj.title)
                return "Article";
            return null;
        }
    }
};
