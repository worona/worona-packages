import 'babel-polyfill';
import { argv } from 'yargs';
import packageJson from '../../../package.json';
import askForInfo from './ask-for-info.js';
import getFiles from './get-files.js';
import webpack from './webpack.js';

const start = async () => {
  const env = argv.env || 'dev';
  const location = argv.location || 'remote';
  const worona = packageJson.worona || await askForInfo({ packageJson });
  await getFiles({ entrie: worona.service, env });
  await webpack({ ...worona, env, location });
};

process.on('unhandledRejection', (err) => {
  console.log(err.stack);
  process.exit(1);
});

start();
