// prisma-migrate-expand.js
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { execSync } = require('child_process');

const env = dotenv.config({ path: './.env' });
dotenvExpand.expand(env);

execSync('pnpm exec prisma migrate dev --schema=./zmodel/prisma/schema.prisma', { stdio: 'inherit' });
