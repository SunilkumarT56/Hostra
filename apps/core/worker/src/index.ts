import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import deployRouter from "./routes/deploy.router.js";
import webhookRouter from "./routes/webhook.router.js";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT;

const app = express();
app.use(
  "/api/webhook/deploy",
  bodyParser.json({
    verify: (req: any, res: any, buf: any) => {
      req.rawBody = buf.toString();
    },
  }),
);
app.use(express.json());
app;
app.use(cors());
app.use("/api/upload", deployRouter);
app.use("/api/webhook", webhookRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
