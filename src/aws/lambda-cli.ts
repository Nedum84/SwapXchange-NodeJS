import cli from './cli';
import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Handler } from 'aws-lambda';


const handler:Handler = async function (event:APIGatewayProxyEvent, context, callback) {
  // context.callbackWaitsForEmptyEventLoop = false;

  await cli(event, context, (error:any, stdout:any, stderr:any) => {
    if (error) {
      console.warn(error);
      callback(error.message);
      return;
    }

    if (stderr) {
      console.error(stderr);
      callback('Error occurred');
      return;
    }

    console.log(stdout);
    callback(null, 'Success');
  });
};

export = {
  handler,
};