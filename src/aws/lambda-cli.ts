import cli from './cli';
import {APIGatewayProxyEvent, Context} from 'aws-lambda';


const handler = async function (event:APIGatewayProxyEvent, context:Context, callback:any) {
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