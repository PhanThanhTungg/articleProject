import dotenv from "dotenv";
dotenv.config();

import express, { Express} from "express";
const app: Express = express();
const port: number = (Number)(process.env.PORT);

import connect from "./config/connect";
connect();

import { ApolloServer} from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import typeDefs from './typeDefs/index.typeDefs';
import resolvers from "./resolvers/index.resolvers";
import { requireAuth } from "./middleware/auth.middleware";
const startServer = async()=>{
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true
  });

  await apolloServer.start();

  app.use("/graphql",
    express.json(),
    requireAuth,
    expressMiddleware(apolloServer,{
      context:async ({ req }) => {
        return req
      }
    })
  );

  app.listen(port,()=>{
    console.log("app is listening in port "+port);
  })  
}

startServer();