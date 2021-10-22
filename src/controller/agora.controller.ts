import { Request, Response } from "express";
import ApiResponse from "../apiresponse/api.response";
import agoraService from "../services/agora.service";

const create = async (req: Request, res: Response) => {
  const result = await agoraService.create(req);

  ApiResponse.created(res, { token: result });
};

export default {
  create,
};
