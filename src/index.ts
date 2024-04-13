import express from "express";
import cors from "cors";
import { getMetaData } from "./metadata-scraper";
import { ToiDiSpyController } from "./toidispy/toidispy.controller";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use('/spy',ToiDiSpyController)

app.use("/fetch-metadata", async (req, res) => {
  const data = await getMetaData(req.body.url);
  res.status(200).json(data);
});

app.use("/", async (req, res) => {
  res.send("something in the way");
});

app.listen(8080, () => console.log("Listening on port 8080"));
