import {APIGatewayProxyEvent, Context} from 'aws-lambda';
import shell from 'shelljs';
import { resolve  } from "path";
import { exec } from "child_process";


const handler = async function (event:APIGatewayProxyEvent, context:Context, callback:any) {

  const s_cli = resolve(__dirname, '../../node_modules/sequelize-cli/lib/sequelize');
  const tsNode = resolve(__dirname, '../../node_modules/.bin/ts-node');
  shell.echo("Hello world!!! "+tsNode)
  // shell.exec(`ts-node src/database/umzug/migrate.ts`);
  // shell.exec(`${tsNode} src/database/umzug/migrate.ts`);
  // exec(`${tsNode} src/database/umzug/migrate.ts`);
  // shell.exec(`npx ts-node src/database/umzug/migrate.ts`);

  const promise = new Promise(function(resolve, reject) {
    exec("ls -la");

    exec(`${s_cli} db:drop`);

    exec(`${tsNode} ./src/database/umzug/migrate.ts`, (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        shell.echo( `Error running migration: ${error.message} `);
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        shell.echo('Error running migration.');
      }
      console.log(`stdout: ${stdout}`);
      shell.echo('Migration successfully.');
    })
  })

  return promise
};

export = {
  handler,
};