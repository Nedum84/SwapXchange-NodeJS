import cli from './cli';
import {APIGatewayProxyEvent, Context} from 'aws-lambda';
import shell from 'shelljs';


const handler = async function (event:APIGatewayProxyEvent, context:Context, callback:any) {
  // context.callbackWaitsForEmptyEventLoop = false;

  shell.echo("Hellow worlf!!!")
  // shell.exec(`ts-node src/database/umzug/migrate.ts`);
  shell.exec(`npx ts-node src/database/umzug/migrate.ts`);
};

export = {
  handler,
};