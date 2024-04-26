import express from "express";
import Joi from "joi";
import { getTrustPilotData } from "./trustpilot.service";

export const ToiDiSpyController = express.Router();

ToiDiSpyController.use("/get-data", async (req, res) => {
  try {
    const params = await Joi.object({
      category: Joi.string(),
    }).validateAsync(req.body);
    const results = await getTrustPilotData(params);
    res.status(200).json({results});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
