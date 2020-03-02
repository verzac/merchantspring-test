import dotenv from 'dotenv';

dotenv.config();

function getRequiredEnv(envVarKey: string): string {
  const envVarVal = process.env[envVarKey];
  if (!envVarVal) {
    throw new Error(`Unable to load environment variable ${envVarKey}.`)
  }
  return envVarVal;
}

export default {
  ebayAppId: getRequiredEnv('MS_TEST_EBAY_API_KEY'),
  portNumber: Number(process.env.EXPRESS_PORT_NUMBER) || 8080,
};