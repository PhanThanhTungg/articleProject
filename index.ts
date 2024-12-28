
import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response} from "express";
const app: Express = express();
const port = process.env.PORT;

import connect from "./config/connect";
connect();

import Article from "./Model/Article.model";

app.get("/articles", async (req: Request, res: Response):Promise<void>=>{
  const articles = await Article.find({
    deleted: false,
  })
  res.json({
    articles: articles
  })
})

app.listen(port,()=>{
  console.log("app is listening in port "+port);
})