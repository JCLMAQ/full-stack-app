const { writeFile } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';

if (!process.env.API_URL || !process.env.API_SECRET || !process.env.AUTO_REGISTRATION_ENABLE || !process.env.REGISTRATION_VALIDATION|| !process.env.PWDLESS_LOGIN_ENABLE) {
  console.error('All the required environment variables were not provided!');
  process.exit(-1);
}

const targetPath = isProduction
    ? `./apps/frontend/src/environments/environment.prod.ts`
    : `./apps/frontend/src/environments/environment.ts`;
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
    export const environment = {
        production: ${isProduction},
        API_URL: "${process.env.API_URL}",
        API_PORT: "${process.env.API_PORT}",
        API_SECRET: "${process.env.API_SECRET}",
        AUTO_REGISTRATION_ENABLE: "${process.env.AUTO_REGISTRATION_ENABLE}",
        REGISTRATION_VALIDATION: "${process.env.REGISTRATION_VALIDATION}",
        PWDLESS_LOGIN_ENABLE: "${process.env.PWDLESS_LOGIN_ENABLE}",
        defaultLanguage: "${process.env.DEFAULT_LANGUAGE}",
        supportedLanguages: ${process.env.SUPPORTED_LANGUAGE}
    };`;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err: any) {
    if (err) {
      console.log(err);
    }
    console.log(`Wrote variables to ${targetPath}`);
});
