import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response} from "express";
const app: Express = express();
const port: number = (Number)(process.env.PORT);

import connect from "./config/connect";
connect();

import { ApolloServer} from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
const startServer = async()=>{
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  });

  await apolloServer.start();

  app.use("/graphql",
    express.json(),
    expressMiddleware(apolloServer)
  );

  app.listen(port,()=>{
    console.log("app is listening in port "+port);
  })  
}

startServer();