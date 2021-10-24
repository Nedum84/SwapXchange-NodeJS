import {APIGatewayProxyEvent, Context} from 'aws-lambda';
import shell from 'shelljs';
import { resolve  } from "path";
import { exec } from "child_process";


const handler = async function (event:APIGatewayProxyEvent, context:Context, callback:any) {

  const tsNode = resolve(__dirname, '../../node_modules/.bin/ts-node');
  shell.echo("Hello world!!! "+tsNode)
  // shell.exec(`ts-node src/database/umzug/migrate.ts`);
  // shell.exec(`${tsNode} src/database/umzug/migrate.ts`);
  exec(`${tsNode} src/database/umzug/migrate.ts`);
  // shell.exec(`npx ts-node src/database/umzug/migrate.ts`);
};

export = {
  handler,
};