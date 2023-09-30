import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import statisticsRouter from "./routes/statistics";
import {
  errorResponerHandler,
  invalidPathHandler,
} from "./middlewares/errorHandlers";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", async (req, res, next) => {
  res.json({
    message: "server is listening...",
  });
});

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api", statisticsRouter);

app.use(invalidPathHandler);
app.use(errorResponerHandler);

const PORT = 8000 || process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`server is listening on PORT http://localhost:${PORT}`);
});
