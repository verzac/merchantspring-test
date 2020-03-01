import dotenv from 'dotenv';

dotenv.config();

function getRequiredEnv(envVarKey: string) {
  const envVarVal = process.env[envVarKey];
  if (!envVarVal) {
    throw new Error(`Unable to load environment variable ${envVarKey}.`)
  }
}

export default {
  ebayAppId: getRequiredEnv('MS_TEST_EBAY_API_KEY'),
};