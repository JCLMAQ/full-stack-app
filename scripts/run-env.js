
const dotenv = require('dotenv');
const child_process = require('child_process');
const config = dotenv.config()
const DEV_SERVER_PORT = process.env.API_FRONTEND_PORT || 4200;
// const child = child_process.exec(`ng serve --port=${DEV_SERVER_PORT}`);
const child = child_process.exec(`pnpm run configangular -- --environment=dev && nx serve frontend --proxy-config ./proxy.conf.json --port=${DEV_SERVER_PORT}`);

child.stderr.on('data', err => console.error(err.toString()));
child.stdout.on('data', data => console.log(data.toString()));
