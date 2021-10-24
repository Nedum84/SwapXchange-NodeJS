import {APIGatewayProxyEvent, Context} from 'aws-lambda';
// import 'ts-node/register';
import shell from 'shelljs';
import * as m from '../database/umzug/migrate';
import { resolve  } from "path";
import { exec } from "child_process";
import dotenv from "dotenv";
dotenv.config();

const handler = async function (event:APIGatewayProxyEvent, context:Context, callback:any) {

  console.log("----------",process.env, "::::HERE:::")
  const s_cli = resolve(__dirname, '../../node_modules/sequelize-cli/lib/sequelize');
  const tsNode = resolve(__dirname, '../../node_modules/.bin/ts-node');
  // shell.exec(`ts-node src/database/umzug/migrate.ts`);
  // shell.exec(`${tsNode} src/database/umzug/migrate.ts`);
  // exec(`${tsNode} src/database/umzug/migrate.ts`);
  // shell.exec(`npx ts-node src/database/umzug/migrate.ts`);

  const promise = new Promise(function(resolve, reject) {
    const options = {
      maxBuffer: 10000000,
      env: process.env
    }

    exec(`node ./src/database/umzug/migrate.js`, options, (error, stdout, stderr) => {
      shell.echo(`Running: ${options.env}`)
      if (error) {
        console.error(`error: ${error.message}`);
        shell.echo( `Error running migration: ${error.message} `);
      }
      if (stderr) {
        console.log(`stderr::: ${stderr}`);
        shell.echo('Error running migration.');
      }
      console.log(`stdout: ${stdout}`);
      shell.echo('Migration successfully.');
    });

  })

  return promise
};

export = {
  handler,
};