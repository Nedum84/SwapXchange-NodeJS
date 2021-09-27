import { Request, Response } from "express";
import ApiResponse from "../apiresponse/api.response";
import appSettingsService from "../services/app.settings.service";

const findOne = async (req: Request, res: Response) => {
  const { key } = req.params;
  const result = await appSettingsService.findOne(key);
  ApiResponse.ok(res, result);
};
const update = async (req: Request, res: Response) => {
  const result = await appSettingsService.update(req);
  ApiResponse.ok(res, result);
};
const addNew = async (req: Request, res: Response) => {
  const result = await appSettingsService.addNew(req);
  ApiResponse.created(res, result);
};

export default {
  findOne,
  update,
  addNew,
};
