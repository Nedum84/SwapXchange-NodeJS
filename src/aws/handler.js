"use strict";
// import AWS from "aws-sdk";
// import { v4 } from "uuid";
const AWS = require("aws-sdk");
const { v4 } = require("uuid");
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

const hello = async (event) => {
  const { todo, name } = JSON.parse(event.body);
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  // for dynamic paths,
  // const { id } = event.pathParameters; //id being the dynamic path name
  const item = {
    id: v4(),
    todo,
    name,
    createdAt: new Date().toISOString(),
  };

  const add = await dynamoDb
    .put({
      TableName: "SwapXTable",
      Item: item,
    })
    .promise();

  let todos = {};
  try {
    todos = await dynamoDb.scan({ TableName: "SwapXTable" }).promise();
  } catch (error) {
    console.log(error);
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      statusCode: 200,
      data: todos,
    }),
  };
};
module.exports = {
  hello: hello,
  // hello:middy(hello).use(httpJsonBodyParser())//to get rid of json.parse inside the handler
};
