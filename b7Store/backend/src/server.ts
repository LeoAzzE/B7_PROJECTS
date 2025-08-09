import cors from "cors";
import { routes } from "./routes/main.js";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";

const server = express();
server.use(cors());
server.use(express.static("public"));
server.use(express.json());

server.use(routes);

server.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({ erro: "ocorrreu algum erro" });
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log("B7STORE BACKEND RUNNIND - PORT: " + port);
});
