import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import web from "./routes/web_routes/index.js";
import api from "./routes/api_routes/index.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
global.mock_db = path.join(__dirname, "./data/mock_db.json");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static("public", { mimetype: "text/css" }));
app.use(express.json());
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);
app.use("/", web);

app.use("/api", api);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
  console.log("http://localhost:3000/");
});
