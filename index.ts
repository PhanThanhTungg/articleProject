import express, { Express, Request, Response} from "express";
const app: Express = express();
const port = 3000;

app.get("/articles", (req: Request, res: Response)=>{
  res.json({
    message: "ok"
  })
})

app.listen(port,()=>{
  console.log("app is listening in port "+port);
})