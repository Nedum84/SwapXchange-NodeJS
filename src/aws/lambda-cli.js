const cli = require('./cli');

exports.handler = async function (event, context, callback) {
  // context.callbackWaitsForEmptyEventLoop = false;

  await cli(event, context, (error, stdout, stderr) => {
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
