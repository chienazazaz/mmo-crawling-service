import express from "express";
import Joi from "joi";
import { getData } from "./toidispy.service";

export const ToiDiSpyController = express.Router();

ToiDiSpyController.use("/get-data", async (req, res) => {
  try {
    const params = await Joi.object({
      q: Joi.string().allow(null),
      sort: Joi.string()
        .valid(
          "created_time",
          "added_time",
          "trending",
          "reactions",
          "likes",
          "share"
        )
        .default("added_time"),
      cursor: Joi.string().allow(null),
      search_on: Joi.string()
        .valid("content", "page_id", "domain", "pixel")
        .default("content"),
      date: Joi.string().allow(null),
      type: Joi.string().valid("photo", "video", "link").allow(null),
      comment: Joi.number().valid(10, 50, 100, 500, 1000).allow(null),
      like: Joi.number().valid(10, 50, 100, 500, 1000).allow(null),
      share: Joi.number().valid(10, 50, 100, 500, 1000).allow(null),
    }).validateAsync(req.body);

    const results = await getData(params);
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
