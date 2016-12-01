import { spawn } from 'child-process-promise';

export default async (config) => {
  await spawn('./node_modules/.bin/webpack-dev-server', [
    '--config', 'node_modules/worona-packages/webpack/webpack.config.js',
    '--progress',
    '--name', config.name,
    '--service', config.service,
    '--env', config.env,
    '--location', config.location,
  ], { stdio: 'inherit' });
};
