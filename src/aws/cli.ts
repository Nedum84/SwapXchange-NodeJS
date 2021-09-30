import { register, registerDev, handler } from "./cli.service";

/**
 * Register command for all stages
 * @type {string}
 */
//@ts-ignore
register["cmd:sample1"] = (args, callback, context) => {
  console.log("Running sample 1 command for all stages");
};

/**
 * Register commands for development only
 * @type {string}
 */
//@ts-ignore
registerDev["cmd:sample2"] = (args, callback, context) => {
  console.log("Running sample command 2 only on development");
};

export default handler;
