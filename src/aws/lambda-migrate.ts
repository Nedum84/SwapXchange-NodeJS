import {APIGatewayProxyEvent, Context} from 'aws-lambda';
import * as m from '../database/umzug/migrate';
import { resolve  } from "path";
import { exec } from "child_process";
import dotenv from "dotenv";
dotenv.config();

const handler = async function (event:APIGatewayProxyEvent, context:Context, callback:any) {

  console.log("---",process.env, "---")
  const tsNode = resolve(__dirname, '../../node_modules/.bin/ts-node');
  // shell.exec(`ts-node src/database/umzug/migrate.ts`);
  // shell.exec(`${tsNode} src/database/umzug/migrate.ts`);

  const promise = new Promise(function(resolve, reject) {
    const options = {
      maxBuffer: 10000000,
      env: process.env
    }

    exec(`node ./src/database/umzug/migrate`, options, (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
      }
      if (stderr) {
        console.log(`stderr::: ${stderr}`);
      }
      console.log(`stdout: ${stdout}`);
    });

  })

  return promise
};

export = {
  handler,
};