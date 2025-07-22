"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const { writeFile } = require('fs');
var fs_1 = require("fs");
// const { argv } = require('yargs');
// read environment variables from .env file
// require('dotenv').config();
var dotenv_1 = require("dotenv");
var config = dotenv_1.default.config();
// read the command line arguments passed with yargs
// const argv = yargs.environemnt;
var environment = process.env.NODE_ENV || 'dev';
var isProduction = environment === 'prod';
if (!process.env.API_FRONTEND || !process.env.API_FRONTEND_PORT || !process.env.API_BACKEND || !process.env.API_BACKEND_PORT || !process.env.API_SECRET || !process.env.AUTO_REGISTRATION_ENABLE || !process.env.REGISTRATION_VALIDATION || !process.env.PWDLESS_LOGIN_ENABLE || !process.env.DEFAULT_LANGUAGE || !process.env.SUPPORTED_LANGUAGE) {
    console.error('All the required environment variables were not provided!');
    process.exit(-1);
}
var targetPath = isProduction
    ? "./apps/frontend/jcm-app/environments/environment.prod.ts"
    : "./apps/frontend/jcm-app/environments/environment.ts";
// we have access to our environment variables
// in the process.env object thanks to dotenv
var environmentFileContent = "\n    export const environment = {\n        production: ".concat(isProduction, ",\n        API_URL_BACKEND: \"http://").concat(process.env.API_BACKEND, ":").concat(process.env.API_BACKEND_PORT, "\",\n        API_URL_FRONTEND: \"http://").concat(process.env.API_FRONTEND, ":").concat(process.env.API_FRONTEND_PORT, "\",\n        API_FRONTEND: \"").concat(process.env.API_FRONTEND, "\",\n        API_PORT: \"").concat(process.env.API_PORT, "\",\n        API_SECRET: \"").concat(process.env.API_SECRET, "\",\n        AUTO_REGISTRATION_ENABLE: \"").concat(process.env.AUTO_REGISTRATION_ENABLE, "\",\n        REGISTRATION_VALIDATION: \"").concat(process.env.REGISTRATION_VALIDATION, "\",\n        PWDLESS_LOGIN_ENABLE: \"").concat(process.env.PWDLESS_LOGIN_ENABLE, "\",\n        defaultLanguage: \"").concat(process.env.DEFAULT_LANGUAGE, "\",\n        supportedLanguages: ").concat(process.env.SUPPORTED_LANGUAGE, "\n    };");
// write the content to the respective file
(0, fs_1.writeFile)(targetPath, environmentFileContent, function (err) {
    if (err) {
        console.log(err);
    }
    console.log("Wrote variables to ".concat(targetPath));
});
