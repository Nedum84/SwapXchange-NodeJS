import { Request } from "express";
import config from "../config/config";
const RtcTokenBuilder =
  require("../utils/agora/RtcTokenBuilder").RtcTokenBuilder;
const RtcRole = require("../utils/agora/RtcTokenBuilder").Role;

const create = async (req: Request) => {
  const { uid, channel_name } = req.body;
  const role = RtcRole.ATTENDEE;

  const expirationTimeInSeconds = 600; //--> 10 mins

  const currentTimestamp = Math.floor(Date.now() / 1000);

  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
  const tokenA = RtcTokenBuilder.buildTokenWithUid(
    config.AGORA_APP_ID,
    config.AGORA_APP_CERT,
    channel_name,
    0, //uid,
    role,
    privilegeExpiredTs
  );
  return { token: tokenA };
};

export default {
  create,
};
