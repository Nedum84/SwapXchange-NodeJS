import Joi from "joi";
import dotenv from "dotenv";
dotenv.config();

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().default("development"),
    REGION: Joi.string().default("eu-west-2"),
    PORT: Joi.number().default(8000),
    JWT_SECRET: Joi.string()
      .description("JWT secret key")
      .default("jwt-token-secret"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(90)
      .description("days after which refresh tokens expire"),
    DB_NAME: Joi.string().default("db-name"),
    DB_TEST_NAME: Joi.string().default("db-test-name"),
    DB_USERNAME: Joi.string().default("db-username"),
    DB_PASSWORD: Joi.string().default("db-password"),
    DB_HOST: Joi.string().default("db-host"),
    DB_PORT: Joi.number().default(5432),
    PAYSTACK_TEST_KEY: Joi.string().default("key"),
    PAYSTACK_LIVE_KEY: Joi.string().default("key"),
    AGORA_APP_ID: Joi.string().default("agora_app_id"),
    AGORA_APP_CERT: Joi.string().default("agora_app_cert"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  ...process.env,
  env: envVars.NODE_ENV,
  PORT: envVars.PORT,
  REGION: envVars.REGION,
  NODE_ENV: envVars.NODE_ENV,
  DB_NAME: envVars.DB_NAME,
  DB_TEST_NAME: envVars.DB_TEST_NAME,
  DB_USERNAME: envVars.DB_USERNAME,
  DB_PASSWORD: envVars.DB_PASSWORD,
  DB_HOST: envVars.DB_HOST,
  DB_PORT: envVars.DB_PORT,
  PAYSTACK_TEST_KEY: envVars.PAYSTACK_TEST_KEY,
  PAYSTACK_LIVE_KEY: envVars.PAYSTACK_LIVE_KEY,
  AGORA_APP_ID: envVars.AGORA_APP_ID,
  AGORA_APP_CERT: envVars.AGORA_APP_CERT,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },
};
