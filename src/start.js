/* eslint-disable no-console */
import 'babel-polyfill';
import { argv } from 'yargs';
import { spawn } from 'child-process-promise';
import { writeFileSync } from 'fs';
import packageJson from '../../../package.json';
import askForInfo from './ask-for-info.js';
import askForService from './ask-for-service.js';
import installVendorPackages from './install-vendor-packages.js';
import checkForNewVersion from './check-for-new-version.js';
import getFiles from './get-files.js';
import webpack from './webpack.js';

const start = async () => {
  if (await checkForNewVersion({ packageJson })) {
    console.log('Please run `npm start` again.\n\n');
  } else {
    const env = argv.env || 'dev';
    const location = argv.location || 'remote';
    const newPackageJson = packageJson.worona ? packageJson : await askForInfo({ packageJson });
    const worona = newPackageJson.worona;
    const services = ['dashboard', 'app', 'amp', 'fbia'].filter(service => worona[service]);
    writeFileSync('package.json', JSON.stringify(newPackageJson, null, 2));
    await spawn('npm', ['install'], { stdio: 'inherit' });
    const service = await askForService({ services });
    await installVendorPackages({ service, packageJson: newPackageJson });
    await getFiles({ service, env });
    await webpack({ ...newPackageJson, ...worona, env, location, service });
  }
};

process.on('unhandledRejection', (err) => {
  console.log(err.stack);
  process.exit(1);
});

start();
