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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = (Number)(process.env.PORT);
const connect_1 = __importDefault(require("./config/connect"));
(0, connect_1.default)();
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const index_typeDefs_1 = __importDefault(require("./typeDefs/index.typeDefs"));
const index_resolvers_1 = __importDefault(require("./resolvers/index.resolvers"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const apolloServer = new server_1.ApolloServer({
        typeDefs: index_typeDefs_1.default,
        resolvers: index_resolvers_1.default,
        introspection: true
    });
    yield apolloServer.start();
    app.use("/graphql", express_1.default.json(), auth_middleware_1.requireAuth, (0, express4_1.expressMiddleware)(apolloServer, {
        context: (_a) => __awaiter(void 0, [_a], void 0, function* ({ req }) {
            return req;
        })
    }));
    app.listen(port, () => {
        console.log("app is listening in port " + port);
    });
});
startServer();
