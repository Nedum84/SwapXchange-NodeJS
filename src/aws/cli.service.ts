import { exec } from "child_process";
import { resolve as _resolve } from "path";
import sequelize from "../models";
import postMigration from "../database/post-migration";
require("dotenv").config();

const execCommand = (cmd: any, callback: any = null, throwError = true) => {
  console.log(`Executing "${cmd}"`);
  console.log(" ");

  return new Promise((resolve, reject) => {
    exec(cmd, async (error, stdout, stderr) => {
      if (callback) await callback(error, stdout, stderr);
      if (error && throwError) {
        reject(error);
      } else {
        resolve(stdout || stderr || error);
      }
    });
  });
};

// const s_cli = _resolve(__dirname, '../../node_modules/sequelize-cli/lib/sequelize');
const s_cli = "npm run";

const dropDB = () => execCommand(`${s_cli} db:drop`);
const dbCreate = () => execCommand(`${s_cli} db:create`, null, false);

const dbMigrate = (args: any, callback: any) => {
  return execCommand(
    `${s_cli} db:migrate`,
    (error: any, stdout: any, stderr: any) => {
      if (error || stderr) return callback(error, stdout, stderr);

      // seed real data
      console.log(`Running post migration script...`);
      return postMigration()
        .then(() => {
          callback(error, stdout, stderr);
        })
        .catch((err: any) => console.error(err));
    }
  );
};
const dbSeedAll = () => execCommand(`${s_cli} db:seed:all`);
const dbSync = () => sequelize.sync({ force: true });
const bash = (args: any) =>
  args.cmd
    ? execCommand(`${args.cmd}`)
    : console.log("cmd parameter is required");

const handler = async function (event: any, context: any, callback: any) {
  console.log("Arguments: ", event);
  const command = typeof event === "string" ? event : event.fn;

  console.log(`Running "${command}" in ${process.env.NODE_ENV} mode.`);

  const env = process.env.NODE_ENV;
  let handle;
  if (["development", "staging", "test"].includes(env!)) {
    const all: any = { ...register, ...registerDev };
    handle = all[command];
  } else {
    //@ts-ignore
    handle = register[command];
  }

  try {
    let res = "";
    if (handle) {
      res = await handle(event, callback, context);
    } else {
      console.log(`Command ${command} not found in environment ${env}`);
    }

    callback(null, res);
  } catch (e) {
    callback(e);
    process.exit(1);
  }
};

const register = {
  "db:migrate": dbMigrate,
  "db:create": dbCreate,
};

const registerDev = {
  "db:drop": dropDB,
  "db:seed:all": dbSeedAll,
  "db:sync": dbSync,
  bash,
};

export { register, registerDev, handler };
