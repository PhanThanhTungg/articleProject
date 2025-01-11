"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const article_resolvers_1 = __importDefault(require("./article.resolvers"));
const category_resolver_1 = __importDefault(require("./category.resolver"));
const user_resolvers_1 = __importDefault(require("./user.resolvers"));
exports.default = [
    article_resolvers_1.default,
    category_resolver_1.default,
    user_resolvers_1.default
];
