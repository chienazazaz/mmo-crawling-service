import express from "express";
import Joi from "joi";
import { getData } from "./toidispy.service";

export const ToiDiSpyController = express.Router();

ToiDiSpyController.use("/get-data", async (req, res) => {
  try {
    const params = await Joi.object({
      q: Joi.string().optional(),
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
      cursor: Joi.string().optional(),
      search_on: Joi.string()
        .valid("content", "page_id", "domain", "pixel")
        .default("content"),
      startDate: Joi.string().optional(),
      endDate: Joi.string().optional(),
      dateRange: Joi.string().valid('custom','7 days', 'this month', 'last month', 'last 3 months', 'last 6 months').default('7 days'),
      type: Joi.string().valid("photo", "video", "link").optional(),
      comment: Joi.number().valid(10, 50, 100, 500, 1000).optional(),
      like: Joi.number().valid(10, 50, 100, 500, 1000).optional(),
      share: Joi.number().valid(10, 50, 100, 500, 1000).optional(),
    }).validateAsync(req.body);

    const results = await getData(params);
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
