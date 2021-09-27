import { Request } from "express";
import { ErrorResponse } from "../apiresponse/error.response";
import { AppSettings } from "../models/app.settings.model";

const findOne = async (key: string) => {
  const setting = await AppSettings.findOne({ where: { d_key: key } });
  if (!setting) {
    throw new ErrorResponse("Setting not found!");
  }
  return setting;
};
const update = async (req: Request) => {
  const { key, value } = req.body;
  const setting = await findOne(key);

  setting.value = value;
  await setting.save();
  return setting.reload();
};
const addNew = async (req: Request) => {
  const { key, value } = req.body;
  const { user_id } = req.user!;

  const setting = await AppSettings.create({
    d_key: key,
    value,
    last_updated_by: user_id,
  });
  return setting;
};

export default {
  findOne,
  update,
  addNew,
};
