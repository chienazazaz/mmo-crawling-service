import express from "express";
import cors from "cors";
import { getMetaData } from "./metadata-scraper";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/fetch-metadata", async (req, res) => {
  const data = await getMetaData(req.body.url);
  res.send(data).status(200);
});

app.listen(8080, () => console.log("Listening on port 8080"));
